# Design

## Context

Zie `proposal.md` voor de motivatie. De huidige branch is `frontpage` op `f7a60c8`; `index.html` en `styles.css` bevatten lokale wijzigingen die bij de migratie behouden moeten blijven. De lokale remoteverwijzing voor de standaardbranch wijst naar `master`, maar de daadwerkelijke GitHub Pages-bron is niet gecontroleerd. Een eerdere bewering dat Pages zeker vanaf `master` publiceert is dus geen vastgesteld feit.

De site heeft één actieve landingspagina, een wachtlijstformulier met rechtstreekse REST-POST naar Supabase `email_list`, Google Analytics, Google Fonts en Phosphor-webiconen. Het formulier accepteert een verplicht e-mailadres en optionele bedrijfsnaam. De README noemt nog een lokale demo-opslag die in de huidige code niet meer bestaat. Er zijn zes losse ontwerpalternatieven en uitgeschakelde popupcode. Er is een extra afsluitende `div` in de HTML en de paginatitel is uitgecommentarieerd; de Vue-overzetting moet geldige markup en metadata krijgen.

## Goals / Non-Goals

**Goals:**
- Een onderhoudbare Nuxt-app met dezelfde herkenbare pagina en werkende inschrijving.
- Reproduceerbare installatie, typecontrole, tests, build en statische publicatie.
- Een verifieerbare legacy-momentopname en veilige overgang naar `main` zonder geschiedenisherschrijving.

**Non-Goals:**
- Geen redesign, vertaling van website-inhoud, nieuwe productpagina's of uitvoering van `pay-transparency-mvp`.
- Geen SSR-server in productie, authenticatie, backend, databasewijzigingen, CMS, Pinia of generieke componentbibliotheek.
- Geen Tailwind, Bootstrap, Nuxt UI, Sass of CSS-in-JS.

## Decisions

### 1. Officieel Nuxt 4-template, geen handgemaakte starter

Gebruik het officiële `v4`-template uit `nuxt/starter`:

```sh
npm create nuxt@latest <lege-tijdelijke-map> -- -t v4
```

Genereer buiten de bestaande bronbestanden in een gecontroleerde tijdelijke map. Kopieer daarna de templatebestanden naar de root van de migratiebranch, zonder `.git`, lokale agentinstellingen of `openspec/` te vervangen. Neem geen tweede repository of geneste Nuxt-app over. Registreer de gebruikte Nuxt-versie en commit `package-lock.json`.

Gebruik Node 24 LTS, npm en de gegenereerde Nuxt 4 TypeScript-configuratie met expliciete strikte controle. Behoud `build`, `dev`, `generate`, `preview` en `postinstall` van de starter. Voeg `typecheck` met `nuxt typecheck` en de noodzakelijke TypeScript/vue-tsc-devdependencies toe.

Alternatief: handmatig package.json opstellen. Afgewezen: de officiële starter is expliciet gevraagd en voorkomt afwijkende basisconfiguratie.

### 2. Kleine, conventionele projectstructuur

```text
app/
  app.vue
  pages/index.vue
  components/
    WaitlistForm.vue
    ContextCards.vue
    ProductShowcase.vue
    AboutBo.vue
  assets/css/main.css
  utils/waitlist.ts
  plugins/analytics.client.ts
public/
  CNAME
  .nojekyll
nuxt.config.ts
tsconfig.json
package.json
package-lock.json
.env.example
tests/waitlist.test.ts
.github/workflows/deploy.yml
openspec/
```

`app.vue` bevat `NuxtPage`; `pages/index.vue` ordent de bestaande branding, achtergrond, hero en secties. Splits op functionele secties, niet op ieder tekstblok of icoon. Gebruik `<script setup lang="ts">`, Vue-state en `v-model` in plaats van DOM-query's en handmatige eventlisteners. `utils/waitlist.ts` bevat uitsluitend de kleine getypeerde aanvraag-/validatielogica die de echte component én de test gebruiken; geen API-clientlaag of repositorypatroon.

Geen extra layout voor één pagina. De branch `feature/product-paginas` wordt niet stilzwijgend meegemigreerd.

### 3. Bestaande vormgeving met gewone CSS

Verplaats de actieve CSS en inline formulierstyles naar `app/assets/css/main.css`, geladen via Nuxt-configuratie. Behoud CSS-variabelen, lettertypen, breekpunten, reduced-motion-regels en de huidige uitlijning. Geen omzetting naar utilityklassen of CSS-preprocessor. Houd de eerste migratie bij één stylesheet om onbedoelde cascadeveranderingen te vermijden.

