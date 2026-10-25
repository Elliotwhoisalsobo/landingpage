<template>
  <section class="route-raster" aria-label="Wat AI beslist voor uw kantoor en waarom generieke tools falen">
    <article class="routekaart">
      <header class="routekop">
        <span class="sectie-icoon" aria-hidden="true"><i class="ph ph-robot"></i></span>
        <div>
          <h2>Waarom doorverwijzing niet meer volstaat</h2>
          <p>Cliënten vertrouwen AI-zoek boven mond-tot-mond. Wie AI niet bereikt, verliest nieuwe dossiers.</p>
        </div>
      </header>
      <ol class="routestappen">
        <li class="routestap">
          <div>
            <h3>De aanleiding</h3>
            <p>Mond-tot-mond was decennialang het kanaal voor advocaten. Dat kanaal verliest terrein: cliënten gebruiken en vertrouwen almaar meer AI-zoekmachines.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Wat dat voor u betekent</h3>
            <p>Op een vraag over een advocaat in uw specialisme en regio antwoordt AI met een korte namenlijst. Wie bovenaan staat, bepaalt AI — niet op kunde, maar op online aanwezigheid.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Het risico zonder overzicht</h3>
            <p>Zonder inzicht in dat antwoord blijft u doorvertrouwen op een kanaal dat almaar minder cliënten oplevert.</p>
          </div>
        </li>
      </ol>
    </article>

    <article class="routekaart">
      <header class="routekop">
        <span class="sectie-icoon" aria-hidden="true"><i class="ph ph-gauge"></i></span>
        <div>
          <h2>Waarom klassieke marketing de cliënt niet meer bereikt</h2>
          <p>De client consulteert al maar meer AI in zijn zoektocht naar een goede advocaat.</p>
        </div>
      </header>
      <ol class="routestappen">
        <li class="routestap">
          <div>
            <h3>De aanleiding</h3>
            <p>Advertenties en SEO bereiken wie actief zoekt; de cliënt vraagt vandaag één ding aan AI en krijgt één antwoord.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Wat u eigenlijk nodig hebt</h3>
            <p>Een plek in dat ene AI-antwoord - geen hogere positie op Google.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Het risico zonder overzicht</h3>
            <p>U meet kliks en bezoekers, terwijl de echte beslissing plaatsvindt waar u niet meet.</p>
          </div>
        </li>
      </ol>
    </article>
  </section>
</template>

<style scoped>
.route-raster {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  width: min(820px, 100%);
  margin: 36px auto 0;
  text-align: start;
}

.routekaart {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 48px rgba(28, 57, 47, 0.055);
}

.routekop {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 28px 28px 24px;
  border-bottom: 1px solid var(--line);
}

.routekop h2 {
  margin: 0 0 4px;
  font-family: var(--serif);
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.15;
}

.routekop p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.5;
}

.routestappen {
  margin: 0;
  padding: 28px;
  list-style: none;
  counter-reset: route;
}

.routestap {
  position: relative;
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 14px;
  min-height: 88px;
  counter-increment: route;
}

.routestap:not(:last-child)::after {
  position: absolute;
  top: 34px;
  bottom: 0;
  left: 16px;
  width: 1px;
  background: rgba(13, 94, 73, 0.2);
  content: "";
}

.routestap::before {
  position: relative;
  z-index: 1;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid rgba(13, 94, 73, 0.2);
  border-radius: 50%;
  color: var(--green);
  background: var(--paper-soft);
  content: counter(route);
  font-size: 0.75rem;
  font-weight: 600;
}

.routestap h3 {
  margin: 1px 0 4px;
  font-size: 0.88rem;
  font-weight: 600;
}

.routestap p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.58;
}

.sectie-icoon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  color: var(--green);
  background: var(--green-muted);
}

.sectie-icoon .ph {
  font-size: 1.45rem;
}

@media (max-width: 760px) {
  .route-raster {
    grid-template-columns: minmax(0, 1fr);
  }

  .routekop {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .routekop h2 {
    overflow-wrap: anywhere;
  }
}
</style>
