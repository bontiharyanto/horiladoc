// Ubah <pre><code class="language-mermaid">...</code></pre>
// menjadi <div class="mermaid">...</div> agar pasti diparse Mermaid.
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('code.language-mermaid').forEach(code => {
    const pre = code.closest('pre');
    if (!pre) return;
    const div = document.createElement('div');
    div.className = 'mermaid';
    // gunakan textContent agar karakter tidak ter-escape
    div.textContent = code.textContent;
    pre.replaceWith(div);
  });

  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: true, securityLevel: 'loose' });
    // paksa init pada elemen yang baru di-convert
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
  }
});