Tijdens de browsercontrole bleek dat de legacy-kaarten op mobiel tekst afsnijden. De gebruiker heeft een minimale correctie goedgekeurd: onder 761px krijgen context- en productkaarten één kolom en mogen lange kaarttitels afbreken. Desktop blijft gelijk; dit is geen algemeen redesign.

Behoud de huidige Phosphor-webstylesheet; geen extra icoonpakket nodig. Vervang het hand-emoji in de gemigreerde makercomponent door een bestaand Phosphor-handicoon of verwijder het dubbele decoratieve icoon. Herstel zichtbare toetsenbordfocus op de formuliervelden, behoud labels en live-statusmeldingen.

### 4. Supabase-configuratie apart, integratie minimaal

Vervang `config/supabase-config.js` door lokale `.env`-waarden en een gecommitteerde `.env.example` met placeholders:

```dotenv
NUXT_PUBLIC_SUPABASE_URL="https://jouw-project.supabase.co"
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
```

Declareer `runtimeConfig.public.supabaseUrl` en `runtimeConfig.public.supabasePublishableKey` in `nuxt.config.ts`; componenten gebruiken `useRuntimeConfig()`. Negeer `.env` en varianten, behalve het voorbeeld. Bij statische generatie worden publieke waarden tijdens de build ingebakken: een wijziging vereist een nieuwe build/deployment. GitHub Actions krijgt deze waarden als expliciete repository-/omgevingsvariabelen. Gebruik nooit een secret- of service-role-key.

Behoud native `fetch`, dezelfde tabel en `{ email, company? }`. De publishable key hoort in `apikey`, niet als JWT in `Authorization: Bearer`. Behoud succes, ongeldig e-mailadres, bestaande inschrijving (`409` met `23505`), foutmelding en laadstatus. Houd formuliergegevens bij fouten vast, voorkom dubbele verzending en verstuur nooit tijdens SSR/prerendering. Ontbrekende configuratie moet een duidelijke fout opleveren, geen schijnsucces via lokale opslag.

Controleer vóór publicatie dat de bestaande grants/RLS anonieme inschrijvingen toestaan zonder bestaande inschrijvingen openbaar leesbaar te maken. De lokale repository bevat geen verifieerbare databasepolicies; deze mogen niet als veilig aangenomen worden. Eventuele noodzakelijke databasecorrecties vereisen afzonderlijk afgestemde scope. Geen SDK of Nuxt-Supabase-module nodig voor één POST.

### 5. Vooraf gerenderde HTML op statische hosting

Behoud SSR tijdens de build en genereer statische HTML; zet de app niet onnodig op `ssr: false`. Dit houdt zichtbare content en metadata beschikbaar zonder client-JavaScript. Gebruik `useSeoMeta`/`useHead` voor titel, beschrijving, canonieke URL, `lang="nl"` en de bestaande fonts. Analytics initialiseert één keer via een client-only plugin met het bestaande meet-ID; geen nieuw analyticsproduct of trackinggedrag.

De voorkeursdeployment is GitHub Pages via Actions. `npm run build -- --preset github_pages` bouwt de productieartifact in `.output/public`. Behoud ook `npm run generate` voor lokale statische controle. Zet Pages op GitHub Actions en publiceer alleen een gevalideerde push naar `main`; pull requests krijgen checks maar geen productiepublicatie.

Behoud `lexflow.be` als custom domain en `app.baseURL: "/"`. Plaats `CNAME` en `.nojekyll` in `public/` zodat ze meegaan in de artifact. Controleer Pages custom-domaininstellingen en HTTPS afzonderlijk: alleen een CNAME-bestand bewijst niet dat die instellingen kloppen. Gebruik een ondersteunde Node-versie in de workflow, niet blind de oudere Node-versie uit een documentatievoorbeeld.

### 6. Gerichte verificatie

Gebruik één kleine test met Node `node:test` en gemockte `fetch` op Node 24 voor de daadwerkelijke getypeerde wachtlijstlogica. Test valide/ongeldige invoer, optionele bedrijfsnaam, succesvolle POST, `23505`, overige conflicten, niet-JSON-fouten, netwerkfout en ontbrekende configuratie. Geen echt Supabase-verkeer in CI.

