<script setup lang="ts">
useSeoMeta({
  title: "LexVind - AI-zichtbaarheid voor Belgische advocaten",
  description: "LexVind meet wat AI over uw advocatenkantoor zegt, legt het uit in gewone taal en maakt concreet wat er moet veranderen, zonder tech-kennis.",
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
      <a class="brand" href="#" aria-label="LexVind - AI-zichtbaarheid voor advocaten">
        <span class="brand-mark" aria-hidden="true">L</span>
        <span class="brand-name">LEXVIND</span>
      </a>
    </header>
    <!-- WEBSITE TITLE -->
    <section class="hero container" aria-labelledby="hero-title">
      <h1 id="hero-title" class="hero-title--compact">
        Wordt uw kantoor genoemd als iemand AI om een advocaat in uw vakgebied vraagt?
      </h1>
      <p class="hero-copy">
        Als iemand AI vraagt om een advocaat in uw vakgebied, weet u dan of uw kantoor
        naar voren komt? LexVind test zulke vragen voor uw regio en laat zien waar
        kansen liggen om beter gevonden te worden.
      </p>

      <!-- COMPONENTS -->
      <WaitlistForm/>
      <ContextCards/>
      <ProductShowcase/>
      <Steps/>
      <AboutBo/>

    </section>

    <footer class="site-footer container">
      <NuxtLink to="/privacy" class="footer-link">Privacybeleid</NuxtLink>
      <span class="footer-copy">&copy; 2026 LexVind</span>
    </footer>
  </main>
</template>
