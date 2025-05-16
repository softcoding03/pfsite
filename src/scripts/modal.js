// Modal handling
let currentProject = null;
let currentSlide = 0;

export function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const project = window.projects.find(p => p.id === projectId);
  
  if (!project) return;
  
  currentProject = project;
  currentSlide = 0;
  const modalBody = modal.querySelector('.modal-body');
  
  modalBody.innerHTML = `
    <div class="modal-header">
      <h2>${project.title}</h2>
      <div class="project-period">${project.period}</div>
    </div>
    
    <div class="project-gallery">
      <div class="gallery-container">
        ${(project.images || []).map((img, index) => `
          <div class="gallery-slide ${index === 0 ? 'active' : ''}">
            <img src="${img}" alt="${project.title}" loading="lazy">
          </div>
        `).join('')}
      </div>
      
      <button class="gallery-arrow prev" data-action="prev">
        <i data-lucide="chevron-left"></i>
      </button>
      <button class="gallery-arrow next" data-action="next">
        <i data-lucide="chevron-right"></i>
      </button>
      
      <div class="gallery-nav">
        ${(project.images || []).map((_, index) => `
          <div class="gallery-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
        `).join('')}
      </div>
    </div>
    
    <div class="project-tech-stack">
      <h3>기술 스택</h3>
      <div class="tech-tags">
        ${(project.techStack || []).map(tech => `
          <span class="tech-tag ${tech.toLowerCase().includes('kotlin') ? 'tech-highlight' : ''}">${tech}</span>
        `).join('')}
      </div>
    </div>
    
    <div class="project-section">
      <h3>주요 기능</h3>
      <ul>
        ${(project.features || []).map(feature => `
          <li>${feature.includes('->') ? 
            `${feature.split('->')[0]}<span class="achievement-highlight">->${feature.split('->')[1]}</span>` : 
            feature}</li>
        `).join('')}
      </ul>
    </div>
    
    <div class="project-section">
      <h3>주요 성과</h3>
      <ul>
        ${(project.achievements || []).map(achievement => `
          <li>${achievement.includes('->') ? 
            `${achievement.split('->')[0]}<span class="achievement-highlight">->${achievement.split('->')[1]}</span>` : 
            achievement.includes('%') ? 
            `<span class="achievement-highlight">${achievement}</span>` : 
            achievement}</li>
        `).join('')}
      </ul>
    </div>
    
    <div class="project-section">
      <h3>인사이트</h3>
      <ul>
        ${(project.insights || []).map(insight => `
          <li>${insight}</li>
        `).join('')}
      </ul>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Initialize Lucide icons for new elements
  lucide.createIcons();
}

export function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentProject = null;
}

function updateSlides() {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

export function nextSlide() {
  if (!currentProject) return;
  currentSlide = (currentSlide + 1) % currentProject.images.length;
  updateSlides();
}

export function prevSlide() {
  if (!currentProject) return;
  currentSlide = (currentSlide - 1 + currentProject.images.length) % currentProject.images.length;
  updateSlides();
}

export function goToSlide(index) {
  if (!currentProject) return;
  currentSlide = index;
  updateSlides();
}

// Add touch swipe support
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchEndX - touchStartX;
  
  if (Math.abs(diff) < swipeThreshold) return;
  
  if (diff > 0) {
    prevSlide();
  } else {
    nextSlide();
  }
}

export function initializeModal() {
  // Close modal when clicking outside
  const modal = document.getElementById('project-modal');
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Close modal with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

  // Touch events for swipe
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  // Modal navigation
  modal.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action], [data-slide]');
    if (!target) return;

    if (target.dataset.action === 'prev') prevSlide();
    if (target.dataset.action === 'next') nextSlide();
    if (target.dataset.slide) goToSlide(parseInt(target.dataset.slide));
  });

  // Close button
  const closeButton = modal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeProjectModal);
  }
}