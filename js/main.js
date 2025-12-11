/* ==========================================================================
   Halcourt Search — Main JavaScript
   ========================================================================== */

(function() {
  'use strict';

  /* -------------------------------------------------------------------------
     DOM Elements
     ------------------------------------------------------------------------- */
  
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const forms = document.querySelectorAll('form[data-netlify="true"]');

  /* -------------------------------------------------------------------------
     Mobile Navigation
     ------------------------------------------------------------------------- */
  
  function toggleMobileNav() {
    const isOpen = mobileNav.classList.contains('mobile-nav--open');
    
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    mobileNav.classList.add('mobile-nav--open');
    menuToggle.classList.add('menu-toggle--open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('mobile-nav--open');
    menuToggle.classList.remove('menu-toggle--open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', toggleMobileNav);
    
    // Close mobile nav when clicking a link
    mobileNavLinks.forEach(function(link) {
      link.addEventListener('click', closeMobileNav);
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
        closeMobileNav();
      }
    });

    // Close mobile nav on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 992 && mobileNav.classList.contains('mobile-nav--open')) {
        closeMobileNav();
      }
    });
  }

  /* -------------------------------------------------------------------------
     Header Scroll Effect
     ------------------------------------------------------------------------- */
  
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }

  if (header) {
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  /* -------------------------------------------------------------------------
     Converging Paths Parallax - Lines converge to lower-right of hero
     ------------------------------------------------------------------------- */
  
  var heroPathsSvg = document.querySelector('.hero__paths');
  var heroPaths = document.querySelectorAll('.hero__path');
  var heroBalls = document.querySelectorAll('.hero__ball');
  var heroPathPoint = document.querySelectorAll('.hero__path-point');
  var heroSection = document.querySelector('.hero');

  function updateConvergingPaths() {
    if (!heroPathsSvg || !heroSection) return;
    
    var scrollY = window.scrollY;
    var heroHeight = heroSection.offsetHeight;
    
    // Calculate scroll progress (0 to 1) within hero
    var progress = Math.min(Math.max(scrollY / (heroHeight * 0.8), 0), 1);
    
    // Subtle parallax movement for paths
    heroPaths.forEach(function(path, index) {
      var speed = (5 - index) * 0.15;
      var yOffset = progress * 40 * speed;
      var xOffset = progress * 10 * speed;
      path.style.transform = 'translate(' + xOffset + 'px, ' + yOffset + 'px)';
    });
    
    // Convergence point pulses
    heroPathPoint.forEach(function(point) {
      var scale = 1 + (progress * 0.3);
      point.style.opacity = 0.5 + (progress * 0.3);
    });
  }

  if (heroPathsSvg) {
    window.addEventListener('scroll', function() {
      requestAnimationFrame(updateConvergingPaths);
    }, { passive: true });
    
    updateConvergingPaths();
  }

  /* -------------------------------------------------------------------------
     Drop Ball Animation - Falls, grows, and bounces on "How We Work" text
     ------------------------------------------------------------------------- */
  
  var dropBall = document.getElementById('dropBall');
  var howWeWorkSection = document.querySelector('.section');
  var howWeWorkLabel = howWeWorkSection ? howWeWorkSection.querySelector('.label') : null;
  var hasBounced = false;

  function updateDropBall() {
    if (!dropBall || !heroSection) return;
    
    var scrollY = window.scrollY;
    var heroHeight = heroSection.offsetHeight;
    var windowWidth = window.innerWidth;
    
    // Ball starts falling when user scrolls past 20% of hero
    var fallStart = heroHeight * 0.2;
    var fallEnd = heroHeight * 0.95;
    
    // Calculate target position (where "How We Work" label is)
    var targetX = windowWidth * 0.15; // roughly where the label starts
    var targetY = heroHeight + 100; // just below hero into the section
    
    // Starting position (lower-right of hero)
    var startX = windowWidth * 0.9;
    var startY = heroHeight * 0.85;
    
    if (scrollY < fallStart) {
      // Ball is stationary at convergence point area
      dropBall.style.transform = 'translate(0, 0) scale(1)';
      dropBall.style.opacity = '1';
      dropBall.style.width = '30px';
      dropBall.style.height = '30px';
      hasBounced = false;
      dropBall.classList.remove('hero__drop-ball--bouncing');
      dropBall.classList.remove('hero__drop-ball--hidden');
    } else if (scrollY >= fallStart && scrollY < fallEnd) {
      // Ball is falling
      var fallProgress = (scrollY - fallStart) / (fallEnd - fallStart);
      
      // Eased fall (accelerates like gravity)
      var easedProgress = fallProgress * fallProgress;
      
      // Calculate movement from start to target
      var moveX = (startX - targetX) * easedProgress;
      var moveY = easedProgress * (targetY - startY + 200);
      
      // Ball grows as it falls (30px to 50px)
      var size = 30 + (easedProgress * 25);
      
      dropBall.style.transform = 'translate(' + (-moveX) + 'px, ' + moveY + 'px) scale(' + (1 + easedProgress * 0.5) + ')';
      dropBall.style.opacity = '1';
      dropBall.style.width = size + 'px';
      dropBall.style.height = size + 'px';
      dropBall.style.boxShadow = '0 0 ' + (30 + easedProgress * 40) + 'px rgba(59,130,246,' + (0.8 + easedProgress * 0.2) + ')';
      hasBounced = false;
      dropBall.classList.remove('hero__drop-ball--bouncing');
      dropBall.classList.remove('hero__drop-ball--hidden');
    } else {
      // Ball has landed on "How We Work" - trigger bounce and fade
      var finalX = startX - targetX;
      var finalY = targetY - startY + 200;
      
      dropBall.style.transform = 'translate(' + (-finalX) + 'px, ' + finalY + 'px) scale(1.5)';
      dropBall.style.width = '55px';
      dropBall.style.height = '55px';
      
      if (!hasBounced) {
        hasBounced = true;
        dropBall.classList.add('hero__drop-ball--bouncing');
        
        // After bounce animation, hide the ball
        setTimeout(function() {
          dropBall.classList.add('hero__drop-ball--hidden');
        }, 1200);
      }
    }
  }

  if (dropBall) {
    window.addEventListener('scroll', function() {
      requestAnimationFrame(updateDropBall);
    }, { passive: true });
    
    updateDropBall();
  }

  /* -------------------------------------------------------------------------
     Smooth Scroll
     ------------------------------------------------------------------------- */
  
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* -------------------------------------------------------------------------
     Form Handling
     ------------------------------------------------------------------------- */
  
  forms.forEach(function(form) {
    form.addEventListener('submit', handleFormSubmit);
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Basic validation
    if (!validateForm(form)) {
      return;
    }
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Prepare form data
    const formData = new FormData(form);
    
    // Submit to Netlify
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(function(response) {
      if (response.ok) {
        showFormSuccess(form);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      showFormError(form, 'Something went wrong. Please try again or email us directly.');
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    });
  }

  function validateForm(form) {
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.form__error').forEach(function(el) {
      el.remove();
    });
    
    // Check required fields
    form.querySelectorAll('[required]').forEach(function(field) {
      if (!field.value.trim()) {
        showFieldError(field, 'This field is required');
        isValid = false;
      }
    });
    
    // Validate email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
      showFieldError(emailField, 'Please enter a valid email address');
      isValid = false;
    }
    
    return isValid;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showFieldError(field, message) {
    const error = document.createElement('div');
    error.className = 'form__error';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.classList.add('form__input--error');
  }

  function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form__success';
    successMessage.innerHTML = '<strong>Thank you!</strong><br>Your message has been sent. We\'ll be in touch soon.';
    
    form.style.display = 'none';
    form.parentNode.insertBefore(successMessage, form);
  }

  function showFormError(form, message) {
    // Remove existing error if any
    const existingError = form.querySelector('.form__error--global');
    if (existingError) {
      existingError.remove();
    }
    
    const error = document.createElement('div');
    error.className = 'form__error form__error--global';
    error.style.marginBottom = 'var(--space-4)';
    error.textContent = message;
    form.insertBefore(error, form.firstChild);
  }

  /* -------------------------------------------------------------------------
     Intersection Observer for Animations
     ------------------------------------------------------------------------- */
  
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  
  if (animateOnScroll.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animateOnScroll.forEach(function(el) {
      observer.observe(el);
    });
  }

  /* -------------------------------------------------------------------------
     Current Year for Copyright
     ------------------------------------------------------------------------- */
  
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(function(el) {
    el.textContent = currentYear;
  });

})();
