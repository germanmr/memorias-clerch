(function () {
  const LABELS = {
    es: {
      ancestorsTitle: "Linaje directo Clerch (1615–1922)",
      ancestorsLead: "Nueve generaciones en Das, Gerona, hasta Salvador Clerch y Buenaventura Casals.",
      siblingsTitle: "Hijos de Salvador y Buenaventura",
      estebanTitle: "Familia de Esteban Clerch y Dolores Bidart",
      marcosTitle: "Familia de Marcos Clerch e Isabel González",
      born: "n.",
      died: "f.",
      wed: "cas.",
      spouse: "con",
      author: "autor de las memorias",
      deceased: "fallecido",
      das: "Das"
    },
    ca: {
      ancestorsTitle: "Llinatge directe Clerch (1615–1922)",
      ancestorsLead: "Nou generacions a Das, Girona, fins a Salvador Clerch i Buenaventura Casals.",
      siblingsTitle: "Fills de Salvador i Buenaventura",
      estebanTitle: "Família d'Esteban Clerch i Dolores Bidart",
      marcosTitle: "Família de Marcos Clerch i Isabel González",
      born: "n.",
      died: "m.",
      wed: "cas.",
      spouse: "amb",
      author: "autor de les memòries",
      deceased: "finat",
      das: "Das"
    }
  };

  function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function metaLine(node, L) {
    const parts = [];
    if (node.born) parts.push(typeof node.born === 'number' ? `${L.born} ${node.born}` : node.born);
    if (node.died) parts.push(`${L.died} ${node.died}`);
    if (node.place) parts.push(node.place);
    if (node.note) parts.push(node.note);
    return parts.join(' · ');
  }

  function personCard(node, L, extraClass) {
    const cls = ['tree-card', extraClass, node.highlight ? 'tree-card--highlight' : '', node.author ? 'tree-card--author' : '', node.died ? 'tree-card--deceased' : ''].filter(Boolean).join(' ');
    const badge = node.author ? `<span class="tree-badge">${esc(L.author)}</span>` : '';
    const spouse = node.spouse
      ? `<div class="tree-spouse">${esc(L.spouse)} ${esc(typeof node.spouse === 'string' ? node.spouse : node.spouse.name)}${node.spouse.wed ? ` <span class="tree-meta">(${esc(L.wed)} ${esc(node.spouse.wed)})</span>` : ''}${node.spouse.born ? ` <span class="tree-meta">· ${esc(L.born)} ${node.spouse.born}</span>` : ''}${node.spouse.died ? ` <span class="tree-meta">· ${esc(L.died)} ${node.spouse.died}</span>` : ''}</div>`
      : '';
    return `<div class="${cls}">${badge}<div class="tree-name">${esc(node.name)}</div><div class="tree-meta">${esc(metaLine(node, L))}</div>${spouse}</div>`;
  }

  function renderBranch(node, L) {
    let html = `<div class="tree-branch">${personCard(node, L)}`;
    if (node.children && node.children.length) {
      html += '<div class="tree-children">';
      node.children.forEach(child => {
        html += '<div class="tree-child-col">';
        html += renderBranch(child, L);
        html += '</div>';
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderAncestors(ancestors, L) {
    return `<div class="tree-ladder">${ancestors.map((a, i) => {
      const spouseLine = a.spouse
        ? `<span class="tree-ladder-spouse">${esc(L.spouse)} ${esc(typeof a.spouse === 'string' ? a.spouse : a.spouse.name)}</span>`
        : '';
      return `<div class="tree-ladder-row ${a.highlight ? 'tree-ladder-row--highlight' : ''}">
        <div class="tree-ladder-year">${typeof a.born === 'number' ? a.born : ''}</div>
        <div class="tree-ladder-line"></div>
        <div class="tree-ladder-person">
          <strong>${esc(a.name)}</strong>
          ${a.died ? `<span class="tree-tag tree-tag--d">${esc(L.died)} ${a.died}</span>` : ''}
          ${spouseLine}
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  function renderSiblings(siblings, L) {
    return `<div class="tree-siblings">${siblings.map(s =>
      personCard(s, L, s.died ? 'tree-card--deceased' : '')
    ).join('')}</div>`;
  }

  window.renderGenealogyTree = function (lang, container) {
    const L = LABELS[lang] || LABELS.es;
    const D = window.GENEALOGY_TREE;
    if (!D || !container) return;

    container.innerHTML = `
      <div class="tree-section">
        <h3 class="tree-heading">${esc(L.ancestorsTitle)}</h3>
        <p class="tree-sublead">${esc(L.ancestorsLead)}</p>
        ${renderAncestors(D.ancestors, L)}
      </div>
      <div class="tree-section">
        <h3 class="tree-heading">${esc(L.siblingsTitle)}</h3>
        ${renderSiblings(D.siblings, L)}
      </div>
      <div class="tree-section tree-section--wide">
        <h3 class="tree-heading">${esc(L.estebanTitle)}</h3>
        <div class="tree-diagram">${renderBranch(D.esteban, L)}</div>
      </div>
      <div class="tree-section tree-section--wide">
        <h3 class="tree-heading">${esc(L.marcosTitle)}</h3>
        <div class="tree-diagram">${renderBranch(D.marcosBranch, L)}</div>
      </div>`;
  };
})();
