// Main application script

(function() {
  // Global variables
  let lastScrollPosition = 0;
  let ticking = false;
  let scrollPercentage = 0;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  // DOM elements
  const characterEl = document.getElementById('character');
  const timelineEl = document.querySelector('.timeline');
  const sections = document.querySelectorAll('.section');
  
  // Initialize application
  function init() {
    // Setup scroll and resize event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);
    
    // Setup intersection observers for sections
    setupSectionObservers();
    
    // Setup touch events for mobile
    setupTouchEvents();
    
    // Create SVG placeholder files for milestones
    createSvgPlaceholders();
    
    // Initial update
    requestAnimationFrame(update);
  }
  
  // Create SVG placeholders for milestone icons
  function createSvgPlaceholders() {
    const icons = [
      { name: 'graduation', path: 'M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z' },
      { name: 'code', path: 'M8,3V5H6V3H8M3,3V5H1V3H3M13,3V5H11V3H13M18,3V5H16V3H18M23,3V5H21V3H23M11,8V10H9V8H11M13,8V10H11V8H13M15,8V10H13V8H15M11,18V20H9V18H11M13,18V20H11V18H13M15,18V20H13V18H15M19,18V20H17V18H19M23,18V20H21V18H23M23,13V15H1V13H23Z' },
      { name: 'database', path: 'M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z' },
      { name: 'mobile', path: 'M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z' },
      { name: 'rocket', path: 'M13.13,22.19L11.5,18.36C13.07,17.78 14.54,17 15.9,16.09L13.13,22.19M5.64,12.5L1.81,10.87L7.91,8.1C7,9.46 6.22,10.93 5.64,12.5M21.61,2.39C21.61,2.39 16.66,0.269 11,5.93C8.81,8.12 7.5,10.53 6.65,12.64C6.37,13.39 6.56,14.21 7.11,14.77L9.24,16.89C9.79,17.45 10.61,17.63 11.36,17.35C13.5,16.53 15.88,15.19 18.07,13C23.73,7.34 21.61,2.39 21.61,2.39M14.54,9.46C13.76,8.68 13.76,7.41 14.54,6.63C15.32,5.85 16.59,5.85 17.37,6.63C18.14,7.41 18.15,8.68 17.37,9.46C16.59,10.24 15.32,10.24 14.54,9.46Z' }
    ];
    
    // Create the assets directory if it doesn't exist
    const assetsDir = 'src/assets';
    
    // For real implementation, these SVG files would be created
    // In this environment, we're using inline SVG fallbacks
    console.log('SVG placeholders would be created for:', icons.map(i => i.name).join(', '));
    
    // In a real environment, we would create physical SVG files
    // For this example, we'll use inline SVG fallbacks in the panels.js file
  }
  
  // Setup section intersection observers
  function setupSectionObservers() {
    const observer = utils.createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // Setup touch events for mobile
  function setupTouchEvents() {
    if (!timelineEl) return;
    
    // Add touch events for timeline markers
    const markers = document.querySelectorAll('.timeline-marker');
    markers.forEach(marker => {
      marker.addEventListener('touchstart', () => {
        marker.click();
      });
    });
  }
  
  // Handle window resize
  function handleResize() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Handle window load
  function handleLoad() {
    // Initial updates
    scrollPercentage = utils.getScrollPercentage();
    updateTimelineFromScroll(scrollPercentage);
    updateCharacterPosition(scrollPercentage);
    updateParallax();
    
    // Make sections visible if they're in the viewport
    sections.forEach(section => {
      if (utils.isInViewport(section)) {
        section.classList.add('visible');
      }
    });
  }
  
  // Handle scroll event
  function handleScroll() {
    lastScrollPosition = window.scrollY;
    
    if (!ticking) {
      requestAnimationFrame(() => {
        scrollPercentage = utils.getScrollPercentage();
        updateAll(scrollPercentage);
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Main update function
  function update() {
    // If scroll position has changed
    if (lastScrollPosition !== window.scrollY) {
      lastScrollPosition = window.scrollY;
      scrollPercentage = utils.getScrollPercentage();
      updateAll(scrollPercentage);
    }
    
    // Continue the animation loop
    requestAnimationFrame(update);
  }
  
  // Update all components
  function updateAll(scrollPercent) {
    updateCharacterPosition(scrollPercent);
    updateTimelineFromScroll(scrollPercent);
    updateParallax();
  }
  
  // Update character position based on scroll
  function updateCharacterPosition(scrollPercent) {
    if (window.characterInstance) {
      window.characterInstance.updatePosition(scrollPercent);
    }
  }
  
  // Update timeline based on scroll
  function updateTimelineFromScroll(scrollPercent) {
    if (window.timelineInstance) {
      window.timelineInstance.updateMilestoneFromScroll(scrollPercent);
    }
  }
  
  // Update parallax elements
  function updateParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.classList.contains('parallax-slow') ? 0.1 :
                   element.classList.contains('parallax-medium') ? 0.2 : 0.3;
      
      const yOffset = scrollY * speed;
      element.style.setProperty('--parallax-offset', `${yOffset}px`);
    });
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);
})();

// Create character sprite placeholder
(function createCharacterSprite() {
  // This would normally generate and save a physical sprite file
  // For this example, we're creating a small canvas that generates the sprite data
  const canvas = document.createElement('canvas');
  canvas.width = 32; // Two frames side by side
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  
  // First frame (standing position)
  ctx.fillStyle = '#00ffff';
  // Head
  ctx.fillRect(4, 0, 8, 8);
  // Body
  ctx.fillRect(4, 8, 8, 4);
  // Legs
  ctx.fillRect(4, 12, 2, 4);
  ctx.fillRect(10, 12, 2, 4);
  // Arms
  ctx.fillRect(2, 8, 2, 4);
  ctx.fillRect(12, 8, 2, 4);
  
  // Second frame (walking position)
  // Head
  ctx.fillRect(20, 0, 8, 8);
  // Body
  ctx.fillRect(20, 8, 8, 4);
  // Legs (different position)
  ctx.fillRect(20, 12, 2, 3);
  ctx.fillRect(26, 12, 2, 4);
  // Arms (different position)
  ctx.fillRect(18, 7, 2, 4);
  ctx.fillRect(28, 8, 2, 4);
  
  // Convert to data URL
  const spriteDataUrl = canvas.toDataURL();
  
  // Create a fake image element to represent the sprite
  const img = new Image();
  img.src = spriteDataUrl;
  
  // In a real implementation, this would save to a file
  // For this demo, we'll use a data URL as a fallback
  console.log('Pixel character sprite created');
  
  // Add the data URL to the character element as a fallback
  const characterEl = document.getElementById('character');
  if (characterEl) {
    characterEl.style.backgroundImage = `url(${spriteDataUrl})`;
  }
})();