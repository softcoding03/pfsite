// Info panels management

class Panels {
  constructor(milestones) {
    this.milestones = milestones;
    this.panelsContainer = document.getElementById('milestone-panels');
    this.activePanelId = null;
    
    this.init();
  }
  
  init() {
    if (!this.panelsContainer) return;
    
    // Clear existing panels
    this.panelsContainer.innerHTML = '';
    
    // Create panel for each milestone
    this.milestones.forEach(milestone => {
      const panel = this.createPanel(milestone);
      this.panelsContainer.appendChild(panel);
    });
  }
  
  createPanel(milestone) {
    const panel = document.createElement('div');
    panel.className = 'milestone-panel';
    panel.id = `panel-${milestone.id}`;
    
    // Format date
    const date = milestone.timestamp.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Create panel content
    panel.innerHTML = `
      <h3>${milestone.title}</h3>
      <div class="date">${date}</div>
      <p class="description">${milestone.description}</p>
      <div class="tech-stack">
        ${milestone.techStack.map(tech => `<span class="tech">${tech}</span>`).join('')}
      </div>
      <div class="achievements">
        ${milestone.achievements.map(achievement => 
          `<div class="achievement">${achievement}</div>`
        ).join('')}
      </div>
      <div class="icon">
        <!-- Fallback icon if image fails to load -->
      </div>
    `;
    
    // Load icon
    if (milestone.icon) {
      const img = new Image();
      img.onload = () => {
        const iconEl = panel.querySelector('.icon');
        if (iconEl) {
          iconEl.style.backgroundImage = `url(${milestone.icon})`;
        }
      };
      img.src = milestone.icon;
      
      // Fallback for SVG icons
      img.onerror = () => {
        // Use a simple SVG as a fallback
        const iconEl = panel.querySelector('.icon');
        if (iconEl) {
          if (milestone.title.includes('Degree')) {
            iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" /></svg>`;
          } else if (milestone.title.includes('Developer')) {
            iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M8 3V5H6V3H8M3 3V5H1V3H3M13 3V5H11V3H13M18 3V5H16V3H18M23 3V5H21V3H23M11 8V10H9V8H11M13 8V10H11V8H13M15 8V10H13V8H15M11 18V20H9V18H11M13 18V20H11V18H13M15 18V20H13V18H15M19 18V20H17V18H19M23 18V20H21V18H23M23 13V15H1V13H23Z" /></svg>`;
          } else {
            iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 3C7.58 3 4 4.79 4 7C4 9.21 7.58 11 12 11C16.42 11 20 9.21 20 7C20 4.79 16.42 3 12 3M4 9V12C4 14.21 7.58 16 12 16C16.42 16 20 14.21 20 12V9C20 11.21 16.42 13 12 13C7.58 13 4 11.21 4 9M4 14V17C4 19.21 7.58 21 12 21C16.42 21 20 19.21 20 17V14C20 16.21 16.42 18 12 18C7.58 18 4 16.21 4 14Z" /></svg>`;
          }
        }
      };
    }
    
    return panel;
  }
  
  showPanel(milestoneId) {
    // Hide all panels
    const allPanels = document.querySelectorAll('.milestone-panel');
    allPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Show the selected panel
    const panel = document.getElementById(`panel-${milestoneId}`);
    if (panel) {
      panel.classList.add('active');
      this.activePanelId = milestoneId;
      
      // Apply typing effect to the description
      const description = panel.querySelector('.description');
      if (description) {
        const originalText = description.textContent;
        
        // Only apply typing effect if in viewport and if prefers-reduced-motion is not enabled
        if (utils.isInViewport(description) && 
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          utils.typeText(description, originalText, 15);
        }
      }
    }
  }
}

// Create panels instance globally
window.panelsInstance = new Panels(window.milestones || []);