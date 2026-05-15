// ================================================================
    // NAVBAR SCROLL EFFECT
    // ================================================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

// ================================================================
    // MOBILE MENU
    // ================================================================
    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.toggle('active');
      document.getElementById('hamburger').classList.toggle('active');
    }
    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('hamburger').classList.remove('active');
    }

// ================================================================
    // ACTIVE NAV LINK
    // ================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (scrollY >= top) current = sec.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
      });
    });
