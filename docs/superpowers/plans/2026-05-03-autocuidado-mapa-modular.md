# Autocuidado Mapa Conceptual — Modular ES-Module Refactor

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `autocuidado.html` into a modular ES-module architecture with one JS file per leaf node, implementing the full 6-screen interactive flow for all 7 nodes.

**Architecture:** `autocuidado.html` holds the map tree (7 leaf nodes) and 6 screen shells. `js/renderer.js` populates each screen's DOM from node data. `js/app.js` manages state and navigation, importing all 7 node modules. Each `nodes/*.js` exports a self-contained data object with definition, question, responses, evidence, and tips.

**Tech Stack:** Vanilla HTML/CSS/ES Modules — no build step, no dependencies. Requires serving via `http://localhost` (ES modules block on `file://`).

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `autocuidado.html` | Modify | Map HTML (7 leaves) + 6 screen shells + all CSS |
| `js/app.js` | Create | State, navigation, node registry, window.app bridge |
| `js/renderer.js` | Create | Populate each screen's DOM from node data |
| `nodes/alimentacion.js` | Create | Node data: Alimentación |
| `nodes/actividad-fisica.js` | Create | Node data: Actividad Física |
| `nodes/higiene.js` | Create | Node data: Higiene y Cuidado Personal |
| `nodes/autoconocimiento.js` | Create | Node data: Autoconocimiento e IE |
| `nodes/afrontamiento.js` | Create | Node data: Estrategias de Afrontamiento (placeholder) |
| `nodes/mindfulness.js` | Create | Node data: Mindfulness / Atención Consciente |
| `nodes/participacion.js` | Create | Node data: Participación Activa |

---

### Task 1: Refactor autocuidado.html

**Files:**
- Modify: `autocuidado.html`

Replace the current 3-screen inline-script HTML with a 6-screen ES-module shell. The map tree gains 3 new leaf nodes. The inline `<script>` block is removed and replaced with `<script type="module" src="js/app.js">`.

