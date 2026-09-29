# Spec Delta

## Purpose

Berekent per vergelijkingsgroep de gemiddelde loonverschillen tussen genders, toont base gap, variable gap, total gap en procentueel verschil, en flagt groepen die menselijke review nodig hebben zonder automatische discriminatieconclusie.

## ADDED Requirements

### Requirement: Systeem berekent gemiddelde compensatie per gender per groep

De systeem SHALL voor elke groep het gemiddelde berekenen van base_salary, variable_compensation en total_compensation, uitgesplitst per gender.

#### Scenario: Analyse van groep met mannen en vrouwen
- **WHEN** HR vraagt een analyse aan voor groep "Kantoorpersoneel" met 5 mannen (avg total €4500) en 5 vrouwen (avg total €4200)
- **THEN** retourneert de API: avg_base_m, avg_base_f, avg_variable_m, avg_variable_f, avg_total_m (€4500), avg_total_f (€4200)

#### Scenario: Analyse van groep met één gender
- **WHEN** HR vraagt een analyse aan voor een groep die enkel mannen bevat
- **THEN** retourneert de API: avg_total_m = gemiddelde, avg_total_f = 0
- **AND** wordt de groep niet geflagd (onvoldoende data)

### Requirement: Systeem toont loonverschillen in absolute en relatieve waarden

De systeem SHALL per analyse tonen: base_gap, variable_gap, total_gap (in EUR), en percentage_diff (procentueel verschil).

#### Scenario: Gap-berekening met duidelijke output
- **WHEN** de analyse van "Kantoorpersoneel" toont base_gap = €300, variable_gap = €50, total_gap = €350, percentage_diff = 7.8%
- **THEN** worden alle vijf waarden getoond in het analysedashboard

### Requirement: Systeem flagt groepen die review nodig hebben

De systeem SHALL een groep flaggen als flagged=true wanneer het totale loonverschil een drempel overschrijdt. De drempel is standaard 5% maar kan per tenant worden ingesteld. Een flag betekent "deze groep heeft menselijke review nodig" — nooit "dit is discriminatie".

#### Scenario: Groep geflagd boven drempel
- **WHEN** percentage_diff van groep "Kantoorpersoneel" = 7.8% (boven 5% drempel)
- **THEN** wordt flagged = true
- **AND** verschijnt de groep in de review-wachtrij

#### Scenario: Groep niet geflagd onder drempel
- **WHEN** percentage_diff van groep "Verkoop" = 2.1% (onder 5% drempel)
- **THEN** wordt flagged = false
- **AND** verschijnt de groep niet in de review-wachtrij

### Requirement: Systeem trekt nooit automatisch een discriminatieconclusie

De systeem SHALL in geen enkele weergave, samenvatting of export een conclusie trekken zoals "dit is loondiscriminatie" of "dit is een objectief verschil". Het systeem toont enkel de berekende cijfers en de flag-status. Elke conclusie is voorbehouden aan de menselijke beoordelaar in de review-workflow.

#### Scenario: Analyse toont cijfers, geen oordeel
- **WHEN** een analyse wordt getoond in de UI
- **THEN** bevat de weergave enkel cijfers (gemiddelden, gaps, percentage)
- **AND** bevat de weergave geen tekst zoals "discriminatie", "onrechtvaardig", of "verdacht"

#### Scenario: Geflagde groep toont review-aanbeveling
- **WHEN** een geflagde groep wordt getoond
- **THEN** toont de UI "Deze groep heeft een loonverschil boven de drempel — gelieve te beoordelen"
- **AND** bevat geen suggestie over de oorzaak van het verschil