// Función para obtener el parámetro de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Función para cargar los detalles del objeto
  async function loadDetails() {
    const id = getQueryParam('id'); // Supongamos que el objeto tiene un ID único
    const response = await fetch(`https://www.loc.gov/search/?fa=online-format:pdf&fo=json&q=${id}`);
    const data = await response.json();
  
    if (data.results.length > 0) {
      const result = data.results[0];
      document.getElementById('title').textContent = result.title;
      document.getElementById('description').textContent = result.description ? result.description[0] : 'Sin descripción';
      document.getElementById('pdf').src = result.url; // Asegúrate de que este URL sea un enlace directo al PDF
    } else {
      document.getElementById('title').textContent = 'No se encontró el documento';
    }
  }
  
  // Función para volver a la página anterior
  function goBack() {
    window.history.back();
  }
  
  // Cargar detalles cuando la página esté lista
  document.addEventListener('DOMContentLoaded', loadDetails);
  