// Timeline management and interactions

class Timeline {
  constructor(milestones) {
    this.milestones = milestones;
    this.timelineEl = document.querySelector('.timeline');
    this.markersEl = document.getElementById('timeline-markers');
    this.timelineWidth = 1000; // In pixels
    this.activeMilestone = null;
    
    this.init();
  }
  
  init() {
    if (!this.markersEl) return;
    
    // Clear any existing markers
    this.markersEl.innerHTML = '';
    
    // Create timeline markers for each milestone
    this.milestones.forEach((milestone, index) => {
      const position = this.calculateMilestonePosition(index);
      const marker = this.createMarker(milestone, position);
      this.markersEl.appendChild(marker);
    });
    
    // Add click events for markers
    this.addMarkerEvents();
  }
  
  calculateMilestonePosition(index) {
    // Simple linear distribution - improved in the full version
    return Math.round((index / (this.milestones.length - 1)) * this.timelineWidth);
  }
  
  createMarker(milestone, position) {
    const marker = document.createElement('div');
    marker.className = 'timeline-marker';
    marker.dataset.id = milestone.id;
    marker.style.left = `${position}px`;
    
    // Format date
    const date = milestone.timestamp.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short'
    });
    
    // Add label
    const label = document.createElement('div');
    label.className = 'timeline-marker-label';
    label.textContent = `${date} - ${milestone.title}`;
    marker.appendChild(label);
    
    return marker;
  }
  
  addMarkerEvents() {
    const markers = document.querySelectorAll('.timeline-marker');
    
    markers.forEach(marker => {
      marker.addEventListener('click', () => {
        const id = Number(marker.dataset.id);
        this.activateMilestone(id);
        
        // Scroll to corresponding position
        const milestoneIndex = this.milestones.findIndex(m => m.id === id);
        const scrollPercent = (milestoneIndex / (this.milestones.length - 1)) * 100;
        
        // Calculate the actual scroll position based on document height
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = (scrollPercent / 100) * scrollHeight;
        
        // Smooth scroll
        window.scrollTo({
          top: scrollPos,
          behavior: 'smooth'
        });
      });
      
      // Add keyboard accessibility
      marker.setAttribute('tabindex', '0');
      marker.setAttribute('role', 'button');
      marker.setAttribute('aria-label', `Timeline milestone: ${this.getMilestoneById(marker.dataset.id)?.title}`);
      
      marker.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          marker.click();
        }
      });
    });
  }
  
  getMilestoneById(id) {
    return this.milestones.find(m => m.id === Number(id));
  }
  
  getMilestoneByPosition(position, threshold = 20) {
    // Find milestone closest to given position
    for (let i = 0; i < this.milestones.length; i++) {
      const milestonePos = this.calculateMilestonePosition(i);
      if (Math.abs(position - milestonePos) <= threshold) {
        return this.milestones[i];
      }
    }
    return null;
  }
  
  activateMilestone(id) {
    // Deactivate all markers
    document.querySelectorAll('.timeline-marker').forEach(m => {
      m.classList.remove('active');
    });
    
    // Activate the selected marker
    const marker = document.querySelector(`.timeline-marker[data-id="${id}"]`);
    if (marker) {
      marker.classList.add('active');
      this.activeMilestone = this.getMilestoneById(id);
      
      // Trigger panel update
      if (window.panelsInstance) {
        window.panelsInstance.showPanel(id);
      }
    }
  }
  
  updateMilestoneFromScroll(scrollPercent) {
    const position = utils.mapRange(scrollPercent, 0, 100, 0, this.timelineWidth);
    const milestone = this.getMilestoneByPosition(position);
    
    if (milestone && (!this.activeMilestone || milestone.id !== this.activeMilestone.id)) {
      this.activateMilestone(milestone.id);
    }
  }
}

// Create timeline instance globally
window.timelineInstance = new Timeline(window.milestones || []);