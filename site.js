'use strict';

// These examples are static illustrations. No network requests or stored records.
const switches = document.querySelectorAll('[data-example]');
const panels = document.querySelectorAll('[data-panel]');
for (const button of switches) {
  button.addEventListener('click', () => {
    for (const item of switches) item.setAttribute('aria-pressed', String(item === button));
    for (const panel of panels) panel.hidden = panel.dataset.panel !== button.dataset.example;
  });
}
