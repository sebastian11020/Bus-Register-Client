document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://localhost:3000';
    const resultDiv = document.getElementById('result');
  
    function showResult(message) {
      resultDiv.textContent = message;
    }
  
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
        } else {
          showResult(`Error: ${response.statusText}`);
        }
      } catch (error) {
        showResult(`Error: ${error.message}`);
      }
    }
  
    async function searchBus(plate) {
      try {
        const response = await fetch(`${baseUrl}/get/${plate}`);
        if (response.ok) {
          const data = await response.json();
          showResult(`Bus encontrado: ${JSON.stringify(data)}`);
        } else {
          showResult(`Error: ${response.statusText}`);
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
        } else {
          showResult(`Error: ${response.statusText}`);
        }
      } catch (error) {
        showResult(`Error: ${error.message}`);
      }
    }
  
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const plate = document.getElementById('plate').value;
      const arrivalTime = document.getElementById('arrivalTime').value;
      saveOrUpdateBus(plate, arrivalTime);
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