- [ ] **Step 1: Write the complete new autocuidado.html**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autocuidado Docente - Mapa Conceptual Interactivo</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* === BASE === */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: #f5f3f0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 2.5rem 1rem;
      overflow-x: hidden;
    }
    .container { max-width: 1000px; width: 100%; }
    .screen { display: none; }
    .screen.active { display: block; }

    /* === MAP === */
    #screen-map h1 {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 2.2rem;
      color: #2a2a2a;
      text-align: center;
      margin-bottom: 0.5rem;
      letter-spacing: -0.5px;
    }
    #screen-map h1 span { color: #d47a2b; }
    .subtitle {
      text-align: center;
      color: #888;
      font-size: 0.9rem;
      margin-bottom: 2.5rem;
    }
    .tree { display: flex; flex-direction: column; align-items: center; }
    .node {
      background: #fff;
      border: 2px solid #d4d0cb;
      border-radius: 14px;
      padding: 14px 28px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      color: #3a3a3a;
      text-align: center;
      position: relative;
    }
    .node.root {
      background: linear-gradient(135deg, #3a3a3a, #4a4a4a);
      color: #fff;
      border: none;
      font-size: 1.15rem;
      padding: 18px 40px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    .node.fisico {
      background: linear-gradient(135deg, #e8883a, #d47a2b);
      color: #fff;
      border: none;
      box-shadow: 0 4px 14px rgba(212,122,43,0.3);
    }
    .node.gray {
      background: #e8e4df;
      border-color: #c9c4bd;
    }
    .node.sub {
      font-weight: 500;
      font-size: 0.88rem;
      padding: 12px 18px;
      background: #fff;
      border: 2px solid #d47a2b;
      line-height: 1.35;
      max-width: 180px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .node.sub:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212,122,43,0.2);
    }
    .node.sub .dot {
      position: absolute;
      top: -7px;
      right: -7px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #fff;
      display: none;
    }
    .dot.si     { background: #22c55e; }
    .dot.no     { background: #ef4444; }
    .dot.unsure { background: #eab308; }
    .vline { width: 2px; background: #bbb; }
    .vline.short { height: 30px; }
    .hbar { height: 2px; background: #bbb; width: 72%; margin: 0 auto; }
    .hbar-small { height: 2px; background: #bbb; width: 120px; }
    .hbar-wide  { height: 2px; background: #bbb; width: 220px; }
    .level1 {
      display: flex;
      justify-content: space-around;
      width: 86%;
      margin: 0 auto;
    }
    .branch { display: flex; flex-direction: column; align-items: center; flex: 1; }
    .sub-row { display: flex; gap: 1rem; justify-content: center; }
    .sub-branch { display: flex; flex-direction: column; align-items: center; }

    /* === SHARED SCREEN ELEMENTS === */
    .detail-header { margin-bottom: 2rem; }
    .node-badge {
      display: inline-block;
      background: #e8e4df;
      border: 1.5px solid #c9c4bd;
      border-radius: 14px;
      padding: 10px 22px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      color: #3a3a3a;
    }
    .next-btn {
      display: block;
      margin: 2rem auto 0;
      padding: 14px 36px;
      background: #d47a2b;
      border: none;
      border-radius: 30px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      color: #fff;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .next-btn:hover {
      background: #c06a1e;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(212,122,43,0.3);
    }
    .back-btn {
      display: block;
      margin: 1.5rem auto 0;
      padding: 12px 28px;
      background: none;
      border: 2px solid #d47a2b;
      border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      color: #d47a2b;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .back-btn:hover { background: #fff8f0; transform: translateY(-1px); }

    /* === DEFINITION SCREEN === */
    .definition-text {
      font-size: 1.05rem;
      line-height: 1.7;
      color: #2a2a2a;
      background: #fff;
      border-radius: 14px;
      padding: 1.5rem 2rem;
      border: 1.5px solid #d4d0cb;
    }

    /* === QUESTION SCREEN === */
    .question-block {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      margin: 2.5rem 0;
    }
    .question-icon {
      font-family: 'Outfit', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      color: #d47a2b;
      line-height: 1;
      flex-shrink: 0;
    }
    .question-text { font-size: 1.1rem; line-height: 1.6; color: #2a2a2a; }
    .answer-row {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
    .answer-btn {
      border: none;
      border-radius: 30px;
      padding: 12px 28px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .answer-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.12); }
    .answer-btn.si     { background: #d47a2b; color: #fff; }
    .answer-btn.no     { background: #e8e4df; color: #3a3a3a; }
    .answer-btn.unsure { background: #fff; border: 1.5px solid #ccc; color: #666; }
    .legend {
      margin-top: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .legend-label {
      background: #fff;
      border: 2px solid #d4d0cb;
      border-radius: 10px;
      padding: 10px 18px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.85rem;
      color: #3a3a3a;
    }
    .legend-arrow { color: #d47a2b; font-size: 1.6rem; }
    .legend-option {
      border-radius: 22px;
      padding: 8px 20px;
      font-family: 'Outfit', sans-serif;
      font-weight: 500;
      font-size: 0.85rem;
    }
    .legend-option.si     { background: #d47a2b; color: #fff; }
    .legend-option.no     { background: #e8e4df; color: #3a3a3a; }
    .legend-option.unsure { background: #fff; border: 1.5px solid #ccc; color: #666; }

    /* === RESPONSE SCREEN === */
    .response-heading {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.8rem;
      color: #d47a2b;
      margin-bottom: 1rem;
    }
    .response-text {
      font-size: 1.05rem;
      line-height: 1.7;
      color: #2a2a2a;
      margin-bottom: 1.5rem;
    }
    .learn-more-teaser {
      font-size: 0.9rem;
      color: #888;
      font-style: italic;
    }

    /* === EVIDENCE SCREEN === */
    .evidence-intro {
      font-size: 1rem;
      line-height: 1.6;
      color: #2a2a2a;
      margin-bottom: 1.5rem;
    }
    .evidence-bullets { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
    .evidence-bullets li {
      background: #fff;
      border-left: 4px solid #d47a2b;
      border-radius: 0 10px 10px 0;
      padding: 1rem 1.2rem;
      font-size: 0.95rem;
      line-height: 1.6;
      color: #2a2a2a;
    }

    /* === TIPS SCREEN === */
    .tips-intro { font-size: 1rem; line-height: 1.6; color: #2a2a2a; margin-bottom: 1.2rem; }
    .tips-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem; }
    .tips-list li {
      display: flex;
      gap: 0.8rem;
      align-items: flex-start;
      font-size: 0.95rem;
      line-height: 1.6;
      color: #2a2a2a;
    }
    .tips-list li::before {
      content: '→';
      color: #d47a2b;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
    .tips-links { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
    .tip-link {
      display: inline-block;
      color: #d47a2b;
      font-size: 0.9rem;
      text-decoration: underline;
      word-break: break-all;
    }
    .tip-link:hover { color: #c06a1e; }

    /* === RESPONSIVE === */
    @media (max-width: 700px) {
      #screen-map h1 { font-size: 1.4rem; }
      .level1 { flex-direction: column; align-items: center; gap: 2rem; width: 100%; }
      .hbar { display: none; }
      .hbar-small { display: none; }
      .hbar-wide  { display: none; }
      .sub-row { flex-direction: column; align-items: center; }
      .node { font-size: 0.9rem; padding: 12px 20px; }
      .question-text { font-size: 0.95rem; }
      .answer-row { flex-direction: column; align-items: center; }
      .legend { flex-direction: column; }
      .next-btn { width: 100%; }
      .back-btn { width: 100%; }
    }
  </style>
</head>
<body>
<div class="container">

  <!-- SCREEN 1: MAP -->
  <div id="screen-map" class="screen active">
    <h1>Autocuidado docente · <span>Mapa conceptual</span></h1>
    <p class="subtitle">Haz clic en los elementos naranjas para reflexionar</p>
    <div class="tree">
      <div class="node root">Bienestar Global</div>
      <div class="vline short"></div>
      <div class="hbar"></div>
      <div class="level1">

        <!-- Físico: 3 sub-nodes -->
        <div class="branch">
          <div class="vline short"></div>
          <div class="node fisico">Autocuidado Físico</div>
          <div class="vline short"></div>
          <div class="hbar-wide"></div>
          <div class="sub-row">
            <div class="sub-branch">
              <div class="vline short"></div>
              <div class="node sub" onclick="app.openNode('alimentacion')">
                Alimentación
                <span class="dot" id="dot-alimentacion"></span>
              </div>
            </div>
            <div class="sub-branch">
              <div class="vline short"></div>
              <div class="node sub" onclick="app.openNode('actividad-fisica')">
                Actividad Física
                <span class="dot" id="dot-actividad-fisica"></span>
              </div>
            </div>
            <div class="sub-branch">
              <div class="vline short"></div>
              <div class="node sub" onclick="app.openNode('higiene')">
                Higiene y Cuidado Personal
                <span class="dot" id="dot-higiene"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Emocional: 2 sub-nodes -->
        <div class="branch">
          <div class="vline short"></div>
          <div class="node gray">Autocuidado Emocional</div>
          <div class="vline short"></div>
          <div class="hbar-small"></div>
          <div class="sub-row">
            <div class="sub-branch">
              <div class="vline short"></div>
              <div class="node sub" onclick="app.openNode('autoconocimiento')">
                Autoconocimiento e Inteligencia Emocional
                <span class="dot" id="dot-autoconocimiento"></span>
              </div>
            </div>
            <div class="sub-branch">
              <div class="vline short"></div>
              <div class="node sub" onclick="app.openNode('afrontamiento')">
                Estrategias de Afrontamiento Adaptativas
                <span class="dot" id="dot-afrontamiento"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Espiritual: 2 sub-nodes -->
        <div class="branch">
          <div class="vline short"></div>
          <div class="node gray">Autocuidado Espiritual</div>
          <div class="vline short"></div>
          <div class="hbar-small"></div>
          <div class="sub-row">
            <div class="sub-branch">
              <div class="vline short"></div>
              <div class="node sub" onclick="app.openNode('mindfulness')">
                Mindfulness / Atención Consciente
                <span class="dot" id="dot-mindfulness"></span>
              </div>
            </div>
            <div class="sub-branch">
              <div class="vline short"></div>
              <div class="node sub" onclick="app.openNode('participacion')">
                Participación Activa en Grupos Espiritual o Basado en Valores
                <span class="dot" id="dot-participacion"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- SCREEN 2: DEFINITION -->
  <div id="screen-definition" class="screen">
    <div class="detail-header">
      <div class="node-badge" id="def-badge">—</div>
    </div>
    <div class="definition-text" id="def-text">—</div>
    <button class="next-btn" onclick="app.goNext('screen-definition')">Continuar →</button>
  </div>

  <!-- SCREEN 3: QUESTION -->
  <div id="screen-question" class="screen">
    <div class="detail-header">
      <div class="node-badge" id="q-badge">—</div>
    </div>
    <div class="question-block">
      <div class="question-icon">?</div>
      <div class="question-text" id="q-text">—</div>
    </div>
    <div class="answer-row">
      <button class="answer-btn si"     onclick="app.submitAnswer('si')">Sí</button>
      <button class="answer-btn no"     onclick="app.submitAnswer('no')">No</button>
      <button class="answer-btn unsure" onclick="app.submitAnswer('unsure')">No estoy seguro/a</button>
    </div>
    <div class="legend">
      <div class="legend-label">Pregunta de autoevaluación</div>
      <div class="legend-arrow">→</div>
      <div class="legend-option si">Sí</div>
      <div class="legend-option no">No</div>
      <div class="legend-option unsure">No estoy seguro/a</div>
    </div>
  </div>

  <!-- SCREEN 4: RESPONSE -->
  <div id="screen-response" class="screen">
    <div class="detail-header">
      <div class="node-badge" id="resp-badge">—</div>
    </div>
    <div class="response-heading" id="resp-heading">—</div>
    <div class="response-text" id="resp-text">—</div>
    <div class="learn-more-teaser" id="resp-learnmore">—</div>
    <button class="next-btn" onclick="app.goNext('screen-response')">Ver más →</button>
  </div>

  <!-- SCREEN 5: EVIDENCE -->
  <div id="screen-evidence" class="screen">
    <div class="detail-header">
      <div class="node-badge" id="ev-badge">—</div>
    </div>
    <div class="evidence-intro" id="ev-intro">—</div>
    <ul class="evidence-bullets" id="ev-bullets"></ul>
    <button class="next-btn" onclick="app.goNext('screen-evidence')">Ver consejos →</button>
  </div>

  <!-- SCREEN 6: TIPS -->
  <div id="screen-tips" class="screen">
    <div class="detail-header">
      <div class="node-badge" id="tips-badge">—</div>
    </div>
    <div class="tips-intro" id="tips-intro">—</div>
    <ul class="tips-list" id="tips-list"></ul>
    <div class="tips-links" id="tips-links"></div>
    <button class="back-btn" onclick="app.goToMap()">← Volver al mapa</button>
  </div>

</div>
<script type="module" src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Start local server and verify map renders**

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/autocuidado.html`. Expected: map visible with 7 leaf nodes across 3 branches. Console will show an import error for `js/app.js` — expected, file not yet created.

- [ ] **Step 3: Commit**

```bash
git add autocuidado.html
git commit -m "refactor: replace 3-screen inline-script HTML with 6-screen ES-module shell"
```

---

### Task 2: Create nodes/alimentacion.js

**Files:**
- Create: `nodes/alimentacion.js`

- [ ] **Step 1: Create the file**

```js
export default {
  key: 'alimentacion',
  label: 'Alimentación',
  category: 'fisico',

  definition: 'La alimentación saludable puede adoptar muchas formas, pero debe basarse siempre en cuatro principios fundamentales: adecuación, equilibrio, moderación y diversidad. (OMS, 2026)',

  question: 'No siempre es fácil llevar a cabo una alimentación saludable. ¿Crees que en tu día a día llevas una dieta equilibrada?',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que cuidas esta parte tan importante del autocuidado físico. Llevar a cabo una alimentación saludable y equilibrada es fundamental para sostener tu bienestar en el día a día. ¡Sigue así!',
      learnMore: 'La investigación muestra que la alimentación tiene una influencia determinante en la salud y el bienestar.',
    },
    no: {
      heading: 'Vaya…',
      text: 'La alimentación es una parte muy importante del autocuidado físico. Mantener hábitos de alimentación saludable tiene beneficios importantes para la salud de las personas.',
      learnMore: 'La investigación muestra que mantener una alimentación saludable no solo tiene beneficios físicos, sino también psicológicos.',
    },
    unsure: {
      heading: 'Es normal',
      text: 'Saber qué es exactamente lo que se entiende por alimentación saludable no es sencillo. Nos alegra que estés interesada/o en conocerlos. Una alimentación saludable consiste en comer completo, equilibrado, suficiente y variado.',
      learnMore: 'La investigación muestra que mantener una alimentación saludable no solo tiene beneficios físicos, sino también psicológicos.',
    },
  },

  evidence: {
    intro: 'La evidencia científica muestra consistentemente que:',
    bullets: [
      'Mejores patrones dietéticos se asocian con mayor calidad de vida en dominios físicos, emocionales y sociales, tanto en adultos como en niños y adolescentes (Godos et al., 2025).',
      'Dietas de tipo mediterráneo o similares muestran menor probabilidad de depresión, y en algunos casos también menos ansiedad y estrés (Kris-Etherton et al., 2020).',
      'Una dieta de buena calidad se asocia con menos estrés y depresión y mejor calidad de vida, especialmente en mujeres (Kim et al., 2023).',
      'Seguir patrones saludables reduce claramente el riesgo de cardiopatía, diabetes tipo 2 y cáncer (Peilu Wang et al., 2023).',
    ],
  },

  tips: {
    intro: 'Para que una alimentación se considere saludable, debe cumplir con cuatro condiciones:',
    items: [
      'Completa: debe aportar todos los nutrientes que necesita el organismo (hidratos de carbono, grasas, proteínas, vitaminas, minerales y agua).',
      'Equilibrada: los nutrientes deben guardar una proporción adecuada entre sí.',
      'Suficiente: la cantidad de alimentos debe ser la justa para mantener el peso dentro de los rangos de normalidad.',
      'Variada: debe incluir diferentes alimentos de cada grupo para asegurar que recibimos todos los micronutrientes necesarios.',
    ],
    links: [],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add nodes/alimentacion.js
git commit -m "feat: add alimentacion node data"
```

---

### Task 3: Create nodes/actividad-fisica.js

**Files:**
- Create: `nodes/actividad-fisica.js`

- [ ] **Step 1: Create the file**

```js
export default {
  key: 'actividad-fisica',
  label: 'Actividad Física',
  category: 'fisico',

  definition: 'Cualquier movimiento corporal producido por los músculos esqueléticos que exija un gasto de energía. Abarca desde las tareas cotidianas y el trabajo hasta el ejercicio y el deporte, es decir, todo movimiento voluntario que rompe el estado de reposo y activa el metabolismo.',

  question: 'No siempre es fácil llevar a cabo una rutina de actividad física. ¿Crees que en tu día a día la llevas?',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que cuidas esta parte tan importante del autocuidado físico. Llevar a cabo una actividad física adecuada para la edad y condición de cada uno es fundamental para sostener tu bienestar en el día a día. ¡Sigue así!',
      learnMore: 'La investigación muestra que la realización de actividad física tiene una influencia determinante en la salud y el bienestar.',
    },
    no: {
      heading: 'Vaya…',
      text: 'La realización de actividad física es una parte muy importante del autocuidado físico. Mantener hábitos donde se incluye tiene beneficios importantes para la salud de las personas.',
      learnMore: 'La investigación muestra que mantenerse activo físicamente no solo tiene beneficios físicos, sino también psicológicos.',
    },
    unsure: {
      heading: 'Es normal',
      text: 'Hoy en día llevamos una vida bastante sedentaria y no somos conscientes de hasta qué punto es recomendable que nos activemos. Nos alegra que estés interesada/o en conocerlos. Según la OMS, la actividad física es cualquier movimiento corporal que exija un gasto de energía superior al estado de reposo.',
      learnMore: 'La investigación muestra que mantenerse activo físicamente no solo tiene beneficios físicos, sino también psicológicos.',
    },
  },

  evidence: {
    intro: 'La actividad física regular aporta beneficios amplios: reduce el riesgo de muchas enfermedades, mejora la salud mental y aumenta la calidad y esperanza de vida. Los efectos aparecen incluso con niveles moderados de ejercicio y en todas las edades.',
    bullets: [
      'Menor riesgo de enfermedad cardiovascular, diabetes tipo 2, cáncer de mama y colon, osteoporosis y síndrome metabólico (Aditya Mahindru et al., 2023; Malm et al., 2019).',
      'El ejercicio reduce síntomas de depresión, ansiedad y estrés, mejora el estado de ánimo, el sueño y la calidad de vida (Aditya Mahindru et al., 2023).',
      'También mejora autoestima, imagen corporal, sentido de competencia y apoyo social (Rhiannon et al., 2024).',
      'Cualquier nivel de actividad es mejor que el sedentarismo; los beneficios aumentan al subir la cantidad, especialmente para ánimo y ansiedad (Kalfin et al., 2024; Malm et al., 2019).',
    ],
  },

  tips: {
    intro: 'Pequeños cambios en el día a día pueden marcar la diferencia:',
    items: [
      'Realiza diferentes ráfagas de movimiento breves de 5 a 10 minutos (ejemplo: subir escaleras).',
      'Por cada media hora sentado, levántate y estírate o camina durante 2 minutos.',
      'En la medida de lo posible, camina para desplazarte.',
      'Busca y apúntate a alguna actividad que te guste e implique movimiento (bailar, caminar, deporte).',
      'Socializa a través de la actividad física — el compromiso social mejora la constancia (ejemplo: queda con un amigo para caminar en vez de para tomar un café).',
      'Incluye la actividad física cuando planifiques tu día.',
      'Comienza planteándote objetivos razonables y elige actividades de intensidad, volumen y frecuencia acorde a tu condición.',
    ],
    links: [
      {
        label: 'Guía para planificar y empezar con actividad física (Gencat / Comunidad de Madrid)',
        url: 'https://scientiasalut.gencat.cat/bitstream/handle/11351/6831.2/guia_ajuda_per_fer_mes_activitat_fisica_quatre_passos_2024_cas.pdf?sequence=10&isAllowed=y',
      },
    ],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add nodes/actividad-fisica.js
git commit -m "feat: add actividad-fisica node data"
```

---

### Task 4: Create nodes/higiene.js

**Files:**
- Create: `nodes/higiene.js`

- [ ] **Step 1: Create the file**

```js
export default {
  key: 'higiene',
  label: 'Higiene y Cuidado Personal',
  category: 'fisico',

  definition: 'La higiene personal puede definirse como una práctica que contribuye a mantener la salud y prevenir enfermedades, especialmente a través de la limpieza personal. Es darle al cuerpo la atención y limpieza para que funcione sin riesgo de enfermedades. (Satish Kumar et al., 2020)',

  question: 'Seguramente sientas que mantienes unos hábitos adecuados de higiene y cuidado personal físico en tu día a día. PERO… ¿has notado momentos de dejadez física por cansancio o sobrecarga?',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que cuidas esta parte tan importante del autocuidado físico. Mantener hábitos de higiene y cuidado personal es una base fundamental para sostener tu bienestar en el día a día. Sigue así, incluso en los momentos de más carga.',
      learnMore: 'La investigación muestra que mantener rutinas básicas de cuidado corporal no solo tiene beneficios físicos, sino también psicológicos.',
    },
    no: {
      heading: 'Vaya…',
      text: 'La higiene y cuidado personal son una parte muy importante del autocuidado físico. Mantener estos hábitos es una base fundamental para sostener tu bienestar en el día a día, incluso en los momentos de más carga.',
      learnMore: 'La investigación muestra que mantener rutinas básicas de cuidado corporal no solo tiene beneficios físicos, sino también psicológicos.',
    },
    unsure: {
      heading: 'Es normal',
      text: 'La higiene y cuidado físico contempla un montón de factores que pueden ser difíciles de identificar. Nos alegra que estés interesada/o en conocerlos. Mantener estos hábitos es una base fundamental para sostener tu bienestar en el día a día.',
      learnMore: 'La investigación muestra que mantener rutinas básicas de cuidado corporal no solo tiene beneficios físicos, sino también psicológicos.',
    },
  },

  evidence: {
    intro: 'La evidencia científica respalda la importancia de la higiene personal:',
    bullets: [
      'Una buena higiene y aseo personal es la principal barrera contra numerosas enfermedades transmisibles e infecciones, incluyendo las fecales-orales y respiratorias (Satish Kumar et al., 2020; UNICEF).',
      'Cuando las personas conocen bien las formas de mantener la higiene personal, contribuyen significativamente a promover la buena salud y el bienestar, tanto físico como psicológico (Kapur, 2023).',
      'Las rutinas de higiene mejoran los rasgos generales de la personalidad y las condiciones de vida (Kapur, 2023).',
    ],
  },

  tips: {
    intro: 'Las rutinas físicas básicas funcionan como señales externas de autocuidado. Algunos de los principales hábitos de higiene son:',
    items: [
      'Bañarse o ducharse diariamente.',
      'Cuidar la higiene dental.',
      'Cuidar el cabello.',
      'Lavarse los pies adecuadamente, incluyendo el cuidado de las uñas.',
      'Lavarse las manos frecuentemente — especialmente después de tocar animales, toser o estornudar, o estar cerca de alguien enfermo.',
      'Lavado de ropa regular.',
      'Mantener limpios los espacios o ambientes en los que se convive.',
      'Cuidar la preparación de los alimentos.',
    ],
    links: [],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add nodes/higiene.js
git commit -m "feat: add higiene node data"
```

---

### Task 5: Create nodes/autoconocimiento.js

**Files:**
- Create: `nodes/autoconocimiento.js`

- [ ] **Step 1: Create the file**

```js
export default {
  key: 'autoconocimiento',
  label: 'Autoconocimiento e Inteligencia Emocional',
  category: 'emocional',

  definition: 'La inteligencia emocional se ha definido como un conjunto de habilidades relacionadas con la percepción, comprensión, regulación y uso de las emociones propias y ajenas. (Caballero-García y Ruiz, 2025)',

  question: '¿Crees que eres capaz de identificar y poner nombre a tus emociones? Esto implica reconocer señales internas, estados emocionales y cambios de ánimo.',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que eres capaz de identificar y poner nombre a tus emociones. Reconocer lo que sientes, atender a tus señales internas y detectar cambios en tu estado de ánimo es una habilidad clave para el autocuidado emocional. Seguir cultivando esta capacidad te ayudará a gestionar mejor tu bienestar, especialmente en contextos de alta demanda como la docencia.',
      learnMore: 'La investigación indica que desarrollar el autoconocimiento emocional es beneficioso tanto para el bienestar global como para afrontar de manera más eficaz las demandas del día a día.',
    },
    no: {
      heading: 'Vaya…',
      text: 'Puede que no lo tengas muy presente, pero el autoconocimiento emocional es una parte muy importante para el Bienestar Global. Ser capaz de identificar lo que sientes es una base fundamental para sostener tu bienestar, especialmente en los momentos de mayor carga emocional. Desarrollar esta capacidad no significa hacerlo todo "perfecto", sino empezar a prestar atención a lo que ocurre dentro de ti.',
      learnMore: 'La investigación indica que desarrollar el autoconocimiento emocional es beneficioso tanto para el bienestar global como para afrontar de manera más eficaz las demandas del día a día.',
    },
    unsure: {
      heading: 'Es normal',
      text: 'El autoconocimiento emocional incluye muchos aspectos — reconocer señales internas, identificar estados emocionales o detectar cambios de ánimo — y no siempre resulta fácil saber si lo estamos haciendo o no. Nos alegra que te interese conocer mejor esta parte del autocuidado emocional.',
      learnMore: 'La investigación indica que desarrollar el autoconocimiento emocional es beneficioso tanto para el bienestar global como para afrontar de manera más eficaz las demandas del día a día.',
    },
  },

  evidence: {
    intro: 'La investigación acumulada muestra de forma consistente que las competencias emocionales se relacionan con:',
    bullets: [
      'Niveles más elevados de bienestar subjetivo, mayor satisfacción con la vida, una presencia más frecuente de emociones positivas y menores niveles de malestar psicológico (Caballero-García y Ruiz, 2025).',
      'La inteligencia emocional permite manejar de manera más eficaz las exigencias emocionales cotidianas y promueve estrategias adaptativas de afrontamiento del estrés.',
      'Es un recurso personal fundamental para el bienestar general y la adaptación a los desafíos diarios, especialmente en entornos con altas demandas emocionales y sociales (Caballero-García y Ruiz, 2025).',
    ],
  },

  tips: {
    intro: 'Algunos puntos importantes que permiten fortalecer tu inteligencia emocional (Ronda, 2017):',
    items: [
      'Identifica la emoción: aprende a reconocer las emociones y presta atención a la reacción del cuerpo.',
      'Presta más atención a tu respuesta que a la situación en sí.',
      'Expresa las emociones de manera adecuada.',
      'Realiza una vivencia experiencial con el cuerpo.',
      'Sé honesto/a con lo que sientes y lo que haces.',
      'Elige la mejor situación para expresarte.',
      'Usa la Rueda de las Emociones de Plutchik (1980): identifica primero la emoción básica y luego afina hacia la emoción específica que mejor describe tu vivencia.',
    ],
    links: [
      {
        label: 'Ejercicio práctico de exploración emocional durante 5 días — Universidad de Deusto (2025)',
        url: 'https://share.google/Wek6VEk6kqexd6NC7',
      },
    ],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add nodes/autoconocimiento.js
git commit -m "feat: add autoconocimiento node data"
```

---

### Task 6: Create nodes/afrontamiento.js

**Files:**
- Create: `nodes/afrontamiento.js`

Note: Source PPTX marks this content as incomplete ("falta Patri"). All content fields use placeholder strings the team can replace later.

- [ ] **Step 1: Create the file**

```js
export default {
  key: 'afrontamiento',
  label: 'Estrategias de Afrontamiento Adaptativas',
  category: 'emocional',

  definition: 'Las estrategias de afrontamiento adaptativas son recursos psicológicos que permiten gestionar situaciones estresantes o difíciles de forma saludable, promoviendo el bienestar y la resiliencia personal. (Contenido en desarrollo)',

  question: '¿Utilizas estrategias adaptativas para hacer frente a situaciones difíciles o estresantes en tu día a día?',

  responses: {
    si:     { heading: '¡Zorionak!',  text: 'Contenido en desarrollo.', learnMore: '' },
    no:     { heading: 'Vaya…',       text: 'Contenido en desarrollo.', learnMore: '' },
    unsure: { heading: 'Es normal',   text: 'Contenido en desarrollo.', learnMore: '' },
  },

  evidence: {
    intro: 'Contenido en desarrollo.',
    bullets: [],
  },

  tips: {
    intro: 'Contenido en desarrollo.',
    items: [],
    links: [],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add nodes/afrontamiento.js
git commit -m "feat: add afrontamiento node data (placeholder — content pending)"
```

---

### Task 7: Create nodes/mindfulness.js

**Files:**
- Create: `nodes/mindfulness.js`

- [ ] **Step 1: Create the file**

```js
export default {
  key: 'mindfulness',
  label: 'Mindfulness / Atención Consciente',
  category: 'espiritual',

  definition: 'El mindfulness puede concebirse como una forma de atención consciente al momento presente, caracterizada por una actitud de observación sin juicios, reactiva ni evaluativa, y con una disposición abierta. Esta conciencia se desarrolla mediante una manera específica de atender a la experiencia inmediata. (Kabat-Zinn, 2015)',

  question: '¿Practicas meditación o atención consciente, aunque sea de forma breve? Incluye mindfulness formal o atención plena en actividades cotidianas.',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que incorporas la meditación o la práctica de mindfulness en tu día a día. Dedicar tiempo a la atención consciente te permite conectar con el momento presente, escuchar tus señales internas y relacionarte con tus experiencias de una manera más calmada y no enjuiciadora. Seguir cultivando esta práctica puede ayudarte a gestionar mejor el estrés y a cuidar tu bienestar emocional, especialmente en contextos de alta demanda como la docencia.',
      learnMore: 'La investigación indica que la práctica de la atención consciente o mindfulness tiene efectos positivos sobre el bienestar global y contribuye a afrontar de manera más eficaz las demandas del día a día.',
    },
    no: {
      heading: 'Vaya…',
      text: 'Puede que ahora mismo no practiques la atención consciente o mindfulness, y eso es totalmente comprensible. Aun así, prestar atención a lo que ocurre dentro de ti es una parte importante del bienestar global. Empezar no implica hacerlo "bien" ni de forma perfecta, sino simplemente detenerse de vez en cuando y observar con curiosidad lo que está pasando.',
      learnMore: 'La investigación indica que la práctica de la atención consciente o mindfulness tiene efectos positivos sobre el bienestar global y contribuye a afrontar de manera más eficaz las demandas del día a día.',
    },
    unsure: {
      heading: 'Es completamente normal',
      text: 'La práctica de la atención consciente o mindfulness puede adoptar muchas formas y no siempre resulta fácil identificar si la estamos practicando o en qué medida. Nos alegra que te interese conocer y explorar mejor esta parte del autocuidado y el bienestar personal.',
      learnMore: 'La investigación indica que la práctica de la atención consciente o mindfulness tiene efectos positivos sobre el bienestar global y contribuye a afrontar de manera más eficaz las demandas del día a día.',
    },
  },

  evidence: {
    intro: 'La literatura científica respalda ampliamente la eficacia del mindfulness:',
    bullets: [
      'Las prácticas de mindfulness se asocian con el fortalecimiento de procesos cognitivos como la memoria, la capacidad cognitiva y la regulación de las respuestas emocionales (Tejada-Simón y Lodhi, 2022).',
      'La meditación se relaciona con una menor presencia de síntomas mentales, emocionales y físicos vinculados al estrés, el agotamiento y los sentimientos de desesperanza.',
      'Incluso intervenciones breves pueden influir en múltiples resultados de salud, incluso tras una sola sesión de tan solo 5 minutos (Howarth et al., 2019).',
    ],
  },

  tips: {
    intro: 'Integrar micro-pausas conscientes de 30–60 segundos a lo largo del día ayuda a regular el estrés en tiempo real:',
    items: [
      'Lávate los dientes prestando atención a las sensaciones y movimientos.',
      'Durante la ducha, nota el contacto del agua con el cuerpo.',
      'Al conducir o caminar, sé consciente de la respiración y del entorno.',
      'Antes de empezar una tarea, detente brevemente para conectar con el cuerpo y la respiración.',
      'Recuerda que no es necesario dedicar mucho tiempo: unos pocos minutos al día, de forma regular, ya pueden marcar la diferencia.',
    ],
    links: [
      {
        label: 'Para la mañana (5 min) — Empezar el día con calma y claridad mental',
        url: 'https://www.youtube.com/watch?v=FAk0K00j1ps',
      },
      {
        label: 'Para cualquier momento del día (6 min) — Pausa consciente y reducción del estrés',
        url: 'https://www.youtube.com/watch?v=0sjVoX5ASwg',
      },
      {
        label: 'Para la noche (10 min) — Mindfulness para un sueño reparador',
        url: 'https://www.youtube.com/watch?v=fcsFdEqOeCI',
      },
    ],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add nodes/mindfulness.js
git commit -m "feat: add mindfulness node data"
```

---

### Task 8: Create nodes/participacion.js

**Files:**
- Create: `nodes/participacion.js`

- [ ] **Step 1: Create the file**

```js
export default {
  key: 'participacion',
  label: 'Participación Activa en Grupos Espiritual o Basado en Valores',
  category: 'espiritual',

  definition: 'La participación comunitaria se define como las interacciones con organizaciones establecidas, como comunidades voluntarias, culturales, deportivas, de ocio y religiosas. El autocuidado espiritual parte de una concepción amplia de la espiritualidad entendida como la búsqueda de significado, propósito y calma interior, independientemente de que esté asociada o no a creencias religiosas. (Chen et al., 2025; Puchalski et al., 2014)',

  question: '¿Participas en algún grupo espiritual o basado en valores compartidos? No implica necesariamente que sea un grupo religioso.',

  responses: {
    si: {
      heading: '¡Zorionak!',
      text: 'Nos alegra saber que participas en grupos comunitarios, espirituales o basados en valores. Formar parte activa de estos espacios favorece la conexión con otras personas, el sentido de pertenencia y la coherencia con los propios valores. Seguir implicándote puede ayudarte a afrontar mejor el estrés y a cuidar tu bienestar personal, especialmente en contextos de alta demanda como la docencia.',
      learnMore: 'La investigación indica que la participación activa en grupos comunitarios, espirituales o basados en valores se asocia con efectos positivos sobre el bienestar global.',
    },
    no: {
      heading: 'Vaya…',
      text: 'Puede que en este momento no formes parte de ningún grupo comunitario, espiritual o basado en valores, y eso es totalmente comprensible. Aun así, conectar con otras personas y con aquello que consideras importante puede ser una parte relevante del bienestar global. Empezar a implicarte no implica hacerlo "bien", sino dar pequeños pasos y explorar qué espacios encajan contigo.',
      learnMore: 'La investigación indica que la participación en grupos comunitarios, espirituales o basados en valores tiene efectos positivos sobre el bienestar global.',
    },
    unsure: {
      heading: 'Es completamente normal',
      text: 'La participación en grupos comunitarios, espirituales o basados en valores puede adoptar muchas formas y no siempre resulta fácil identificar si estamos implicándonos o en qué medida. Nos alegra que te interese conocer y explorar mejor esta vía de autocuidado y bienestar personal.',
      learnMore: 'La investigación indica que la participación en grupos comunitarios, espirituales o basados en valores tiene efectos positivos sobre el bienestar global.',
    },
  },

  evidence: {
    intro: 'La participación comunitaria aporta beneficios demostrados (Chen et al., 2025):',
    bullets: [
      'Fomenta el empoderamiento personal y comunitario, al facilitar una implicación activa y significativa con la sociedad, contribuyendo al desarrollo y florecimiento tanto individual como colectivo.',
      'Se asocia con mejores niveles de salud y bienestar, incluyendo mayor sensación de bienestar general, mejor salud mental y mayor cohesión social, tanto en grupos seculares como religiosos.',
      'Contribuye a reducir riesgos para la salud, como una menor probabilidad de mortalidad y de problemas de salud mental, así como un mejor funcionamiento físico.',
      'Favorece el bienestar psicosocial, promoviendo relaciones sociales de apoyo, sentido de pertenencia y conexión con otras personas.',
      'Refuerza la cohesión social y ofrece una vía relevante para afrontar problemáticas actuales como la soledad y el aislamiento social.',
    ],
  },

  tips: {
    intro: 'A la luz de la evidencia científica, te animamos a participar de forma activa en grupos comunitarios, espirituales o basados en valores:',
    items: [
      'Formar parte de estos espacios favorece el sentido de pertenencia, la conexión con otras personas y la coherencia con los propios valores.',
      'Se asocia con beneficios claros para la salud, el bienestar y el afrontamiento del estrés.',
      'Mantener esta implicación puede ser una estrategia valiosa para cuidar tu bienestar personal, especialmente en contextos de alta demanda.',
      'Si no sabes por dónde empezar, explora grupos de voluntariado, actividades culturales o deportivas, o comunidades que compartan tus valores.',
    ],
    links: [],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add nodes/participacion.js
git commit -m "feat: add participacion node data"
```

---

### Task 9: Create js/renderer.js

**Files:**
- Create: `js/renderer.js`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p js
```

```js
export function renderDefinition(node) {
  document.getElementById('def-badge').textContent = node.label;
  document.getElementById('def-text').textContent = node.definition;
}

export function renderQuestion(node) {
  document.getElementById('q-badge').textContent = node.label;
  document.getElementById('q-text').textContent = node.question;
}

export function renderResponse(node, answer) {
  const r = node.responses[answer];
  document.getElementById('resp-badge').textContent = node.label;
  document.getElementById('resp-heading').textContent = r.heading;
  document.getElementById('resp-text').textContent = r.text;
  const learnMoreEl = document.getElementById('resp-learnmore');
  learnMoreEl.textContent = r.learnMore;
  learnMoreEl.style.display = r.learnMore ? 'block' : 'none';
}

export function renderEvidence(node) {
  document.getElementById('ev-badge').textContent = node.label;
  document.getElementById('ev-intro').textContent = node.evidence.intro;
  const ul = document.getElementById('ev-bullets');
  ul.innerHTML = '';
  node.evidence.bullets.forEach(b => {
    const li = document.createElement('li');
    li.textContent = b;
    ul.appendChild(li);
  });
}

export function renderTips(node) {
  document.getElementById('tips-badge').textContent = node.label;
  document.getElementById('tips-intro').textContent = node.tips.intro;

  const ul = document.getElementById('tips-list');
  ul.innerHTML = '';
  node.tips.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  const linksDiv = document.getElementById('tips-links');
  linksDiv.innerHTML = '';
  (node.tips.links || []).forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.label;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'tip-link';
    linksDiv.appendChild(a);
  });
}

export function updateDots(answers) {
  Object.entries(answers).forEach(([key, answer]) => {
    const dot = document.getElementById('dot-' + key);
    if (!dot) return;
    if (!answer) {
      dot.style.display = 'none';
    } else {
      dot.style.display = 'block';
      dot.className = 'dot ' + answer;
    }
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add js/renderer.js
git commit -m "feat: add renderer.js — DOM population functions"
```

---

### Task 10: Create js/app.js

**Files:**
- Create: `js/app.js`

- [ ] **Step 1: Create the file**

```js
import alimentacion     from '../nodes/alimentacion.js';
import actividadFisica  from '../nodes/actividad-fisica.js';
import higiene          from '../nodes/higiene.js';
import autoconocimiento from '../nodes/autoconocimiento.js';
import afrontamiento    from '../nodes/afrontamiento.js';
import mindfulness      from '../nodes/mindfulness.js';
import participacion    from '../nodes/participacion.js';
import {
  renderDefinition,
  renderQuestion,
  renderResponse,
  renderEvidence,
  renderTips,
  updateDots,
} from './renderer.js';

const NODES = Object.fromEntries(
  [alimentacion, actividadFisica, higiene, autoconocimiento, afrontamiento, mindfulness, participacion]
    .map(n => [n.key, n])
);

const SCREEN_FLOW = {
  'screen-definition': 'screen-question',
  'screen-response':   'screen-evidence',
  'screen-evidence':   'screen-tips',
};

let currentNode = null;
const answers = {};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function openNode(key) {
  currentNode = key;
  renderDefinition(NODES[key]);
  showScreen('screen-definition');
}

function submitAnswer(answer) {
  answers[currentNode] = answer;
  const node = NODES[currentNode];
  renderResponse(node, answer);
  renderEvidence(node);
  renderTips(node);
  updateDots(answers);
  showScreen('screen-response');
}

function goNext(fromScreen) {
  if (fromScreen === 'screen-definition') {
    renderQuestion(NODES[currentNode]);
  }
  showScreen(SCREEN_FLOW[fromScreen]);
}

function goToMap() {
  currentNode = null;
  showScreen('screen-map');
}

window.app = { openNode, submitAnswer, goNext, goToMap };
```

- [ ] **Step 2: Commit**

```bash
git add js/app.js
git commit -m "feat: add app.js — state, navigation, node registry"
```

---

### Task 11: End-to-End Manual Test

**Files:** none (verification only)

- [ ] **Step 1: Start local server**

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/autocuidado.html`. Check browser console (F12) — no errors expected.

- [ ] **Step 2: Verify map screen**

Expected: title visible, 3 branch columns, Físico has 3 orange sub-nodes, Emocional has 2, Espiritual has 2. All 7 nodes show hover lift effect. No dot indicators visible.

- [ ] **Step 3: Full flow for Alimentación → Sí**

Click "Alimentación":
1. **Definition**: badge "Alimentación", text about 4 principios, "Continuar →" button visible
2. Click "Continuar →" → **Question**: "?" icon, question text, 3 answer buttons + legend
3. Click "Sí" → **Response**: "¡Zorionak!", response text, learnMore teaser, "Ver más →"
4. Click "Ver más →" → **Evidence**: intro text, 4 bullets with orange left border, "Ver consejos →"
5. Click "Ver consejos →" → **Tips**: intro, 4 items with "→" prefix, no links, "← Volver al mapa"
6. Click "← Volver al mapa" → **Map**: green dot on Alimentación node

- [ ] **Step 4: Verify No and unsure dot colours**

Click "Actividad Física" → answer "No" → complete flow → map: red dot on Actividad Física.
Click "Higiene y Cuidado Personal" → answer "No estoy seguro/a" → complete flow → map: yellow dot on Higiene.

- [ ] **Step 5: Verify remaining 4 nodes open without console errors**

Click Autoconocimiento, Afrontamiento, Mindfulness, Participación in turn, complete each flow. For Afrontamiento: evidence screen shows "Contenido en desarrollo." with no bullets — expected. For Mindfulness tips: 3 YouTube links rendered as underlined anchors.

- [ ] **Step 6: Responsive check at 375px**

Open DevTools → Toggle device toolbar → set width 375px. Expected: branches stack vertically, connector lines disappear, answer buttons and action buttons go full width.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete autocuidado 6-screen modular ES-module refactor"
```
