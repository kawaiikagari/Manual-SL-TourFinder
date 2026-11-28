'use strict';
(() => {
  const container = document.getElementById('guide-body');
  const english = document.getElementById('guide-english');
  const selector = document.getElementById('guide-language');
  const toolbar = selector.parentElement;
  const japanese = document.createElement('template');
  japanese.innerHTML = container.innerHTML;
  const storageKey = 'sl-tourfinder-manual-language';
  const allowed = value => ['auto', 'ja', 'en'].includes(value);
  const browserLanguage = () => /^ja(?:-|$)/i.test((navigator.languages || [])[0] || navigator.language || '') ? 'ja' : 'en';
  let saved = 'auto';
  try { saved = localStorage.getItem(storageKey) || 'auto'; } catch (_) {}
  const requested = new URLSearchParams(location.search).get('lang');
  selector.value = allowed(requested) ? requested : allowed(saved) ? saved : 'auto';
  let currentLanguage = 'ja';
  function goToAnchor(anchor) {
    if (!anchor) return;
    let id;
    try { id = decodeURIComponent(anchor.replace(/^#/, '')); } catch (_) { return; }
    const target = document.getElementById(id);
    if (!target) return;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
    }
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  function render(anchor) {
    const language = selector.value === 'auto' ? browserLanguage() : selector.value;
    if (language !== currentLanguage) {
      container.replaceChildren((language === 'en' ? english : japanese).content.cloneNode(true));
      currentLanguage = language;
    }
    container.querySelector('.guide-heading').appendChild(toolbar);
    container.lang = language;
    document.documentElement.lang = language;
    document.title = language === 'ja' ? 'SL Tour Finder — 取扱説明書' : 'SL Tour Finder — User Guide';
    goToAnchor(anchor);
  }
  selector.addEventListener('change', () => {
    const section = [...container.querySelectorAll('main > section')].find(node => {
      const rect = node.getBoundingClientRect();
      return rect.top <= 24 && rect.bottom > 24;
    });
    const anchor = section ? '#' + section.id : location.hash;
    try { localStorage.setItem(storageKey, selector.value); } catch (_) {}
    try {
      const url = new URL(location.href);
      if (selector.value === 'auto') url.searchParams.delete('lang');
      else url.searchParams.set('lang', selector.value);
      url.hash = anchor;
      history.replaceState(null, '', url.href);
    } catch (_) {}
    render(anchor);
    selector.focus({ preventScroll: true });
  });
  window.addEventListener('languagechange', () => {
    if (selector.value === 'auto') render(location.hash);
  });
  window.addEventListener('hashchange', () => goToAnchor(location.hash));
  render(location.hash);
})();
