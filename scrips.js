const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3000';

// Función para obtener un elemento por ID
async function getItemById(id) {
  try {
    const response = await fetch(`${baseUrl}/get/${id}`);
    if (response.ok) {
      const data = await response.json();
      console.log('Elemento obtenido:', data);
    } else {
      console.log('Error al obtener el elemento:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Función para guardar un nuevo elemento
async function saveItem(item) {
  try {
    const response = await fetch(`${baseUrl}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });

    if (response.ok) {
      const data = await response.text();
      console.log(data);
    } else {
      console.log('Error al guardar el elemento:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Función para actualizar un elemento por ID
async function updateItem(id, updates) {
  try {
    const response = await fetch(`${baseUrl}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Elemento actualizado:', data);
    } else {
      console.log('Error al actualizar el elemento:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Función para eliminar un elemento por ID
async function deleteItem(id) {
  try {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.log('Error al eliminar el elemento:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}
