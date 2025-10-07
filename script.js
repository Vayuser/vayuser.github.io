function showSection(sectionId) {
  // Hide all sections with fade out
  document.querySelectorAll('.section-content').forEach(function(section) {
    section.classList.add('hide');
    setTimeout(() => { section.style.display = 'none'; }, 400);
  });

  // Show the selected section with fade in
  var section = document.getElementById(sectionId);
  if (section) {
    setTimeout(() => {
      section.style.display = 'block';
      setTimeout(() => {
        section.classList.remove('hide');
        // Always scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Change the document title
        const h2 = section.querySelector('h2');
        if (h2) {
          document.title = h2.textContent + " | Fadlan HARIS";
        }
      }, 10);
    }, 400);
  }
}

// Block mobile view and show message if width < 900px
function checkMobileBlock() {
  var noMobile = document.getElementById('no-mobile');
  var children = Array.from(document.body.children).filter(function(child) {
    return child !== noMobile;
  });
  if (window.innerWidth < 900) {
    if (noMobile) noMobile.style.display = "flex";
    children.forEach(function(child) { if (child !== noMobile) child.style.display = "none"; });
  } else {
    if (noMobile) noMobile.style.display = "none";
    children.forEach(function(child) { if (child !== noMobile) child.style.display = ""; });
  }
}

// Run mobile block and section logic after DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
  checkMobileBlock();

  // Only run section logic if not blocked
  if (window.innerWidth >= 900) {
    var hash = window.location.hash.replace('#', '');
    // Only call showSection ONCE to avoid flicker
    showSection(hash ? hash : 'accueil');
  }
});

// Re-check mobile block on resize
window.addEventListener('resize', function() {
  checkMobileBlock();

  // If user resizes to desktop, show correct section
  if (window.innerWidth >= 900) {
    var hash = window.location.hash.replace('#', '');
    showSection(hash ? hash : 'accueil');
  }
});

// Handle hash changes (back/forward navigation)
window.addEventListener('hashchange', function() {
  if (window.innerWidth >= 900) {
    var hash = window.location.hash.replace('#', '');
    if (hash) {
      showSection(hash);
    }
  }
});

// Modal open/close logic
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('demander-acces-btn');
  var modal = document.getElementById('acces-modal');
  var close = document.getElementById('close-modal');
  var form = document.getElementById('access-request-form');
  var success = document.getElementById('access-request-success');

  if(btn && modal && close && form) {
    btn.onclick = function() { modal.style.display = 'flex'; }
    close.onclick = function() { modal.style.display = 'none'; }
    window.onclick = function(e) { if(e.target === modal) modal.style.display = 'none'; }
    form.onsubmit = function(e) {
      e.preventDefault();
      // Here you would send the email to your server or email (AJAX, Formspree, etc.)
      form.style.display = 'none';
      success.style.display = 'block';
    }
  }

  // Copy Minecraft server IP logic
  var copyBtn = document.getElementById('copy-ip-btn');
  var copySuccess = document.getElementById('copy-ip-success');
  if (copyBtn && copySuccess) {
    copyBtn.addEventListener('click', function() {
      var ip = copyBtn.getAttribute('data-ip');
      navigator.clipboard.writeText(ip).then(function() {
        copySuccess.style.display = 'inline';
        setTimeout(function() {
          copySuccess.style.display = 'none';
        }, 2000);
      });
    });
  }

  // Minecraft modal logic
  var btn = document.getElementById('demander-acces-btn-mc');
  var modal = document.getElementById('acces-modal-mc');
  var close = document.getElementById('close-modal-mc');
  if (btn && modal && close) {
    btn.onclick = function() { modal.style.display = 'flex'; }
    close.onclick = function() { modal.style.display = 'none'; }
    window.onclick = function(e) { if(e.target === modal) modal.style.display = 'none'; }
  }

  // Formspree AJAX for Minecraft modal
  var formMc = document.getElementById('access-request-form-mc');
  var successMc = document.getElementById('access-request-success-mc');
  if (formMc && successMc) {
    formMc.addEventListener('submit', function(e) {
      e.preventDefault();
      var data = new FormData(formMc);
      fetch(formMc.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          formMc.style.display = 'none';
          successMc.style.display = 'block';
          setTimeout(function() {
            window.location.reload();
          }, 2000); // Refresh after 2 seconds
        } else {
          successMc.style.display = 'block';
          successMc.style.color = 'red';
          successMc.textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
        }
      }).catch(function() {
        successMc.style.display = 'block';
        successMc.style.color = 'red';
        successMc.textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
      });
    });
  }

  // --- Contact Form AJAX (Formspree) ---
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      const formData = new FormData(contactForm);

      fetch('https://formspree.io/f/xanjeewl', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
      .then(response => {
        if (response.ok) {
          contactForm.reset();
          if (successMsg) successMsg.style.display = 'block';
        } else {
          if (errorMsg) errorMsg.style.display = 'block';
        }
      })
      .catch(() => {
        if (errorMsg) errorMsg.style.display = 'block';
      });
    });
  }

  // Dark mode toggle
  const toggle = document.getElementById('dark-mode-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
      // Optional: Save preference
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', '1');
      } else {
        localStorage.removeItem('dark-mode');
      }
    });
    // On load
    if (localStorage.getItem('dark-mode')) {
      document.body.classList.add('dark-mode');
      toggle.textContent = '☀️';
    }
  }

  // Add project navigation helper (exposed globally for inline onclick handlers)
  window.projectIds = ['reseaux', 'telecom', 'programmation', 'systeme', 'cybersecurite'];

  window.navigateProject = function(currentId, direction) {
    const idx = window.projectIds.indexOf(currentId);
    if (idx === -1) return;
    const nextIdx = (idx + direction + window.projectIds.length) % window.projectIds.length;
    const nextId = window.projectIds[nextIdx];
    if (typeof showSection === 'function') {
      showSection(nextId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      location.hash = '#' + nextId;
    }
  };
});

