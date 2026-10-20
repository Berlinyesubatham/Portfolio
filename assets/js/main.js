  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id], main[id]');
  const setActive = () => {
    let current = 'home';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', setActive);

  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = [...skillCards].indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('is-visible'), index * 75);
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  skillCards.forEach(card => {
    skillObserver.observe(card);
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 22;
      const rotateX = (0.5 - (y / rect.height)) * 22;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);
      card.style.setProperty('--shadow-x', `${rotateY * -.7}px`);
      card.style.setProperty('--shadow-y', `${18 + Math.abs(rotateX) * .55}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--shadow-x', '0px');
      card.style.setProperty('--shadow-y', '20px');
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  document.querySelectorAll('.reveal-item, .reveal-track').forEach(item => revealObserver.observe(item));

  
