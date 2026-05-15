// ================================================================
    // TYPING EFFECT
    // ================================================================
    (function typeWriter() {
      const el = document.getElementById('heroTagline');
      if (!el) return;
      const text = el.textContent;
      el.textContent = '';
      el.classList.add('typing');
      let i = 0;
      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, 80);
        } else {
          setTimeout(() => { el.classList.remove('typing'); el.style.borderRight = 'none'; }, 2000);
        }
      }
      setTimeout(type, 1000);
    })();

// ================================================================
    // LOADING SCREEN
    // ================================================================
    setTimeout(() => {
      document.getElementById('loadingScreen').classList.add('hidden');
      document.body.classList.add('loaded');
    }, 1600);

// ================================================================
    // PARTICLES
    // ================================================================
    (function createParticles() {
      const container = document.getElementById('particles');
      const colors = ['#F5A623', '#FFD600', '#FF6B00'];
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 2 + Math.random() * 4;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = '-10px';
        p.style.opacity = 0.15 + Math.random() * 0.15;
        p.style.borderRadius = '50%';
        p.style.position = 'absolute';
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * -duration;
        p.style.animation = `particleRise ${duration}s ${delay}s linear infinite`;
        container.appendChild(p);
      }
      const style = document.createElement('style');
      style.textContent = `
        @keyframes particleRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--particle-opacity, 0.3); }
          90% { opacity: var(--particle-opacity, 0.3); }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
      // Set individual opacity via custom property
      container.querySelectorAll('.particle').forEach(p => {
        p.style.setProperty('--particle-opacity', p.style.opacity);
      });
    })();

// ================================================================
    // SCROLL PROGRESS BAR
    // ================================================================
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      document.getElementById('scrollProgress').style.transform = `scaleX(${progress})`;
    });

// ================================================================
    // COUNTER ANIMATION
    // ================================================================
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const isDecimal = el.dataset.decimal === 'true';
          const duration = 1500;
          const start = performance.now();
          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ================================================================
    // SNOW CANVAS
    // ================================================================
    (function() {
      const canvas = document.getElementById('snowCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let flakes = [];
      const COUNT = 60;

      function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
      window.addEventListener('resize', resize);
      resize();

      for (let i = 0; i < COUNT; i++) {
        flakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.5 + 0.5,
          speed: Math.random() * 0.8 + 0.3,
          opacity: Math.random() * 0.4 + 0.1,
          drift: Math.random() * 0.4 - 0.2
        });
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flakes.forEach(f => {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,' + f.opacity + ')';
          ctx.fill();
          f.y += f.speed;
          f.x += f.drift;
          if (f.y > canvas.height) {
            f.y = -f.r;
            f.x = Math.random() * canvas.width;
          }
          if (f.x > canvas.width) f.x = 0;
          if (f.x < 0) f.x = canvas.width;
        });
        requestAnimationFrame(draw);
      }
      draw();
    })();
