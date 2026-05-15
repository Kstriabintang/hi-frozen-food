// ================================================================
    // SCROLL REVEAL (Intersection Observer)
    // ================================================================
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    // Stagger product cards
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
      productGrid.querySelectorAll('.product-card').forEach((card, i) => {
        card.style.setProperty('--stagger', i % 4);
      });
    }

// ================================================================
    // RIPPLE EFFECT
    // ================================================================
    document.querySelectorAll('.btn-primary, .product-btn, .product-overlay-btn, .testi-arrow, .float-top').forEach(btn => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
          position:absolute; border-radius:50%; background:rgba(255,255,255,0.4);
          width:${size}px; height:${size}px; left:${e.clientX - rect.left - size/2}px;
          top:${e.clientY - rect.top - size/2}px; pointer-events:none;
          animation: rippleEffect 0.6s ease-out forwards;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

// ================================================================
    // SCROLL TO TOP
    // ================================================================
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
