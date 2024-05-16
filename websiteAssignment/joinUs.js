let isDragging = false;

document.addEventListener('DOMContentLoaded', function () {
  const tbody = document.querySelector('#scheduleTable tbody');





  //#region create cell and setting date
  const startTime = 8; // Starting time (8 AM)
  const endTime = 14; // Ending time (2 PM)
  const interval = 30; // Interval in minutes

  const today = new Date();
  const todayDayIndex = today.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day

  // Adjust today's date to start from the current week's Monday
  const monday = new Date(today - (todayDayIndex - 1) * msPerDay);

  // Set dates for the week
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(monday.getTime() + i * msPerDay);
    const dateCellId = 'date' + ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i];
    document.getElementById(dateCellId).textContent = formatDate(dayDate);
  }

  function formatDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Format date as DD/MM/YYYY
  }

  // Generate time slots
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeString = `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
      const row = tbody.insertRow();
      const timeCell = row.insertCell(0);
      timeCell.textContent = timeString;
      for (let i = 0; i < 7; i++) {
        const slot = row.insertCell(-1);
        slot.className = 'available'; // Assume all slots are available
      }
    }
  }


  //#endregion

  //#region set the function in cell

  let isSelecting = false;
  let startRow = null;
  let startColumn = null;

  // const table = document.getElementById('scheduleTable');

  //click
  tbody.addEventListener('mousedown', function (event) {
    if (event.target.tagName === 'TD' && event.target.cellIndex > 0 && !event.target.classList.contains('selected')) {
      isSelecting = true;
      startRow = event.target.parentNode.rowIndex - 2;
      startColumn = event.target.cellIndex; // Store starting column
      // clearSelections();
      event.target.classList.add('selected');
      // updateSelectionInfo();
      event.preventDefault(); // Prevent text selection
    }
    //delete the selected cell
    else {
      removeNeighborSelectedCell(event.target)
    }
  });

  //draging
  tbody.addEventListener('mouseover', function (event) {
    if (isSelecting && event.target.tagName === 'TD' && event.target.cellIndex === startColumn) { // Only select vertically in the same column {
      const currentRow = event.target.parentNode.rowIndex - 2;
      if (currentRow !== startRow) {
        // clearSelections();
        const start = Math.min(startRow, currentRow);
        const end = Math.max(startRow, currentRow);
        for (let i = start; i <= end; i++) {
          tbody.rows[i].cells[startColumn].classList.add('selected');
        }
        // updateSelectionInfo();
      }
    }

    if (!isSelecting && event.target.tagName === 'TD' && event.target.classList.contains('selected') && event.target.cellIndex > 0) { // Ensure it's not the first column
      applyHoverEffect(event.target);
    }
  }, true);

  tbody.addEventListener('mouseout', function (event) {
    if (event.target.tagName === 'TD' && event.target.cellIndex > 0) {
      removeHoverEffect(event.target);
    }
  });

  document.addEventListener('mouseup', function () {
    isSelecting = false;
    startRow = null;
    startColumn = null;
    simulateClickOutsideTable()
    updateSelectionInfo();
  });

  // setTheCellFunction()


  //#endregion


  loadSelections()


});

function removeNeighborSelectedCell(targetCell) {
  const tbody = document.querySelector('#scheduleTable tbody');
  const dayIndex = targetCell.cellIndex;
  const rowIndex = targetCell.parentNode.rowIndex - 2;

  for (let i = rowIndex; i < tbody.rows.length; i++) {
    const oneRow = tbody.rows[i];
    const cell = oneRow.cells[dayIndex];
    if (cell.classList.contains('selected')) {
      cell.classList.remove('selected');
      cell.classList.remove('hover-effect');
    }
    else {
      break
    }
  }
  for (let i = rowIndex - 1; i >= 0; i--) {
    const oneRow = tbody.rows[i];
    const cell = oneRow.cells[dayIndex];
    if (cell.classList.contains('selected')) {
      cell.classList.remove('selected');
      cell.classList.remove('hover-effect');
    }
    else {
      break
    }
  }

}

function applyHoverEffect(targetCell) {
  const tbody = document.querySelector('#scheduleTable tbody');
  const dayIndex = targetCell.cellIndex;
  const rowIndex = targetCell.parentNode.rowIndex - 2;

  // Apply hover effect to contiguous cells in the same column

  for (let i = rowIndex; i < tbody.rows.length; i++) {
    const oneRow = tbody.rows[i];
    const cell = oneRow.cells[dayIndex];
    if (cell.classList.contains('selected')) {
      cell.classList.add('hover-effect');
    }
    else {
      break
    }
  }
  for (let i = rowIndex; i >= 0; i--) {
    const oneRow = tbody.rows[i];
    const cell = oneRow.cells[dayIndex];
    if (cell.classList.contains('selected')) {
      cell.classList.add('hover-effect');
    }
    else {
      break
    }
  }
}

function removeHoverEffect(targetCell) {

  const tbody = document.querySelector('#scheduleTable tbody');

  const dayIndex = targetCell.cellIndex;

  // Remove hover effect from all cells in the column
  Array.from(tbody.rows).forEach(row => {
    const cell = row.cells[dayIndex];
    cell.classList.remove('hover-effect');
  });
}

function toggleCellSelected(cell) {
  // Toggle the 'selected' class
  if (cell.classList.contains('available')) { // Ensure it's an available cell
    cell.classList.toggle('selected');
  }
  updateSelectionInfo()
}

// Function to update the selection info
function updateSelectionInfo_Old() {

  const selectionInfo = document.getElementById('selectionInfo');

  const selectedCells = document.querySelectorAll('#scheduleTable td.selected');
  if (selectedCells.length > 0) {
    let messages = [];
    selectedCells.forEach((cell, index) => {
      const time = cell.parentNode.firstChild.textContent;
      const day = cell.cellIndex;
      const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][day - 1];
      messages.push(`${time} on ${dayName}`);
    });
    selectionInfo.innerHTML = messages.join('<br>'); // Use line breaks for each new selection 
  }
  else {
    selectionInfo.innerHTML = 'No time slots selected.';
  }


}
function updateSelectionInfo() {
  const selectionInfo = document.getElementById('selectionInfo');
  const selectedCells = Array.from(document.querySelectorAll('#scheduleTable td.selected'));

  if (selectedCells.length > 0) {
    // Sort cells based on day and time
    selectedCells.sort((a, b) => {
      const dayComparison = a.cellIndex - b.cellIndex;
      if (dayComparison !== 0) {
        return dayComparison;
      }
      return a.parentNode.rowIndex - b.parentNode.rowIndex;
    });

    let messages = [];
    let lastDay = null;
    let startTime = null;
    let endTime = null;

    selectedCells.forEach(cell => {
      const time = cell.parentNode.firstChild.textContent;
      const day = cell.cellIndex;
      const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][day - 1];

      if (dayName !== lastDay || (endTime && cell.parentNode.rowIndex !== endTime.parentNode.rowIndex + 1)) {
        // If not continuous or different day, push the previous group and start a new one
        if (startTime) {
          messages.push(`${startTime} to ${endTime.parentNode.firstChild.textContent} on ${lastDay}`);
        }
        startTime = time;
        lastDay = dayName;
      }
      endTime = cell; // Update the end time to the current cell's time
    });

    // Add the last group
    if (startTime) {
      messages.push(`${startTime}    to   ${endTime.parentNode.firstChild.textContent} on ${lastDay}`);
    }

    selectionInfo.innerHTML = messages.join('<br>'); // Use line breaks for each new selection
  } else {
    selectionInfo.innerHTML = 'No time slots selected.';
  }

  updateLocalStorage()
}

function simulateClickOutsideTable() {
  // Create a new mouse event
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  // Dispatch it on the body or any specific element outside the table
  document.body.dispatchEvent(clickEvent);
}

//#region load selected info


// Function to update local storage
function updateLocalStorage() {
  const table = document.getElementById('scheduleTable');
  const selectedCells = Array.from(table.querySelectorAll('td.selected')).map(td => ({
    rowIndex: td.parentNode.rowIndex,
    cellIndex: td.cellIndex
  }));
  localStorage.setItem('selectedCells', JSON.stringify(selectedCells));
}


//#endregion


//#region load selected info

// Function to load selections from local storage
function loadSelections() {
  const table = document.getElementById('scheduleTable');
  const selectedCells = JSON.parse(localStorage.getItem('selectedCells'));
  if (selectedCells) {
    selectedCells.forEach(cell => {
      const row = table.rows[cell.rowIndex];
      if (row) {
        const td = row.cells[cell.cellIndex];
        if (td) {
          td.classList.add('selected');
        }
      }
    });
    updateSelectionInfo(); // Update the display based on loaded selections
  }
}


//#endregion
