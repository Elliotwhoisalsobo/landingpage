# 02 — Concrete methodes: hoe je een bron hoger krijgt

De constructieve toolkit uit de papers, vertaald naar de context van een advocatenkantoor. Dit is de legitieme spelruimte (zie `04-ethiek-deontologie.md` voor wat afvalt).

## A. GEO: negen content-methodes met score

GEO (KDD 2024) testte negen methodes op 10.000 queries. Score = Position-Adjusted Word Count (hoger = beter; basislijn zonder optimalisatie = **19,3**).

```
  Scorende methodes (doen):
  -------------------------------------------------
  Quotation Addition      27.8   citaten uit geloofwaardige bron
  Statistics Addition     25.9   cijfers i.p.v. kwalitatief beweren
  Fluency Optimization    25.1   vlotter, leesbaarder taalgebruik
  Cite Sources            24.9   bronvermeldingen toevoegen
  Technical Terms         23.1   vaktermen (juridisch: wetsartikelen,
                                 arresten, specialismen)
  Easy-to-Understand      22.2   ingewikkelde taal versimpelen
  Authoritative           21.8   overtuigende, gezaghebbende toon
  ---- basislijn 19.3 ----
  Niet-scorende (doen pijn):
  Keyword Stuffing        17.8   oude SEO-truc werkt NIET meer
  Unique Words            17.7   zeldzame woorden strooien helpt niet
```

### Les die meteen opvalt

**Keyword stuffing werkt niet meer bij generatieve engines — het doet pijn.** Het oude SEO-instinct ("stop er zoveel mogelijk zoekwoorden in") is hier contraproductief. Dit is het belangrijkste verschil met klassiek SEO en het eerste misverstand dat je bij een klant moet wegnemen.

### Vertaald naar een advocaat

| Methode | Concrete actie voor een kantoor |
|---|---|
| Quotation Addition | Citeer uitspraken/arresten waarnaar je je beroept, met naam en datum. |
| Statistics Addition | "In 2024 behandelde ik 37 dossiers in dit specialisme." (mits waar en toegestaan) |
| Fluency Optimization | Geen jargon-muren; korte, heldere zinnen. |
| Cite Sources | Verwijs naar wetsartikelen, baliebronnen, erkende directories. |
| Technical Terms | Gebruik de juiste juridische vaktermen — dat is juist het signaal dat AI zoekt. |
| Easy-to-Understand | Leg naast de vakterm in gewone taal uit wat je doet. |
| Authoritative | Spreek met gezag, niet wervend — past bij de balietoorn. |

## B. CORE: drie soorten optimalisatie-content

CORE (2026) bereikt 80,3% Top-1 door **content toe te voegen** aan de tekst die de engine ophaalt. Drie families:

1. **String-based** — korte, gerichte tekstfragmenten aan het item toevoegen.
2. **Reasoning-based** — redenerende zinnen die het LLM helpen begrijpen waarom dit item past bij de vraag.
3. **Review-based** — beoordelingen/referenties toevoegen die het item sociaal schalen.

In een advocatencontext vertaalt zich dat naar:

- **String-based**: een heldere specialisme-zin bovenaan elke profielpagina ("Gespecialiseerd in personen- en familierecht in [stad].").
- **Reasoning-based**: uitleggen *waarom* dit kantoor past bij de typische cliëntvraag ("Omdat familiescheiding emotioneel en financieel is, combineren we juridische en menselijke begeleiding.").
- **Review-based**: gestructureerde referenties/cliëntgetuigenissen op platforms die de engine ophaalt (let op deontologische grenzen — geen vergelijkende claims, geen succespercentages).

## C. De twee fasen samengebracht

```
  FASE 1 — erin komen (retrieval):
    - klassiek SEO blijft nodig: vindbaarheid in Google/Bing
    - structuur: duidelijke URL's, titels, schema.org markup
    - aanwezigheid op meerdere crawl-bare bronnen (zie 03-obstakels)

  FASE 2 — eruit springen (synthesis):
    - GEO 7 scorende methodes hierboven
    - CORE 3 content-types hierboven
    - doel: hogere Position-Adjusted Word Count
```

## Bronverwijzing

Zie `05-bronnen.md`. Scores en methodes uit GEO §2.2.2 + §3.3; CORE-types uit §1 en §3.4.
