/**
 * Portfolio Configuration File
 * Manage all colors, themes, and customizable elements from here
 */

const PortfolioConfig = {
  
  // Theme Colors - Dark Mode
  darkTheme: {
    // Background Colors
    primaryBg: '#010e1b',
    secondaryBg: '#09203a',
    cardBg: '#1f1f1f',
    overlayBg: 'rgba(0, 0, 0, 0.6)',
    
    // Text Colors
    primaryText: '#fff',
    secondaryText: '#dee2e6',
    mutedText: 'rgba(255, 255, 255, 0.3)',
    
    // Accent Colors
    primaryAccent: '#12d640',
    secondaryAccent: '#1c7d32',
    hoverAccent: '#15bb62',
    warningAccent: '#ffc107',
    errorAccent: '#ed3c0d',
    
    // Border Colors
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderAccent: 'rgba(255, 255, 255, 0.12)',
    
    // Button Colors
    buttonBg: '#1c7d32',
    buttonHover: '#15bb62',
    buttonText: '#fff',
    
    // Link Colors
    linkColor: '#12d640',
    linkHover: '#12d640',
    
    // Form Colors
    inputBg: 'rgba(255, 255, 255, 0.08)',
    inputFocus: 'rgba(255, 255, 255, 0.11)',
    inputBorder: 'rgba(255, 255, 255, 0.2)',
    
    // Special Colors
    goldAccent: '#9e7f25',
    blueAccent: '#042b56eb',
    greenGlow: 'rgba(28, 125, 50, 0.4)'
  },
  
  // Theme Colors - Light Mode
  lightTheme: {
    // Background Colors
    primaryBg: '#f8f9fa',
    secondaryBg: '#ffffff',
    cardBg: '#ffffff',
    overlayBg: 'rgba(255, 255, 255, 0.95)',
    
    // Text Colors
    primaryText: '#212529',
    secondaryText: '#495057',
    mutedText: 'rgba(0, 0, 0, 0.6)',
    
    // Accent Colors
    primaryAccent: '#1c7d32',
    secondaryAccent: '#28a745',
    hoverAccent: '#218838',
    warningAccent: '#ffc107',
    errorAccent: '#dc3545',
    
    // Border Colors
    borderColor: 'rgba(0, 0, 0, 0.125)',
    borderAccent: 'rgba(0, 0, 0, 0.08)',
    
    // Button Colors
    buttonBg: '#1c7d32',
    buttonHover: '#218838',
    buttonText: '#ffffff',
    
    // Link Colors
    linkColor: '#1c7d32',
    linkHover: '#218838',
    
    // Form Colors
    inputBg: '#ffffff',
    inputFocus: '#f8f9fa',
    inputBorder: '#ced4da',
    
    // Special Colors
    goldAccent: '#b8860b',
    blueAccent: '#e7f3ff',
    greenGlow: 'rgba(28, 125, 50, 0.15)'
  },
  
  // Typography
  typography: {
    // Font Families
    primaryFont: '"Open Sans", sans-serif',
    headingFont: '"Raleway", sans-serif',
    specialFont: '"Poppins", sans-serif',
    monoFont: '"Courier New", Courier, monospace',
    
    // Font Sizes
    baseFontSize: '16px',
    h1Size: '48px',
    h2Size: '24px',
    h3Size: '26px',
    h4Size: '24px',
    smallSize: '14px',
    tinySize: '12px',
    
    // Font Weights
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  
  // Spacing
  spacing: {
    xs: '5px',
    sm: '10px',
    md: '20px',
    lg: '30px',
    xl: '40px',
    xxl: '60px'
  },
  
  // Border Radius
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '10px',
    round: '50%',
    pill: '25px'
  },
  
  // Shadows
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    large: '0 6px 16px rgba(0, 0, 0, 0.3)',
    glow: '0 0 15px rgba(28, 125, 50, 0.3)'
  },
  
  // Transitions
  transitions: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    easing: 'ease-in-out'
  },
  
  // Animations
  animations: {
    typeSpeed: 70,
    backSpeed: 70,
    fadeInDuration: 500,
    scrollDuration: 350
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    wide: '1200px'
  },
  
  // Z-Index Layers
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 100,
    fixed: 1000,
    modal: 9999,
    tooltip: 99999,
    loader: 99999
  },
  
  // Personal Information
  personal: {
    name: 'Yug Agarwal',
    title: 'AI and Automation Enthusiast',
    email: 'yugagarwal704@gmail.com',
    phone: '+91 70114 03558',
    location: 'Ghaziabad, Delhi-NCR, India',
    
    // Social Links
    linkedin: 'https://www.linkedin.com/in/yugagarwal704/',
    github: 'https://www.github.com/HelloYug',
    leetcode: 'https://leetcode.com/u/yugagarwal704/',
    
    // Typing Animation Strings
    typingStrings: [
      "Programmer",
      "AI Enthusiast",
      "Python Developer",
      "Automation Enthusiast"
    ]
  },
  
  // Profile Pictures
  profilePictures: {
    count: 5,
    weights: [1, 1, 1, 0, 3], // Higher number = higher chance
    basePath: 'assets/img/',
    filePattern: 'YugAgarwalPFP ({index}).{ext}',
    extensions: {
      1: 'jpg',
      2: 'jpg',
      3: 'jpg',
      4: 'jpg',
      5: 'png'
    }
  },
  
  // Navigation
  navigation: {
    items: [
      { label: 'Home', href: 'index.html', active: true },
      { label: 'About', href: '#about' },
      { label: 'Education', href: '#education' },
      { label: 'Experience', href: '#experience' },
      { label: 'Projects', href: '#Projects' },
      { label: 'Skills', href: '#skills' },
      { label: 'Resume', href: 'resume.html', target: '_blank' },
      { label: 'Contact', href: '#contacts' }
    ]
  },
  
  // Back to Top Button
  backToTop: {
    showAfterScroll: 300,
    size: '50px',
    bottomOffset: '30px',
    rightOffset: '30px',
    iconSize: '24px'
  },
  
  // Loading Spinner
  loadingSpinner: {
    size: '60px',
    borderWidth: '4px',
    fadeOutDelay: 500,
    fadeOutDuration: 500
  },
  
  // Form Validation
  formValidation: {
    minMessageLength: 10,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    showErrorDuration: 5000
  },
  
  // Interest Icons Colors
  interestColors: {
    ai: '#ffbb2c',
    automation: '#5578ff',
    programming: '#e80368',
    problemSolving: '#1c7d32',
    dataAnalytics: '#28a745',
    research: '#f1081f',
    techDesign: '#47aeff',
    leadership: '#ffc107'
  },
  
  // Education Card
  educationCard: {
    bgColor: '#1f1f1f',
    borderRadius: '10px',
    padding: '20px',
    logoMaxWidth: '350px',
    logoHeight: '160px'
  },
  
  // Project Filters
  projectFilters: {
    all: '⭐ ALL ⭐',
    aiCvMl: '🧠 AI/CV/ML',
    management: '📦 Management',
    automation: '⚙️ Automation',
    web: '🌐 Web',
    snippets: '🧪 Snippets'
  },
  
  // Default Theme
  defaultTheme: 'dark', // 'dark' or 'light'
  
  // Theme Storage Key
  themeStorageKey: 'portfolio-theme-preference'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioConfig;
}
