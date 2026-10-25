# Uitvoeringscontroles

## Begin en terugval

- Beginbranch: `frontpage`, commit `f7a60c840a55c38d7e42232573c17df02ef4ebfc`.
- Geen naamconflicten na `git fetch origin` voor `legacy`, `migration/nuxt` of `main`.
- Lokale pagina-/CSS-wijzigingen en plan bewaard en gepusht op `legacy`: `97f371e50864275ccf539891e711b58ea8bf4899`. Lokale en remote commit-ID gecontroleerd.
- `migration/nuxt` aangemaakt vanuit deze commit met schone werkboom; `legacy` blijft ongewijzigd.
- GitHub API met bestaande Git-aanmelding bevestigt beheerrechten.
- Oorspronkelijke standaardbranch: `master`.
- Oorspronkelijke Pages-configuratie: `build_type: legacy`, bron `frontpage`, pad `/`, custom domain `lexflow.be`, HTTPS afgedwongen.
- Laatste geslaagde live build: `f7a60c840a55c38d7e42232573c17df02ef4ebfc`.
- Gepushte tag `legacy-live-before-nuxt` bewaart precies die live commit, los van de recentere legacy-momentopname.

## Bevestigde uitvoeringskeuzes

- De gebruiker koos tijdens uitvoering: lokaal verderwerken, productiepublicatie blokkeren totdat de dependencyrisico's expliciet beoordeeld zijn.
- De gebruiker controleert zelf Supabase-grants/RLS en geeft later toestemming en een testadres voor de echte inschrijving. Tot dan uitsluitend mocktests; geen productiedata benaderen of wijzigen.
- De officiële `v4`-starter is via `create-nuxt@4.0.0` gegenereerd. Nuxt 4.5.2, Vue 3.5.43 en Vue Router 5.3.1 komen rechtstreeks uit die starter.
- Node 24.11.1 en npm 11.6.2 zijn lokaal beschikbaar.
- `vue-tsc@3.3.12` is niet compatibel met de automatisch geselecteerde TypeScript 7.0.2. TypeScript 5.9.3 is expliciet vastgezet en `npm run typecheck` slaagt daarmee.
- `npm audit` meldt 11 hoge meldingen in de dependencyketen, met twee onderliggende advisories: `braces <=3.0.3` (GHSA-vfj7-8cjw-p6xm) en `node-forge <=1.4.0` (GHSA-86w9-cpqp-85rv). De registry biedt op dit moment geen nieuwere versies van deze pakketten. Een `npm audit fix --dry-run` lost de meldingen niet op. Geen force-fix of ongeteste override toegepast. Deze pakketten zitten in de build-/ontwikkelketen; dit is geen verklaring dat de volledige keten veilig is.

## Aanvullende controles na hervatting

- De registry meldt inmiddels ook kritieke kwetsbaarheden in `simple-git` en `@simple-git/argv-parser` (onder meer GHSA-x6jw-m9v5-85vh en GHSA-v5rq-49vh-5v5c). De huidige audit telt 14 meldingen: 8 hoog en 6 kritiek, inclusief afgeleide meldingen. De door npm voorgestelde force-oplossing zou Nuxt naar 3.7.4 terugzetten; niet uitgevoerd. De publicatieblokkade blijft actief.
- Node-types zijn afgestemd op de gebruikte runtime: `@types/node@24` in plaats van automatisch geselecteerde Node 26-types.
- De eerste browservergelijking gaf dezelfde sectieposities/-breedtes, koppen en links op 320, 390, 768 en 1440px. Geen hydration- of JavaScriptfouten.
- De gebruiker heeft daarna expliciet toestemming gegeven voor de bestaande mobiele fout: context- en productkaarten worden onder 761px onder elkaar gezet, met afbreekbare lange kaarttitels.

## Lokale eindcontrole

