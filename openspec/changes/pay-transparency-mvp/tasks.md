# Tasks

## 1. Project scaffolding

- [ ] 1.1 Initialiseer nieuwe Git-repo `loontransparantie/` los van de landingpage, met `frontend/` en `backend/` directories zoals beschreven in design.md — verifieer met `git init` en `ls -la`
- [ ] 1.2 Initialiseer .NET solution: `dotnet new sln -n LexFlow` in `backend/`, voeg projecten Api/Core/Infrastructure toe — verifieer met `dotnet build`
- [ ] 1.3 Initialiseer Nuxt 3 app in `frontend/`: `npx nuxi init` met TypeScript, SPA-mode — verifieer met `npm run dev`
- [ ] 1.4 Voeg benodigde NuGet packages toe: EF Core, Npgsql, Swashbuckle, NSwag, CsvHelper, ClosedXML — verifieer met `dotnet list package`
- [ ] 1.5 Voeg benodigde npm packages toe: @nuxtjs/supabase, gegenereerde client (NSwag output) — verifieer met `npm list`
- [ ] 1.6 Stel NSwag in op de API: serveer swagger.json, genereer TypeScript client bij build — verifieer door `dotnet build` en controleer of `frontend/generated/types.ts` bestaat
- [ ] 1.7 Maak `.env.example`, `.gitignore` en update root `.gitignore` voor `loontransparantie/` — verifieer door git status te checken

## 2. Database schema (EF Core)

- [ ] 2.1 Maak domain models in `LexFlow.Core/Models/`: Tenant, Import, Employee, ComparisonGroup, GroupMembership, GroupAnalysis, ReviewDecision, Action, AuditLog — verifieer met `dotnet build`
- [ ] 2.2 Voeg EF Core DbContext toe in `LexFlow.Infrastructure/Data/AppDbContext.cs` met global query filter op tenant_id — verifieer met `dotnet build`
- [ ] 2.3 Configureer Npgsql-verbinding en voeg eerste migratie toe: `dotnet ef migrations add Initial` — verifieer dat migrations directory bestaat
- [ ] 2.4 Voeg repositories toe in `LexFlow.Infrastructure/Repositories/` voor alle entiteiten — verifieer met unit test die een repository oproept
- [ ] 2.5 Stel Supabase Postgres connection string in via omgevingsvariabele of user secrets — verifieer door `dotnet ef database update` uit te voeren (kan op lokale dev DB)

## 3. Authenticatie & multi-tenant

- [ ] 3.1 Implementeer Supabase JWT-validatie middleware: valideer Bearer token via Supabase JWKS endpoint, lees user_id en tenant_id uit claims — verifieer door request met geldig en ongeldig JWT
- [ ] 3.2 Implementeer TenantEnforcementMiddleware: controleer of request tenant_id matcht met JWT tenant_id — verifieer met cross-tenant request
- [ ] 3.3 Implementeer AuditMiddleware: schrijf audit_log entry voor elke muterende request — verifieer door POST request en controleer audit_log tabel
- [ ] 3.4 Implementeer POST /api/auth/register endpoint: maak Supabase Auth user aan + tenant in eigen database + koppel gebruiker als admin — verifieer door registratie en check of tenant + user bestaan
- [ ] 3.5 Implementeer Supabase Auth login in Nuxt frontend: login formulier + JWT opslaan + JWT meegeven aan alle API calls — verifieer door in te loggen en API call te doen
- [ ] 3.6 Implementeer logout en session management in frontend — verifieer door uit te loggen en te zien dat API calls 401 retourneren

## 4. Data import (CSV/XLSX)

- [ ] 4.1 Implementeer CsvParser in Core: parse CSV met CsvHelper, valideer verplichte velden (employee_identifier, gender, job_title, comparison_group, base_salary, variable_compensation) — verifieer met unit test op geldig/ongeldig CSV
- [ ] 4.2 Implementeer XlsxParser in Core: parse XLSX met ClosedXML, zelfde validatie als CsvParser — verifieer met unit test op XLSX-bestand
- [ ] 4.3 Implementeer POST /api/imports/upload: ontvang file, parse, valideer, retourneer preview + errors (zonder te bewaren) — verifieer met Postman/curl: upload CSV, check error response
- [ ] 4.4 Implementeer POST /api/imports/{id}/confirm: bewaar gevalideerde rijen in employees-tabel, update import status naar "imported" — verifieer door confirm en check employees tabel
- [ ] 4.5 Implementeer GET /api/imports en GET /api/imports/{id} endpoints — verifieer door imports op te vragen na upload
- [ ] 4.6 Bouw import-pagina in Nuxt: UploadDropZone component, preview tabel, error weergave, bevestigingsknop — verifieer door CSV te uploaden via de UI

## 5. Vergelijkingsgroepen

