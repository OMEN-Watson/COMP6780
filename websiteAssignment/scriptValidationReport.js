// script.js
document.addEventListener('DOMContentLoaded', function () {
  const images = ['images/validationequipment.png',
    'images/validationfeedbackform.png',
    'images/validationpassion.png',
    'images/validationplayersandlegends.png',
    'images/validationsitemap.png',
    'images/validationsocialnetwork.png',
    'images/validationsourcelog.png'];
  let currentIndex = 0;

  // const divContainer = document.querySelector('.slideshow-container');
  const galleryImage = document.querySelector('.VReport-container img');
  // var slideshowContainer = document.getElementsByClassName("slideshow-container");
  const closeButton = document.querySelector('.close-btn');
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

    currentIndex = index;
    galleryImage.classList.add('fade-out'); // Start the fade-out
    setTimeout(() => {
      galleryImage.src = images[currentIndex];// Change the image source
      galleryImage.alt = images[currentIndex]
      galleryImage.classList.remove('fade-out'); // Remove fade-out, so it fades in
    }, 200); // This timeout duration should match the CSS transition time
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

  setCurrentImage(currentIndex);
  // Example: Change image every 5 seconds (optional)
  // setInterval(() => {
  //   let nextIndex = (currentIndex + 1) % images.length;
  //   setCurrentImage(nextIndex);
  // }, 1000);

  // Display the modal
  galleryImage.addEventListener('click', function () {
    window.parent.postMessage({
      type: 'openModal',
      src: this.src
    }, "*"); // Post to the main  page domain 
  });

});
