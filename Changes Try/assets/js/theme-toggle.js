/**
 * Theme Toggle Functionality
 * Handles dark/light mode switching
 */

(function() {
  'use strict';

  const ThemeManager = {
    
    init: function() {
      this.createToggleButton();
      this.loadSavedTheme();
      this.attachEventListeners();
    },
    
    createToggleButton: function() {
      // Check if button already exists
      if (document.getElementById('theme-toggle')) {
        return;
      }
      
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'theme-toggle';
      toggleBtn.className = 'theme-toggle';
      toggleBtn.innerHTML = '<i class="bx bx-moon"></i>';
      toggleBtn.setAttribute('title', 'Toggle theme');
      
      // Ensure button is added to body
      if (document.body) {
        document.body.appendChild(toggleBtn);
      } else {
        // If body not ready, wait for it
        document.addEventListener('DOMContentLoaded', () => {
          document.body.appendChild(toggleBtn);
        });
      }
    },
    
    loadSavedTheme: function() {
      const savedTheme = localStorage.getItem(PortfolioConfig.themeStorageKey);
      const theme = savedTheme || PortfolioConfig.defaultTheme;
      this.applyTheme(theme, false);
    },
    
    attachEventListeners: function() {
      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleTheme());
      }
    },
    
    toggleTheme: function() {
      const currentTheme = document.body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(newTheme, true);
    },
    
    applyTheme: function(theme, save = true) {
      document.body.setAttribute('data-theme', theme);
      
      if (save) {
        localStorage.setItem(PortfolioConfig.themeStorageKey, theme);
      }
      
      this.updateToggleIcon(theme);
      this.applyCSSVariables(theme);
    },
    
    updateToggleIcon: function(theme) {
      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        if (theme === 'dark') {
          icon.className = 'bx bx-sun';
        } else {
          icon.className = 'bx bx-moon';
        }
      }
    },
    
    applyCSSVariables: function(theme) {
      const colors = theme === 'dark' ? PortfolioConfig.darkTheme : PortfolioConfig.lightTheme;
      const root = document.documentElement;
      
      // Apply all color variables
      Object.keys(colors).forEach(key => {
        const cssVarName = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(cssVarName, colors[key]);
      });
      
      // Apply typography variables
      Object.keys(PortfolioConfig.typography).forEach(key => {
        const cssVarName = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(cssVarName, PortfolioConfig.typography[key]);
      });
      
      // Apply spacing variables
      Object.keys(PortfolioConfig.spacing).forEach(key => {
        const cssVarName = '--spacing-' + key;
        root.style.setProperty(cssVarName, PortfolioConfig.spacing[key]);
      });
      
      // Apply border radius variables
      Object.keys(PortfolioConfig.borderRadius).forEach(key => {
        const cssVarName = '--radius-' + key;
        root.style.setProperty(cssVarName, PortfolioConfig.borderRadius[key]);
      });
      
      // Apply shadow variables
      Object.keys(PortfolioConfig.shadows).forEach(key => {
        const cssVarName = '--shadow-' + key;
        root.style.setProperty(cssVarName, PortfolioConfig.shadows[key]);
      });
      
      // Apply transition variables
      Object.keys(PortfolioConfig.transitions).forEach(key => {
        const cssVarName = '--transition-' + key;
        root.style.setProperty(cssVarName, PortfolioConfig.transitions[key]);
      });
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
  } else {
    ThemeManager.init();
  }
  
})();