- Geslaagd vanuit `npm ci`: `npm run typecheck`, `npm test`, `npm run build`, `npm run generate` en `npm run build -- --preset github_pages`. De gecombineerde eerste opdracht overschreed de terminaltijdslimiet na installatie/typecontrole/tests; de drie builds zijn daarna afzonderlijk opnieuw succesvol uitgevoerd.
- De Node-test voert de daadwerkelijk gebruikte wachtlijstfunctie uit met gemockte `fetch`. Gecontroleerd: e-mailvalidatie, optionele bedrijfsnaam, trimmen, ontbrekende/ongeldige configuratie, weigeren van secret-/JWT-keys, juiste headers, succes, `23505`, overige conflicten, niet-JSON-fouten en netwerkfout.
- Chrome 154 via CDP: vergelijking met de gearchiveerde legacy op 320, 390, 768 en 1440px. Desktop-/tabletsecties, koppen en links komen overeen; mobiel staan de kaarten nu in één kolom zonder interne tekstoverloop.
- Browsercontroles: title, `lang`, canonical, Phosphor-iconen, één analyticsinitialisatie, geen oud configscript, invalid-emailfocus, zichtbare toetsenbordfocus, laadstatus, blokkeren van dubbele verzending, succesreset, behoud van invoer bij duplicaat/server-/netwerkfout en reduced-motion. Geen JavaScript-/hydrationfouten.
- Alle browser-POSTs naar Supabase en analyticsaanvragen zijn onderschept. Geen productiegegevens gelezen of geschreven.
- De Pages-artifact bevat HTML, assets, `CNAME` met `lexflow.be` en `.nojekyll`; de homepage bevat vooraf gerenderde content en geen `window.SUPABASE_*` of configscriptverwijzing.
- Workflow-YAML is geparseerd en de publicatievoorwaarden zijn lokaal gecontroleerd: uitsluitend `main`, geen pull requests en expliciete `PRODUCTION_RELEASE_APPROVED=true`. Deze variabele is niet ingesteld. Geen remote workflow of publicatie uitgevoerd.
- De oorspronkelijke bronbestanden en ontwerpalternatieven zijn alleen van de migratiebranch verwijderd. Beschikbaarheid op `legacy` gecontroleerd; `pay-transparency-mvp` is ongewijzigd.
- De build geeft enkele upstreamwaarschuwingen over ontwikkeltools, Windows-modulepaden en een verouderde exportsnotatie. De builds slagen; de afzonderlijke security-audit blijft een vrijgaveblokkade.

## Bevestiging door de eigenaar en voorbereiding van CI

- De eigenaar heeft expliciet bevestigd dat grants/RLS veilig zijn en een echte inschrijving vanuit de Nuxt-versie correct is opgeslagen. Taken 4.4 en 6.2 zijn op basis van die bevestiging afgerond; de agent heeft de database niet zelfstandig gecontroleerd of gewijzigd.
- De eigenaar gaf toestemming om `migration/nuxt` te pushen en GitHub Actions te controleren, zonder publicatie of wijziging van de standaardbranch.
- De twee publieke Supabase-repositoryvariabelen zijn vanuit de lokale `.env` ingesteld en via de GitHub API op gelijkheid gecontroleerd. Waarden zijn niet gelogd. De publicatievrijgave `PRODUCTION_RELEASE_APPROVED` is afwezig gebleven.
- Vóór de CI-run opnieuw bevestigd: standaardbranch `master`, Pages vanaf `frontpage` root `/`, custom domain `lexflow.be`.

## GitHub CI geslaagd

