

document.addEventListener('DOMContentLoaded', function () {
  let isDragging = false;
  const table = document.getElementById('scheduleTable');
  const cells = table.getElementsByTagName('td');

  for (const cell of cells) {
    // Start selection on mousedown
    cell.addEventListener('mousedown', function (event) {
      isDragging = true;
      toggleCellSelected(event.target);
      event.preventDefault(); // Prevent text selection
    });

    // Continue selection if dragging over
    cell.addEventListener('mouseenter', function (event) {
      if (isDragging) {
        toggleCellSelected(event.target);
      }
    });

    // End selection on mouseup
    document.addEventListener('mouseup', function () {
      isDragging = false;
    });
  }

  function toggleCellSelected(cell) {
    // Toggle the 'selected' class
    if (cell.classList.contains('available')) { // Ensure it's an available cell
      cell.classList.toggle('selected');
    }
  }
});



