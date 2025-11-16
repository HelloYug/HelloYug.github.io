/**
 * Portfolio Main JavaScript
 * Template Name: Personal - v2.1.0
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 * 
 * This file contains the core functionality for the portfolio website including:
 * - Navigation menu handling
 * - Mobile navigation
 * - Section navigation with hash links
 * - Counter animations
 * - Skills progress bars
 * - Testimonials carousel
 * - Portfolio filtering with Isotope
 * - Lightbox functionality
 */

!(function($) {
  "use strict";

  // ========================================
  // NAVIGATION MENU HANDLING
  // ========================================
  
  /**
   * Handles navigation menu clicks for both desktop and mobile
   * Manages section transitions and active states
   */
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    // Check if the link is for the same page
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
        location.hostname == this.hostname) {
      
      var hash = this.hash;
      var target = $(hash);
      
      if (target.length) {
        e.preventDefault();

        // Update active menu item
        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        // Handle navigation to header (home)
        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        // Handle navigation to other sections
        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        // Close mobile menu if open
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // ========================================
  // HASH LINK NAVIGATION ON PAGE LOAD
  // ========================================
  
  /**
   * Activates and shows sections based on URL hash on page load
   * Allows direct linking to specific sections
   */
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // ========================================
  // MOBILE NAVIGATION SETUP
  // ========================================
  
  /**
   * Creates and manages mobile navigation menu
   * Clones desktop menu for mobile view
   */
  if ($('.nav-menu').length) {
    // Clone navigation menu for mobile
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    
    // Add mobile navigation toggle button
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    
    // Add overlay for mobile menu
    $('body').append('<div class="mobile-nav-overly"></div>');

    // Toggle mobile menu on button click
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    // Close mobile menu when clicking outside
    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    // Hide mobile nav elements if desktop nav doesn't exist
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // ========================================
  // COUNTER ANIMATION
  // ========================================
  
  /**
   * Animates counter numbers using jQuery counterUp plugin
   * Displays statistics with smooth counting animation
   */
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // ========================================
  // SKILLS PROGRESS BARS
  // ========================================
  
  /**
   * Animates skill progress bars when they come into view
   * Uses Waypoints plugin to trigger animation on scroll
   */
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // ========================================
  // TESTIMONIALS CAROUSEL
  // ========================================
  
  /**
   * Initializes testimonials carousel using Owl Carousel
   * Displays client testimonials in a responsive slider
   */
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // ========================================
  // PORTFOLIO ISOTOPE FILTERING
  // ========================================
  
  /**
   * Initializes portfolio filtering using Isotope
   * Allows filtering projects by category
   */
  $(window).on('load', function() {
    // Initialize Isotope on portfolio container
    var portfolioIsotope = $('.newalpha-container').isotope({
      itemSelector: '.newalpha-item',
      layoutMode: 'fitRows'
    });

    // Filter items on button click
    $('#newalpha-flters li').on('click', function() {
      // Update active filter button
      $("#newalpha-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      // Apply filter
      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // ========================================
  // VENOBOX LIGHTBOX
  // ========================================
  
  /**
   * Initializes Venobox lightbox for portfolio items
   * Enables image and iframe viewing in modal overlay
   */
  $(document).ready(function() {
    $('.venobox').venobox();
  });

})(jQuery);
