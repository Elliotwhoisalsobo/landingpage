<script setup lang="ts">
useSeoMeta({
  title: "LexFlow — AI-zichtbaarheid voor Belgische advocaten",
  description: "LexFlow meet wat AI over uw advocatenkantoor zegt, legt het uit in gewone taal en maakt concreet wat er moet veranderen — zonder tech-kennis.",
});
useHead({ link: [{ rel: "canonical", href: "https://lexvind.be/" }] });
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
      <a class="brand" href="#" aria-label="LexFlow — AI-zichtbaarheid voor advocaten">
        <span class="brand-mark" aria-hidden="true">L</span>
        <span class="brand-name">LEXFLOW</span>
      </a>
    </header>
    <!-- WEBSITE TITLE -->
    <section class="hero container" aria-labelledby="hero-title">
      <h1 id="hero-title" class="hero-title--compact">
        De cliënt vraagt <em>AI</em> om een advocaat<span>LexFlow zet u in het <em>antwoord</em></span>
      </h1>
      <p class="hero-copy">
        Tegen de tijd dat een cliënt u belt, heeft hij AI al om de beste advocaat
        gevraagd. Vaak staat een concurrent in het antwoord, niet u. LexFlow laat zien
        wat AI over uw kantoor zegt — in gewone taal, met concrete acties.
      </p>

      <!-- COMPONENTS -->
      <WaitlistForm/>
      <ContextCards/>
      <ProductShowcase/>
      <Steps/>
      <AboutBo/>

    </section>

    <footer class="site-footer container">
      <a href="#" class="footer-link">Privacybeleid</a>
      <span class="footer-copy">&copy; 2026 LexFlow</span>
    </footer>
  </main>
</template>
