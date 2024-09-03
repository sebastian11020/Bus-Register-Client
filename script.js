document.addEventListener('DOMContentLoaded', function () {
  const baseUrl = 'http://localhost:3000';
  const resultDiv = document.getElementById('result');

  function showResult(message) {
    resultDiv.textContent = message;
  }

  function showAlert(message, isError = false) {
    if (isError) {
      alert(`Error: ${message}`);
    } else {
      alert(message);
    }
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
        showAlert('Bus registrado/actualizado correctamente.');
      } else {
        showResult(`Error: ${response.statusText}`);
        showAlert(`Error al registrar/actualizar el bus: ${response.statusText}`, true);
      }
    } catch (error) {
      showResult(`Error: ${error.message}`);
      showAlert(`Error al registrar/actualizar el bus: ${error.message}`, true);
    }
  }

  async function searchBus(plate) {
    try {
      const response = await fetch(`${baseUrl}/get/${plate}`);
      if (response.ok) {
        const data = await response.json();
        showResult(`Bus encontrado: ${JSON.stringify(data)}`);
        showAlert('Bus encontrado.');
      } else {
        showResult(`Error: ${response.statusText}`);
        showAlert(`Error al buscar el bus: ${response.statusText}`, true);
      }
    } catch (error) {
      showResult(`Error: ${error.message}`);
      showAlert(`Error al buscar el bus: ${error.message}`, true);
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
        showResult(`Error: ${response.statusText}`);
        showAlert(`Error al eliminar el bus: ${response.statusText}`, true);
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
