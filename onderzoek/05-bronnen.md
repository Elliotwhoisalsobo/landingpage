# 05 - Bronnen: de vijf papers

Deze vijf papers vormen de onderzoeksbasis. Liggen in `ai-search-optimalisation/onderzoek/`.

## Overzicht

```
ai-search-optimalisation/onderzoek/
├── 2311.09735v3.pdf               GEO (constructief)
├── 2602.03608v1.pdf               CORE (constructief)
├── 2026.acl-long.413.pdf          RAF (aanval)
├── 2024.emnlp-main.534.pdf        Ranking Manipulation (aanval)
└── 6195_Adversarial_Search_Engine.pdf   Adversarial SEO (aanval)
```

## 1. GEO: Generative Engine Optimization

- **Bestand:** `2311.09735v3.pdf`
- **Bron:** Aggarwal e.a. (IIT Delhi / Princeton). KDD 2024.
- **arXiv:** 2311.09735v3, jun. 2024.
- **Hoofdclaim:** Eerste creator-centric framework om zichtbaarheid in generatieve-engine-antwoorden te verhogen. +40% zichtbaarheid. 9 methodes, getest op 10.000 queries (GEO-bench).
- **Mapping naar product:** basis van de constructieve toolkit (`02-methodes-concreet.md`); zichtbaarheidsmaten voor de scan (`01-haalbaarheid.md`).
- **Code/data:** generative-engines.com/GEO

## 2. CORE: Controlling Output Rankings in Generative Engines

- **Bestand:** `2602.03608v1.pdf`
- **Bron:** Jin, Chen, Zhang, Luo, Zeng, Luo, Wang (UIUC e.a.). Preprint, feb. 2026.
- **arXiv:** 2602.03608v1, 3 feb. 2026.
- **Hoofdclaim:** Black-box optimalisatie van de synthese-fase. 3 content-types (string / reasoning / review). 80,3% Top-1, 86,6% Top-3, 91,4% Top-5 op GPT-4o, Gemini-2.5, Claude-4, Grok-3. Benchmark: ProductBench (15 categorieën × 200 producten).
- **Mapping naar product:** bewijst dat synthese-fase beïnvloedbaar is (`01-haalbaarheid.md`); drie content-families voor `02-methodes-concreet.md`; review-based relevantie voor obstakels (`03-obstakels`).

## 3. RAF: Rank Anything First

- **Bestand:** `2026.acl-long.413.pdf`
- **Bron:** Xing, Li, Du, Hu (NUS / USC / Georgetown / Arizona State). ACL 2026 (Long Papers).
- **Hoofdclaim:** Twee-fasen token-optimalisatie (GCG + entropy-gewogen sampling) maakt natuurlijke, moeilijk detecteerbare perturbaties die een target-item promoveren. Cross-model transfer.
- **Mapping naar product:** bewijst dat rangbeïnvloeding subtiel kan - relevant voor de ethische grens (`04-ethiek`): wat technisch elegant is als aanvalsmethode staat aan de verkeerde kant van de lijn voor advocaten.
- **Code:** github.com/glad-lab/RAF

## 4. Ranking Manipulation for Conversational Search Engines

- **Bestand:** `2024.emnlp-main.534.pdf`
- **Bron:** Pfrommer, Bai, Gautam, Sojoudi (UC Berkeley). EMNLP 2024.
- **Hoofdclaim:** Formaliseert conversational-search-ranking als adversarieel probleem. Tree-of-attacks-techniek promoveert laag-gerangschikte producten. **Transfereert naar perplexity.ai.**
- **Mapping naar product:** bewijst haalbaarheid op een productiesysteem (`01-haalbaarheid.md`); risico-inzicht voor `04-ethiek`.

## 5. Adversarial Search Engine Optimization for LLMs

- **Bestand:** `6195_Adversarial_Search_Engine.pdf`
- **Bron:** Nestaas, Debenedetti, Tramèr (ETH Zürich). ICLR 2025.
- **Hoofdclaim:** "Preference Manipulation Attacks" - website-inhoud of plugin-documentatie kan een LLM verleiden de aanvaller te promoten en concurrenten te discrediteren. Aangetoond op Bing en Perplexity, en op plugin-API's voor GPT-4 en Claude. Leidt tot een prisoner's dilemma. Microsoft kreeg verantwoorde openbaring en bouwde extra beschermingen.
- **Mapping naar product:** toont aan dat (a) het in het wild werkt, (b) engines terugslaan - methodes verouderen, dus herhaalbare meting is nodig (`01-haalbaarheid`), en (c) de adversariële route deontologisch uitgesloten is (`04-ethiek`).

## Leesvolgorde-aanbeveling

Voor wie het concept wil begrijpen, in volgorde van relevantie voor LexFlow:

1. **GEO** - het constructieve fundament.
2. **CORE** - bewijs dat synthese te beïnvloeden is, in hedendaagse modellen.
3. **Adversarial SEO** (ICLR 2025) - risico's en waarom we de aanvalskant vermijden.
4. **Ranking Manipulation** (EMNLP) en **RAF** (ACL) - diepgaande aanvalsmechanismen; vooral relevant als risico-inzicht.
