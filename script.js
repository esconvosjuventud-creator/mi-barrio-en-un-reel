const closingDate = new Date('2026-08-27T23:59:59-03:00').getTime();
const openingDate = new Date('2026-08-01T00:00:00-03:00').getTime();
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const pad = (n) => String(Math.max(0,n)).padStart(2,'0');

function updateCountdown(){
  const now = Date.now();
  const diff = closingDate - now;
  if(diff <= 0){
    $('#countdown').innerHTML = '<div class="closed-message">Las inscripciones finalizaron.</div>';
    $('#countdown-status').textContent = 'Consultá los canales oficiales para conocer las próximas etapas.';
    $('#days-mini').textContent = '0';
  } else {
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    $('#days').textContent = pad(d); $('#hours').textContent = pad(h); $('#minutes').textContent = pad(m); $('#seconds').textContent = pad(s); $('#days-mini').textContent = d;
  }
  const total = closingDate-openingDate;
  const elapsed = Math.min(Math.max(now-openingDate,0),total);
  const pct = Math.round((elapsed/total)*100);
  $('#progress-bar').style.width = pct+'%';
  $('#progress-text').textContent = now < openingDate ? 'Próximamente' : now > closingDate ? 'Finalizado' : `${pct}% transcurrido`;
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

$('.menu-toggle')?.addEventListener('click',()=>{
  const nav = $('.site-header nav'); nav.classList.toggle('open');
  $('.menu-toggle').setAttribute('aria-expanded',nav.classList.contains('open'));
});
$$('.site-header nav a').forEach(a=>a.addEventListener('click',()=>$('.site-header nav')?.classList.remove('open')));

const placeIdeas = {
  'Trinidad':'Mostrá una plaza, una historia familiar, un oficio, un espacio deportivo o una escena cotidiana que represente tu forma de vivir la ciudad.',
  'Ismael Cortinas':'Contá una historia del pueblo, sus encuentros, tradiciones, comercios, paisajes o personas que hacen comunidad.',
  'Andresito':'Podés registrar naturaleza, agua, caminos, recuerdos, actividades familiares o la vida alrededor del entorno local.',
  'La Casilla':'Buscá una historia cercana: una familia, una costumbre, un rincón cotidiano o una experiencia compartida.',
  'Cerro Colorado':'Mostrá el paisaje, la vida rural, una tradición, un oficio o una persona que represente la identidad de la zona.'
};
$$('.map-pin').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.map-pin').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  $('#place-card h3').textContent = btn.dataset.place;
  $('#place-card > p:not(.eyebrow)').textContent = placeIdeas[btn.dataset.place];
}));

const shareText = '🎬 Mi Barrio en un Reel: mostrá tu lugar, contá su historia y compartí tu mirada. Inscripciones abiertas.';
function shareWhatsApp(){window.open(`https://wa.me/?text=${encodeURIComponent(shareText+' '+location.href)}`,'_blank','noopener')}
$$('[data-share="whatsapp"],[data-invite]').forEach(b=>b.addEventListener('click',shareWhatsApp));
$('[data-share="facebook"]')?.addEventListener('click',()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`,'_blank','noopener'));
$('[data-share="copy"]')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('#copy-message').textContent='Enlace copiado.'}catch{$('#copy-message').textContent='Copiá la dirección desde la barra del navegador.'}});

const answers = {
  edad:'Pueden participar jóvenes de 14 a 29 años vinculados al departamento de Flores.',
  duracion:'El Reel debe durar entre 15 y 60 segundos.',
  equipo:'Sí. La participación puede ser individual o en equipo.',
  fecha:'La fecha límite es el 27 de agosto de 2026 a las 23:59.',
  bases:'Encontrás el botón “Descargar bases” en la portada de esta página.'
};
$$('[data-question]').forEach(b=>b.addEventListener('click',()=>{$('#assistant-answer').textContent=answers[b.dataset.question]}));

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}
