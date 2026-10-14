(function () {
  'use strict';

  // Set this before launch. While empty, the contact area says details are being finalised.
  var CONTACT_EMAIL = '';

  var root = document.documentElement;
  root.classList.add('js');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    updateSteps();
  }

  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('#nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- UK map + hero brief cycling ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  var project = function (lon, lat) { return [(lon + 8.8) * 39 + 30, (59.7 - lat) * 65 + 15]; };

  var cities = [
    ['Inverness', -4.22, 57.48], ['Aberdeen', -2.09, 57.15], ['Dundee', -2.97, 56.46],
    ['Glasgow', -4.25, 55.86], ['Newcastle', -1.61, 54.98], ['Carlisle', -2.94, 54.89],
    ['York', -1.08, 53.96], ['Leeds', -1.55, 53.8], ['Liverpool', -2.98, 53.41],
    ['Sheffield', -1.47, 53.38], ['Nottingham', -1.15, 52.95], ['Leicester', -1.13, 52.64],
    ['Norwich', 1.3, 52.63], ['Cambridge', 0.12, 52.21], ['Oxford', -1.26, 51.75],
    ['Cardiff', -3.18, 51.48], ['Swansea', -3.94, 51.62], ['Bristol', -2.59, 51.45],
    ['Southampton', -1.4, 50.91], ['Exeter', -3.53, 50.72], ['London', -0.13, 51.5]
  ];
  var demos = [
    { city: 'Manchester', lon: -2.24, lat: 53.48, title: 'Hotel refurbishment', value: '£18m illustrative project', scope: 'Potential mechanical package' },
    { city: 'South Croydon', lon: -0.09, lat: 51.35, title: 'Hotel restoration', value: '£30m illustrative project', scope: 'Potential heating replacement' },
    { city: 'Edinburgh', lon: -3.19, lat: 55.95, title: 'Office refurbishment', value: 'Illustrative commercial project', scope: 'Building services assessment' },
    { city: 'Birmingham', lon: -1.9, lat: 52.49, title: 'Care home expansion', value: 'Illustrative planning-stage project', scope: 'Heating and ventilation review' }
  ];

  var map = document.getElementById('ukmap');
  if (map && window.UK_PATH) {
    document.getElementById('landFill').setAttribute('d', window.UK_PATH);
    document.getElementById('landDots').setAttribute('d', window.UK_PATH);

    var cityG = document.getElementById('cities');
    cities.forEach(function (c, i) {
      var p = project(c[1], c[2]);
      var dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('class', 'city');
      dot.setAttribute('cx', p[0].toFixed(1));
      dot.setAttribute('cy', p[1].toFixed(1));
      dot.setAttribute('r', '3');
      dot.style.setProperty('--i', i);
      cityG.appendChild(dot);
    });

    var pinG = document.getElementById('pins');
    var pins = demos.map(function (d, i) {
      var p = project(d.lon, d.lat);
      // outer group carries the SVG position; inner group carries the CSS animation
      var outer = document.createElementNS(NS, 'g');
      outer.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ')');
      var g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'pin drop');
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', 'Preview illustrative ' + d.title.toLowerCase() + ' in ' + d.city);
      g.style.setProperty('--p', i);
      g.innerHTML =
        '<circle class="halo" r="8"/>' +
        '<circle class="hit" r="22"/>' +
        '<circle class="core" r="6"/>' +
        '<text class="label" x="14" y="4">' + d.city.toUpperCase() + '</text>';
      outer.appendChild(g);
      pinG.appendChild(outer);
      g.addEventListener('click', function () { userPick(i); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); userPick(i); }
      });
      return g;
    });

    var cardBody = document.getElementById('cardBody');
    var cTitle = document.getElementById('cardTitle');
    var cCity = document.getElementById('cardCity');
    var cValue = document.getElementById('cardValue');
    var cScope = document.getElementById('cardScope');
    var timer = document.getElementById('cardTimer');
    var CYCLE = 5200;
    var current = -1, auto = true, cycleTimer = null;

    function show(i) {
      if (i === current) return;
      current = i;
      pins.forEach(function (p, k) { p.classList.toggle('active', k === i); });
      var d = demos[i];
      cardBody.classList.add('swap');
      setTimeout(function () {
        cTitle.textContent = d.title;
        cCity.textContent = d.city;
        cValue.textContent = d.value;
        cScope.textContent = d.scope;
        cardBody.classList.remove('swap');
      }, reduced ? 0 : 220);
      restartTimer();
    }
    function restartTimer() {
      timer.classList.remove('run');
      void timer.offsetWidth;
      if (auto) { timer.style.setProperty('--cycle', CYCLE + 'ms'); timer.classList.add('run'); }
    }
    function schedule() {
      clearTimeout(cycleTimer);
      if (!auto) return;
      cycleTimer = setTimeout(function () {
        show((current + 1) % demos.length);
        schedule();
      }, CYCLE);
    }
    function userPick(i) {
      auto = false;
      clearTimeout(cycleTimer);
      current = -1; // force refresh
      show(i);
      timer.classList.remove('run');
    }

    // start once the card has appeared
    setTimeout(function () { show(0); schedule(); }, reduced ? 0 : 1700);
  }

  /* ---------- pointer glow in hero ---------- */
  var hero = document.getElementById('hero');
  if (hero && !reduced && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ---------- contrast animation ---------- */
  var contrast = document.getElementById('contrast');
  if (contrast && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { contrast.classList.add('play'); cio.disconnect(); }
      });
    }, { threshold: 0.35 });
    cio.observe(contrast);
  } else if (contrast) {
    contrast.classList.add('play');
  }

  /* ---------- how it works progress ---------- */
  var stepsEl = document.getElementById('steps');
  var stepItems = stepsEl ? stepsEl.querySelectorAll('.step') : [];
  function updateSteps() {
    if (!stepsEl) return;
    var r = stepsEl.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (vh * 0.85 - r.top) / (vh * 0.55);
    p = Math.max(0, Math.min(1, p));
    stepsEl.style.setProperty('--p', p.toFixed(3));
    var n = stepItems.length;
    stepItems.forEach(function (s, i) {
      s.classList.toggle('on', p > 0 && p >= i / (n - 1) - 0.02);
    });
  }

  /* ---------- brief explorer ---------- */
  var explorer = document.getElementById('explorer');
  if (explorer) {
    var btns = explorer.querySelectorAll('.ex-btn');
    var blocks = explorer.querySelectorAll('.doc-block');
    var exAuto = true, exIdx = 0, exTimer = null, exVisible = false;

    var setEx = function (k) {
      exIdx = k;
      btns.forEach(function (b) {
        var on = Number(b.dataset.k) === k;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      blocks.forEach(function (b) { b.classList.toggle('active', Number(b.dataset.k) === k); });
    };
    var tick = function () {
      clearTimeout(exTimer);
      if (!exAuto || !exVisible || reduced) return;
      exTimer = setTimeout(function () { setEx((exIdx + 1) % btns.length); tick(); }, 4200);
    };
    btns.forEach(function (b) {
      var pick = function () { exAuto = false; clearTimeout(exTimer); setEx(Number(b.dataset.k)); };
      b.addEventListener('click', pick);
      b.addEventListener('mouseenter', pick);
      b.addEventListener('focus', pick);
    });
    blocks.forEach(function (b) {
      b.addEventListener('mouseenter', function () { exAuto = false; clearTimeout(exTimer); setEx(Number(b.dataset.k)); });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        exVisible = entries[0].isIntersecting;
        tick();
      }, { threshold: 0.3 }).observe(explorer);
    }
  }

  /* ---------- contact box ---------- */
  var box = document.getElementById('contactBox');
  var mail = document.getElementById('mailBtn');
  if (box) {
    box.hidden = false;
    if (CONTACT_EMAIL) {
      var subj = encodeURIComponent('Atlas UK founding contractor pilot');
      box.innerHTML = 'Email <a href="mailto:' + CONTACT_EMAIL + '?subject=' + subj + '">' + CONTACT_EMAIL + '</a> to discuss the four-week pilot.';
      if (mail) mail.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subj;
    } else {
      box.innerHTML = '<strong>Contact details are being finalised.</strong><br>This is a local preview, so pilot enquiries are not being collected here yet.';
    }
  }

  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateSteps);
  onScroll();
})();
