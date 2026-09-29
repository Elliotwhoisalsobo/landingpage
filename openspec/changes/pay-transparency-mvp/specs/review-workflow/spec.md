# Spec Delta

## Purpose

Laat HR per geflagde groep een gemotiveerde beoordeling vastleggen: of het loonverschil objectief verklaard is, deels verklaard, niet verklaard, of dat meer informatie nodig is. Elke beoordeling wordt bijgehouden met bewijs, beoordelaar en datum, inclusief volledige wijzigingshistoriek.

## ADDED Requirements

### Requirement: HR kan een beoordeling vastleggen voor een geflagde groep

De systeem SHALL per analyse een beoordeling toestaan met de keuzes: objectively_explained, partially_explained, not_explained, more_info_needed. Verplichte velden: decision, explanation, reviewer, date. Optioneel: evidence.

#### Scenario: Beoordeling indienen voor geflagde groep
- **WHEN** HR opent een geflagde analyse van groep "Kantoorpersoneel", kiest objectively_explained, vult toelichting in "Verschil is te wijten aan anciënniteit: mannelijke medewerkers hebben gemiddeld 4 jaar meer ervaring", vult beoordelaar "Jan Janssen" en datum vandaag
- **THEN** wordt de review_decision aangemaakt
- **AND** is de analyse niet langer "onbeoordeeld"

#### Scenario: Beoordeling zonder toelichting
- **WHEN** HR probeert een beoordeling in te dienen zonder toelichting
- **THEN** retourneert de API een 400 Bad Request met "Toelichting is verplicht"

### Requirement: Systeem houdt wijzigingshistoriek bij van beoordelingen

De systeem SHALL elke beoordeling bewaren als een immutable entry. Een nieuwe beoordeling voor dezelfde analyse overschrijft de vorige niet, maar markeert de vorige als superseded. De volledige historiek is altijd opvraagbaar.

#### Scenario: Eerste beoordeling aanmaken
- **WHEN** HR dient een eerste beoordeling in voor analyse A
- **THEN** wordt entry aangemaakt met superseded_at = NULL

#### Scenario: Beoordeling herzien
- **WHEN** HR dient een tweede beoordeling in voor dezelfde analyse A
- **THEN** wordt de vorige entry gemarkeerd met superseded_at = nu
- **AND** wordt een nieuwe entry aangemaakt met superseded_at = NULL

#### Scenario: Historiek opvragen
- **WHEN** HR vraagt de historiek op van analyse A
- **THEN** retourneert de API alle beoordelingen voor die analyse, van oud naar nieuw
- **AND** toont per entry wat de beslissing was en of ze superseded is

### Requirement: Systeem toont welke groepen beoordeeld zijn en welke niet

De systeem SHALL een overzicht tonen van alle geflagde groepen met hun beoordelingsstatus: onbeoordeeld, beoordeeld (met laatste beslissing), of herzien.

#### Scenario: Overzicht geflagde groepen
- **WHEN** HR bekijkt het review-overzicht
- **THEN** toont de lijst: groepen die nog beoordeeld moeten worden, groepen met een actieve beoordeling, en groepen waarvan de beoordeling herzien is