(function () {
  function renderMermaid() {
    document.querySelectorAll(
      'pre code.language-mermaid, pre code.mermaid, pre code[class*="language-mermaid"]'
    ).forEach((code) => {
      const pre = code.parentElement;
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = code.textContent;
      pre.replaceWith(div);
    });

    if (window.mermaid) {
      mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', logLevel: 'debug' });
      mermaid.run({ querySelector: '.mermaid' });
    }
  }

  document.addEventListener('DOMContentLoaded', renderMermaid);
  if (window.document$ && window.document$.subscribe) {
    window.document$.subscribe(renderMermaid);
  }
})();
