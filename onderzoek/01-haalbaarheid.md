# 01 — Technische haalbaarheid: advocaten hoger in AI-antwoorden

> Onderzoeksvraag: kan je een advocaat consequent hoger laten verschijnen in de antwoorden die AI-bots (ChatGPT, Perplexity, Gemini, Claude, Grok, Bing Copilot) geven als een cliënt om een advocaat vraagt?

## Korte conclusie

**Ja, technisch haalbaar en meetbaar.** Vijf peer-reviewed papers (2024–2026) bewijzen dat de zichtbaarheid van een bron in generatieve-engine-antwoorden systematisch te beïnvloeden is. De sterkste resultaten:

- **GEO** (KDD 2024): tot **+40% zichtbaarheid** via content-optimalisatie.
- **CORE** (feb 2026): **80,3% → Top-1**, 86,6% → Top-3, 91,4% → Top-5, getest op GPT-4o, Gemini-2.5, Claude-4 en Grok-3.

## De twee fasen — waar je kunt ingrijpen

Generatieve engines werken in twee stappen. Begrijp welke stap je beïnvloedt:

```
   cliëntvraag
       |
       v
+-------------------+        1. RETRIEVAL  (zoeken)
|  zoekmachine      |        Welke bronnen worden opgehaald?
|  (Google/Bing)    |        -> traditionele SEO heft hierop
+-------------------+            top-N bronnen (vaak top-5)
       |
       v
+-------------------+        2. SYNTHESIS  (samenvatten/rangen)
|  LLM              |        In welke volgorde, hoe uitgebreid,
|  (GPT/Gemini/...) |        worden ze in het antwoord genoemd?
+-------------------+            -> GEO / CORE heffen hierop
       |
       v
   antwoord met bronvermeldingen
```

**Belangrijk inzicht uit CORE (2026):** de uiteindelijke ranking wordt sterk bepaald door de **initiële retrieval-volgorde** — zelfs na LLM-herordening. Dat betekent: je moet eerst in de opgehaalde bronnen zitten (fase 1), en daarna optimaliseer je hoe je eruit springt (fase 2). Beide fasen tellen.

## Bewijs per paper

| Paper | Jaar/venue | Hoofdclaim | Relevantie |
|---|---|---|---|
| GEO | KDD 2024 | Eerste creator-centric framework; +40% zichtbaarheid; 9 methodes op 10K queries | De constructieve toolkit |
| CORE | preprint 2026 | 80,3% Top-1 via toegevoegde optimalisatie-content (string/reasoning/review) | Bewijst dat synthese-fase beïnvloedbaar is |
| RAF | ACL 2026 | Natuurlijke taal-perturbaties promoveren target-item; cross-model transfer | Bewijst dat het ook subtiel/onschuldig kan |
| Ranking Manipulation | EMNLP 2024 | Tree-of-attacks werkt; transfereert naar perplexity.ai | Bewijst haalbaarheid op productiesystemen |
| Adversarial SEO | ICLR 2025 | Preference Manipulation Attacks op Bing & Perplexity; Microsoft bouwde verdediging | Bewijst dat het in het wild werkt — én dat engines terugslaan |

## Hoe meet je of het werkt?

GEO definieert zichtbaarheidsmaten die verder gaan dan "eerste zijn" (zie paper):

- **Position-Adjusted Word Count**: combinatie van hoeveel woorden over jou en op welke positie in het antwoord.
- **Subjective Impression**: relevantie, invloed, uniekheid, follow-up-waarschijnlijkheid van de vermelding.

Voor LexFlow betekent dit: een scan moet dezelfde vraag meerdere keren (temperature > 0) herhalen, de vermelding van het kantoor meten op positie + lengte + relevantie, en dat vergelijken voor/na optimalisatie. Dat is de meetbare proof-of-value.

## Voorwaarden en risico's

- **Engines verdedigen zich.** ICLR 2025 meldt dat Microsoft na verantwoorde openbaring extra beschermingen bouwde. Methodes die vandaag werken kunnen morgen verzwakken — dus geen eenmalige truc, maar een herhaalbare meting.
- **Domein-specifiek.** GEO stelt vast dat effectiviteit per domein verschilt; wat voor e-commerce werkt is niet automatisch wat voor juridische diensten werkt. Er is een domein-specifieke afstelling nodig.
- **Zie 04-ethiek-deontologie.md** voor de grens tussen constructief (toelaatbaar voor advocaten) en adversarieel (deontologisch uitgesloten).

## Bronverwijzing

Zie `05-bronnen.md` voor volledige citaties en locatie van elke paper.
