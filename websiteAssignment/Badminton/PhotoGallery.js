document.addEventListener("DOMContentLoaded", function () {
  console.log('this is js')
  var images = ["images/LinDan.png", "images/LinDan.png", "images/LinDan.png"]; // Array of image sources
  var currentIndex = 0;

  var slideshowContainer = document.getElementsByClassName("slideshow-container");

  // Create and append image elements to the container
  images.forEach((src, index) => {
    var img = document.createElement("img");
    img.src = src;
    img.style.display = index === 0 ? "block" : "none"; // Display only the first image initially
    slideshowContainer.appendChild(img);
  });

  var slides = slideshowContainer.getElementsByTagName("img");

  // Function to update slide visibility
  function showSlide(index) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
  }

  // Navigation handlers
  document.getElementById("prev").addEventListener("click", function () {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    showSlide(currentIndex);
  });

  document.getElementById("next").addEventListener("click", function () {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    showSlide(currentIndex);
  });
});
