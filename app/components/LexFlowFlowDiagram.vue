<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import {
  PhCalendarDots as CalendarDots,
  PhChartBar as ChartBar,
  PhClipboardText as ClipboardText,
  PhCoins as Coins,
  PhFileText as FileText,
  PhGift as Gift,
  PhShieldCheck as ShieldCheck,
  PhUsersThree as UsersThree,
} from "@phosphor-icons/vue";

const props = defineProps({
  title: { type: String, default: 'LexFlow' },
  subtitle: { type: String, default: 'People, pay & compliance' },
  bridgeLabel: { type: String, default: 'Rules + review' },
})

const inputs = [
  { label: 'Loon- en payrolldata', icon: Coins },
  { label: 'Functies en niveaus', icon: UsersThree },
  { label: 'HR-beleid en documenten', icon: FileText },
  { label: 'Dossiers langdurige afwezigheid', icon: CalendarDots },
]

const outputs = [
  { label: 'Loontransparantie-overzicht', icon: ChartBar },
  { label: 'Aanbevolen loonpakket', icon: Gift },
  { label: 'Interne billijkheidscontrole', icon: ShieldCheck },
  { label: 'Acties, bewijs en rapportage', icon: ClipboardText },
]

const diagramRef = ref(null)
const hubRef = ref(null)
const bridgeRef = ref(null)
const inputRefs = ref([])
const outputRefs = ref([])
const paths = ref([])
const dots = ref([])
const size = ref({ width: 0, height: 0 })

function setInputRef(el, index) {
  if (el) inputRefs.value[index] = el
}

function setOutputRef(el, index) {
  if (el) outputRefs.value[index] = el
}

function localRect(el, rootRect) {
  const r = el.getBoundingClientRect()
  return {
    left: r.left - rootRect.left,
    right: r.right - rootRect.left,
    top: r.top - rootRect.top,
    bottom: r.bottom - rootRect.top,
    cx: r.left - rootRect.left + r.width / 2,
    cy: r.top - rootRect.top + r.height / 2,
  }
}

function roundedElbowPath(x1, y1, x2, y2, bendX) {
  const radius = Math.min(18, Math.abs(y2 - y1) / 2, Math.abs(x2 - x1) / 4)
  const dirY = y2 >= y1 ? 1 : -1

  if (Math.abs(y2 - y1) < 2) return `M ${x1} ${y1} H ${x2}`

  return [
    `M ${x1} ${y1}`,
    `H ${bendX - radius}`,
    `Q ${bendX} ${y1} ${bendX} ${y1 + dirY * radius}`,
    `V ${y2 - dirY * radius}`,
    `Q ${bendX} ${y2} ${bendX + radius} ${y2}`,
    `H ${x2}`,
  ].join(' ')
}

async function drawConnections() {
  await nextTick()

  if (!diagramRef.value || !hubRef.value || !bridgeRef.value) return

  const root = diagramRef.value.getBoundingClientRect()
  const hub = localRect(hubRef.value, root)
  const bridge = localRect(bridgeRef.value, root)

  size.value = { width: root.width, height: root.height }

  const nextPaths = []
  const nextDots = []

  const leftJunctionX = hub.left - 58
  const leftHubY = hub.cy

  inputRefs.value.forEach((el) => {
    if (!el) return
    const card = localRect(el, root)
    const startX = card.right + 8
    const startY = card.cy
    nextPaths.push(roundedElbowPath(startX, startY, hub.left - 8, leftHubY, leftJunctionX))
    nextDots.push({ x: startX, y: startY })
  })

  nextDots.push({ x: hub.left - 8, y: leftHubY, hub: true })

  const rightStartX = bridge.right + 8
  const rightStartY = bridge.cy
  const rightJunctionX = rightStartX + 56

  outputRefs.value.forEach((el) => {
    if (!el) return
    const card = localRect(el, root)
    const endX = card.left - 8
    const endY = card.cy
    nextPaths.push(roundedElbowPath(rightStartX, rightStartY, endX, endY, rightJunctionX))
    nextDots.push({ x: endX, y: endY })
  })

  nextDots.push({ x: rightStartX, y: rightStartY, hub: true })

  paths.value = nextPaths
  dots.value = nextDots
}

