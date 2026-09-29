# Design

## Context

Dit ontwerp beschrijft de architectuur van het nieuwe `loontransparantie/`-subproject. Zie proposal.md voor de motivatie ("waarom") en de specs voor de functionele vereisten ("wat"). Dit document gaat over de implementatie ("hoe").

**Bestaande situatie:**
- Eén statische landingpage (HTML/CSS/JS, Phosphor icons)
- Supabase project met Auth en Postgres (reeds geconfigureerd)
- Geen backend, geen database-schema voor de app
- Geen authentication workflow voor eigen gebruikers

## Goals / Non-Goals

**Goals:**
- .NET 8 Minimal API met duidelijke endpoint-structuur en middleware voor auth + audit
- Nuxt 3 SPA-frontend die via gegenereerde TypeScript client met de API praat
- Supabase Postgres database met EF Core code-first migraties
- Supabase Auth voor gebruikerssessies, JWT-verificatie in .NET middleware
- Upload → parse → validate → persist flow voor CSV/XLSX
- Gestructureerd datamodel voor employees, groups, analyses, reviews, actions, audit
- OpenAPI/NSwag type-generatie tussen backend en frontend
- Multi-tenant isolatie via tenant_id op alle data

**Non-Goals:**
- Geen payroll-integraties
- Geen recruitment module of self-service portal
- Geen salarisbenchmark database
- Geen compensation planning of payroll write-back
- Geen automatische juridische conclusies
- Geen AI chatbot
- Geen volwaardige job architecture engine

## Beslissingen

### .NET 8 Minimal API (ipv Controllers)

Minimal API's in .NET 8 zijn volwassen genoeg voor een data-gedreven MVP. Ze dwingen een dunne endpoint-laag af zonder Controller-base class overhead. Elke endpoint-groep leeft in een eigen bestand (ImportsEndpoints.cs, GroupsEndpoints.cs, etc.) wat de projectstructuur helder houdt.

Alternatief overwogen: ASP.NET Core Controllers. Geeft meer structuur voor grotere teams maar voegt boilerplate toe (Controller base class, ActionFilters) zonder winst in de MVP-fase.

### EF Core + Npgsql (ipv Dapper)

EF Core geeft code-first migraties, change tracking, en LINQ — waardevol voor een snel evoluerend MVP-schema. Het nadeel (performance overhead bij complexe queries) is verwaarloosbaar op de datasets van een MVP (duizenden rijen, niet miljoenen).

Alternatief overwogen: Dapper. Sneller maar zonder migraties of change tracking — vraagt handmatig SQL-beheer wat de snelheid van itereren remt in de vroege fase.

### Nuxt 3 in SPA-mode (ipv SSR)

De loontransparantie-app zit achter authenticatie — er is geen SEO-waarde voor de core paginas. SPA-mode betekent statische hosting (goedkoper, eenvoudiger) en de API calls gaan rechtstreeks naar de .NET backend.

Alternatief overwogen: Nuxt SSR. Zou een Node.js-server vereisen naast de .NET API, wat de hosting-opzet complexer maakt zonder merkbaar voordeel voor een authenticated app.

### Supabase Auth + JWT-verificatie in .NET middleware

Supabase Auth beheert gebruikersregistratie, login en sessies. De frontend stuurt het JWT mee naar elke API call. De .NET middleware valideert het JWT via Supabase's JWKS endpoint en destilleert user + tenant identity.

Alternatief overwogen: .NET Identity. Dit zou een eigen auth-systeem naast Supabase zetten, wat de setup verdubbelt zonder toegevoegde waarde aangezien Supabase Auth al aanwezig is in het project.

### Upload flow: client → API → parse → validate → preview → persist

```
┌──────────┐    1. POST file     ┌──────────┐    2. parse + validate    ┌──────────┐
│  Nuxt    │ ──────────────────► │  .NET    │ ───────────────────────►  │  Memory  │
│  SPA     │                     │  API     │                          │  (errors)│
│          │ ◄────────────────── │          │ ◄───────────────────────  │          │
└──────────┘    4. errors/json   └──────────┘    3. errors terug        └──────────┘
     │
     │ 5. gebruiker bevestigt (of herstelt fouten)
     ▼
┌──────────┐    6. POST confirm   ┌──────────┐    7. persist           ┌──────────┐
│  Nuxt    │ ──────────────────► │  .NET    │ ───────────────────────► │  Supabase│
│  SPA     │                     │  API     │                          │  Postgres│
└──────────┘                     └──────────┘                          └──────────┘
```

