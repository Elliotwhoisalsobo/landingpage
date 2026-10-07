<template>
  <section class="route-raster" aria-label="Gevolgen van loontransparantie en stijgend verzuim">
    <article class="routekaart">
      <header class="routekop">
        <span class="sectie-icoon" aria-hidden="true"><i class="ph ph-scales"></i></span>
        <div>
          <h2>EU-richtlijn loontransparantie</h2>
          <p>Meer openheid over hoe lonen worden bepaald.</p>
        </div>
      </header>
      <ol class="routestappen">
        <li class="routestap">
          <div>
            <h3>De aanleiding</h3>
            <p>Europa wil ongerechtvaardigde loonverschillen beter zichtbaar maken en aanpakken.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Het werk voor HR</h3>
            <p>Vergelijkbare functies groeperen, loonverschillen analyseren en objectieve verklaringen vastleggen.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Het risico zonder overzicht</h3>
            <p>Bij een vraag of klacht kost het veel tijd om de juiste cijfers, criteria en bewijsstukken terug te vinden.</p>
          </div>
        </li>
      </ol>
    </article>

    <article class="routekaart">
      <header class="routekop">
        <span class="sectie-icoon" aria-hidden="true"><i class="ph ph-trend-up"></i></span>
        <div>
          <h2>Stijgend verzuim en nieuwe regels</h2>
          <p>Meer nood aan vroege en consequente opvolging.</p>
        </div>
      </header>
      <ol class="routestappen">
        <li class="routestap">
          <div>
            <h3>De aanleiding</h3>
            <p>Langdurige afwezigheid neemt toe en brengt menselijke, organisatorische en financiële gevolgen mee.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Het werk voor HR</h3>
            <p>Contact houden, deadlines bewaken, afspraken registreren en mogelijkheden tot terugkeer onderzoeken.</p>
          </div>
        </li>
        <li class="routestap">
          <div>
            <h3>Het risico zonder overzicht</h3>
            <p>Dossiers vallen stil, acties worden vergeten en betrokkenen werken met verschillende informatie.</p>
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

.route-uitkomst {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
  margin: 0 28px 28px;
  padding: 18px;
  border-radius: 12px;
  color: var(--ink);
  background: var(--green-muted);
}

.route-uitkomst .ph {
  margin-top: 2px;
  color: var(--green);
  font-size: 1.2rem;
}

.route-uitkomst strong,
.route-uitkomst span {
  display: block;
}

.route-uitkomst strong {
  margin-bottom: 3px;
  font-size: 0.84rem;
}

.route-uitkomst span {
  color: var(--ink-soft);
  font-size: 0.8rem;
  line-height: 1.5;
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
