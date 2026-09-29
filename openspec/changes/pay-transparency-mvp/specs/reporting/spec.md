# Spec Delta

## Purpose

Exporteert een basisrapport op basis van de aanwezige data in het systeem. Biedt een CSV-export van het compliance-overzicht en de beoordelingen. Geen geavanceerde regulatory reporting engine in V1.

## ADDED Requirements

### Requirement: HR kan een CSV-rapport exporteren

De systeem SHALL een GET /api/reports/export-endpoint aanbieden dat een CSV-bestand retourneert met de volgende kolommen: comparison_group, avg_total_m, avg_total_f, total_gap, percentage_diff, flagged, review_status, open_actions.

#### Scenario: Export van volledig rapport
- **WHEN** HR vraagt een export aan van het loontransparantierapport
- **THEN** retourneert de API een CSV-bestand met de gespecificeerde kolommen
- **AND** bevat het bestand één rij per vergelijkingsgroep

#### Scenario: Export van lege dataset
- **WHEN** HR vraagt een export aan terwijl er nog geen data is geïmporteerd
- **THEN** retourneert de API een CSV-bestand met enkel de header-rij
- **AND** geen data-rijen

### Requirement: Rapport bevat enkel data uit het systeem

De systeem SHALL geen externe databronnen raadplegen voor het rapport. Alle data in het rapport komt uit de eigen database (employees, groups, analyses, reviews, actions). De rapportage is een momentopname van wat er in het systeem zit.

#### Scenario: Rapport is momentopname
- **WHEN** HR exporteert een rapport op 1 juni 2025
- **THEN** bevat het rapport de data zoals die op 1 juni 2025 in het systeem zat
- **AND** wordt er geen externe benchmark of historische data toegevoegd