- `migration/nuxt` is gepusht met commit `e43b7410693c05169e1bf7e07efc55999e874a4c`.
- GitHub Actions-run [37447723055](https://github.com/Elliotwhoisalsobo/landingpage/actions/runs/37447723055) is succesvol afgerond: `npm ci`, typecontrole, mocktests, Pages-build en controle van de statische uitvoer slagen op de Linux-runner.
- Zowel het uploaden van de Pages-artifact als de volledige publicatiejob zijn aantoonbaar overgeslagen. Taak 5.2 is daarmee afgerond.
- De aanvullende lokale `npm run build` schreef `Build complete` in het logbestand, maar de terminalopdracht overschreed de tijdslimiet. Het groene remote CI-resultaat is de bevestigde uitvoeringscontrole voor deze stap.

## Dependencybeoordeling en expliciete vrijgave

- De herhaalde audit van de vastgelegde installatie meldt nog 14 meldingen: 8 hoog en 6 kritiek, inclusief meldingen die door de dependencyketen worden doorgegeven.
- `simple-git@3.36.0` en `@simple-git/argv-parser@1.1.1` komen via Nuxt Devtools binnen. Beschikbare fixes zijn respectievelijk 4.0.2 en 2.0.1, buiten het bereik van de huidige stabiele Devtools 3.4.2. Geen major override of betaversie geïnstalleerd.
- `braces@3.0.3` komt via Nitro/globby/micromatch binnen. De advisory betreft stack-uitputting bij diep geneste, aangeleverde globpatronen. De site biedt bezoekers geen interface om build-globpatronen aan te leveren. De laatst gepubliceerde versie blijft 3.0.3.
- `node-forge@1.4.0` komt via listhen binnen. De advisory betreft RSA-signatuurverificatie. De geobserveerde listhen-aanroepen gebruiken certificaatverwerking voor ontwikkel-HTTPS; de site gebruikt geen eigen Node-HTTPS-server in productie. De laatst gepubliceerde versie blijft 1.4.0.
- Nuxt 4.6.0 is inmiddels beschikbaar, maar behoudt de relevante stabiele Devtools/Nitro-keten en vereist een nieuwere Node 24-patchversie. Het is daarom niet als oplossing voor deze meldingen gepresenteerd of ongecontroleerd geïnstalleerd.
- GitHub Pages publiceert alleen `.output/public`, zonder Node-server of `node_modules`. Dit begrenst de publieke runtimeblootstelling, maar neemt risico's tijdens installatie, ontwikkeling en builds niet weg. Geen algemene veiligheidsclaim of automatische onderdrukking van auditmeldingen.
- De eigenaar koos expliciet **Beperk risico en geef main/publicatie vrij**: resterende builddependencyrisico's zijn voor deze statische site geaccepteerd. Geen vrijgave van database- of productwijzigingen buiten deze migratie.
- Maatregelen: Nuxt Devtools uitgeschakeld en `npm run dev` bindt standaard aan `127.0.0.1`. CI behoudt minimale tokenrechten, geen productiepublicatie vanuit pull requests en uitsluitend publieke Supabase-variabelen.
- Na de maatregelen opnieuw geslaagd: typecontrole, mocktests en `npm run build -- --preset github_pages`. De ontwikkelserver is gestart op testpoort 4175: HTTP 200 en de Windows-socketcontrole bevestigt uitsluitend `127.0.0.1:4175`.
- Bronnen: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm en https://github.com/advisories/GHSA-86w9-cpqp-85rv; pakketversies en afhankelijkheden gecontroleerd via npm-registry en `npm ls`.

## Omschakeling en live controle afgerond

- De aangescherpte configuratie is opnieuw getest op `migration/nuxt`: [CI-run 37461353919](https://github.com/Elliotwhoisalsobo/landingpage/actions/runs/37461353919), commit `2e3f7c3b1449bb389e4b7ebe923a7a705acb787f`.
- `main` is zonder force-push vanuit die geteste commit aangemaakt en gepusht. Ook de eigen [main-CI-run 37461442084](https://github.com/Elliotwhoisalsobo/landingpage/actions/runs/37461442084) is geslaagd voordat publicatie werd vrijgegeven.
- GitHub-standaardbranch is `main`. Branchbescherming vereist de actuele groene check `Typecontrole, tests en statische build` van GitHub Actions (app 15368), ook voor beheerders. Force-pushes en branchverwijdering zijn verboden.
- Het bestaande `github-pages`-environment staat nu ook publicatie vanaf `main` toe; de bestaande branchregels zijn behouden.
- Pages is omgezet naar `build_type: workflow`, met behoud van custom domain `lexflow.be` en afgedwongen HTTPS. De expliciet goedgekeurde repositoryvariabele `PRODUCTION_RELEASE_APPROVED` is op `true` gezet.
- [Productierun 37461709863](https://github.com/Elliotwhoisalsobo/landingpage/actions/runs/37461709863) is volledig geslaagd: installatie, typecontrole, tests, configuratiecontrole, Pages-build, artifactupload en publicatie.
- `https://lexflow.be` levert HTTP 200 met de Nuxt-app en vooraf gerenderde inhoud. De publieke configuratie komt overeen met de lokale gecontroleerde waarden, zonder deze in de logs weer te geven. Zes gerefereerde JavaScript-/CSS-assets leveren HTTP 200 met passende niet-HTML-inhoud.
- De gepubliceerde site is in Chrome gecontroleerd op 320, 390, 768 en 1440px. Desktop/tablet komen overeen met legacy; mobiele kaarten hebben één kolom zonder interne tekstoverloop. Metadata, iconen, één analyticsinitialisatie, focus, laadstatus, dubbele verzending, succes-/foutpaden en reduced motion slagen; geen JavaScript-/hydrationfouten.
- Tijdens deze live browsercontrole zijn Supabase-POSTs en analyticsverkeer gemockt. Geen extra productie-inschrijvingen aangemaakt. De echte opslag- en RLS-controle berust op de eerder expliciet vastgelegde bevestiging van de eigenaar.
- Alle 23 uitvoeringstaken zijn afgerond. De upstreamauditmeldingen blijven zichtbaar en vallen onder de expliciete risicoacceptatie; deze migratie heeft ze niet opgelost.

## Terugvalprocedure

Stop een actieve Nuxt-deployment en verwijder `PRODUCTION_RELEASE_APPROVED` of zet deze op `false`. Herstel GitHub Pages naar publicatie vanaf de branch `frontpage`, root `/`, met custom domain `lexflow.be` en HTTPS. Controleer dat `frontpage` nog naar de vastgelegde live commit verwijst; gebruik anders een nieuwe herstelbranch vanaf `legacy-live-before-nuxt`, zonder bestaande branches terug te zetten. Start de Pages-build opnieuw en controleer de live site. De standaardbranch kan afzonderlijk terug naar `master`; geen force-push of reset van `main` nodig.
