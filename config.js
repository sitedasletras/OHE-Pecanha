// ============================================================
// CONFIG.JS — INTERCEPTOR UNIVERSAL DE API KEY
// SIGMAL HQ · CELEIRO LITERÁRIO · W.S.P. S/A-ME
// Uso exclusivo: Wagner Planas
// ============================================================

const CONFIG = {
  ANTHROPIC_API_KEY: "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
", // ← sua chave já está aqui
  MODEL: "claude-sonnet-4-20250514",
  MAX_TOKENS: 1024
};

// Disponibiliza globalmente
window.ANTHROPIC_API_KEY = CONFIG.ANTHROPIC_API_KEY;
window.ANTHROPIC_MODEL = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;

// ============================================================
// INTERCEPTOR UNIVERSAL
// Substitui automaticamente qualquer chamada fetch para a API
// da Anthropic, injetando a chave correta — sem tocar nos HTMLs
// ============================================================

(function() {
  const _fetch = window.fetch;

  window.fetch = function(url, options) {
    // Só intercepta chamadas à API da Anthropic
    if (typeof url === 'string' && url.includes('anthropic.com')) {
      options = options || {};
      options.headers = options.headers || {};

      // Injeta a chave correta, sobrescrevendo qualquer valor antigo
      if (typeof options.headers === 'object' && !Array.isArray(options.headers)) {
        options.headers['x-api-key'] = CONFIG.ANTHROPIC_API_KEY;
        options.headers['anthropic-version'] = options.headers['anthropic-version'] || '2023-06-01';
        options.headers['anthropic-dangerous-direct-browser-access'] = 'true';
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
      }
    }

    return _fetch.apply(this, [url, options]);
  };
})();

// ============================================================
// FIM DO INTERCEPTOR
// ============================================================
