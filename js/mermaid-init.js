window.addEventListener('DOMContentLoaded', () => {
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: 'loose' // agar ikon/simbol tidak difilter
    });
  }
});
