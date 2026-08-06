document.documentElement.classList.add('js');

const items = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

items.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
  observer.observe(item);
});
// ============================
// CONTADOR REGRESIVO
// ============================

// Cambiar por la fecha de cierre del concurso
const fechaFinal = new Date("2026-09-15T23:59:59").getTime();

const contador = setInterval(() => {

    const ahora = new Date().getTime();

    const diferencia = fechaFinal - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

    if (diferencia <= 0) {

        clearInterval(contador);

        document.getElementById("contador").innerHTML =
        "<h2>🚀 Las inscripciones finalizaron.</h2>";

    }

},1000);
