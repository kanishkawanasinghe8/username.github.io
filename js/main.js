/**
 * MODERN MECHANICAL ENGINEERING PORTFOLIO - CORE JAVASCRIPT
 * Simple, vanilla JS with zero external framework dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProjectFilters();
  initModals();
  initPublications();
  initContactForm();
});

/* ==========================================================================
   NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // Highlight active page link based on current file name
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   PROJECT FILTERING (PROJECTS PAGE)
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || card.classList.contains(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   INTERACTIVE MODALS (PROJECT DETAILS & CONTACT)
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = modalOverlay?.querySelector('.modal-close');
  const modalBody = modalOverlay?.querySelector('.modal-body-content');

  // Open Project Details Modal
  document.querySelectorAll('.view-project-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const card = button.closest('.project-card');
      if (!card || !modalOverlay || !modalBody) return;

      const title = card.querySelector('.project-title')?.innerText || 'Project Details';
      const category = card.querySelector('.project-category-badge')?.innerText || 'Mechanical Engineering';
      const desc = card.querySelector('.project-desc')?.innerText || '';
      const tags = card.querySelector('.project-tags')?.innerHTML || '';
      
      // Extract detailed attributes if present
      const problem = card.getAttribute('data-problem') || 'Engineered high-tolerance mechanical assembly ensuring strict structural integrity and optimal thermal dissipation.';
      const solution = card.getAttribute('data-solution') || 'Formulated parametric 3D CAD models in SolidWorks, followed by finite element stress analysis (FEA) and dynamic simulation.';
      const results = card.getAttribute('data-results') || 'Achieved 28% weight reduction while increasing factor of safety from 1.4 to 2.1 under cyclic fatigue loading.';
      const report = card.getAttribute('data-report') || '';
      const cad = card.getAttribute('data-cad') || '';

      let downloadsHtml = '';
      if (report || cad) {
        downloadsHtml = `
          <div style="margin-bottom: 24px; padding: 18px; background: rgba(126, 243, 196, 0.05); border: 1px solid rgba(126, 243, 196, 0.2); border-radius: 12px;">
            <h4 style="color: #7ef3c4; font-size: 0.82rem; font-family: monospace; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>📥</span> Project Deliverables &amp; Downloads
            </h4>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              ${report ? `<a href="${report}" target="_blank" download class="btn btn-primary btn-sm">Download Technical Report (PDF) 📄</a>` : ''}
              ${cad ? `<a href="${cad}" download class="btn btn-secondary btn-sm">Download 3D CAD (.STEP / SolidWorks) 💾</a>` : ''}
            </div>
          </div>
        `;
      }

      modalBody.innerHTML = `
        <div class="pill-badge" style="margin-bottom: 12px;"><span class="badge-dot"></span>${category}</div>
        <h2 style="font-size: 1.8rem; margin-bottom: 16px; color: #fff;">${title}</h2>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">${tags}</div>
        
        <p style="margin-bottom: 24px; font-size: 1rem; color: #94a3b8; line-height: 1.7;">${desc}</p>
        
        <div style="display: flex; flex-direction: column; gap: 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 20px; border-radius: 12px; margin-bottom: 24px;">
          <div>
            <h4 style="color: #7ef3c4; font-size: 0.9rem; font-family: monospace; text-transform: uppercase; margin-bottom: 6px;">[01] Problem Definition & Constraints</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1;">${problem}</p>
          </div>
          <div>
            <h4 style="color: #7ef3c4; font-size: 0.9rem; font-family: monospace; text-transform: uppercase; margin-bottom: 6px;">[02] Engineering Methodology & CAD/FEA</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1;">${solution}</p>
          </div>
          <div>
            <h4 style="color: #7ef3c4; font-size: 0.9rem; font-family: monospace; text-transform: uppercase; margin-bottom: 6px;">[03] Validation & Measurable Impact</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1;">${results}</p>
          </div>
        </div>

        ${downloadsHtml}

        <div style="display: flex; gap: 14px; justify-content: flex-end;">
          <button class="btn btn-secondary" onclick="closeAllModals()">Close</button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modals
  modalClose?.addEventListener('click', closeAllModals);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeAllModals();
  });

  // Contact Modal triggers
  const contactModal = document.getElementById('contactModal');
  const contactClose = contactModal?.querySelector('.modal-close');
  document.querySelectorAll('.open-contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  contactClose?.addEventListener('click', closeAllModals);
  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) closeAllModals();
  });

  // ESC key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
  document.body.style.overflow = '';
}

/* ==========================================================================
   PUBLICATIONS - ABSTRACT TOGGLE & BIBTEX COPY
   ========================================================================== */
function initPublications() {
  // Toggle abstract
  document.querySelectorAll('.toggle-abstract-btn').forEach(button => {
    button.addEventListener('click', () => {
      const pubCard = button.closest('.pub-card');
      const abstractEl = pubCard?.querySelector('.pub-abstract');
      if (abstractEl) {
        const isHidden = abstractEl.style.display === 'none';
        abstractEl.style.display = isHidden ? 'block' : 'none';
        button.innerText = isHidden ? 'Hide Abstract' : 'View Abstract';
      }
    });
  });

  // Copy BibTeX citation
  document.querySelectorAll('.copy-bibtex-btn').forEach(button => {
    button.addEventListener('click', () => {
      const bibtex = button.getAttribute('data-bibtex');
      if (bibtex) {
        navigator.clipboard.writeText(bibtex).then(() => {
          showToast('BibTeX citation copied to clipboard!');
        }).catch(() => {
          showToast('Failed to copy. Please copy manually.');
        });
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  // Direct email copy
  document.querySelectorAll('.copy-email-btn').forEach(button => {
    button.addEventListener('click', () => {
      const email = button.getAttribute('data-email') || 'oshan.engineering@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Message transmitted successfully.');
      contactForm.reset();
      setTimeout(closeAllModals, 1200);
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color: #7ef3c4;">✓</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
