// Navigation remains fully usable when JavaScript is disabled.
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const visibleSections = new Map();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.boundingClientRect.top);
      else visibleSections.delete(entry.target.id);
    }
    const current = sections.find(section => visibleSections.has(section.id));
    for (const link of links) {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, {rootMargin: '-90px 0px -35% 0px', threshold: 0});
  sections.forEach(section => observer.observe(section));
}
