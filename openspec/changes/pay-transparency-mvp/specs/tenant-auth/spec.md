# Spec Delta

## Purpose

Beheert gebruikersregistratie, multi-tenant isolatie en authenticatie voor de LexFlow loontransparantie-app. Elke gebruiker hoort bij exact één bedrijf (tenant) en heeft alleen toegang tot de data van dat bedrijf.

## ADDED Requirements

### Requirement: Gebruiker kan zich registreren met een nieuw bedrijf

De systeem SHALL een registratie-endpoint aanbieden waar een nieuwe gebruiker een email, wachtwoord en bedrijfsnaam kan opgeven. Na registratie wordt automatisch een tenant aangemaakt en wordt de gebruiker als admin van die tenant gekoppeld.

#### Scenario: Registratie slaagt
- **WHEN** een nieuwe gebruiker registreert met email "hr@bedrijf.be", wachtwoord "wachtwoord123" en bedrijfsnaam "Bedrijf NV"
- **THEN** wordt een nieuwe tenant "Bedrijf NV" aangemaakt
- **AND** wordt de gebruiker gekoppeld als admin van die tenant
- **AND** ontvangt de response een auth token

#### Scenario: Registratie met bestaande email
- **WHEN** een gebruiker registreert met een email die al bestaat in Supabase Auth
- **THEN** retourneert de API een 409 Conflict fout
- **AND** wordt er geen nieuwe tenant aangemaakt

### Requirement: Gebruiker kan inloggen

De systeem SHALL inloggen ondersteunen via Supabase Auth. Na succesvolle login retourneert Supabase een JWT met een custom claim die de tenant_id bevat. De frontend stuurt dit JWT mee naar alle API-calls.

#### Scenario: Login slaagt met geldige credentials
- **WHEN** een geregistreerde gebruiker inlogt met correct email en wachtwoord
- **THEN** retourneert Supabase een JWT token
- **AND** bevat het JWT een tenant_id claim

#### Scenario: Login mislukt met ongeldige credentials
- **WHEN** een gebruiker inlogt met een foutief wachtwoord
- **THEN** retourneert Supabase een 401 Unauthorized fout

### Requirement: API verifieert JWT en leest tenant_id

De systeem SHALL in de .NET API middleware het JWT valideren via Supabase's JWKS endpoint. De tenant_id uit het JWT wordt gebruikt om alle data queries te scopen.

#### Scenario: Geldig JWT geeft toegang
- **WHEN** een API-call binnenkomt met een geldig Bearer token
- **THEN** wordt de user_id en tenant_id uit het token gelezen
- **AND** wordt de request doorgelaten naar de endpoint handler

#### Scenario: Ongeldig JWT wordt geweigerd
- **WHEN** een API-call binnenkomt zonder of met een verlopen JWT
- **THEN** retourneert de API een 401 Unauthorized

### Requirement: Tenant-isolatie op alle data

De systeem SHALL voor elke API-call de tenant_id uit het JWT gebruiken om enkel data van die tenant te tonen of te muteren. Geen enkele gebruiker kan data van een andere tenant zien.

#### Scenario: Gebruiker ziet enkel eigen data
- **WHEN** gebruiker A van tenant 1 een GET /api/groups doet
- **THEN** bevat de response enkel groups met tenant_id = tenant 1
- **AND** geen groups van andere tenants

#### Scenario: Cross-tenant write wordt geweigerd
- **WHEN** gebruiker A van tenant 1 een POST /api/groups probeert met tenant_id = tenant 2 in de body
- **THEN** wordt de request geweigerd met een 403 Forbidden