# Autocuidado Mapa Conceptual — Design Spec

**Date:** 2026-05-03  
**Status:** Approved

## Goal

Refactor `autocuidado.html` into a modular ES-module architecture that implements the full 6-screen interactive flow from the PPTX presentation, with one JavaScript file per leaf node.

---

## File Structure

```
autocuidado.html          ← entry point: map HTML + 6 screen shells
js/
  app.js                  ← state, navigation, event wiring
  renderer.js             ← populates each screen's DOM from node data
nodes/
  alimentacion.js
  actividad-fisica.js
  higiene.js
  autoconocimiento.js
  afrontamiento.js        ← placeholder (PPTX content incomplete)
  mindfulness.js
  participacion.js
```

---

## Concept Map Tree

```
Bienestar Global  (root)
├── Autocuidado Físico  (branch, orange)
│   ├── Alimentación
│   ├── Actividad Física
│   └── Higiene y Cuidado Personal
├── Autocuidado Emocional  (branch, gray)
│   ├── Autoconocimiento e Inteligencia Emocional
│   └── Estrategias de Afrontamiento - Adaptativas
└── Autocuidado Espiritual  (branch, gray)
    ├── Mindfulness / Atención Consciente
    └── Participación Activa en Grupos Espiritual o Basado en Valores
```

---

## Screen Flow

```
[Map]
  ↓ click leaf node
[Definition]   node label + definition text + "Continuar" button
  ↓
[Question]     question text + Sí / No / No estoy seguro/a buttons
  ↓ answer selected
[Response]     heading + response text + learnMore teaser + "Ver más" button
  ↓
[Evidence]     evidence intro + bullet list + "Ver consejos" button
  ↓
[Tips]         tips intro + items list + links + "Volver al mapa" button
  ↓
[Map]          dot indicator updated on node (green/red/yellow)
```

Navigation is always forward-only within a node. "Volver al mapa" only appears on the Tips screen. Dot indicators persist across node visits within a session.

---

## Node Data Shape

```js
export default {
  key: 'alimentacion',
  label: 'Alimentación',
  category: 'fisico',          // 'fisico' | 'emocional' | 'espiritual'

  definition: '...',

  question: '...',

  responses: {
    si:     { heading: 'Zorionak!',  text: '...', learnMore: '...' },
    no:     { heading: 'Vaya…!',    text: '...', learnMore: '...' },
    unsure: { heading: 'Es normal', text: '...', learnMore: '...' },
  },

  evidence: {
    intro: '...',
    bullets: ['...'],
  },

  tips: {
    intro: '...',
    items: ['...'],
    links: [{ label: '...', url: '...' }],
  },
}
```

- `learnMore`: teaser sentence shown on the Response screen before tapping "Ver más"
- `links` in tips: optional array, rendered as clickable anchors
- `afrontamiento.js` uses placeholder strings for all content fields

---

## app.js Responsibilities

- Import all 7 node modules and build a `NODES` map keyed by `key`
- Track `currentNode` (key) and `currentAnswer` ('si' | 'no' | 'unsure')
- Track `answers` object `{ [key]: answer | null }` for dot indicators
- Expose `openNode(key)`, `submitAnswer(answer)`, `goToMap()`, `goNext(currentScreen)` functions
- Call `renderer.*` to populate screens before showing them
- Call `showScreen(id)` to swap the active screen

## renderer.js Responsibilities

- `renderDefinition(node)`: populate badge + definition text
- `renderQuestion(node)`: populate badge + question text
- `renderResponse(node, answer)`: populate badge + heading + text + learnMore
- `renderEvidence(node)`: populate badge + intro + bullets
- `renderTips(node)`: populate badge + intro + items + links
- `updateDots(answers)`: update all dot indicators on the map

---

## HTML Shells

`autocuidado.html` contains:
- The map tree (static HTML, same visual as current draft)
- 6 `<div class="screen">` shells with stable IDs: `screen-map`, `screen-definition`, `screen-question`, `screen-response`, `screen-evidence`, `screen-tips`
- A single `<script type="module" src="js/app.js">` tag
- All existing CSS from the current draft, extended with styles for the new screens

---

## Dot Indicators

Leaf nodes on the map get a `<span class="dot" id="dot-{key}">` element. Class `dot-si` (green), `dot-no` (red), `dot-unsure` (yellow) set via `updateDots()` after each answer. Dots are hidden until answered.

---

## Out of Scope

- Persistence across page reloads (no localStorage)
- Back navigation within a node's flow
- The "Estrategias de Afrontamiento" full content (marked as incomplete in source PPTX)
