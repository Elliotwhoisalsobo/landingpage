<template>
  <section class="maker-section" aria-labelledby="maker-titel">
    <div class="maker-content">
      <div class="maker-avatar" aria-hidden="true"><i class="ph ph-hand-waving"></i></div>
      <div class="maker-text">
        <h2 id="maker-titel">Hoi, ik ben Bo</h2>
        <p>
          Ik bouw LexFlow om twee complexe HR-uitdagingen eenvoudiger te maken: loontransparantie en de opvolging van ziekteverzuim en langdurige afwezigheid.
        </p>
        <p>
          Mijn doel is praktische, betaalbare software waarmee KMO's overzicht houden, deadlines bewaken en correct handelen — zonder dure consultants of ingewikkelde systemen.
        </p>
        <p class="maker-linkedin">
          <a href="https://www.linkedin.com/in/bo-vermote/" target="_blank" rel="noopener noreferrer">
            <i class="ph ph-linkedin-logo" aria-hidden="true"></i>
            Vind mij op LinkedIn
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.maker-section {
  width: min(680px, 100%);
  margin: 72px auto 0;
  text-align: left;
}

.maker-content {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  padding: 34px 36px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(13, 94, 73, 0.10);
  border-radius: 18px;
  box-shadow: 0 8px 28px rgba(31, 62, 51, 0.06);
}

.maker-avatar {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: var(--green);
  background: rgba(199, 220, 211, 0.45);
  font-size: 1.6rem;
}

.maker-text h2 {
  margin: 0 0 14px;
  font-family: var(--serif);
  font-size: 1.45rem;
  font-weight: 400;
  line-height: 1.15;
  color: var(--ink);
}

.maker-text h2 em {
  display: inline;
  font-style: italic;
}

.maker-text p {
  margin: 0 0 12px;
  color: var(--ink-soft);
  font-size: 0.89rem;
  line-height: 1.65;
}

.maker-text p:last-child {
  margin-bottom: 0;
}

.maker-linkedin {
  margin-top: 18px !important;
}

.maker-linkedin a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--green);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 180ms ease;
}

.maker-linkedin a:hover {
  opacity: 0.75;
}

.maker-linkedin .ph {
  font-size: 1.2rem;
  line-height: 1;
}

@media (max-width: 640px) {
  .maker-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 22px;
  }

  .maker-text h2 {
    font-size: 1.25rem;
  }

  .maker-linkedin {
    text-align: center;
  }
}
</style>