- Stap 1-4: Upload geeft errors terug zonder te bewaren (veilig, gebruiker ziet wat er mis is)
- Stap 5-7: Pas bij bevestiging wordt data naar de database geschreven
- CSV parsing via CsvHelper, XLSX via ClosedXML (.NET libraries)

## Datamodel

### Hoofdtabel: tenants

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | Tenant ID, ook in Supabase Auth custom claim |
| name | text | Bedrijfsnaam |
| created_at | timestamptz | Aanmaakdatum |
| settings | jsonb | Tenant-specifieke instellingen (bv. flag-drempel) |

### imports

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | Multi-tenant isolatie |
| filename | text | Originele bestandsnaam |
| status | enum: pending, validated, imported, failed | Fase van import |
| row_count | int | Aantal verwerkte rijen |
| error_count | int | Aantal foutieve rijen |
| created_by | uuid FK → auth.users | Supabase user ID |
| created_at | timestamptz | |

**Import errors** worden bijgehouden in een aparte tabel `import_errors` of als JSONB op de import-regel (voor MVP: JSONB op import is simpeler).

### employees

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | |
| import_id | uuid FK → imports | Herkomst |
| employee_identifier | text | Door werkgever gebruikt ID (personeelsnummer oid) |
| gender | text | Man/Vrouw/X |
| job_title | text | Functietitel |
| base_salary | decimal(12,2) | Vast loon |
| variable_compensation | decimal(12,2) | Variabele verloning (bonus, commissie, etc.) |
| total_compensation | decimal(12,2) | Berekend: base + variable |
| comparison_group | text | Groepsaanduiding uit import (wordt later gelinkt) |

### comparison_groups

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | |
| tenant_id | uuid FK → tenants | |
| name | text | Groepsnaam |
| justification | text | Korte rechtvaardiging waarom deze groep bestaat |
| criteria_skills | boolean | Wordt skills gebruikt als criterium |
| criteria_effort | boolean | Wordt effort gebruikt als criterium |
| criteria_responsibility | boolean | Wordt responsibility gebruikt als criterium |
| criteria_working_conditions | boolean | Wordt working conditions gebruikt als criterium |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### group_memberships

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | |
| group_id | uuid FK → comparison_groups | |
| employee_id | uuid FK → employees | |
| assigned_at | timestamptz | |

### group_analyses

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | |
| group_id | uuid FK → comparison_groups | |
| calculated_at | timestamptz | |
| avg_base_m | decimal(12,2) | Gem. base salary mannen |
| avg_base_f | decimal(12,2) | Gem. base salary vrouwen |
| avg_variable_m | decimal(12,2) | |
| avg_variable_f | decimal(12,2) | |
| avg_total_m | decimal(12,2) | |
| avg_total_f | decimal(12,2) | |
| base_gap | decimal(12,2) | Verschil |
| variable_gap | decimal(12,2) | |
| total_gap | decimal(12,2) | |
| percentage_diff | decimal(5,2) | Procentueel verschil |
| flagged | boolean | True als verschil boven drempel |

### review_decisions

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | |
| analysis_id | uuid FK → group_analyses | |
| decision | enum: objectively_explained, partially_explained, not_explained, more_info_needed | |
| explanation | text | Toelichting HR |
| evidence | text | Link of referentie naar bewijsstuk |
| reviewer | text | Naam van beoordelaar |
| decided_at | timestamptz | |
| superseded_at | timestamptz | Wordt gevuld als een latere review deze overschrijft |

### actions

| Kolom | Type | Doel |
|-------|------|------|
| id | uuid PK | |
| review_id | uuid FK → review_decisions | Herkomst |
| tenant_id | uuid FK → tenants | |
| title | text | Actietitel |
| owner | text | Verantwoordelijke |
| due_date | date | Deadline |
| status | enum: open, in_progress, completed, cancelled | |
| notes | text | Notities |
| created_at | timestamptz | |
| completed_at | timestamptz | |

### audit_log

| Kolom | Type | Doel |
|-------|------|------|
| id | bigserial PK | |
| tenant_id | uuid FK → tenants | |
| user_id | uuid → auth.users | Wie |
| action | text | Wat (bijv. "import.created", "review.submitted") |
| entity_type | text | imports, employees, groups, etc. |
| entity_id | uuid | Welke entiteit |
| details | jsonb | Details / diff |
| created_at | timestamptz | |

## API Endpoints

