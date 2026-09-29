# Proposal

## Why

Belgische werkgevers moeten zich voorbereiden op de EU Pay Transparency Directive (2023/970). De huidige praktijk is versnipperd: HR-teams verzamelen loongegevens in Excel, doen manuele analyses, en documenteren beslissingen in losse mails of documenten. Er is geen gestructureerde workflow om van ruwe data naar een toetsbare loontransparantie-rapportage te gaan.

LexFlow bouwt een MVP waarmee werkgevers loongegevens kunnen uploaden, vergelijkingsgroepen definiëren, loonverschillen analyseren, beslissingen documenteren, en een compliance-ready rapport genereren — met minimale manuele HR-werktijd.

## What Changes

- Nieuw project `loontransparantie/` in aparte Git-repo (los van `landingpage/`)
- .NET 8 Minimal API als backend (C#)
- Nuxt 3 frontend (Vue/TypeScript) in SPA-mode
- Supabase Postgres als database, Supabase Auth voor authenticatie
- OpenAPI/NSwag voor type-veilige frontend-backend communicatie
- Volledige flow: Upload → Review → Act
- Geen wijzigingen aan landingpage (blijft onaangeroerd in eigen repo)

## Capabilities

### New Capabilities

- `tenant-auth`: Multi-tenant authenticatie — gebruikers registreren zichzelf, worden gekoppeld aan een bedrijf (tenant), en krijgen toegang tot enkel hun eigen bedrijfsdata via Supabase Auth + JWT-verificatie in de .NET API
- `imports`: Data-import — upload CSV/XLSX met vereiste velden (employee_id, gender, job_title, comparison_group, base_salary, variable_comp), detecteer missende of ongeldige waarden, toon importfouten voor het bewaren
- `comparison-groups`: Vergelijkingsgroepen — HR kan groepen aanmaken en beheren op basis van skills, effort, verantwoordelijkheid en werkomstandigheden, met korte rechtvaardiging per groep, en werknemers toewijzen
- `pay-analysis`: Loonanalyse — bereken gemiddelde totale compensatie per gender per groep, toon base gap, variable gap, total gap en percentageverschil, flag groepen die review nodig hebben (zonder automatische discriminatieconclusie)
- `review-workflow`: Review-workflow — per geflagde groep kiest HR uit: objectief verklaard / deels verklaard / niet verklaard / meer info nodig, met toelichting, bewijs, reviewer en datum, inclusief wijzigingshistoriek
- `actions`: Opvolgacties — bij onvoldoende verklaarde verschillen kan HR acties aanmaken met titel, eigenaar, deadline, status en notities; voorbeelden: salarisaanpassing, functieclassificatie herzien, manager review, data verzamelen, beleid updaten
- `compliance-record`: Compliance-overzicht — één bedrijfsbreed overzicht met: importstatus, groepen, analysestatus, geflagde groepen, beoordeelde groepen, open acties, voltooide acties, audithistoriek
- `reporting`: Rapportage — exporteer een basisrapport uit de aanwezige data (geen geavanceerde regulatory engine in V1)

### Modified Capabilities

Geen — dit is een nieuw subproject, de bestaande landingpage verandert niet.

## Impact

- **Nieuw project**: aparte Git-repo `loontransparantie/` met `frontend/` en `backend/` directories
- **Nieuwe dependencies**: .NET 8 SDK, NSwag voor codegeneratie, EF Core + Npgsql voor Supabase Postgres
- **Database**: Supabase project krijgt nieuwe tabellen (tenants, imports, employees, comparison_groups, group_memberships, group_analyses, review_decisions, actions, audit_log)
- **Geen impact op landingpage**: repo blijft ongewijzigd
- **AGENTS.md**: de regel in `code/AGENTS.md` over icons geldt voor beide repos — zo nodig nuanceren