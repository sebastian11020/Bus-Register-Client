document.addEventListener('DOMContentLoaded', function () {
  const baseUrl = 'http://localhost:3000';
  const resultDiv = document.getElementById('result');
  const resultTable = document.getElementById('resultTable');
  const resultTableBody = document.getElementById('resultTableBody');

  function showResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; 
    if (Array.isArray(data) && data.length > 0) {
      displayBusTable(data);
    }
  }

  function displayBusTable(buses) {
    const resultDiv = document.getElementById('result');
    const table = document.createElement('table');
    table.className = 'result-table';
  
    const header = table.createTHead();
    const headerRow = header.insertRow();
    ['Placa', 'Hora de Llegada', 'Modificaciones', 'Acciones'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
  
    const body = table.createTBody();
    buses.forEach(bus => {
      const row = body.insertRow();
      row.insertCell().textContent = bus.id;
      row.insertCell().textContent = new Date(bus.arrivalTime).toLocaleString();
      row.insertCell().textContent = bus.modificationCount || 0;
  
      const actionsCell = row.insertCell();
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.className = 'button delete';
      deleteButton.onclick = () => deleteBus(bus.id);
      actionsCell.appendChild(deleteButton);
    });
  
    resultDiv.appendChild(table);
  }
  
  

  function showAlert(message, isError = false) {
    if (isError) {
      alert(`Error: ${message}`);
    } else {
      alert(message);
    }
  }

  function showBusInTable(bus) {
    resultTableBody.innerHTML = ''; 
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bus.id}</td>
      <td>${bus.arrivalTime}</td>
      <td>${bus.modificationCount}</td>
    `;
    resultTableBody.appendChild(row);
    resultTable.style.display = 'table'; 
  }

  async function saveBus(plate, arrivalTime) {
    try {
      const response = await fetch(`${baseUrl}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: plate, arrivalTime })
      });

      if (response.ok) {
        const data = await response.text();
        showResult(data);
        showAlert('Bus registrado correctamente.');
      } else {
        showResult(`Error: ${response.statusText}`);
        showAlert(`Error al registrar el bus: ${response.statusText}`, true);
      }
    } catch (error) {
      showResult(`Error: ${error.message}`);
      showAlert(`Error al registrar el bus: ${error.message}`, true);
    }
  }



  async function updateBus(plate, newArrivalTime) {
    try {
      const response = await fetch(`${baseUrl}/update/${plate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arrivalTime: newArrivalTime })
      });

      if (response.ok) {
        const data = await response.json();
        showResult(`Bus actualizado: ${JSON.stringify(data)}`);
        showAlert('Bus actualizado correctamente.');
      } else {
        showResult(`Error: ${response.statusText}`);
        showAlert(`Error al actualizar el bus: ${response.statusText}`, true);
      }
    } catch (error) {
      showResult(`Error: ${error.message}`);
      showAlert(`Error al actualizar el bus: ${error.message}`, true);
    }
  }

async function searchBus(plate) {
  try {
    const response = await fetch(`${baseUrl}/get/${plate}`);
    if (response.ok) {
      const data = await response.json();
      showResult([data]); // Pasar un array con el bus encontrado
    } else {
      const errorText = await response.text();
      showResult(errorText);
    }
  } catch (error) {
    showResult(`Error: ${error.message}`);
  }
}

  async function deleteBus(plate) {
    try {
      const response = await fetch(`${baseUrl}/delete/${plate}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        showResult(data.message);
        showAlert('Bus eliminado correctamente.');
      } else {
        const errorText = await response.text();
        showResult(`Error: ${errorText}`);
        showAlert(`Error al eliminar el bus: ${errorText}`, true);
      }
    } catch (error) {
      showResult(`Error: ${error.message}`);
      showAlert(`Error al eliminar el bus: ${error.message}`, true);
    }
  }

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.getElementById('plate').value;
    const arrivalTime = document.getElementById('arrivalTime').value;
    saveBus(plate, arrivalTime);
  });

  const updateForm = document.getElementById('updateForm');
  updateForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.getElementById('updatePlate').value;
    const newArrivalTime = document.getElementById('newArrivalTime').value;
    updateBus(plate, newArrivalTime);
  });

  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.getElementById('searchPlate').value;
    searchBus(plate);
  });

  const deleteForm = document.getElementById('deleteForm');
  deleteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.getElementById('deletePlate').value;
    deleteBus(plate);
  });
});
