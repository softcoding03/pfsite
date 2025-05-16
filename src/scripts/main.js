import { openProjectModal, initializeModal } from './modal.js';

// Initialize modal functionality
initializeModal();

// Add click handlers to project buttons
document.addEventListener('DOMContentLoaded', () => {
  const projectButtons = document.querySelectorAll('.view-details-btn');
  projectButtons.forEach(button => {
    const projectCard = button.closest('.project-card');
    if (projectCard) {
      const projectId = parseInt(projectCard.dataset.project);
      button.addEventListener('click', () => openProjectModal(projectId));
    }
  });
});