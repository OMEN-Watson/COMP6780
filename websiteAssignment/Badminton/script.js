


//for navigation 
document.addEventListener('DOMContentLoaded', function () {
  //modify the width of right page
  var newWidth = window.innerWidth - 350;
  document.getElementById('iframeId').style.maxWidth = newWidth + 'px';

  const links = document.querySelectorAll('#navLinks a');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const contentId = this.getAttribute('data-content');

      window.location.hash = contentId;
      updateContent(contentId);


    });
  });
  // Load content based on current hash
  if (window.location.hash) {
    updateContent(window.location.hash.substring(1));
  }

  // React to hash change in the URL
  window.addEventListener('hashchange', function () {
    updateContent(window.location.hash.substring(1));
  }, false);
});

function updateContent(contentId) {
  const content = document.getElementById('content');
  switch (contentId) {


    // case 'equipment':
    //   content.innerHTML = '<h2>Badminton Equipment</h2><p>Discover the essential gear you need to play badminton.</p>';
    //   break;
    case 'tips':
      // content.innerHTML = '<h2>Playing Tips</h2><p>Improve your game with these helpful badminton tips.</p>';

      break;
    case 'join':
      // content.innerHTML = '<h2>Join Our Club</h2><p>Become a member of our badminton community and enjoy the game.</p>';
      break;
    // case 'assignment':

    //   break;

    default:

      // getCustomPage(contentId)
      getCustomPageByIFrame(contentId)
      break;
    // content.innerHTML = '<h2>Welcome</h2><p>Select an option from the menu to learn more.</p>';
  }
}

function getCustomPage(htmlName) {
  fetch(htmlName + '.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;


    })
    .catch(error => {
      console.error('Error loading the My Passion content:', error);
    });
}
// for get the web page with separately jsFile
function getCustomPageByIFrame(htmlName) {

  // var iframe = document.createElement('iframe'); // Create a new iframe element
  // var iframeList = document.getElementById('myIframe')
  var iframe = document.getElementById('iframeId')
  // iframe.onload = function () {
  //   // Assuming the iframe is from the same origin to allow this manipulation
  //   var iframeHead = iframe.contentWindow.document.head;
  //   var link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = 'style.css';
  //   iframeHead.appendChild(link);
  // };

  iframe.onload = function () {
    // Check if you can access the content of the iframe
    try {
      var iframeHead = iframe.contentDocument.head;  // Use contentDocument instead
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles.css';  // Use an absolute path for testing
      iframeHead.appendChild(link);
      l
    } catch (error) {
      console.error("Failed to inject stylesheet: ", error);
    }
  };
  iframe.src = htmlName + '.html'; // URL to load in the iframe


  var divContainer = document.getElementById('content')

  // Clear all children from the container
  while (divContainer.firstChild) {
    divContainer.removeChild(divContainer.firstChild);
  }
  divContainer.appendChild(iframe);






}

// slideShow
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}


// document.addEventListener('DOMContentLoaded', function () {
//   var slides = document.querySelectorAll('.mySlides img');
//   slides.forEach(function (img) {
//     img.onerror = function () {
//       this.src = 'LinDan.png'; // Fallback image
//     };
//     img.src = img.getAttribute('data-src'); // Only set src after onerror is assigned
//   });
// });


