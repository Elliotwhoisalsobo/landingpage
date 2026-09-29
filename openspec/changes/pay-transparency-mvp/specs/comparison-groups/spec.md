# Spec Delta

## Purpose

Laat HR vergelijkingsgroepen definiëren en beheren op basis van gelijk werk (skills, effort, verantwoordelijkheid, werkomstandigheden), met een rechtvaardiging per groep, en werknemers aan groepen toewijzen. Menselijke beoordeling blijft altijd leidend.

## ADDED Requirements

### Requirement: HR kan vergelijkingsgroepen aanmaken

De systeem SHALL CRUD-endpoints aanbieden voor vergelijkingsgroepen. Elke groep heeft een naam, een rechtvaardiging, en een aanduiding van welke criteria (skills, effort, responsibility, working_conditions) van toepassing zijn.

#### Scenario: Groep aanmaken met criteria
- **WHEN** HR maakt een nieuwe groep met naam "Kantoorpersoneel", rechtvaardiging "Administratieve functies met vergelijkbare verantwoordelijkheidsniveau", criteria {skills: true, effort: true, responsibility: true, working_conditions: false}
- **THEN** wordt de groep aangemaakt
- **AND** retourneert de API de aangemaakte groep met id

#### Scenario: Groep aanmaken zonder rechtvaardiging
- **WHEN** HR probeert een groep aan te maken zonder rechtvaardiging
- **THEN** retourneert de API een 400 Bad Request met "Rechtvaardiging is verplicht"

### Requirement: HR kan groepen bewerken en verwijderen

De systeem SHALL PUT- en DELETE-endpoints aanbieden voor groepen. Een groep kan enkel verwijderd worden als er geen analyses aan gekoppeld zijn.

#### Scenario: Groep bewerken
- **WHEN** HR wijzigt de naam van een bestaande groep van "Kantoorpersoneel" naar "Administratief personeel"
- **THEN** wordt de groep bijgewerkt
- **AND** wordt de updated_at-tijdstempel bijgewerkt

#### Scenario: Groep verwijderen zonder analyses
- **WHEN** HR verwijdert een groep die geen gekoppelde analyses heeft
- **THEN** wordt de groep verwijderd
- **AND** worden ook de group_memberships van die groep verwijderd

#### Scenario: Groep verwijderen met analyses
- **WHEN** HR probeert een groep te verwijderen die gekoppelde analyses heeft
- **THEN** retourneert de API een 409 Conflict met "Verwijder eerst de analyses van deze groep"

### Requirement: HR kan werknemers aan groepen toewijzen

De systeem SHALL endpoints aanbieden om werknemers aan een groep toe te voegen of te verwijderen. Eén werknemer kan in meerdere groepen zitten.

#### Scenario: Werknemer toewijzen aan groep
- **WHEN** HR voegt werknemer A met employee_identifier "EMP001" toe aan groep "Kantoorpersoneel"
- **THEN** wordt een group_membership aangemaakt
- **AND** is de werknemer zichtbaar in de groepsledenlijst

#### Scenario: Werknemer uit groep verwijderen
- **WHEN** HR verwijdert werknemer A uit groep "Kantoorpersoneel"
- **THEN** wordt de group_membership verwijderd
- **AND** is de werknemer niet meer zichtbaar in de groepsledenlijst

### Requirement: Criteria worden bijgehouden per groep

De systeem SHALL per groep bijhouden welke van de vier criteria (skills, effort, responsibility, working_conditions) van toepassing zijn. Deze criteria worden getoond in het groepsoverzicht.

#### Scenario: Criteria tonen in groepsoverzicht
- **WHEN** HR bekijkt de detailpagina van groep "Kantoorpersoneel"
- **THEN** worden de actieve criteria getoond: "Skills: Ja, Effort: Ja, Verantwoordelijkheid: Ja, Werkomstandigheden: Nee"