// ================================================================
    // TESTIMONIAL CAROUSEL
    // ================================================================
    (function initCarousel() {
      const track = document.getElementById('testiTrack');
      const cards = track.querySelectorAll('.testi-card');
      const dotsContainer = document.getElementById('testiDots');
      const prevBtn = document.getElementById('testiPrev');
      const nextBtn = document.getElementById('testiNext');
      const testiNav = prevBtn.closest('.testi-nav');

      let currentSlide = 0;
      let slidesPerView = 3;
      let autoplayInterval;

      function getSlidesPerView() {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
      }

      function isMobile() { return window.innerWidth <= 768; }

      // ── Mobile stack: semua card vertikal, no carousel ──────────
      function setupMobileStack() {
        clearInterval(autoplayInterval);
        track.style.flexDirection = 'column';
        track.style.transform = 'none';
        track.style.transition = 'none';
        cards.forEach(c => {
          c.style.flex = '1 1 100%';
          c.style.maxWidth = '100%';
        });
        testiNav.style.display = 'none';
      }

      // ── Desktop carousel: reset ke mode normal ──────────────────
      function setupDesktopCarousel() {
        track.style.flexDirection = '';
        track.style.transform = '';
        track.style.transition = '';
        cards.forEach(c => {
          c.style.flex = '';
          c.style.maxWidth = '';
        });
        testiNav.style.display = '';
        slidesPerView = getSlidesPerView();
        createDots();
        goToSlide(0);
        startAutoplay();
      }

      function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(cards.length / slidesPerView);
        for (let i = 0; i < totalDots; i++) {
          const dot = document.createElement('button');
          dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
          dot.addEventListener('click', () => goToSlide(i));
          dotsContainer.appendChild(dot);
        }
      }

      function goToSlide(index) {
        slidesPerView = getSlidesPerView();
        const maxSlide = Math.ceil(cards.length / slidesPerView) - 1;
        currentSlide = Math.max(0, Math.min(index, maxSlide));
        const cardWidth = 100 / slidesPerView;
        track.style.transform = `translateX(-${currentSlide * cardWidth * slidesPerView}%)`;
        document.querySelectorAll('.testi-dot').forEach((d, i) => {
          d.classList.toggle('active', i === currentSlide);
        });
      }

      function nextSlide() {
        slidesPerView = getSlidesPerView();
        const maxSlide = Math.ceil(cards.length / slidesPerView) - 1;
        goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
      }

      function prevSlide() {
        slidesPerView = getSlidesPerView();
        const maxSlide = Math.ceil(cards.length / slidesPerView) - 1;
        goToSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1);
      }

      function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 3000);
      }
      function stopAutoplay() {
        clearInterval(autoplayInterval);
      }

      function handleLayout() {
        if (isMobile()) setupMobileStack();
        else setupDesktopCarousel();
      }

      prevBtn.addEventListener('click', () => { prevSlide(); stopAutoplay(); startAutoplay(); });
      nextBtn.addEventListener('click', () => { nextSlide(); stopAutoplay(); startAutoplay(); });

      const carousel = document.getElementById('testiCarousel');
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);

      window.addEventListener('resize', handleLayout);

      // Init
      handleLayout();
    })();

// ================================================================
    // MARQUEE HOVER PAUSE
    // ================================================================
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
      const marquee = document.querySelector('.marquee');
      marquee.addEventListener('mouseenter', () => {
        marqueeTrack.style.animationPlayState = 'paused';
      });
      marquee.addEventListener('mouseleave', () => {
        marqueeTrack.style.animationPlayState = 'running';
      });
    }
