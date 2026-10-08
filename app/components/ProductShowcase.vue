<template>
  <div class="product-showcase">
    <header class="showcase-header">
      <h2 class="showcase-title">Twee producten, <em>één missie.</em></h2>
      <p class="showcase-copy">
        LexFlow brengt twee praktische modules naar uw KMO.
      </p>
    </header>
    <div class="card-grid">
      <article class="product-card">
        <div class="card-badge">In ontwikkeling</div>
        <div class="card-icon" aria-hidden="true"><i class="ph ph-file-text"></i></div>
        <h3 class="card-title">Loontransparantie</h3>
        <p class="card-subtitle">Voor KMO's die loonverschillen willen begrijpen én uitleggen. <strong>Vermijd boetes.</strong></p>
        <ul class="card-features">
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Upload je functielijst en loondata — LexFlow detecteert risicovolle afwijkingen</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Documenteer objectieve verklaringen per verschil (anciënniteit, ervaring, marktomstandigheden)</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Genereer met één klik het rapport dat voldoet aan de Europese richtlijn</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Bewaar alle bewijsstukken en historiek op één centrale plek</li>
        </ul>
        <!-- <span class="card-cta">Meer info</span> -->
      </article>

      <article class="product-card">
        <div class="card-badge">Toekomst</div>
        <div class="card-icon" aria-hidden="true"><i class="ph ph-users"></i></div>
        <h3 class="card-title">Langdurige afwezigheid</h3>
        <p class="card-subtitle">Voor KMO's die langdurig zieke medewerkers actief willen opvolgen. <strong>Verlaag de kost.</strong></p>
        <ul class="card-features">
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Krijg een helder overzicht van elk dossier: wie, hoe lang, wat is de volgende stap</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Ontvang automatische herinneringen wanneer een verplichte termijn nadert</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Bereid re-integratiegesprekken voor met ingebouwde checklists — geen losse mails meer</li>
          <li><i class="ph ph-check-circle" aria-hidden="true"></i> Werk samen met HR, leidinggevende en externen in één gedeeld dossier</li>
        </ul>
        <!-- <span class="card-cta">Meer info</span> -->
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

.showcase-label {
  display: inline-block;
  margin: 0;
  color: #2c6859;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.34em;
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

.card-desc {
  margin: 0 0 16px;
  color: var(--ink-soft);
  font-size: 0.81rem;
  line-height: 1.55;
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

.card-cta {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: auto;
  padding: 8px 0;
  color: var(--ink-soft);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  opacity: 0.6;
  transition: opacity 220ms ease, color 220ms ease;
}

.product-card:hover .card-cta {
  opacity: 1;
  color: var(--green);
}

@media (max-width: 760px) {
  .card-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
