/* MediKiosk AI Summary API client. UI-neutral. */
(function () {
  const cfg = Object.assign({ endpoint: '/api/ai/summarize-history', enabled: true }, window.MEDIKIOSK_AI_CONFIG || {});
  window.MediKioskAISummary = {
    async summarize(payload) {
      if (!cfg.enabled) return null;
      const res = await fetch(cfg.endpoint, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          previousHistory: payload.previousHistory || '',
          currentIssue: payload.currentIssue || '',
          adaptiveQuestionnaire: payload.adaptiveQuestionnaire || '',
          patientContext: payload.patientContext || {}
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'AI summary request failed');
      return data;
    }
  };
})();
