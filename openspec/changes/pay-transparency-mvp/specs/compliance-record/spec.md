# Spec Delta

## Purpose

Genereert een bedrijfsbreed compliance-overzicht dat de status toont van het volledige loontransparantie-traject: importstatus, gedefinieerde groepen, analysestatus, geflagde en beoordeelde groepen, open en voltooide acties, en audithistoriek.

## ADDED Requirements

### Requirement: Systeem genereert een compliance-overzicht op bedrijfsniveau

De systeem SHALL een GET /api/compliance-endpoint aanbieden dat een samenvatting retourneert van de volledige loontransparantie-status van de tenant.

#### Scenario: Compliance-overzicht tonen
- **WHEN** HR vraagt het compliance-overzicht op
- **THEN** retourneert de API:
  - totaal aantal geïmporteerde werknemers
  - aantal imports, laatste importdatum
  - aantal gedefinieerde groepen
  - aantal groepen met analyse voltooid
  - aantal geflagde groepen
  - aantal beoordeelde groepen
  - aantal open acties
  - aantal voltooide acties
  - laatst gewijzigd

### Requirement: Compliance-overzicht bevat audit-historiek

De systeem SHALL in het compliance-overzicht een samenvatting van recente audit_log entries tonen, zodat HR kan zien welke acties er recent zijn gebeurd in het systeem.

#### Scenario: Recente audit entries in overzicht
- **WHEN** HR bekijkt het compliance-overzicht
- **THEN** toont het overzicht de 10 meest recente audit_log entries
- **AND** per entry: wie, wat, wanneer, welk type entiteit