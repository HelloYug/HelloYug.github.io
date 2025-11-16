/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          // Update URL to remove hash
          history.pushState(null, null, window.location.pathname);
          return;
        }

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

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        // Update URL path (clean URLs for both localhost and production)
        if (hash && hash !== '#header') {
          var sectionName = hash.replace('#', '').toLowerCase();
          
          // Get base path (everything before the last /)
          var pathParts = window.location.pathname.split('/');
          var lastPart = pathParts[pathParts.length - 1];
          
          // Remove index.html or current section from path
          if (lastPart === 'index.html' || lastPart === '' || 
              ['about', 'education', 'experience', 'projects', 'skills', 'contacts', 'links'].indexOf(lastPart) !== -1) {
            pathParts.pop();
          }
          
          var basePath = pathParts.join('/') || '';
          var newPath = basePath + '/' + sectionName;
          history.pushState({ section: sectionName }, '', newPath);
        } else if (hash === '#header') {
          // Go back to home
          var pathParts = window.location.pathname.split('/');
          var lastPart = pathParts[pathParts.length - 1];
          
          if (lastPart !== 'index.html' && lastPart !== '') {
            pathParts.pop();
          }
          
          var basePath = pathParts.join('/') || '';
          var homePath = basePath + '/';
          history.pushState({ section: 'home' }, '', homePath);
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links or path
  function activateSection(sectionId) {
    if ($(sectionId).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + sectionId + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(sectionId).addClass('section-show');
      }, 350);
    }
  }

  // Check for hash in URL
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    activateSection(initial_nav);
  } 
  // Check for path-based navigation (e.g., /about)
  else {
    var pathParts = window.location.pathname.split('/').filter(function(p) { return p.length > 0; });
    var lastPart = pathParts[pathParts.length - 1];
    
    // Remove .html extension if present
    if (lastPart && lastPart.indexOf('.html') !== -1) {
      lastPart = lastPart.replace('.html', '');
    }
    
    // Map of valid sections (lowercase)
    var validSections = ['about', 'education', 'experience', 'projects', 'skills', 'contacts', 'links'];
    
    if (lastPart && lastPart !== 'index' && validSections.indexOf(lastPart.toLowerCase()) !== -1) {
      // Map section names to their IDs (Projects has capital P)
      var sectionId = '#' + (lastPart.toLowerCase() === 'projects' ? 'Projects' : lastPart);
      activateSection(sectionId);
    }
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
      var sectionName = event.state.section;
      if (sectionName === 'home') {
        $('#header').removeClass('header-top');
        $("section").removeClass('section-show');
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav').find('a[href="index.html"]').parent('li').addClass('active');
      } else {
        var sectionId = '#' + (sectionName === 'projects' ? 'Projects' : sectionName);
        activateSection(sectionId);
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

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
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
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

  // Portfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.newalpha-container').isotope({
      itemSelector: '.newalpha-item',
      layoutMode: 'fitRows'
    });

    $('#newalpha-flters li').on('click', function() {
      $("#newalpha-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

})(jQuery);