- [ ] 5.1 Implementeer CRUD endpoints voor comparison_groups (GET/POST/PUT/DELETE /api/groups) — verifieer met Postman: maak groep aan, lees terug, wijzig, verwijder
- [ ] 5.2 Implementeer POST/DELETE /api/groups/{id}/members endpoints voor group_memberships — verifieer door werknemer toe te voegen en te verwijderen
- [ ] 5.3 Implementeer validatie: groep vereist rechtvaardiging, verwijderen geblokkeerd als er analyses zijn — verifieer met foutscenario's
- [ ] 5.4 Bouw groepen-pagina in Nuxt: GroupCard component, groep aanmaken/bewerken formulier, leden toewijzen interface — verifieer door groep aan te maken via UI

## 6. Loonanalyse (Pay Gap)

- [ ] 6.1 Implementeer PayGapCalculator in Core: bereken avg_base/variable/total per gender per groep, bereken gaps en percentage — verifieer met unit test (geef 10 werknemers, verwacht specifieke gaps)
- [ ] 6.2 Implementeer flagging-logica: flag analyse als percentage_diff > tenant drempel (default 5%) — verifieer met test: groepen boven/onder drempel
- [ ] 6.3 Implementeer POST /api/groups/{id}/analyze endpoint: roep calculator aan, bewaar GroupAnalysis — verifieer door analyse te triggeren en resultaat op te vragen
- [ ] 6.4 Implementeer GET /api/analysis/{id} endpoint — verifieer door analyse detail op te vragen
- [ ] 6.5 Bouw analysedashboard in Nuxt: PayGapTable component met gaps en flag-status — verifieer door analyse te bekijken in UI

## 7. Review workflow

- [ ] 7.1 Implementeer POST /api/reviews endpoint: maak review_decision aan met decision, explanation, evidence, reviewer — verifieer met Postman
- [ ] 7.2 Implementeer historiek-logica: nieuwe beoordeling markeert vorige als superseded — verifieer door twee beoordelingen in te dienen en historiek te checken
- [ ] 7.3 Implementeer GET /api/reviews endpoint met filter op flagged / onbeoordeeld / beoordeeld — verifieer door geflagde groepen op te vragen
- [ ] 7.4 Implementeer GET /api/reviews/{id}/history endpoint — verifieer door historiek op te vragen
- [ ] 7.5 Bouw review-pagina in Nuxt: ReviewForm component met decision dropdown, toelichting veld, bewijsveld, historiekweergave — verifieer door review in te dienen via UI

## 8. Acties

- [ ] 8.1 Implementeer CRUD endpoints voor actions (GET/POST/PUT /api/actions) — verifieer met Postman
- [ ] 8.2 Implementeer status-transities: open → in_progress → completed, completed_at vullen bij afronden — verifieer door status te wijzigen
- [ ] 8.3 Bouw actie-pagina in Nuxt: ActionForm component, actielijst met status en deadline, markeer achterstallige acties — verifieer door actie aan te maken via UI

## 9. Compliance-overzicht

- [ ] 9.1 Implementeer GET /api/compliance endpoint: aggregeer alle status-data van de tenant — verifieer met Postman: controleer of alle tellers kloppen
- [ ] 9.2 Bouw compliance-dashboard in Nuxt: ComplianceOverview component met samenvatting en recente audit entries — verifieer door dashboard te bekijken in UI

## 10. Rapportage

- [ ] 10.1 Implementeer GET /api/reports/export endpoint: genereer CSV met groepen, gaps, flags, review status, acties — verifieer door export te downloaden en CSV te openen
- [ ] 10.2 Bouw export-knop in dashboard: één klik downloadt CSV-rapport — verifieer door te klikken en bestand te openen

## 11. Nuxt frontend — global

- [ ] 11.1 Stel gegenereerde API client in als Nuxt plugin (useApi composable) — verifieer door API call te doen vanuit een pagina
- [ ] 11.2 Maak layout met navigatie (login → dashboard → import → groups → review → actions) — verifieer door door de app te navigeren
- [ ] 11.3 Implementeer auth guard: onbevoegde gebruikers worden naar login gestuurd — verifieer door /dashboard te bezoeken zonder ingelogd te zijn
- [ ] 11.4 Implementeer loading states, error handling en form-message componenten — verifieer door trage API calls te simuleren

## 12. Configuratie & deployment

- [ ] 12.1 Stel lokale .NET user secrets in voor Supabase credentials en JWT config — verifieer door API op te starten en te connecteren met Supabase
- [ ] 12.2 Schrijf deployment-docs: hoe frontend statisch builden, hoe backend builden en deployen — verifieer door de docs te volgen op een schone machine
- [ ] 12.3 Voeg Health check endpoint toe: GET /api/health retourneert API + DB status — verifieer met curl /api/health
- [ ] 12.4 Update de icon-regel in `code/AGENTS.md` om Phosphor te erkennen als standaard voor beide repos — verifieer door de regel te lezen