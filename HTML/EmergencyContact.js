 document.getElementById('availability').addEventListener('change', function() {
      const availability = this.value;
      const cards = document.querySelectorAll('.service-card');
      cards.forEach(card => {
        const available = card.querySelector('p').textContent.includes(availability);
        card.style.display = availability === 'all' || available ? 'block' : 'none';
      });
    });