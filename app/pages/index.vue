<script setup lang="ts">
useSeoMeta({
  title: "LexFlow | Loontransparantie en ziekteverzuim voor KMO's",
  description: "LexFlow bouwt aan software voor loontransparantie, opvolging van langdurige afwezigheid en re-integratie.",
});
useHead({ link: [{ rel: "canonical", href: "https://lexflow.be/" }] });
</script>

<template>
  <main class="page-shell">
    <div class="background-layer" aria-hidden="true">
      <div class="paper-noise"></div>
      <div class="spiral spiral-1"></div>
      <div class="spiral spiral-2"></div>
      <div class="edge-card edge-card-left">
        <span>VERMIJD BOETES</span>
        <span>KRIJG OVERZICHT</span>
      </div>
      <div class="edge-card edge-card-right">
        <span>LOONTRANSPARANTIE</span>
        <span>ZIEKTE</span>
        <span>RE-INTEGRATIE</span>
      </div>
    </div>

    <header class="site-header container">
      <a class="brand" href="#" aria-label="LexFlow startpagina">
        <span class="brand-mark" aria-hidden="true">L</span>
        <span class="brand-name">LEXFLOW</span>
      </a>
    </header>

    <section class="hero container" aria-labelledby="hero-title">
      <h1 id="hero-title" class="hero-title--compact">
        HR-compliance wordt <em>ingewikkelder</em><span>LexFlow maakt het <em>simpel</em></span>
      </h1>
      <p class="hero-copy">
        Nieuwe Europese regels rond loontransparantie brengen extra
        verplichtingen en dure boetes met zich mee. LexFlow helpt KMO's om voorbereid
        te zijn zonder dure consultants of complexe software.
      </p>

      <WaitlistForm/>
      <ContextCards/>
      <ProductShowcase/>
      <AboutBo/>

    </section>
  </main>
</template>
