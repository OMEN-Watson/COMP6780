//make the a in "Top"
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('a');
  links.forEach(function (link) {
    link.target = '_top';
  });
});