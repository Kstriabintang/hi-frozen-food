// ================================================================
    // PRODUCT FILTER
    // ================================================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            card.classList.remove('animating');
          } else {
            card.classList.add('animating');
            setTimeout(() => card.classList.add('hidden'), 300);
          }
        });
      });
    });

// ================================================================
    // PRODUCT NAVIGATION ARROWS
    // ================================================================
    const row1 = document.getElementById('productRow1');
    const row2 = document.getElementById('productRow2');
    const navPrev = document.getElementById('productNavPrev');
    const navNext = document.getElementById('productNavNext');
    if (row1 && row2 && navPrev && navNext) {
      const scrollAmount = 220;
      navPrev.addEventListener('click', () => {
        row1.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        row2.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      navNext.addEventListener('click', () => {
        row1.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        row2.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
