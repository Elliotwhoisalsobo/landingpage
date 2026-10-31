<template>
  <section class="route-raster" aria-label="Wordt uw kantoor genoemd door ChatGPT en klopt de informatie?">
    <article class="routekaart">
      <header class="routekop">
        <span class="sectie-icoon" aria-hidden="true"><i class="ph ph-globe"></i></span>
        <div>
          <h2>Een website hebben is niet genoeg</h2>
          <p>Uw kantoor heeft een website. Maar wordt u ook genoemd als iemand ChatGPT om een advocaat vraagt?</p>
        </div>
      </header>
      <ol class="routestappen">
        <li class="routestap">
          <div>
            <h3>Een cliënt zoekt hulp, geen kantoornaam</h3>
            <p>Iemand vraagt bijvoorbeeld: “Welke advocaat in Gent kan mij helpen bij een ontslag?” Die persoon kent uw kantoor nog niet.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Komt uw kantoor dan naar voren?</h3>
            <p>Ook als u zulke zaken behandelt, is het niet vanzelfsprekend dat ChatGPT uw naam noemt.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Dat onderzoeken wij voor u</h3>
            <p>LexVind stelt vragen over uw vakgebied en gemeente. Zo ontdekt u of uw kantoor bij die vragen genoemd wordt.</p>
          </div>
        </li>
      </ol>
    </article>

    <article class="routekaart">
      <header class="routekop">
        <span class="sectie-icoon" aria-hidden="true"><i class="ph ph-robot"></i></span>
        <div>
          <h2>Wat vertelt ChatGPT over uw kantoor?</h2>
          <p>Als uw naam genoemd wordt, wilt u dat een mogelijke cliënt ook de juiste informatie krijgt.</p>
        </div>
      </header>
      <ol class="routestappen">
        <li class="routestap">
          <div>
            <h3>Waarvoor kunnen cliënten bij u terecht?</h3>
            <p>Wordt uw kantoor genoemd voor de zaken die u werkelijk behandelt?</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Kloppen uw gegevens?</h3>
            <p>Staan uw vestigingsplaats en website juist vermeld? Of krijgt de cliënt verouderde of onjuiste informatie?</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>U krijgt duidelijk advies</h3>
            <p>We laten zien wat ChatGPT over uw kantoor vertelt en welke informatie u kunt verbeteren. In gewone taal, zonder dat u zelf iets van computers hoeft te kennen.</p>
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
  gap: 0 22px;
  width: min(820px, 100%);
  margin: 36px auto 0;
  text-align: start;
}

.routekaart {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 48px rgba(28, 57, 47, 0.055);
}

.routekop {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 16px;
  padding: 28px;
  border-bottom: 1px solid var(--line);
}

.routekop h2 {
  margin: 0 0 12px;
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
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  margin: 0;
  padding: 28px;
  list-style: none;
  counter-reset: route;
}

.routestap {
  position: relative;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-content: start;
  gap: 14px;
  counter-increment: route;
}

.routestap:not(:last-child) {
  padding-bottom: 24px;
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
  margin: 0 0 8px;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.4;
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
    row-gap: 22px;
  }

  .routekaart,
  .routestappen {
    grid-row: auto;
    grid-template-rows: auto;
  }

  .routekop {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .routekop h2 {
    overflow-wrap: anywhere;
  }
}
</style>
