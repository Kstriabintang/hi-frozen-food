// ================================================================
    // TESTIMONIAL CAROUSEL
    // ================================================================
    (function initCarousel() {
      const track = document.getElementById('testiTrack');
      const cards = track.querySelectorAll('.testi-card');
      const dotsContainer = document.getElementById('testiDots');
      const prevBtn = document.getElementById('testiPrev');
      const nextBtn = document.getElementById('testiNext');
      
      let currentSlide = 0;
      let slidesPerView = 3;
      let autoplayInterval;

      function getSlidesPerView() {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
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
        const offset = currentSlide * (100 / slidesPerView) * slidesPerView;
        // Adjust for the actual slide width
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

      prevBtn.addEventListener('click', () => { prevSlide(); stopAutoplay(); startAutoplay(); });
      nextBtn.addEventListener('click', () => { nextSlide(); stopAutoplay(); startAutoplay(); });
      
      const carousel = document.getElementById('testiCarousel');
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);

      window.addEventListener('resize', () => {
        slidesPerView = getSlidesPerView();
        createDots();
        goToSlide(0);
      });

      slidesPerView = getSlidesPerView();
      createDots();
      goToSlide(0);
      startAutoplay();
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