let resizeObserver

onMounted(() => {
  drawConnections()
  resizeObserver = new ResizeObserver(drawConnections)
  resizeObserver.observe(diagramRef.value)
  window.addEventListener('resize', drawConnections)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', drawConnections)
})
</script>

<template>
  <section ref="diagramRef" class="lexflow-diagram" aria-label="LexFlow workflow diagram">
    <svg
      class="connector-layer"
      :viewBox="`0 0 ${size.width || 1} ${size.height || 1}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        v-for="(path, index) in paths"
        :key="`path-${index}`"
        :d="path"
        class="connector-path"
      />

      <circle
        v-for="(dot, index) in dots"
        :key="`dot-${index}`"
        :cx="dot.x"
        :cy="dot.y"
        :r="dot.hub ? 6 : 4.5"
        :class="['connector-dot', { 'connector-dot--hub': dot.hub }]"
      />
    </svg>

    <div class="diagram-column diagram-column--left">
      <article
        v-for="(item, index) in inputs"
        :key="item.label"
        :ref="(el) => setInputRef(el, index)"
        class="diagram-card"
      >
        <span class="diagram-card__icon" aria-hidden="true">
          <component :is="item.icon" :size="26" weight="regular" />
        </span>
        <span class="diagram-card__label">{{ item.label }}</span>
      </article>
    </div>

    <div class="diagram-center">
      <div ref="hubRef" class="hub-card">
        <div class="hub-mark" aria-hidden="true">
          <span></span>
          <span></span>
        </div>
        <h2>{{ props.title }}</h2>
        <p>{{ props.subtitle }}</p>
      </div>

      <div ref="bridgeRef" class="bridge-pill">{{ props.bridgeLabel }}</div>
    </div>

    <div class="diagram-column diagram-column--right">
      <article
        v-for="(item, index) in outputs"
        :key="item.label"
        :ref="(el) => setOutputRef(el, index)"
        class="diagram-card"
      >
        <span class="diagram-card__icon" aria-hidden="true">
          <component :is="item.icon" :size="26" weight="regular" />
        </span>
        <span class="diagram-card__label">{{ item.label }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Libre+Caslon+Display&display=swap');

.lexflow-diagram {
  --ink: #0a3b30;
  --ink-soft: #647a72;
  --green: #0d5e49;
  --green-2: #6f9b82;
  --sage: #e9f0eb;
  --paper: #f8f5ed;
  --card: rgba(255, 255, 255, 0.9);
  --line: rgba(13, 94, 73, 0.62);

  position: relative;
  display: grid;
  grid-template-columns: minmax(230px, 1fr) minmax(360px, 1.2fr) minmax(230px, 1fr);
  gap: clamp(42px, 6vw, 92px);
  align-items: center;
  width: 100%;
  min-height: 620px;
  padding: clamp(34px, 5vw, 72px);
  overflow: hidden;
  border-radius: 34px;
  color: var(--ink);
  background:
    radial-gradient(circle at 50% 50%, rgba(195, 221, 204, 0.18), transparent 26%),
    linear-gradient(135deg, #fbfaf6 0%, #f6f4ed 46%, #f3f1e9 100%);
  font-family: 'DM Sans', system-ui, sans-serif;
  isolation: isolate;
}

.lexflow-diagram::before,
.lexflow-diagram::after {
  content: '';
  position: absolute;
  width: 540px;
  height: 540px;
  border: 1px solid rgba(13, 94, 73, 0.06);
  border-radius: 50%;
  pointer-events: none;
}

.lexflow-diagram::before {
  left: -320px;
  top: -240px;
}

.lexflow-diagram::after {
  right: -300px;
  bottom: -280px;
}

.connector-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
}

.connector-path {
  fill: none;
  stroke: var(--line);
  stroke-width: 1.5;
  stroke-dasharray: 5 7;
  vector-effect: non-scaling-stroke;
}

.connector-dot {
  fill: var(--green);
  stroke: #f7f6f1;
  stroke-width: 2.5;
  vector-effect: non-scaling-stroke;
}

.connector-dot--hub {
  fill: #76a486;
}

.diagram-column {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 26px;
}

.diagram-card {
  display: grid;
  grid-template-columns: 58px 1fr;
  align-items: center;
  gap: 16px;
  min-height: 98px;
  padding: 18px 22px;
  border: 1px solid rgba(10, 59, 48, 0.08);
  border-radius: 22px;
  background: var(--card);
  box-shadow: 0 12px 34px rgba(34, 54, 47, 0.055);
  backdrop-filter: blur(6px);
}

.diagram-card__icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  color: var(--green);
  background: linear-gradient(145deg, #e7f0e9, #f2f6f3);
}

.diagram-card__label {
  font-size: clamp(0.98rem, 1.25vw, 1.14rem);
  font-weight: 600;
  line-height: 1.28;
  letter-spacing: -0.015em;
}

.diagram-center {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.hub-card {
  position: relative;
  display: grid;
  place-items: center;
  align-content: center;
  width: min(300px, 100%);
  aspect-ratio: 1.24 / 1;
  padding: 28px;
  text-align: center;
  border: 1px solid rgba(13, 94, 73, 0.22);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(249, 251, 249, 0.9)),
    var(--paper);
  box-shadow:
    0 0 0 10px rgba(197, 222, 205, 0.22),
    0 18px 48px rgba(24, 71, 56, 0.10);
}

.hub-mark {
  position: relative;
  width: 56px;
  height: 40px;
  margin-bottom: 14px;
}

.hub-mark span {
  position: absolute;
  width: 34px;
  height: 34px;
  border-radius: 4px 24px 4px 24px;
  transform: rotate(45deg);
}

.hub-mark span:first-child {
  left: 4px;
  top: 4px;
  background: linear-gradient(135deg, #164e3e, #779f86);
}

.hub-mark span:last-child {
  right: 4px;
  top: 4px;
  background: linear-gradient(135deg, #b7d1bc, #5f936f);
}

.hub-card h2 {
  margin: 0;
  font-family: 'Libre Caslon Display', Georgia, serif;
  font-size: clamp(2.1rem, 4vw, 3.4rem);
  font-weight: 400;
  letter-spacing: -0.04em;
}

.hub-card p {
  margin: 7px 0 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
}

.bridge-pill {
  position: absolute;
  left: calc(100% - 22px);
  top: 50%;
  transform: translateY(-50%);
  min-width: 132px;
  padding: 10px 15px;
  border-radius: 999px;
  color: white;
  background: linear-gradient(135deg, #0d5e49, #164f40);
  box-shadow: 0 10px 24px rgba(13, 94, 73, 0.15);
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 980px) {
  .lexflow-diagram {
    grid-template-columns: 1fr;
    gap: 30px;
    min-height: auto;
    padding: 28px;
  }

  .connector-layer {
    display: none;
  }

  .diagram-center {
    order: -1;
    padding: 16px 0 12px;
  }

  .hub-card {
    width: min(330px, 86vw);
  }

  .bridge-pill {
    position: static;
    transform: none;
    margin-left: 18px;
  }

  .diagram-column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .lexflow-diagram {
    padding: 20px;
    border-radius: 24px;
  }

  .diagram-column {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .diagram-card {
    min-height: 84px;
    grid-template-columns: 48px 1fr;
    padding: 15px 16px;
    border-radius: 18px;
  }

  .diagram-card__icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
  }

  .diagram-center {
    flex-direction: column;
  }

  .bridge-pill {
    margin: 18px 0 0;
  }
}
</style>
