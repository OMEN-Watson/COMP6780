document.addEventListener('DOMContentLoaded', function () {
  const listItems = document.querySelectorAll('#siteMap li')

  listItems.forEach(function (item) {
    item.addEventListener('mouseover', function () { this.style.backgroundColor = "#f0f0f0" })
    item.addEventListener('mouseout', function () { this.style.backgroundColor = '' })
  });
})

{/* <script> */ }
document.addEventListener('DOMContentLoaded', function () {
  let bym = 10
  bym += 10
  const links = document.querySelectorAll('#siteMap a');
  links.forEach(
    function (oneLink) {

      oneLink.addEventListener('click', function (event) {
        event.preventDefault();
        const imagePath = oneLink.getAttribute('data-img');
        const displayItem = document.getElementById('imageDisplay');
        displayItem.innerHTML = `<img src="${imagePath}" alt="loaded Image">`;
        displayItem.querySelector('img').style.display = 'block'
      })
    }

  )
})
// </script>