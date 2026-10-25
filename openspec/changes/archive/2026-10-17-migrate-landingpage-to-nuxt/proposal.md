# Proposal

## Why

De landingpage bestaat nu uit losse HTML-, CSS- en JavaScript-bestanden zonder eigen package.json of reproduceerbare build. Een migratie naar de officiële Nuxt-basis geeft Vue-componenten, strikte TypeScript-controle en een expliciete deployment, zonder het bestaande ontwerp of de wachtlijstfunctionaliteit opnieuw uit te vinden.

## What Changes

- Bewaar de huidige `frontpage` inclusief de nog niet gecommitte wijzigingen in `index.html` en `styles.css` op `legacy`, voordat applicatiebestanden worden vervangen.
- Bouw de migratie op een tijdelijke branch vanuit die momentopname; maak de geteste Nuxt-versie uiteindelijk `main` en stel die in als standaardbranch. Bestaande `master`, `frontpage` en featurebranches blijven voorlopig behouden, zonder force-push.
- Gebruik het officiële `nuxt/starter`-template `v4` via `npm create nuxt@latest <lege-map> -- -t v4`. De uiteindelijke Nuxt-app komt in de bestaande repositoryroot.
- Migreer de huidige landingpage naar Nuxt 4 / Vue 3 met strikte TypeScript, gewone CSS en de bestaande Phosphor-iconen. Geen Tailwind, Nuxt UI, CSS-framework of nieuwe productfunctionaliteit.
- Behoud de Nederlandse website-inhoud, inclusief beide productmodules, de recente Bo-tekst, centrering van de hero en links uitgelijnde contextkaarten.
- Verplaats de Supabase-instellingen naar een apart `.env`-bestand met `.env.example` en Nuxt `runtimeConfig.public`; geen waarden in Vue-componenten en geen `window.SUPABASE_*`-afhankelijkheid.
- Behoud de bestaande wachtlijst-API, validatie en statusmeldingen. Geen database- of authenticatiemigratie.
- **BREAKING** voor ontwikkeling/deployment: de site krijgt een Node/npm-build; publiceer de gegenereerde `.output/public` in plaats van de repositorybestanden rechtstreeks.
- Verifieer eerst de daadwerkelijke hostinginstellingen. Voorgesteld blijft statische hosting op GitHub Pages met `lexflow.be`, via GitHub Actions vanaf `main`.
- Bewaar oude alternatieve ontwerpen en uitgeschakelde popupcode in `legacy`, niet als extra actieve pagina's van de nieuwe app.

## Capabilities

### New Capabilities

Geen nieuwe productcapabilities. Dit is een framework-, tooling- en deploymentmigratie met behoud van het bestaande productgedrag; `skip_specs: true` is daarom ingesteld.

### Modified Capabilities

Geen. `openspec/specs/` bevat nog geen capabilities. Het afzonderlijke plan `pay-transparency-mvp` blijft behouden maar wordt niet uitgevoerd of gewijzigd: dat beschrijft een andere repository met .NET-backend en Nuxt 3, niet deze landingpage.

## Impact

- Vervangt de actieve rootbestanden `index.html`, `script.js`, `styles.css` en de browserconfiguratie door de gebruikelijke Nuxt-structuur.
- Voegt package.json, lockfile, Nuxt/TypeScript-configuratie, een kleine formuliertest en een Pages-workflow toe.
- Past README, Git-ignorepatronen, statische domeinbestanden en repository-/Pages-instellingen aan tijdens de uitvoering.
- Vereist toegang tot GitHub-repositoryinstellingen voor de uiteindelijke omschakeling; die toegang is nu niet vastgesteld.
- Geen nieuwe backend, Pinia, CMS, UI-bibliotheek, Supabase SDK of authenticatielaag nodig voor deze ene publieke inschrijving.
- Dit voorstel wijzigt uitsluitend planbestanden. Branches, applicatiecode, database en productiehosting worden pas bij expliciete uitvoering gewijzigd.
