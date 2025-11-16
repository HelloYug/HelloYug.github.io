/**
 * Portfolio Enhancements JavaScript
 * Contains additional features for improved user experience
 * - Back to Top button
 * - Project Search functionality
 * - Form validation
 * - Loading spinner
 * - Keyboard navigation improvements
 */

(function() {
  'use strict';

  // ========================================
  // BACK TO TOP BUTTON
  // ========================================
  
  /**
   * Creates and manages the "Back to Top" button
   * Shows button when user scrolls down, hides when at top
   */
  function initBackToTop() {
    const config = typeof PortfolioConfig !== 'undefined' ? PortfolioConfig.backToTop : {
      showAfterScroll: 300
    };
    
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    backToTopBtn.setAttribute('title', 'Back to top');
    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > config.showAfterScroll) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Keyboard accessibility
    backToTopBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  // Project search removed as requested

  // ========================================
  // FORM VALIDATION
  // ========================================
  
  /**
   * Adds client-side validation to contact form
   * Validates email format and required fields before submission
   */
  function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const config = typeof PortfolioConfig !== 'undefined' ? PortfolioConfig.formValidation : {
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      minMessageLength: 10,
      showErrorDuration: 5000
    };

    // Email validation regex
    const emailRegex = config.emailPattern;

    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(this);
      });

      input.addEventListener('input', function() {
        // Remove error styling on input
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    });

    // Form submission validation
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formData = new FormData(this);

      // Validate all fields
      inputs.forEach(function(input) {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Submit form
        fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(function(response) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;

          if (response.ok) {
            showFormStatus('success', 'Message sent successfully! Thank you for reaching out.');
            contactForm.reset();
          } else {
            return response.json().then(function(data) {
              throw new Error(data.error || 'Failed to send message');
            });
          }
        })
        .catch(function(error) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          showFormStatus('error', error.message || 'Oops! There was a problem sending your message.');
        });
      }
    });

    /**
     * Validates individual form field
     * @param {HTMLElement} field - The input field to validate
     * @returns {boolean} - Whether the field is valid
     */
    function validateField(field) {
      const value = field.value.trim();
      let isValid = true;
      let errorMessage = '';

      // Remove existing error message
      const existingError = field.parentElement.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

      // Check if required field is empty
      if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
      }
      // Validate email format
      else if (field.type === 'email' && value && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      // Validate minimum length for message
      else if (field.name === 'message' && value && value.length < config.minMessageLength) {
        isValid = false;
        errorMessage = `Message must be at least ${config.minMessageLength} characters long`;
      }

      // Show error if invalid
      if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        field.parentElement.appendChild(errorDiv);
      } else {
        field.classList.remove('error');
      }

      return isValid;
    }

    /**
     * Shows form submission status message
     * @param {string} type - 'success' or 'error'
     * @param {string} message - The message to display
     */
    function showFormStatus(type, message) {
      const statusDiv = contactForm.querySelector('.form-status');
      statusDiv.textContent = message;
      statusDiv.style.display = 'block';
      statusDiv.style.backgroundColor = type === 'success' ? '#1c7d32' : '#ed3c0d';
      statusDiv.style.color = '#fff';

      // Hide after configured duration
      setTimeout(function() {
        statusDiv.style.display = 'none';
      }, config.showErrorDuration);
    }
  }

  // ========================================
  // LOADING SPINNER
  // ========================================
  
  /**
   * Shows loading spinner while page loads
   */
  function initLoadingSpinner() {
    // Create loading spinner
    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
      <div class="spinner-content">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    `;
    document.body.appendChild(spinner);

    // Hide spinner when page is fully loaded
    window.addEventListener('load', function() {
      setTimeout(function() {
        spinner.classList.add('fade-out');
        setTimeout(function() {
          spinner.remove();
        }, 500);
      }, 500);
    });
  }

  // Keyboard navigation removed as requested

  // ========================================
  // INITIALIZE ALL ENHANCEMENTS
  // ========================================
  
  /**
   * Initialize all enhancement features when DOM is ready
   */
  document.addEventListener('DOMContentLoaded', function() {
    initLoadingSpinner();
    initBackToTop();
    initFormValidation();
  });

})();
