# Spec Delta

## Purpose

Maakt het mogelijk om werknemersgegevens te importeren via CSV/XLSX-bestanden, met validatie van verplichte velden en duidelijke foutmeldingen voor het bewaren van de data. Voorkomt dat onvolledige of ongeldige data in het systeem komt.

## ADDED Requirements

### Requirement: HR kan CSV/XLSX uploaden

De systeem SHALL een upload-endpoint aanbieden waar HR een CSV- of XLSX-bestand kan uploaden. De upload parse het bestand server-side en valideert de data zonder deze te bewaren.

#### Scenario: Upload van geldig CSV-bestand
- **WHEN** HR uploadt een CSV-bestand met kolommen: employee_identifier, gender, job_title, comparison_group, base_salary, variable_compensation
- **THEN** wordt het bestand geparsed
- **AND** retourneert de API een preview van de eerste 10 rijen
- **AND** worden geen rijen in de database bewaard

#### Scenario: Upload van XLSX-bestand
- **WHEN** HR uploadt een XLSX-bestand met dezelfde vereiste kolommen
- **THEN** wordt het bestand geparsed
- **AND** retourneert de API een preview

#### Scenario: Upload van unsupported bestandstype
- **WHEN** HR uploadt een PDF-bestand
- **THEN** retourneert de API een 400 Bad Request met "Alleen CSV en XLSX worden ondersteund"

### Requirement: Verplichte velden worden gevalideerd

De systeem SHALL controleren of elk van de volgende velden aanwezig en geldig is: employee_identifier, gender, job_title, comparison_group, base_salary (positief getal), variable_compensation (niet-negatief getal).

#### Scenario: Ontbrekend verplicht veld
- **WHEN** een rij in de upload mist een employee_identifier of gender
- **THEN** wordt die rij gemarkeerd als error
- **AND** bevat de foutmelding het regelnummer en het ontbrekende veld

#### Scenario: Ongeldig salaris
- **WHEN** een rij een base_salary bevat die geen positief getal is (bijv. "-500" of "ABC")
- **THEN** wordt die rij gemarkeerd als error
- **AND** bevat de foutmelding "base_salary moet een positief getal zijn"

### Requirement: Importfouten worden getoond voor bewaren

De systeem SHALL voor het bevestigen van de import een overzicht tonen van alle fouten: aantal foutieve rijen, foutmeldingen per rij, en een samenvatting. De HR-gebruiker kan fouten herstellen in het brondocument en opnieuw uploaden.

#### Scenario: Upload met fouten toont foutoverzicht
- **WHEN** een upload bevat 3 rijen met fouten op 10 rijen totaal
- **THEN** toont de API een error_summary met: "3 van 10 rijen bevatten fouten"
- **AND** toont per foutieve rij het regelnummer en de foutmelding

#### Scenario: Upload zonder fouten toont bevestigingsoptie
- **WHEN** een upload bevat 0 fouten op alle rijen
- **THEN** toont de API een preview zonder errors
- **AND** kan de gebruiker de import bevestigen of annuleren

### Requirement: Import kan bevestigd worden

De systeem SHALL een confirm-endpoint aanbieden. Na bevestiging worden alle gevalideerde rijen in de employees-tabel bewaard met verwijzing naar de import-sessie.

#### Scenario: Bevestigde import wordt opgeslagen
- **WHEN** HR bevestigt een import zonder fouten
- **THEN** worden alle rijen opgeslagen in de employees-tabel
- **AND** krijgt de import de status "imported"
- **AND** wordt een audit_log entry aangemaakt

#### Scenario: Geannuleerde import wordt niet opgeslagen
- **WHEN** HR annuleert een import
- **THEN** krijgt de import de status "cancelled"
- **AND** worden geen rijen bewaard