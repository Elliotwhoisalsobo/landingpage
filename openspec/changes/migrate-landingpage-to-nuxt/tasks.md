# Tasks

## 1. Huidige versie en terugval veiligstellen

- [x] 1.1 Vernieuw remoteverwijzingen en controleer `git status`, de lokale diff en het bestaan van `legacy`, `migration/nuxt` en `main`; leg de begincommit en eventuele naamconflicten vast zonder bestaande branches te overschrijven.
- [x] 1.2 Maak vanuit `frontpage` de branch `legacy`, commit de gecontroleerde bestaande pagina-/CSS-wijzigingen en de plandocumenten, en push; verifieer lokaal en remote dezelfde commit-ID en aanwezigheid van de nieuwe Bo-tekst en links uitgelijnde contextkaarten.
- [x] 1.3 Leg via GitHub de echte standaardbranch, Pages-bron, custom domain en live commit vast; bewaar een aparte terugvalreferentie als de live commit afwijkt van `legacy` en noteer concrete herstelstappen.
- [x] 1.4 Maak `migration/nuxt` vanuit de geverifieerde legacy-commit; controleer dat de werkboom schoon is en `legacy` ongewijzigd blijft.

## 2. Officiële Nuxt-basis

- [x] 2.1 Genereer in een lege tijdelijke map het officiële `nuxt/starter`-template met `npm create nuxt@latest <map> -- -t v4`; registreer template en versies en neem de basis over in de repositoryroot zonder `.git`, OpenSpec of lokale instellingen te vervangen.
- [x] 2.2 Leg Node 24 LTS, npm, package-lock en strikte TypeScript vast; voeg `typecheck` toe en verifieer een schone `npm ci`, `npm run typecheck` en `npm run build`.
- [x] 2.3 Werk `.gitignore` bij voor dependencies, Nuxt-output en lokale env-bestanden, met uitzondering voor `.env.example`; controleer met `git check-ignore` dat broncode/voorbeeld wel en `.env`/buildoutput niet gecommit worden.

## 3. Pagina en vormgeving migreren

- [x] 3.1 Maak `app.vue`, `pages/index.vue` en de vier sectiecomponenten uit het ontwerp; behoud content, IDs, links en beide productmodules, herstel de ongeldige HTML-nesting en verifieer dat Vue zonder templatefouten bouwt.
- [x] 3.2 Verplaats actieve globale en inline CSS naar `app/assets/css/main.css`; verifieer de oorspronkelijke desktoplayout, gecentreerde hero, links uitgelijnde contextkaarten en de goedgekeurde mobiele correctie (kaarten onder elkaar, geen afgesneden titels) zonder CSS-frameworkdependencies.
- [x] 3.3 Behoud Phosphor en de bestaande fonts, vervang het decoratieve hand-emoji en herstel zichtbare formulierfocus; verifieer iconen, toetsenbordbediening, labels, live-status en reduced-motion-weergave.
- [x] 3.4 Zet titel, beschrijving, canonieke URL en Nederlandse documenttaal in Nuxt-headbeheer en analytics in een client-only plugin; controleer gegenereerde HTML, één analyticsinitialisatie en afwezigheid van SSR-/hydrationfouten.

## 4. Wachtlijst en afzonderlijke configuratie

- [x] 4.1 Maak `.env.example` en `runtimeConfig.public` voor Supabase; configureer lokale waarden buiten componenten en verifieer dat de geproduceerde site geen `config/supabase-config.js` of `window.SUPABASE_*` meer nodig heeft.
- [x] 4.2 Migreer het formulier naar Vue-state en een kleine getypeerde wachtlijstfunctie met native `fetch`; verifieer de bestaande payload en meldingen, correcte `apikey`-header, geen publishable key als Bearer-token, behoud van invoer bij fouten en geen dubbele POST tijdens laden.
- [x] 4.3 Voeg één uitvoerbare Node-test toe en verbind die met `npm test`; laat die daadwerkelijk gebruikte logica controleren voor validatie, optionele bedrijfsnaam, succes, `23505`, overige conflicten, niet-JSON-fouten, netwerkfout en ontbrekende configuratie, zonder live netwerkverkeer.
- [x] 4.4 Laat bestaande Supabase-grants/RLS controleren op toegestane inschrijving en ontoegankelijke bestaande gegevens; leg de controle vast en blokkeer publicatie bij onduidelijke/onveilige rechten in plaats van databasewijzigingen stilzwijgend uit te voeren.

## 5. Build, deployment en documentatie

- [x] 5.1 Voeg `public/CNAME` en `public/.nojekyll` toe en bouw met `npm run build -- --preset github_pages`; verifieer domeinbestanden, HTML en assets in `.output/public` met base URL `/`.
- [x] 5.2 Maak een GitHub Actions-workflow met npm-ci, typecontrole, tests, Pages-build en artifactpublicatie; stel publieke configuratie expliciet in, beperk productiepublicatie tot `main`, gebruik minimale Pages/OIDC-rechten en deploymentconcurrency, en verifieer dat een migratie-/PR-run alleen controles uitvoert.
- [x] 5.3 Werk README bij met starterherkomst, Node-versie, npm-commando's, afzonderlijke configuratie, statische herbouw en terugvalprocedure; controleer dat verwijzingen naar demo-localStorage en handmatige configscriptdeployment verdwenen zijn.
- [x] 5.4 Verwijder uitsluitend de vervangen root-HTML/JS/CSS/configbestanden, oude ontwerpalternatieven en uitgeschakelde popupcode uit de nieuwe branch; controleer dat zij via `legacy` beschikbaar blijven en dat `openspec/changes/pay-transparency-mvp/` ongewijzigd is.

## 6. Eindcontrole en omschakeling

- [x] 6.1 Voer vanuit een schone installatie `npm run typecheck`, `npm test`, `npm run build`, `npm run generate` en de Pages-build uit; noteer resultaten en controleer op ontbrekende configuratie, assets en onverwachte dependencies.
- [x] 6.2 Vergelijk legacy en gegenereerde Nuxt-site op mobiel, tablet en desktop; verifieer content/uitlijning, toetsenbordfocus, formulierstatus en foutpaden, bestaande links en een schone browserconsole. Controleer met een afgesproken testadres een echte inschrijving en laat de eigenaar opslag bevestigen.
- [x] 6.3 Maak na goedkeuring `main` op de gevalideerde migratiecommit, push zonder force en stel standaardbranch/bescherming/vereiste checks in; verifieer dat `legacy` en bestaande branches intact zijn. Laat ontbrekende beheeracties expliciet door de eigenaar uitvoeren.
- [x] 6.4 Zet Pages op Actions, publiceer uitsluitend de gecontroleerde artifact en verifieer op `https://lexflow.be` HTTPS, layout, assets, metadata, analytics en wachtlijst; gebruik bij regressies de vastgelegde terugvalprocedure en markeer de migratie pas na geslaagde live controle voltooid.
