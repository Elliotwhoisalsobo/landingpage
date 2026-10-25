<template>
  <div class="product-showcase">
    <header class="showcase-header">
      <h2 class="showcase-title">Twee eerlijke stappen, <em>één missie.</em></h2>
      <p class="showcase-copy">
        LexFlow levert één ding: een persoonlijke memo over uw AI-zichtbaarheid. De scan is gratis, de opvolging eerlijk - geen dashboard, geen verborgen kosten.
      </p>
    </header>
    <div class="card-grid">
      <article class="product-card">
        <div class="card-badge">Gratis</div>
        <div class="card-icon" aria-hidden="true"><i class="ph ph-magnifying-glass"></i></div>
        <h3 class="card-title">De gratis scan</h3>
        <p class="card-subtitle">Voor advocaten die willen weten wat AI over hen zegt. <strong>Vraag uw memo aan.</strong></p>
        <ul class="card-features">
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Vul uw kantoor, gemeente en specialisme in - wij draaien de scan manueel</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Geen live-scan en geen open kraan: één persoonlijke aanvraag, geen misbruik</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Wij stellen ~30 Belgische koper-vragen aan AI over uw specialisme en stad</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Vandaag ontvangt u de memo in uw inbox - u raakt nooit software aan</li>
        </ul>
      </article>

      <article class="product-card">
        <div class="card-badge">Optioneel</div>
        <div class="card-icon" aria-hidden="true"><i class="ph ph-file-text"></i></div>
        <h3 class="card-title">De opvolging</h3>
        <p class="card-subtitle">Voor advocaten die de aanbevelingen ook uitgevoerd willen zien. <strong>Bewijs de winst.</strong></p>
        <ul class="card-features">
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Wij voeren de acties uit: site-content, directories en structured data tegen vaste prijs</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Na 6 weken meten we opnieuw - voor/na naast elkaar als bewijs, geen percentages</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Alles binnen de balie-regels: geen vergelijkende claims, geen fora-bemiddeling</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Twee eerlijke opties: geef de memo aan uw webbouwer, of laat ons het uitvoeren</li>
        </ul>
      </article>
    </div>
  </div>
</template>

<style scoped>
.product-showcase {
  width: min(820px, 100%);
  margin-top: 48px;
  text-align: center;
}

.showcase-header {
  margin-bottom: 36px;
}

.showcase-title {
  margin: 0 0 12px;
  font-family: var(--serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 400;
  line-height: 1.1;
  color: var(--ink);
}

.showcase-title em {
  display: inline;
  font-style: italic;
}

.showcase-copy {
  max-width: 480px;
  margin: 0 auto;
  color: var(--ink-soft);
  font-size: 0.87rem;
  line-height: 1.55;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 28px 28px;
  background: #fff;
  border: 1px solid rgba(13, 94, 73, 0.09);
  border-radius: 16px;
  text-align: left;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.product-card:hover {
  transform: translateY(-3px);
  background: #fff;
  box-shadow: 0 14px 36px -8px rgba(33, 56, 47, 0.14);
}

.card-badge {
  position: absolute;
  top: -1px;
  right: 20px;
  padding: 5px 12px 6px;
  background: var(--green);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  border-radius: 0 0 10px 10px;
}

.card-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  border-radius: 50%;
  color: var(--green);
  background: rgba(199, 220, 211, 0.5);
  margin-bottom: 16px;
}

.card-icon .ph {
  font-size: 22px;
  color: var(--green);
}

.card-title {
  margin: 0 0 8px;
  font-family: "DM Sans", var(--sans);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ink);
}

.card-features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.card-features li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 9px;
  padding: 0;
  background: none;
  color: var(--ink-soft);
  font-family: "Atkinson Hyperlegible", var(--sans);
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.55;
  border-radius: 0;
}

.card-features li .ph {
  margin-top: 3px;
  color: var(--green);
  font-size: 1rem;
}

.card-subtitle {
  margin: 0 0 16px;
  color: var(--ink);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
}

@media (max-width: 760px) {
  .card-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
