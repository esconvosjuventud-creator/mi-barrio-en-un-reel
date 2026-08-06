(() => {
  'use strict';
  const deadline = new Date('2026-08-27T23:59:59-03:00');
  const start = new Date('2026-08-01T00:00:00-03:00');
  const ids = ['days','hours','minutes','seconds'];
  const pad = (n) => String(Math.max(0,n)).padStart(2,'0');

  function updateCountdown(){
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const status = document.getElementById('countdown-status');
    const countdown = document.getElementById('countdown');

    if(diff <= 0){
      ids.forEach(id => document.getElementById(id).textContent = '00');
      if(status) status.textContent = 'El período de inscripción ha finalizado.';
      if(countdown) countdown.setAttribute('aria-label','Inscripciones finalizadas');
    } else {
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      document.getElementById('days').textContent = pad(days);
      document.getElementById('hours').textContent = pad(hours);
      document.getElementById('minutes').textContent = pad(minutes);
      document.getElementById('seconds').textContent = pad(seconds);
    }

    const total = deadline.getTime() - start.getTime();
    const elapsed = Math.min(Math.max(now.getTime() - start.getTime(),0),total);
    const percent = total > 0 ? Math.round((elapsed/total)*100) : 100;
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    if(bar) bar.style.width = `${percent}%`;
    if(text) text.textContent = diff > 0 ? `${percent}% del período transcurrido` : 'Período finalizado';
  }
  updateCountdown();
  setInterval(updateCountdown,1000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const url = 'https://esconvosjuventud-creator.github.io/mi-barrio-en-un-reel/';
  const message = '🎬 Mi Barrio en un Reel: mostrá tu lugar, contá su historia y compartí tu mirada. Inscripciones hasta el 27 de agosto de 2026.';
  const copyMessage = document.getElementById('copy-message');
  document.querySelectorAll('[data-share]').forEach(button => {
    button.addEventListener('click', async () => {
      const type = button.dataset.share;
      if(type === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`,'_blank','noopener');
      if(type === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,'_blank','noopener');
      if(type === 'copy'){
        try{ await navigator.clipboard.writeText(url); copyMessage.textContent = '✓ Enlace copiado.'; }
        catch{ copyMessage.textContent = `Copiá este enlace: ${url}`; }
        setTimeout(() => copyMessage.textContent = '',3000);
      }
    });
  });

  document.querySelectorAll('details').forEach(item => {
    item.addEventListener('toggle', () => {
      const mark = item.querySelector('summary span');
      if(mark) mark.textContent = item.open ? '−' : '＋';
    });
  });

  if('serviceWorker' in navigator){
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }
})();
