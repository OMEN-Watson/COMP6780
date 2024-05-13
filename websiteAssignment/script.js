

/* #region global operation 1*/
// for the dark mode button 
// document.getElementById('toggleNightMode').addEventListener('click', function() {
//   document.body.classList.toggle('night-mode');
// });
window.onload = function () {
  var linkElements = document.getElementsByTagName('link');
  var stylesheetLink = linkElements[0];
  if (localStorage.getItem('style') === 'nightmode.css') {

    stylesheetLink.setAttribute('href', 'styles.css');

    // document.getElementById('styleSheet').setAttribute('href', 'styles.css');
  }


};
//night mode button
document.getElementById('toggleNightMode').addEventListener('click', function () {
  var linkElements = document.getElementsByTagName('link');
  var stylesheetLink = linkElements[0];
  var currentStyle = stylesheetLink.getAttribute('href');
  if (currentStyle === 'styles.css') {
    stylesheetLink.setAttribute('href', 'nightmode.css');
    localStorage.setItem('style', 'nightmode.css');
  } else {
    stylesheetLink.setAttribute('href', 'styles.css');
    localStorage.setItem('style', 'styles.css');
  }
  contentId = localStorage.getItem('content');
  window.location.hash = contentId;
  updateContent(contentId)

});
//for sidebar navigation, 
// when user clicking the link 
// it will automatically jump to the new page
document.addEventListener('DOMContentLoaded', function () {
  console.log('here is subPage')
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
  getCustomPageByIFrame('passion')


  /* #region zoom out the photo*/
  const modal = document.querySelector('.modal');
  const modalImage = document.getElementById('modal-image');
  const closeButton = document.querySelector('.close-btn');

  window.addEventListener('message', function (event) {
    if (event.origin != null) {  // Adjust as needed
      if (event.data.type === 'openModal') {
        modalImage.src = event.data.src; // Image source sent from the iframe
        modal.style.display = "flex"; // Open the modal
      }
    }
  });

  closeButton.addEventListener('click', function () {
    modal.style.display = "none";
  });
  modal.style.display = "none";
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  /* #endregion */
});


function updateContent(contentId) {
  const content = document.getElementById('content');
  //store the webpage info in memeory
  localStorage.setItem('content', contentId);
  switch (contentId) {


    default:


      getCustomPageByIFrame(contentId)
      break;
    // content.innerHTML = '<h2>Welcome</h2><p>Select an option from the menu to learn more.</p>';
  }
}



// for get the web page with separately jsFile
function getCustomPageByIFrame(htmlName) {

  // var iframe = document.createElement('iframe'); // Create a new iframe element
  // var iframeList = document.getElementById('myIframe')
  var iframe = document.getElementById('iframeId')


  iframe.onload = function () {
    // Check if you can access the content of the iframe
    try {
      var iframeHead = iframe.contentDocument.head;  // Use contentDocument instead
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      // link.href = 'styles.css';  // Use an absolute path for testing
      link.href = localStorage.getItem('style');
      iframeHead.appendChild(link);

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

/* #endregion */



/* #region photo gallery*/




// slideShow
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  try {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  } catch (error) {

  }

}




