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
