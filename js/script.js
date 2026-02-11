// ========================================
// Bad Debt Solutions - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Navigation Functionality
  // ========================================
  
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Sticky navbar on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Check if it's an anchor link (starts with #)
      if (href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
          
          // Smooth scroll to target
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  
  // ========================================
  // PDF Download Functionality
  // ========================================
  
  const engageButtons = [
    document.getElementById('navEngageBtn'),
    document.getElementById('heroEngageBtn'),
    document.getElementById('ctaEngageBtn'),
    document.getElementById('footerEngageBtn')
  ];
  
  // Download PDF form
  function downloadPDF() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'images/BDS_Client_Inquiry_Form.pdf';
    link.download = 'BDS_Client_Inquiry_Form.pdf';
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show toast notification
    showToast('Download Started', 'Your Client Inquiry Form is downloading...');
    
    // Track download event (if analytics is implemented)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        'event_category': 'engagement',
        'event_label': 'Client Inquiry Form',
        'value': 1
      });
    }
  }
  
  // Add click event to all engage buttons
  engageButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        downloadPDF();
      });
    }
  });
  
  
  // ========================================
  // Toast Notification System
  // ========================================
  
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toastClose');
  let toastTimeout;
  
  function showToast(title, message, duration = 5000) {
    // Get toast elements
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set toast content
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    
    // Clear any existing timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto-hide after duration
    toastTimeout = setTimeout(() => {
      hideToast();
    }, duration);
  }
  
  function hideToast() {
    toast.classList.remove('show');
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
  }
  
  // Close toast on button click
  if (toastClose) {
    toastClose.addEventListener('click', hideToast);
  }
  
  // Close toast on click outside
  toast.addEventListener('click', function(e) {
    if (e.target === toast) {
      hideToast();
    }
  });
  
  
  // ========================================
  // Scroll Animations (Intersection Observer)
  // ========================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe animated elements
  const animatedElements = document.querySelectorAll(
    '.service-card, .why-card, .fee-card, .about-content, .section-header'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  
  // ========================================
  // Contact Link Handlers
  // ========================================
  
  // WhatsApp link - open in new tab/app
  const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Track WhatsApp click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'contact',
          'event_label': 'WhatsApp',
          'value': 1
        });
      }
    });
  });
  
  // Email links
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Track email click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'contact',
          'event_label': 'Email',
          'value': 1
        });
      }
    });
  });
  
  // Phone links
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Track phone click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'contact',
          'event_label': 'Phone',
          'value': 1
        });
      }
    });
  });
  
  
  // ========================================
  // Form Validation & Handling (Future Enhancement)
  // ========================================
  
  // This section is reserved for when the online form is implemented
  // It will handle form validation, local storage, and submission
  
  
  // ========================================
  // Performance Optimizations
  // ========================================
  
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Lazy loading images (if needed in future)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  
  // ========================================
  // Keyboard Accessibility
  // ========================================
  
  // Handle Escape key to close mobile menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (toast.classList.contains('show')) {
        hideToast();
      }
    }
  });
  
  // Focus management for mobile menu
  navToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navToggle.click();
      
      // Focus first menu item when menu opens
      if (navMenu.classList.contains('active')) {
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      }
    }
  });
  
  
  // ========================================
  // Service Worker Registration (Progressive Web App - Future)
  // ========================================
  
  // Uncomment when implementing PWA features
  /*
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }
  */
  
  
  // ========================================
  // Error Handling
  // ========================================
  
  window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    
    // Show user-friendly error toast for critical errors
    if (e.error && e.error.message && e.error.message.includes('PDF')) {
      showToast(
        'Download Error',
        'There was a problem downloading the form. Please try again or contact us directly.',
        7000
      );
    }
  });
  
  
  // ========================================
  // Analytics Event Tracking
  // ========================================
  
  // Track scroll depth
  let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
  };
  
  window.addEventListener('scroll', debounce(function() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    Object.keys(scrollDepthTracked).forEach(depth => {
      if (scrollPercentage >= parseInt(depth) && !scrollDepthTracked[depth]) {
        scrollDepthTracked[depth] = true;
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': `${depth}%`,
            'value': parseInt(depth)
          });
        }
      }
    });
  }, 500));
  
  
  // ========================================
  // Page Visibility API (Track user engagement)
  // ========================================
  
  let pageStartTime = Date.now();
  let totalTimeOnPage = 0;
  
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Page is hidden, calculate time spent
      totalTimeOnPage += Date.now() - pageStartTime;
    } else {
      // Page is visible again, reset start time
      pageStartTime = Date.now();
    }
  });
  
  // Track total time on page before leaving
  window.addEventListener('beforeunload', function() {
    if (!document.hidden) {
      totalTimeOnPage += Date.now() - pageStartTime;
    }
    
    const timeInSeconds = Math.round(totalTimeOnPage / 1000);
    
    if (typeof gtag !== 'undefined' && timeInSeconds > 5) {
      gtag('event', 'timing_complete', {
        'name': 'time_on_page',
        'value': timeInSeconds,
        'event_category': 'engagement'
      });
    }
  });
  
  
  // ========================================
  // Console Welcome Message
  // ========================================
  
  console.log('%c Bad Debt Solutions ', 'background: #1a2332; color: #c9a55a; font-size: 20px; font-weight: bold; padding: 10px;');
  console.log('%c Professional Debt Recovery Services in Ghana ', 'color: #4a5568; font-size: 12px;');
  console.log('%c No Collection, No Fee | 90%+ Success Rate ', 'color: #059669; font-size: 11px;');
  console.log('');
  console.log('📧 Email: BaDesolutions@gmail.com');
  console.log('📞 Phone: 0277 152 465 / 0248 286 230');
  console.log('💬 WhatsApp: 0277 152 000');
  console.log('');
  console.log('%c Website developed with ❤️ ', 'color: #c9a55a; font-style: italic;');
  
});


// ========================================
// Utility Functions
// ========================================

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(phone) {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as: 0XXX XXX XXX
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
}

/**
 * Validate email address
 * @param {string} email - Email address
 * @returns {boolean} Is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    return false;
  }
}

/**
 * Get current date in format: YYYY-MM-DD
 * @returns {string} Current date
 */
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Smooth scroll to element
 * @param {string} elementId - Element ID
 * @param {number} offset - Offset from top (default: 80)
 */
function smoothScrollTo(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Export functions for use in other scripts (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatPhoneNumber,
    isValidEmail,
    copyToClipboard,
    getCurrentDate,
    smoothScrollTo
  };
}
