    const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); });
  }, { threshold: 0.16 });
  document.querySelectorAll('.reveal-item').forEach(i => revealObserver.observe(i));

  /* ---------- journey scene + commute ---------- */
  (() => {
    const $ = id => document.getElementById(id);
    const st = $('jstage'); if (!st) return;
    const cards = [...document.querySelectorAll('.journey-item')], n = cards.length;
    const pal = [['#3b2468','#f0a36b'],['#3a2f7a','#b77fc4'],['#2f3d8f','#7fa6e8'],['#3a2f7a','#d98a8a'],['#2a1b52','#c46a8f'],['#150d30','#4a2a8a'],['#0d0720','#2a1a5a']];
    const hx = h => [1,3,5].map(i => parseInt(h.substr(i,2),16));
    const mix = (a,b,t) => '#' + hx(a).map((v,i) => Math.round(v + (hx(b)[i]-v)*t).toString(16).padStart(2,'0')).join('');
    const cl = (v,a=0,b=1) => Math.min(b, Math.max(a, v));
    const X0 = 70, XW = 730;
    $('flags').innerHTML = cards.map((c,i) => `<g class="flag" data-i="${i}" transform="translate(${X0 + i/(n-1)*XW} 215)"><line y2="-24"/><circle class="fc" cy="-28" r="6"/><circle cy="-22" r="16" fill="transparent"/></g>`).join('');
    const flags = [...st.querySelectorAll('.flag')];
    flags.forEach(f => f.addEventListener('click', () => { const r = cards[f.dataset.i].getBoundingClientRect(), sb = st.getBoundingClientRect().bottom; scrollBy({top: r.top + r.height/2 - (sb + (innerHeight - sb) * .42), behavior:'smooth'}); }));
    let walkT, last = -1, lastI = -1;
    function update() {
      const sb = st.getBoundingClientRect().bottom, anchor = sb + (innerHeight - sb) * .42, cs = cards.map(c => { const r = c.getBoundingClientRect(); return r.top + r.height/2; });
      let f = 0;
      if (anchor >= cs[n-1]) f = n-1;
      else if (anchor > cs[0]) for (let i = 0; i < n-1; i++) if (anchor < cs[i+1]) { f = i + (anchor-cs[i])/(cs[i+1]-cs[i]); break; }
      const p = f/(n-1), i = Math.round(f), k = Math.min(Math.floor(f), n-2), t = f - k;
      $('sk1').setAttribute('stop-color', mix(pal[k][0], pal[k+1][0], t));
      $('sk2').setAttribute('stop-color', mix(pal[k][1], pal[k+1][1], t));
      const sx = 70 + p*780, sy = 190 - Math.sin(Math.PI*p)*135, sc = mix('#f0b94d', '#f4efe6', cl((p-.6)/.25));
      ['sun','sunglow'].forEach(id => { $(id).setAttribute('cx', sx); $(id).setAttribute('cy', sy); $(id).setAttribute('fill', sc); });
      $('stars').setAttribute('opacity', cl((p-.55)/.3));
      $('h1').setAttribute('transform', `translate(${-p*90} 0)`);
      $('h2').setAttribute('transform', `translate(${-p*200} 0)`);
      const gx = X0 + p*XW; $('girl').setAttribute('transform', `translate(${gx} 215)`);
      const bx = cl(gx, 110, 810), bub = $('bubx'); $('bub').setAttribute('transform', `translate(${bx} 0)`);
      $('bubt').setAttribute('transform', `translate(${gx-bx} 0)`);
      if (i !== lastI) {
        bub.textContent = cards[i].dataset.say; const w = bub.getComputedTextLength() + 26;
        $('bubr').setAttribute('x', -w/2); $('bubr').setAttribute('width', w);
        cards.forEach((c,j) => c.classList.toggle('active', j === i));
        flags.forEach((fl,j) => fl.classList.toggle('on', j <= i));
        st.classList.toggle('finale', i === n-1); lastI = i;
      }
      if (Math.abs(f-last) > .0005) { st.classList.add('walking'); clearTimeout(walkT); walkT = setTimeout(() => st.classList.remove('walking'), 180); }
      last = f;
    }
    addEventListener('scroll', () => requestAnimationFrame(update), {passive:true});
    addEventListener('resize', update); update();
    document.fonts && document.fonts.ready.then(() => { lastI = -1; update(); });

    const tabs = [...document.querySelectorAll('.cm-tabs button')], bus = document.querySelector('.bus');
    const cfg = { am:{a:['#3b2468','#f0a36b'], z:['#3a2f7a','#f7c27a'], x:[90,150], y:[138,70]}, pm:{a:['#3a2f7a','#f7c27a'], z:['#2a1b52','#c46a8f'], x:[450,510], y:[70,138]} };
    let raf, mode = 'am';
    function run() {
      cancelAnimationFrame(raf); const c = cfg[mode], t0 = performance.now(); bus.style.animation = 'none'; void bus.getBoundingClientRect(); bus.style.animation = '';
      (function tick(now) {
        const q = cl((now-t0)/6000), m = Math.round(q*120);
        $('cmclock').textContent = Math.floor(m/60) + ':' + String(m%60).padStart(2,'0'); $('cmbar').style.width = q*100 + '%';
        $('cg1').setAttribute('stop-color', mix(c.a[0], c.z[0], q)); $('cg2').setAttribute('stop-color', mix(c.a[1], c.z[1], q));
        const x = c.x[0] + (c.x[1]-c.x[0])*q, y = c.y[0] + (c.y[1]-c.y[0])*q;
        ['cs','csg'].forEach(id => { $(id).setAttribute('cx', x); $(id).setAttribute('cy', y); });
        if (q < 1) raf = requestAnimationFrame(tick); else setTimeout(run, 1200);
      })(t0);
    }
    tabs.forEach(b => b.addEventListener('click', () => { mode = b.dataset.t; tabs.forEach(x => x.classList.toggle('on', x === b)); run(); }));
    new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { run(); o.disconnect(); } }, {threshold:.3}).observe($('commute'));
  })();
