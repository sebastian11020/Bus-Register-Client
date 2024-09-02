document.addEventListener('DOMContentLoaded', function () {
  const baseUrl = 'http://localhost:3000';
  const resultDiv = document.getElementById('result');

  // Función para mostrar resultados
  function showResult(message) {
    resultDiv.textContent = message;
  }

  // Función para mostrar alertas
  function showAlert(message, isError = false) {
    if (isError) {
      alert(`Error: ${message}`);
    } else {
      alert(message);
    }
  }

  // Función para guardar o actualizar un bus
  async function saveOrUpdateBus(plate, arrivalTime) {
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

  // Función para buscar un bus
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

  // Función para eliminar un bus
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

  // Manejo del formulario de registro/actualización
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.getElementById('plate').value;
    const arrivalTime = document.getElementById('arrivalTime').value;
    saveOrUpdateBus(plate, arrivalTime);
  });

  // Manejo del formulario de búsqueda
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.getElementById('searchPlate').value;
    searchBus(plate);
  });

  // Manejo del formulario de eliminación
  const deleteForm = document.getElementById('deleteForm');
  deleteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.getElementById('deletePlate').value;
    deleteBus(plate);
  });
});
