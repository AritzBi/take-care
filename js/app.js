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
  // renderResponse/Evidence/Tips are pre-rendered in submitAnswer; only question needs lazy render here
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
