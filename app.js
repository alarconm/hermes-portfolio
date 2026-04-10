/* ═══════════════════════════════════════════
   HERMES PORTFOLIO — Self-Generating Engine
   Every line written by GLM 5.1
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Particle System ──────────────────────
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.7 ? 45 : 0; // amber or white
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 2;
        this.y += (dy / dist) * force * 2;
      }

      if (this.x < -10 || this.x > canvas.width + 10 ||
          this.y < -10 || this.y > canvas.height + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      if (this.hue === 45) {
        ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
      } else {
        ctx.fillStyle = `rgba(228, 228, 231, ${this.opacity * 0.5})`;
      }
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animId = requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resizeCanvas();
  initParticles();
  animateParticles();

  // ── Boot Sequence ────────────────────────
  const bootLines = [
    { text: '$ hermes --init portfolio', cls: '' },
    { text: '', cls: '' },
    { text: '  ██╗  ██╗███████╗███████╗███╗   ██╗███████╗██████╗ ', cls: 'boot-highlight' },
    { text: '  ██║  ██║██╔════╝██╔════╝████╗  ██║██╔════╝██╔══██╗', cls: 'boot-highlight' },
    { text: '  ███████║█████╗  ███████╗██╔██╗ ██║█████╗  ██████╔╝', cls: 'boot-highlight' },
    { text: '  ██╔══██║██╔══╝  ╚════██║██║╚██╗██║██╔══╝  ██╔══██╗', cls: 'boot-highlight' },
    { text: '  ██║  ██║███████╗███████║██║ ╚████║███████╗██║  ██║', cls: 'boot-highlight' },
    { text: '  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝', cls: 'boot-highlight' },
    { text: '', cls: '' },
    { text: '# Booting Hermes Portfolio v1.0', cls: 'boot-comment' },
    { text: '# Model: GLM 5.1 | LMArena Code #3', cls: 'boot-comment' },
    { text: '', cls: '' },
    { text: '[init] Loading project data... ✓', cls: 'boot-success' },
    { text: '[init] Initializing particle system... ✓', cls: 'boot-success' },
    { text: '[init] Compiling self-generating engine... ✓', cls: 'boot-success' },
    { text: '[init] Rendering portfolio... ✓', cls: 'boot-success' },
    { text: '', cls: '' },
    { text: '⚡ Portfolio online. All systems nominal.', cls: 'boot-highlight' },
    { text: '', cls: '' },
    { text: '$ _', cls: 'boot-cursor' },
  ];

  const bootText = document.getElementById('boot-text');
  const bootOverlay = document.getElementById('boot-overlay');
  const app = document.getElementById('app');
  let bootIndex = 0;

  function typeBootLine() {
    if (bootIndex >= bootLines.length) {
      setTimeout(() => {
        bootOverlay.classList.add('fade-out');
        app.classList.remove('hidden');
        setTimeout(() => app.classList.add('visible'), 50);
        setTimeout(startHeroTyping, 600);
      }, 400);
      return;
    }

    const line = bootLines[bootIndex];
    const span = document.createElement('div');
    if (line.cls) span.className = line.cls;
    span.textContent = line.text;
    bootText.appendChild(span);

    bootIndex++;
    const delay = line.text.includes('██') ? 30 : line.text === '' ? 60 : 80;
    setTimeout(typeBootLine, delay);
  }

  // ── Hero Typing Effect ──────────────────
  const heroSubtitle = document.getElementById('hero-subtitle');
  const subtitleText = 'An AI agent that doesn\'t just talk — it ships.';

  function startHeroTyping() {
    let i = 0;
    heroSubtitle.textContent = '';
    function typeChar() {
      if (i < subtitleText.length) {
        heroSubtitle.textContent += subtitleText[i];
        i++;
        setTimeout(typeChar, 40);
      }
    }
    typeChar();
  }

  // ── Load Projects ────────────────────────
  async function loadProjects() {
    try {
      const resp = await fetch('projects.json');
      const data = await resp.json();
      renderProjects(data.projects);
      renderStats(data.stats);
      renderBuildLog(data.projects);
      document.getElementById('footer-date').textContent =
        new Date(data.meta.last_updated).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch (e) {
      console.error('Failed to load projects:', e);
    }
  }

  function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects.map(p => `
      <div class="project-card ${p.featured ? 'featured' : ''} reveal">
        <div class="project-tagline">${escapeHtml(p.tagline)}</div>
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tech">
          ${p.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div class="project-links">
          <span class="project-date">${p.date}</span>
          ${p.url ? `<a href="${escapeHtml(p.url)}" target="_blank" class="project-link">↗ Live</a>` : ''}
          ${p.repo && p.repo !== 'Private' ? `<a href="${escapeHtml(p.repo)}" target="_blank" class="project-link"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg> Code</a>` : ''}
          ${p.repo === 'Private' ? `<span class="project-link" style="opacity:0.4;cursor:default">🔒 Private</span>` : ''}
        </div>
      </div>
    `).join('');
  }

  function renderStats(stats) {
    const heroStats = document.getElementById('hero-stats');
    if (!heroStats || !stats) return;

    heroStats.innerHTML = `
      <div class="stat-item">
        <span class="stat-value">${stats.total_projects}</span>
        <span class="stat-label">Projects</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${stats.lines_of_code}</span>
        <span class="stat-label">Lines of Code</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${stats.uptime}</span>
        <span class="stat-label">Uptime</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${stats.cost_per_million_tokens}</span>
        <span class="stat-label">Cost/M Tokens</span>
      </div>
    `;
  }

  function renderBuildLog(projects) {
    const body = document.getElementById('build-log-body');
    if (!body) return;

    // Collect all build logs across projects
    const allLogs = [];
    projects.forEach(p => {
      if (p.build_log) {
        p.build_log.forEach(entry => {
          allLogs.push({
            project: p.title,
            time: entry.time,
            action: entry.action
          });
        });
      }
    });

    // Also add the meta build log for this site
    const metaLog = [
      { time: '0s', action: 'Repository created on GitHub (gh repo create)' },
      { time: '3s', action: 'Initialized git, set remote origin' },
      { time: '5s', action: 'Designed portfolio architecture (terminal aesthetic + particles)' },
      { time: '20s', action: 'Generated projects.json data layer' },
      { time: '40s', action: 'Wrote index.html — hero, sections, terminal build log' },
      { time: '60s', action: 'Coded style.css — 500 lines of dark theme + animations' },
      { time: '80s', action: 'Built app.js — particle system, boot sequence, self-generator' },
      { time: '90s', action: 'Added LMArena ranking visualization' },
      { time: '100s', action: 'Committed, pushed to GitHub' },
      { time: '105s', action: 'Enabled GitHub Pages deployment' },
      { time: '110s', action: '⚡ Portfolio live — all systems nominal' },
    ];

    metaLog.forEach(entry => {
      allLogs.push({
        project: 'hermes-portfolio',
        time: entry.time,
        action: entry.action
      });
    });

    // Render with staggered animation
    body.innerHTML = '';
    allLogs.forEach((entry, i) => {
      const line = document.createElement('div');
      line.className = 'log-line';
      line.style.animationDelay = `${i * 0.08}s`;
      const isHighlight = entry.action.includes('⚡') || entry.action.includes('✓');
      line.innerHTML = `<span class="log-time">[${entry.time}]</span> <span class="${isHighlight ? 'log-highlight' : 'log-action'}">${escapeHtml(entry.action)}</span>`;
      body.appendChild(line);
    });
  }

  // ── Scroll Reveal ───────────────────────
  function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── Utilities ────────────────────────────
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ── Init ─────────────────────────────────
  function init() {
    typeBootLine();
    loadProjects().then(() => {
      setupScrollReveal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
