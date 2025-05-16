// Character animation and movement

class Character {
  constructor() {
    this.element = document.getElementById('character');
    this.position = 0; // 0-1000px
    this.isWalking = false;
    this.walkingTimeout = null;
    this.lastScrollPosition = 0;
    this.direction = 'right'; // or 'left'
    
    this.init();
  }
  
  init() {
    if (!this.element) return;
    
    // Create fallback pixel art character
    utils.generatePixelArtCharacter();
    
    // Initial position
    this.updatePosition(0);
    
    // Generate sprite element for character (16x16)
    const img = new Image();
    img.onload = () => {
      // If real sprite loaded successfully
      this.element.style.backgroundImage = `url(${img.src})`;
    };
    img.src = 'src/assets/character-sprite.png';
    
    // Fallback for missing images
    img.onerror = () => {
      console.log('Character sprite image could not be loaded');
      // Character already has a fallback from generatePixelArtCharacter
    };
  }
  
  updatePosition(scrollPercent) {
    if (!this.element) return;
    
    // Calculate new position
    const newPosition = utils.mapRange(scrollPercent, 0, 100, 0, 1000);
    
    // Determine direction
    const previousPosition = this.position;
    this.direction = newPosition > previousPosition ? 'right' : 'left';
    
    // Update position
    this.position = newPosition;
    this.element.style.left = `${this.position}px`;
    
    // Update character direction
    if (this.direction === 'left') {
      this.element.style.transform = 'translateY(-100%) scaleX(-1)';
    } else {
      this.element.style.transform = 'translateY(-100%)';
    }
    
    // Start/stop walking animation based on position change
    this.updateWalkingState(Math.abs(newPosition - previousPosition) > 0.1);
  }
  
  updateWalkingState(isMoving) {
    if (!this.element) return;
    
    clearTimeout(this.walkingTimeout);
    
    if (isMoving) {
      // Start walking
      this.element.classList.add('walking');
      this.isWalking = true;
    } else {
      // Stop walking after a short delay
      this.walkingTimeout = setTimeout(() => {
        this.element.classList.remove('walking');
        this.isWalking = false;
      }, 200);
    }
  }
  
  // Check if character is near a specific milestone
  isNearMilestone(milestonePosition, threshold = 20) {
    return Math.abs(this.position - milestonePosition) <= threshold;
  }
}

// Create character instance globally
window.characterInstance = new Character();