| Method | Endpoint | Doel |
|--------|----------|------|
| POST | /api/imports/upload | Upload CSV/XLSX, parse, valideer, retourneer errors of preview |
| POST | /api/imports/{id}/confirm | Bevestig import (persist naar database) |
| GET | /api/imports | Lijst imports |
| GET | /api/imports/{id} | Import detail + errors |
| GET/POST/PUT/DELETE | /api/groups | CRUD comparison groups |
| GET/POST/DELETE | /api/groups/{id}/members | Group membership management |
| POST | /api/groups/{id}/analyze | Trigger pay gap berekening |
| GET | /api/analysis/{id} | Analyse resultaat |
| GET | /api/reviews?flagged | Lijst te reviewen/beoordeelde analyses |
| POST | /api/reviews | Review decision indienen |
| GET | /api/reviews/{id}/history | Historiek van wijzigingen aan een review |
| GET/POST/PUT/DELETE | /api/actions | CRUD acties |
| GET | /api/compliance | Bedrijfsbreed compliance overzicht |
| GET | /api/reports/export | Rapport export (CSV/PDF) |
| POST | /api/auth/register | Registratie (nieuwe tenant + gebruiker) |

## Middleware

### SupabaseAuthMiddleware

Valideert Bearer token tegen Supabase JWKS endpoint. Destilleert `userId` en `tenantId` uit JWT claims en zet ze in `HttpContext.Items`. Geen token = 401.

### AuditMiddleware

Schrijft voor elke gemuteerde request een entry naar `audit_log` tabel. Vangt entity_type en entity_id uit response body of route data.

### TenantEnforcementMiddleware

Voor elke request behalve /auth/* wordt gecontroleerd of de tenant_id in de URL of request body matcht met de tenant_id uit het JWT.

## Authenticatie flow

```
┌──────────────────────────────────────────────────────────────────┐
│  Registratie                                                      │
│                                                                   │
│  1. Gebruiker POST /api/auth/register { email, password, company }│
│  2. API maakt Supabase Auth user aan                             │
│  3. API maakt tenant + koppelt user als admin                    │
│  4. Supabase stuurt confirmatie-email (optioneel in MVP)         │
│                                                                   │
│  Login                                                             │
│                                                                   │
│  1. Gebruiker logt in via Supabase Auth (rechtstreeks vanuit     │
│     frontend of via Nuxt proxy)                                  │
│  2. Supabase geeft JWT terug met custom claim: tenant_id         │
│  3. Frontend stuurt JWT mee naar elke API call                   │
│  4. .NET middleware valideert JWT en leest tenant_id             │
└──────────────────────────────────────────────────────────────────┘
```

## Projectstructuur

De code leeft in een aparte Git-repo `loontransparantie/` los van de `landingpage/`-repo. Binnen die repo:

```
loontransparantie/
├── frontend/          # Nuxt 3 (Vue/TS)
│   ├── pages/
│   ├── components/
│   ├── generated/     # ⚡ NSwag output
│   ├── composables/
│   └── nuxt.config.ts
├── backend/           # .NET 8 solution
│   ├── LexFlow.sln
│   └── src/
│       ├── LexFlow.Api/            # Endpoints + middleware
│       ├── LexFlow.Core/           # Domeinmodellen + services
│       ├── LexFlow.Infrastructure/ # EF Core + repositories
│       └── LexFlow.IntegrationTests/
├── .env.example
├── .gitignore
└── README.md
```

De landing page blijft ongewijzigd in de bestaande repo `code/landingpage/`.

## Risico's / Trade-offs

| Risico | Mitigatie |
|--------|-----------|
| **Keuze voor SPA vs SSR maakt app minder SEO-proof** | De app zit achter auth — SEO is niet relevant voor core pages. Eventuele publieke pagina's (pricing, features) kunnen in landingpage blijven. |
| **NSwag TypeScript output is soms te generiek** | Fallback: OpenAPI Generator als type-kwaliteit knelt. Output is een generated/ map die eenvoudig te vervangen is. |
| **Supabase Auth JWT-verificatie in .NET is extra infra** | Supabase levert JWKS endpoint. Middleware is ~50 regels code. Caching van JWKS keys in memory. |
| **Multi-tenant complexiteit in EF Core queries** | Global query filter op tenant_id in AppDbContext.OnModelCreating — automatisch, niet te vergeten. |
| **CSV/XLSX parsing bij grote bestanden blokkeert API-thread** | .NET multi-threading is native. Voor 10k+ rijen: paginated parsing + background job. MVP: gewoon synchroon. |
| **Hosting ondersteunt .NET niet** | Frontend = statisch (overal). Backend = VPS (Hetzner €5/m) of PaaS (Azure/Railway gratis tier).