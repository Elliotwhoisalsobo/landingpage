# LexFlow landingpage

Nuxt 4 / Vue 3-landingspagina voor **loontransparantie**, **ziekteverzuim**, **langdurige afwezigheid** en **re-integratie**. Gewone CSS, strikte TypeScript en Phosphor-iconen; geen Tailwind of UI-framework.

## Ontwikkelen

Vereist Node **24 LTS** en npm. De runtimeversie staat in `.nvmrc`.

```sh
npm ci
cp .env.example .env
npm run dev
```

Vul de echte publieke Supabase-instellingen in `.env` in. Overschrijf een bestaand lokaal `.env`-bestand niet. Open de URL die Nuxt toont, normaal `http://localhost:3000`.

| Commando | Doel |
|---|---|
| `npm run dev` | Lokale ontwikkelserver |
| `npm run typecheck` | Strikte TypeScript-/Vue-controle |
| `npm test` | Wachtlijsttests met gemockte aanvragen, zonder productiedata |
| `npm run build` | Standaard Nuxt-productiebuild |
| `npm run generate` | Statische site in `.output/public` |
| `npm run build -- --preset github_pages` | Statische Pages-build in `.output/public` |
| `npm run preview` | Laatste build lokaal bekijken |

## Configuratie

Configuratie blijft apart van de componenten in `.env`:

```dotenv
NUXT_PUBLIC_SUPABASE_URL="https://jouw-project.supabase.co"
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
```

`.env` is genegeerd; `.env.example` bevat uitsluitend placeholders. Nuxt leest de waarden via `runtimeConfig.public` en `useRuntimeConfig()`. Deze publieke URL en publishable key zijn zichtbaar in de browser. **Gebruik nooit secret- of service-role-keys.**

De statische site neemt de waarden tijdens de build over: na een configuratiewijziging is een nieuwe build en deployment nodig. Ontbrekende configuratie levert een foutmelding op, nooit een fictieve inschrijving.

Het formulier verstuurt rechtstreeks een POST naar Supabase `email_list`, met `email` en optioneel `company`. De publishable key gaat uitsluitend in `apikey`. De bestaande grants en RLS moeten anonieme inschrijvingen toestaan en inzage in bestaande inschrijvingen verhinderen. Er worden geen databasewijzigingen uitgevoerd door deze repository.

## Structuur

- `app/pages/index.vue`: paginaopbouw en metadata.
- `app/components/`: wachtlijst, contextkaarten, productoverzicht en makerintroductie.
- `app/assets/css/main.css`: bestaande vormgeving, formulierstyles en responsieve regels.
- `app/utils/waitlist.ts`: validatie en getypeerde wachtlijstaanvraag.
- `app/plugins/analytics.client.ts`: bestaande Google Analytics-integratie, uitsluitend in de browser.
- `public/`: domeinbestand en `.nojekyll` voor statische hosting.
- `tests/waitlist.test.ts`: netwerkvrije functionele controles.
- `openspec/`: plannen en voortgang; het afzonderlijke product-MVP is niet onderdeel van deze landingpage.

Google Fonts en de bestaande Phosphor-webstylesheet worden extern geladen. Context- en productkaarten staan op kleine schermen onder elkaar; desktop blijft zoals de legacy-versie.

## Herkomst

Gestart met het officiële [`nuxt/starter`-template `v4`](https://github.com/nuxt/starter/tree/v4):

```sh
npm create nuxt@latest <lege-tijdelijke-map> -- -t v4 --no-install --no-gitInit --packageManager npm
```

De starter leverde Nuxt 4.5.2, Vue 3.5.43 en Vue Router 5.3.1. `package-lock.json` legt de installatie vast. TypeScript 5.9.3 is vastgezet voor compatibiliteit met vue-tsc 3.3.12.

## Publicatie en veiligheidsblokkade

De migratie staat voorlopig op `migration/nuxt`. **Productiepublicatie is bewust geblokkeerd** in afwachting van dependencybeoordeling, bevestiging van Supabase-grants/RLS en een gecontroleerde echte testinschrijving. De huidige live Pages-bron is nog `frontpage`; de standaardbranch is nog `master`.

`.github/workflows/deploy.yml` bouwt en test migratie-/main-pushes en pull requests. Een pull request of migratiebranch kan nooit publiceren. Publicatie vereist alle volgende voorwaarden:

1. Een geslaagde build op `main`, niet vanuit een pull request.
2. Geldige GitHub Actions-repositoryvariabelen `NUXT_PUBLIC_SUPABASE_URL` en `NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Expliciete vrijgave via repositoryvariabele `PRODUCTION_RELEASE_APPROVED=true` nadat bovenstaande controles zijn afgerond. Laat deze variabele tot dan weg.
4. Pages ingesteld op **GitHub Actions**, met custom domain `lexflow.be` en HTTPS. De website gebruikt base URL `/`.

Controles zonder publieke configuratie bouwen met onbruikbare voorbeeldwaarden; een vrijgegeven productiebuild weigert die waarden. De workflow publiceert alleen `.output/public`, niet de broncode. Het `github-pages`-environment kan aanvullend handmatige goedkeuring vereisen.

De dependency-audit bevat nog upstreammeldingen, waaronder kritieke meldingen in de buildketen. Zie [`verification.md`](openspec/changes/migrate-landingpage-to-nuxt/verification.md) voor de gecontroleerde versies en advisories. Geen ongeteste overrides of geforceerde Nuxt-downgrade toepassen.

## Legacy en terugval

- `legacy`: volledige statische versie inclusief de laatste Bo-tekst en kaartuitlijning, commit `97f371e50864275ccf539891e711b58ea8bf4899`.
- `legacy-live-before-nuxt`: tag op de oorspronkelijke live commit `f7a60c840a55c38d7e42232573c17df02ef4ebfc`.
- De oude HTML-ontwerpalternatieven en uitgeschakelde popupcode blijven beschikbaar op `legacy`.

Bij een mislukte omschakeling: stop de nieuwe deployment, verwijder de publicatievrijgave en herstel Pages-publicatie vanaf `frontpage`, root `/`, met `lexflow.be` en HTTPS. Controleer eerst dat `frontpage` nog naar de vastgelegde live commit wijst; maak anders een herstelbranch vanaf `legacy-live-before-nuxt`. Herbouw Pages en controleer de site. Er is geen force-push of reset van `main` nodig.

De definitieve omschakeling naar `main`, branchbescherming en live controle zijn nog aparte vrijgavetaken in [`tasks.md`](openspec/changes/migrate-landingpage-to-nuxt/tasks.md).