Daarnaast: `npm ci`, `npm run typecheck`, `npm test`, `npm run build` en de Pages-build. Controleer de geproduceerde HTML, assets, metadata en domeinbestanden. Vergelijk lokaal de legacy- en Nuxt-weergave op mobiel, tablet en desktop; verifieer formulierfocus, statusmeldingen, dubbele verzending, afwezigheid van hydrationfouten en oude configscript-404's. Een echte inschrijving uitsluitend met een afgesproken testadres en verificatie door de projecteigenaar.

## Risks / Trade-offs

- Niet-gecommitte werk gaat verloren → bekijk de diff, commit alleen de bedoelde wijzigingen en controleer de gepushte `legacy` vóór vervanging.
- Verkeerde live branch verondersteld → leg de werkelijke Pages-bron, deployment en live commit vast via GitHub voordat instellingen wijzigen.
- Overgenomen HTML/CSS geeft visuele verschillen → herstel ongeldige nesting en vergelijk de gerenderde pagina; behoud de bestaande CSS-cascade.
- Publieke configuratie wordt als geheim behandeld → documenteer dat `runtimeConfig.public` zichtbaar is en RLS/grants de toegang begrenzen.
- Build draait, maar wachtlijst schrijft niet → voer mocktests én een gecontroleerde integratiecheck uit; typecontrole alleen is onvoldoende.
- Wijziging van `.env` heeft geen effect op live statische site → documenteer en test dat herbouw nodig is.
- Nuxt voegt JavaScript en buildonderhoud toe → geen extra modules of generieke abstraheringen; statische HTML blijft de basis.
- De gebruiker vraagt Engels, terwijl de actieve projectinstructies Nederlands voorschrijven → dit plan en nieuw toegevoegde documentatie blijven Nederlands totdat de projectregel wordt aangepast; websitevertaling hoort niet bij deze migratie.

## Migration Plan

1. Vernieuw remoteverwijzingen en controleer namen `legacy`, `migration/nuxt` en `main` lokaal én remote. Bij bestaande afwijkende branches: stop en overleg, niet overschrijven.
2. Bekijk de bestaande lokale wijzigingen. Maak op een nieuwe `legacy`-branch vanuit `frontpage` een gecommitteerde momentopname inclusief de Bo-tekst en kaartuitlijning. Bewaar de plandocumenten eveneens in Git. Push `legacy` en verifieer de commit-ID. Laat bestaande branches en geschiedenis intact.
3. Noteer de huidige defaultbranch, Pages-configuratie en daadwerkelijke live commit. Als de live versie afwijkt van `legacy`, bewaar ook die commit als terugvalreferentie, zodat terugdraaien niet onverwacht een andere site publiceert.
4. Maak `migration/nuxt` vanuit de vastgelegde legacy-momentopname. Genereer de officiële starter en migreer de actieve pagina; behoud OpenSpec en projectinstructies. Verwijder alleen vervangen of bewust legacy-only bestanden van deze branch.
5. Voeg checks en buildworkflow toe; test de statische artifact zonder de live site om te schakelen. Tot goedkeuring blijft de bestaande deployment actief.
6. Na geslaagde controles: maak `main` op de gevalideerde migratiecommit en push zonder force. Stel GitHub-defaultbranch, bescherming en vereiste checks in op `main`; wijzig Pages naar Actions en publiceer de artifact. Als beheerrechten ontbreken, laat deze beheeracties expliciet door de eigenaar uitvoeren.
7. Controleer `https://lexflow.be`, HTTPS, assets, analytics en wachtlijst. Markeer de omschakeling pas voltooid na deze controle. Ruim oude branchverwijzingen niet automatisch op.
8. Terugval: stop de nieuwe publicatierun en herstel de vastgelegde eerdere Pages-instellingen/bron, of publiceer de statische bestanden van de bewaarde live commit als Pages-artifact. Geen reset of force-push van `main` nodig. `legacy` blijft beschikbaar als bronreferentie en afzonderlijke terugvalversie.

## Bronnen

- Officiële starter en templatekeuze: https://github.com/nuxt/starter/tree/templates
- Nuxt 4-template: https://github.com/nuxt/starter/tree/v4
- Installatie: https://nuxt.com/docs/4.x/getting-started/installation
- GitHub Pages: https://nuxt.com/deploy/github-pages
- Publieke configuratie: https://nuxt.com/docs/4.x/guide/going-further/runtime-config
- Supabase API-keys en headers: https://supabase.com/docs/guides/api/api-keys
