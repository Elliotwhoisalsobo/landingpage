# Spec Delta

## Purpose

Laat HR opvolgacties aanmaken en beheren voor loonverschillen die niet (volledig) verklaard zijn. Acties hebben een titel, eigenaar, deadline, status en notities. Ondersteunde actietypes: salarisaanpassing, functieclassificatie herzien, manager review, data verzamelen, beleid updaten.

## ADDED Requirements

### Requirement: HR kan een actie aanmaken voor een onvoldoende verklaard verschil

De systeem SHALL een POST /api/actions-endpoint aanbieden. Een actie is gekoppeld aan een review_decision met beslissing not_explained, partially_explained of more_info_needed. Verplichte velden: title, owner, due_date.

#### Scenario: Actie aanmaken voor onverklaard verschil
- **WHEN** HR heeft een verschil in groep "Kantoorpersoneel" beoordeeld als not_explained
- **AND** maakt een actie aan met titel "Salarisaanpassing uitvoeren voor functiegroep B", eigenaar "Anne Beheer", deadline "2025-06-01"
- **THEN** wordt de actie aangemaakt met status "open"
- **AND** is de actie zichtbaar in het actieoverzicht

#### Scenario: Actie aanmaken zonder titel
- **WHEN** HR probeert een actie aan te maken zonder titel
- **THEN** retourneert de API een 400 Bad Request met "Titel is verplicht"

### Requirement: HR kan de status van een actie wijzigen

De systeem SHALL PUT /api/actions/{id}-endpoint aanbieden om de status van een actie te wijzigen naar: open, in_progress, completed, cancelled.

#### Scenario: Actie markeren als in uitvoering
- **WHEN** HR opent een actie en zet status van "open" naar "in_progress"
- **THEN** wordt de status bijgewerkt
- **AND** blijft de einddatum onveranderd

#### Scenario: Actie afronden
- **WHEN** HR zet status van een actie naar "completed"
- **THEN** wordt de status bijgewerkt
- **AND** wordt completed_at gevuld met de huidige datum

### Requirement: Systeem toont openstaande acties per review en overkoepelend

De systeem SHALL een overzicht tonen van alle openstaande acties voor de tenant, sorteerbaar op einddatum en status. Daarnaast toont de detailpagina van een review welke acties eraan gekoppeld zijn.

#### Scenario: Overzicht open acties
- **WHEN** HR bekijkt het actieoverzicht
- **THEN** worden acties getoond met: titel, eigenaar, einddatum, status
- **AND** zijn acties met vervaldatum in het verleden gemarkeerd als "achterstallig"

#### Scenario: Acties per review
- **WHEN** HR bekijkt een specifieke review
- **THEN** worden de gekoppelde acties getoond
- **AND** kan HR van daaruit een nieuwe actie aanmaken