// script.js
document.addEventListener('DOMContentLoaded', function () {
  const images = ['images/LinDan.png', 'images/ShiYuqi.png'];
  let currentIndex = 0;

  const galleryImage = document.querySelector('.gallery-image');
  const dotsContainer = document.querySelector('.dots-container');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      setCurrentImage(index);
    });
    dotsContainer.appendChild(dot);
  });

  // Set event listeners for previous and next buttons
  prevButton.addEventListener('click', () => {
    setCurrentImage(currentIndex - 1);
  });
  nextButton.addEventListener('click', () => {
    setCurrentImage(currentIndex + 1);
  });

  function setCurrentImage(index) {
    if (index < 0) {
      index = images.length - 1; // Wrap around to last image if index is negative
    } else if (index >= images.length) {
      index = 0; // Wrap around to first image if index exceeds array bounds
    }
    galleryImage.src = images[index];
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
});
