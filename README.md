# LexFlow landing page

LexFlow bouwt aan software voor **loontransparantie**, **opvolging van langdurige afwezigheid** en **re-integratie**. Deze repository bevat de statische landing page waar bezoekers zich kunnen inschrijven voor de wachtlijst.

## Inhoud

| Bestand / map | Omschrijving |
|---|---|
| `index.html` | Semantische paginastructuur en content |
| `styles.css` | Vormgeving, layout en responsive regels |
| `script.js` | Formuliervalidatie en wachtlijstinschrijving |
| `config/` | Configuratie (voorbeeld + genegeerd echt bestand) |
| `openspec/` | OpenSpec specificaties en wijzigingen |

## Gebruik

Open `index.html` in een browser. Voor lokale ontwikkeling volstaat een statische server:

```bash
npx serve .
```

of gelijkwaardig.

## Configuratie

Kopieer `config/supabase-config.example.js` naar `config/supabase-config.js` en vul de Supabase-gegevens in:

```js
window.SUPABASE_URL = "https://jouw-project.supabase.co";
window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

Zonder configuratie werkt het formulier in demo-modus: inschrijvingen worden lokaal opgeslagen in `localStorage` onder de sleutel `lexflow_waitlist_demo`.

## Aanpassen

Visuele waarden (kleuren, lettertypes) staan als CSS-variabelen bovenaan `styles.css`. Responsive breekpunten staan onderaan hetzelfde bestand. De pagina gebruikt Google Fonts (DM Sans, Libre Caslon Display, Atkinson Hyperlegible) en Phosphor iconen; daarvoor is een internetverbinding nodig.

## Projectstatus

Dit project is in ontwikkeling. De landing page toont de twee geplande productmodules:

1. **Loontransparantie** (Fase 1) — compliance, analyse en rapportering
2. **Langdurige afwezigheid** (Fase 2) — dossiers, termijnen en re-integratie

## Licentie

Alle rechten voorbehouden. Zie [LICENSE](LICENSE) voor details.