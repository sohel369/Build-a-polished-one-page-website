/**
 * Main JavaScript functionality for UCE website
 * Enhanced with smooth animations, floating buttons, and improved UX
 */

(function() {
  'use strict';

  // ====== Configuration ======
  const CONFIG = {
    phone: '+40700000000',
    whatsappMessage: 'Salut! Vreau ofertă pentru UCE (P130-2025).',
    email: 'ionescu.lupeanu.silviu@gmail.com',
    animationDuration: 300,
    scrollOffset: 80
  };

  // ====== DOM Elements ======
  const elements = {
    nav: document.querySelector('.nav'),
    navLinks: document.querySelectorAll('.nav__link'),
    sections: document.querySelectorAll('section[id]'),
    calcForm: document.getElementById('calc-form'),
    calcOutput: document.getElementById('calc-out'),
    contactForm: document.getElementById('contact-form'),
    formStatus: document.getElementById('form-status'),
    floatingButtons: document.querySelectorAll('.btn--floating')
  };

  // ====== Utility Functions ======
  const utils = {
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    throttle: function(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    formatNumber: function(num) {
      return new Intl.NumberFormat('ro-RO').format(num);
    },

    scrollToElement: function(element, offset = 0) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // ====== Premium Navigation ======
  class Navigation {
    constructor() {
      this.lastScrollY = 0;
      this.isScrolling = false;
      this.init();
    }

    init() {
      this.setupScrollSpy();
      this.setupSmoothScrolling();
      this.setupNavbarScroll();
      this.setupPremiumAnimations();
    }

    setupScrollSpy() {
      const observerOptions = {
        rootMargin: `-${CONFIG.scrollOffset}px 0px -50% 0px`,
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setActiveLink(entry.target.id);
          }
        });
      }, observerOptions);

      elements.sections.forEach(section => {
        observer.observe(section);
      });
    }

    setActiveLink(sectionId) {
      elements.navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('nav__link--active');
        }
      });
    }

    setupSmoothScrolling() {
      elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              utils.scrollToElement(targetElement, CONFIG.scrollOffset);
            }
          }
        });
      });
    }

    setupNavbarScroll() {
      const handleScroll = utils.throttle(() => {
        const currentScrollY = window.scrollY;
        const nav = elements.nav;
        
        // Add scrolled class
        if (currentScrollY > 100) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
          nav.classList.add('nav--hidden');
        } else {
          nav.classList.remove('nav--hidden');
        }
        
        this.lastScrollY = currentScrollY;
      }, 16);

      window.addEventListener('scroll', handleScroll);
    }

    setupPremiumAnimations() {
      // Add premium hover effects to navigation links
      const navLinks = document.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
          link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
          link.style.transform = 'translateY(0)';
        });
      });

      // Add logo animation
      const logo = document.querySelector('.nav__logo');
      if (logo) {
        logo.addEventListener('mouseenter', () => {
          logo.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        logo.addEventListener('mouseleave', () => {
          logo.style.transform = 'scale(1) rotate(0deg)';
        });
      }

      // Mobile navigation
      this.setupMobileNavigation();
    }

    setupMobileNavigation() {
      const mobileToggle = document.querySelector('.nav__mobile-toggle');
      const mobileMenu = document.querySelector('.nav__mobile-menu');
      const mobileClose = document.querySelector('.nav__mobile-close');
      const mobileLinks = document.querySelectorAll('.nav__mobile-link');

      const closeMobileMenu = () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
      };

      const openMobileMenu = () => {
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.classList.add('mobile-menu-active');
        document.body.style.overflow = 'hidden';
      };

      if (mobileToggle && mobileMenu) {
        // Toggle menu
        mobileToggle.addEventListener('click', () => {
          if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
          } else {
            openMobileMenu();
          }
        });

        // Close button
        if (mobileClose) {
          mobileClose.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking on links
        mobileLinks.forEach(link => {
          link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
          if (e.target === mobileMenu) {
            closeMobileMenu();
          }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
          }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
          if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
          }
        });
      }
    }
  }

  // ====== Calculator ======
  class Calculator {
    constructor() {
      this.prices = {
        bloc: 3990,
        casa: 2990,
        hala: 5490,
        birouri: 4490
      };
      
      this.init();
    }

    init() {
      if (elements.calcForm && elements.calcOutput) {
        this.setupEventListeners();
        this.calculate();
      }
    }

    setupEventListeners() {
      const inputs = elements.calcForm.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('input', utils.debounce(() => {
          this.calculate();
        }, 300));
      });
    }

    calculate() {
      const formData = new FormData(elements.calcForm);
      const tip = formData.get('tip') || 'bloc';
      const suprafata = parseFloat(formData.get('sup') || '0');
      const instrumentare = formData.get('instr') === 'on';

      let basePrice = this.prices[tip] || this.prices.bloc;
      
      // Calculate area factor (15% per 100 sqm)
      const areaFactor = Math.ceil(suprafata / 100) * 0.15;
      
      // Calculate total
      let total = Math.round(basePrice * (1 + areaFactor));
      
      // Add instrumentation if selected
      if (instrumentare) {
        total += 1500;
      }

      this.displayResult(total, tip, suprafata, instrumentare);
    }

    displayResult(total, tip, suprafata, instrumentare) {
      const formattedTotal = utils.formatNumber(total);
      const tipNames = {
        bloc: 'Bloc',
        casa: 'Casă',
        hala: 'Hală/Depozit',
        birouri: 'Birouri/Retail'
      };

      elements.calcOutput.innerHTML = `
        <div class="calculator__result">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--emerald); margin-bottom: 0.5rem;">
            ~ ${formattedTotal} lei/an + TVA
          </div>
          <div style="font-size: 0.9rem; color: var(--text-secondary);">
            ${tipNames[tip]} • ${suprafata > 0 ? suprafata + ' mp' : 'Suprafață standard'} 
            ${instrumentare ? '• Cu instrumentare' : ''}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">
            Include 1 vizită anuală și raport scurt
          </div>
        </div>
      `;
    }
  }

  // ====== Contact Form ======
  class ContactForm {
    constructor() {
      this.init();
    }

    init() {
      if (elements.contactForm) {
        this.setupEventListeners();
      }
    }

    setupEventListeners() {
      elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    handleSubmit() {
      const formData = new FormData(elements.contactForm);
      const data = {
        nume: formData.get('nume') || '',
        email: formData.get('email') || '',
        telefon: formData.get('telefon') || '',
        subiect: formData.get('subiect') || 'Solicitare UCE',
        mesaj: formData.get('mesaj') || ''
      };

      // Validate required fields
      if (!data.nume || !data.email || !data.mesaj) {
        this.showStatus('Vă rugăm să completați toate câmpurile obligatorii.', 'error');
        return;
      }

      // Create email body
      const subject = `${data.subiect} – ${data.nume}`;
      const body = `Nume: ${data.nume}%0AEmail: ${data.email}%0ATelefon: ${data.telefon}%0A%0AMesaj:%0A${encodeURIComponent(data.mesaj)}`;
      
      // Open email client
      const mailtoLink = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailtoLink;
      
      this.showStatus('S-a deschis clientul de e-mail pentru trimitere. Dacă nu se deschide, scrie-ne direct la ' + CONFIG.email, 'success');
    }

    showStatus(message, type) {
      if (elements.formStatus) {
        elements.formStatus.textContent = message;
        elements.formStatus.className = `form__status form__status--${type}`;
        
        // Auto-hide success messages
        if (type === 'success') {
          setTimeout(() => {
            elements.formStatus.textContent = '';
            elements.formStatus.className = 'form__status';
          }, 5000);
        }
      }
    }
  }

  // ====== Floating Buttons ======
  class FloatingButtons {
    constructor() {
      this.init();
    }

    init() {
      this.createFloatingButtons();
      this.setupEventListeners();
      this.setupScrollBehavior();
    }

    createFloatingButtons() {
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'floating-buttons';
      buttonContainer.innerHTML = `
        <button class="btn btn--floating btn--floating--phone" 
                title="Sună acum" 
                aria-label="Sună la ${CONFIG.phone}">
          📞
        </button>
        <button class="btn btn--floating" 
                title="Trimite WhatsApp" 
                aria-label="Trimite mesaj WhatsApp">
          💬
        </button>
      `;
      
      document.body.appendChild(buttonContainer);
      
      // Update elements reference
      elements.floatingButtons = document.querySelectorAll('.btn--floating');
    }

    setupEventListeners() {
      elements.floatingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          if (button.classList.contains('btn--floating--phone')) {
            this.handlePhoneCall();
          } else {
            this.handleWhatsApp();
          }
        });
      });
    }

    handlePhoneCall() {
      window.location.href = `tel:${CONFIG.phone}`;
    }

    handleWhatsApp() {
      const phone = CONFIG.phone.replace(/\D/g, '');
      const message = encodeURIComponent(CONFIG.whatsappMessage);
      const url = `https://wa.me/${phone}?text=${message}`;
      window.open(url, '_blank');
    }

    setupScrollBehavior() {
      let isVisible = true;
      
      const handleScroll = utils.throttle(() => {
        const scrollY = window.scrollY;
        const shouldShow = scrollY > 200;
        
        if (shouldShow !== isVisible) {
          isVisible = shouldShow;
          elements.floatingButtons.forEach(button => {
            button.style.transform = shouldShow ? 'scale(1)' : 'scale(0)';
            button.style.opacity = shouldShow ? '1' : '0';
          });
        }
      }, 100);

      window.addEventListener('scroll', handleScroll);
    }
  }

  // ====== Premium Animations ======
  class Animations {
    constructor() {
      this.init();
    }

    init() {
      this.setupIntersectionObserver();
      this.setupScrollAnimations();
      this.setupPremiumEffects();
      this.setupParallaxEffects();
    }

    setupIntersectionObserver() {
      const observerOptions = {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger animations
            setTimeout(() => {
              entry.target.classList.add('animate-on-scroll', 'animated');
            }, index * 100);
          }
        });
      }, observerOptions);

      // Observe all animated elements
      const animatedElements = document.querySelectorAll('.card, .section, .hero__alert, .hero__badge, .hero__title, .hero__subtitle, .hero__actions');
      animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
      });
    }

    setupScrollAnimations() {
      // Enhanced scroll animations with custom easing
      const handleScroll = utils.throttle(() => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Parallax effects
        this.updateParallaxElements(scrolled);
        
        // Scroll progress indicator
        this.updateScrollProgress(scrolled);
        
        // Floating button visibility
        this.updateFloatingButtons(scrolled);
      }, 16);

      window.addEventListener('scroll', handleScroll);
    }

    setupPremiumEffects() {
      // Add premium hover effects to cards
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0) scale(1)';
        });
      });

      // Add shimmer effect to buttons
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          button.style.background = 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)';
        });
      });
    }

    setupParallaxEffects() {
      // Parallax background elements
      this.parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    }

    updateParallaxElements(scrolled) {
      const hero = document.querySelector('.hero');
      if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
      }
    }

    updateScrollProgress(scrolled) {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / documentHeight) * 100;
      
      // Update any progress indicators
      const progressBars = document.querySelectorAll('.scroll-progress');
      progressBars.forEach(bar => {
        bar.style.width = `${progress}%`;
      });
    }

    updateFloatingButtons(scrolled) {
      const floatingButtons = document.querySelectorAll('.btn--floating');
      floatingButtons.forEach(button => {
        if (scrolled > 300) {
          button.style.opacity = '1';
          button.style.transform = 'scale(1)';
        } else {
          button.style.opacity = '0';
          button.style.transform = 'scale(0.8)';
        }
      });
    }
  }

  // ====== Performance Optimizations ======
  class Performance {
    constructor() {
      this.init();
    }

    init() {
      this.setupLazyLoading();
      this.setupPreloading();
    }

    setupLazyLoading() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
      }
    }

    setupPreloading() {
      // Preload critical resources
      const criticalResources = [
        'assets/css/style.css',
        'assets/js/main.js'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
      });
    }
  }

  // ====== Accessibility ======
  class Accessibility {
    constructor() {
      this.init();
    }

    init() {
      this.setupKeyboardNavigation();
      this.setupFocusManagement();
      this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
      document.addEventListener('keydown', (e) => {
        // ESC key to close modals or reset focus
        if (e.key === 'Escape') {
          const activeElement = document.activeElement;
          if (activeElement && activeElement.blur) {
            activeElement.blur();
          }
        }
      });
    }

    setupFocusManagement() {
      // Ensure focus is visible
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });
    }

    setupAriaLabels() {
      // Add ARIA labels to interactive elements
      const buttons = document.querySelectorAll('button:not([aria-label])');
      buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent.trim()) {
          button.setAttribute('aria-label', button.textContent.trim());
        }
      });
    }
  }

  // ====== Initialize Everything ======
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initializeApp();
      });
    } else {
      initializeApp();
    }
  }

  function initializeApp() {
    try {
      new Navigation();
      new Calculator();
      new ContactForm();
      new FloatingButtons();
      new Animations();
      new Performance();
      new Accessibility();
      
      console.log('UCE Website initialized successfully');
    } catch (error) {
      console.error('Error initializing website:', error);
    }
  }

  // ====== Start the application ======
  init();

})();
