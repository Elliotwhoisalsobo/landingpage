<script setup lang="ts">
const steps = [
  {
    number: "1",
    title: "Vraag uw scan aan",
    description:
      "Vul uw kantoor en e-mail in. Wij draaien de scan manueel: geen live-scan, geen open kraan.",
  },
  {
    number: "2",
    title: "Ontvang uw memo",
    description:
      "Vandaag staat een persoonlijke PDF in uw inbox: wat AI antwoordt, waarom, en wat er moet veranderen.",
  },
  {
    number: "3",
    title: "Kies uw volgende stap",
    description:
      "Geef de memo aan uw webbouwer, of laat ons de acties uitvoeren: allebei eerlijk.",
  },
];
</script>

<template>
  <section class="lexvind-steps" aria-labelledby="steps-title">
    <div class="steps-container">
      <header class="steps-header">
        <h2 id="steps-title">Van aanvraag tot memo.</h2>
        <p>Drie stappen, geen software om aan te raken. De memo verschijnt in uw inbox.</p>
      </header>

      <ol class="steps-grid">
        <li
          v-for="step in steps"
          :key="step.number"
          class="step-item"
        >
          <article class="step-card">
            <span class="step-number">{{ step.number }}</span>

            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.lexvind-steps {
  --step-gap: clamp(28px, 4vw, 40px);

  width: min(900px, 100%);
  margin: 72px auto 0;
  color: var(--ink);
}

.steps-container {
  width: 100%;
}

.steps-header {
  margin-bottom: 30px;
  text-align: center;
}

.steps-header h2 {
  margin: 0;
  color: var(--ink);
  font-family: var(--serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.steps-header p {
  margin: 8px 0 0;
  color: var(--ink-soft);
  font-size: 0.87rem;
  line-height: 1.4;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--step-gap);
  align-items: stretch;
  margin: 0;
  padding: 0;
  list-style: none;
}

.step-item {
  position: relative;
  display: flex;
  min-width: 0;
}

.step-item:not(:last-child)::after {
  position: absolute;
  top: 50%;
  left: calc(100% + 6px);
  width: calc(var(--step-gap) - 12px);
  height: 1px;
  background: rgba(13, 94, 73, 0.3);
  content: "";
  transform: translateY(-50%);
}

.step-card {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 120px;
  align-items: center;
  padding: 20px 18px 20px 76px;
  border: 1px solid rgba(13, 94, 73, 0.07);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 8px 24px rgba(33, 56, 47, 0.035);
  text-align: left;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.step-card:hover {
  transform: translateY(-3px);
  background: #fff;
  box-shadow: 0 14px 36px -8px rgba(33, 56, 47, 0.14);
}

.step-number {
  position: absolute;
  top: 50%;
  left: 20px;
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(13, 94, 73, 0.13);
  border-radius: 50%;
  color: var(--ink);
  background: var(--paper-soft);
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  transform: translateY(-50%);
}

.step-content {
  min-width: 0;
}

.step-content h3 {
  margin: 0 0 8px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.15;
}

.step-content p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.78rem;
  line-height: 1.4;
}

@media (max-width: 760px) {
  .lexvind-steps {
    --step-gap: 24px;
  }

  .steps-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .step-item:not(:last-child)::after {
    top: auto;
    bottom: calc(var(--step-gap) * -1);
    left: 40px;
    width: 1px;
    height: var(--step-gap);
    transform: none;
  }

  .step-card {
    min-height: 110px;
    padding: 20px 18px 20px 76px;
  }
}
</style>