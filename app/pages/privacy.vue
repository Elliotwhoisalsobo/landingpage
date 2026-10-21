<script setup lang="ts">
useSeoMeta({
  title: "Privacybeleid — LexFlow",
  description: "Welke gegevens LexFlow verzamelt via het wachtlijstformulier, waarom, bij wie ze worden verwerkt en hoe u uw rechten uitoefent.",
});
useHead({ link: [{ rel: "canonical", href: "https://lexflow.be/privacy" }] });

const year = new Date().getFullYear();
</script>

<template>
  <!-- BACKGROUND ART -->
  <main class="page-shell">
    <div class="background-layer" aria-hidden="true">
      <div class="paper-noise"></div>
      <div class="spiral spiral-1"></div>
      <div class="spiral spiral-2"></div>
      <div class="edge-card edge-card-left">
        <span>WEES ZICHTBAAR</span>
        <span>KRIJG OVERZICHT</span>
      </div>
      <div class="edge-card edge-card-right">
        <span>AI-ANTWOORDEN</span>
        <span>ADVOCATEN</span>
        <span>MEMO</span>
      </div>
    </div>
    <!-- LOGO & NAME -->
    <header class="site-header container">
      <a class="brand" href="/" aria-label="LexFlow — AI-zichtbaarheid voor advocaten">
        <span class="brand-mark" aria-hidden="true">L</span>
        <span class="brand-name">LEXFLOW</span>
      </a>
    </header>
    <article class="privacy container" aria-labelledby="privacy-title">
      <h1 id="privacy-title">Privacybeleid</h1>
      <p class="privacy-updated">Laatst bijgewerkt: {{ year }}</p>

      <h2>1. Wie is verantwoordelijk?</h2>
      <p>
        LexFlow, gevestigd in België, is verantwoordelijk voor de verwerking van uw
        persoonsgegevens via deze website. Voor vragen over dit beleid kunt u
        reageren via het e-mailadres dat u bij inschrijving hebt opgegeven of via
        het contactformulier op de site.
      </p>

      <h2>2. Welke gegevens verzamelen we?</h2>
      <ul>
        <li><strong>E-mailadres</strong> — verplicht, om uw aanvraag voor een gratis scan te bevestigen en de memo te bezorgen.</li>
        <li><strong>Naam van het kantoor</strong> — optioneel, om de scan op uw kantoor te kunnen afstemmen.</li>
        <li><strong>Technische gegevens</strong> — via Google Analytics en Google Tag Manager: anonieme bezoekersstatistieken en een cookie-ID. Geen IP-adressen worden bewaard voor profiling.</li>
      </ul>

      <h2>3. Waarom verzamelen we deze gegevens?</h2>
      <ul>
        <li>Uw inschrijving voor de gratis scan afhandelen en u de memo toesturen (uw toestemming, art. 6 §1 lit. a AVG).</li>
        <li>Anonieme bezoekersstatistieken bijhouden om de website te verbeteren (gerechtvaardigd belang, art. 6 §1 lit. f AVG).</li>
      </ul>

      <h2>4. Bij wie worden de gegevens verwerkt?</h2>
      <p>
        Uw e-mailadres en kantoor worden opgeslagen bij <strong>Supabase</strong>, een
        externe verwerker met servers in de Europese Unie. De technische
        bezoekersgegevens worden verwerkt door <strong>Google</strong> (Google Analytics /
        Google Tag Manager). Beide verwerkers werken onder een verwerkersovereenkomst
        die de AVG naleeft.
      </p>

      <h2>5. Hoe lang bewaren we de gegevens?</h2>
      <ul>
        <li>Wachtlijstgegevens: tot u om verwijdering vraagt, of maximaal 24 maanden na uw laatste contact.</li>
        <li>Anonieme statistieken: volgens de standaardbewaartermijnen van Google Analytics.</li>
      </ul>

      <h2>6. Welke rechten hebt u?</h2>
      <p>
        U heeft het recht om uw gegevens in te kijken, te corrigeren of te laten
        verwijderen, en om een klacht in te dienen bij de Gegevensbeschermingsautoriteit
        (<a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer">www.gegevensbeschermingsautoriteit.be</a>).
      </p>

      <h2>7. Cookies</h2>
      <p>
        De website plaatst enkel cookies voor anonieme webstatistieken via Google.
        Er worden geen tracking- of advertentiecookies geplaatst voor derden.
      </p>

      <span class="footer-copy">&copy; {{ year }} LexFlow</span>
    </article>
  </main>
</template>
