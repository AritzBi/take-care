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
  const imgDiv = document.getElementById('ev-images');
  imgDiv.innerHTML = '';
  (node.evidence.images || []).forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'node-img';
    imgDiv.appendChild(img);
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

  const imgDiv = document.getElementById('tips-images');
  imgDiv.innerHTML = '';
  (node.tips.images || []).forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'node-img';
    imgDiv.appendChild(img);
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
    dot.style.display = 'block';
    dot.className = 'dot ' + answer;
  });
}
