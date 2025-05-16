// Utility functions

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @return {Function} - The debounced function
 */
function debounce(func, wait = 16) {
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

/**
 * Map a value from one range to another
 * @param {number} value - The value to map
 * @param {number} fromMin - The minimum value of the input range
 * @param {number} fromMax - The maximum value of the input range
 * @param {number} toMin - The minimum value of the output range
 * @param {number} toMax - The maximum value of the output range
 * @return {number} - The mapped value
 */
function mapRange(value, fromMin, fromMax, toMin, toMax) {
  // Ensure the value is within the input range
  const clampedValue = Math.max(fromMin, Math.min(fromMax, value));
  
  // Calculate the mapped value
  return (
    ((clampedValue - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
  );
}

/**
 * Get the current scroll percentage
 * @return {number} - The scroll percentage (0-100)
 */
function getScrollPercentage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = 
    document.documentElement.scrollHeight - 
    document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
}

/**
 * Check if element is in viewport
 * @param {Element} element - The element to check
 * @param {number} offset - Optional viewport offset
 * @return {boolean} - True if element is in viewport
 */
function isInViewport(element, offset = 0) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - offset) &&
    rect.bottom >= offset
  );
}

/**
 * Intersection Observer factory function
 * @param {Function} callback - The callback to execute when intersection changes
 * @param {Object} options - IntersectionObserver options
 * @return {IntersectionObserver} - The observer instance
 */
function createObserver(callback, options = {}) {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  });
}

/**
 * A function to create and apply typing animation to elements
 * @param {Element} element - The element to apply the animation to
 * @param {string} text - The text to type
 * @param {number} speed - The typing speed in milliseconds
 */
function typeText(element, text, speed = 50) {
  if (!element) return;
  
  element.classList.add('typing-effect');
  element.textContent = '';
  
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        element.classList.remove('typing-effect');
      }, 1000);
    }
  }, speed);
}

/**
 * Generate a CSS pixel art representation of a character
 * @param {number} width - Width of the character in pixels
 * @param {number} height - Height of the character in pixels
 * @return {string} - CSS box-shadow property for pixel art
 */
function generatePixelArtCharacter() {
  // This would normally generate a CSS box-shadow property for pixel art
  // For now, we'll use a sprite sheet defined in the CSS
  const characterElement = document.getElementById('character');
  
  if (characterElement) {
    // Create a canvas to draw the character (fallback if image loading fails)
    const canvas = document.createElement('canvas');
    canvas.width = 32; // Two frames
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    
    // First frame (standing)
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
    
    // Second frame (walking)
    ctx.fillStyle = '#00ffff';
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
    
    // Export as data URL
    const spriteSheet = canvas.toDataURL();
    
    // Only set background if main image fails to load
    const img = new Image();
    img.onerror = () => {
      characterElement.style.backgroundImage = `url(${spriteSheet})`;
    };
    img.src = 'src/assets/character-sprite.png';
  }
}

// Export utilities
window.utils = {
  debounce,
  mapRange,
  getScrollPercentage,
  isInViewport,
  createObserver,
  typeText,
  generatePixelArtCharacter
};