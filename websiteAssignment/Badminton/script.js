//for navigation 
document.addEventListener('DOMContentLoaded', function () {
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

    // case 'passion':
    //   getMyPassionPage(contentId)
    //   break;
    case 'introduction':
      content.innerHTML = '<h2>Introduction to Badminton</h2><p>Learn about the history and rules of this exciting sport.</p>';
      break;
    // case 'equipment':
    //   content.innerHTML = '<h2>Badminton Equipment</h2><p>Discover the essential gear you need to play badminton.</p>';
    //   break;
    case 'tips':
      content.innerHTML = '<h2>Playing Tips</h2><p>Improve your game with these helpful badminton tips.</p>';
      break;
    case 'join':
      content.innerHTML = '<h2>Join Our Club</h2><p>Become a member of our badminton community and enjoy the game.</p>';
      break;
    default:

      getCustomPage(contentId)
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


