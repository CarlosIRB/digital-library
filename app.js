const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const detailsDiv = document.getElementById('details');
const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('description');
const pdfElement = document.getElementById('pdf');
const backButton = document.getElementById('back-btn');

// Función para buscar documentos
searchButton.addEventListener('click', async () => {
  const query = searchInput.value;
  const response = await fetch(`https://www.loc.gov/search/?fa=online-format:pdf&fo=json&q=${query}`);
  const data = await response.json();
  displayResults(data.results);
});

// Función para mostrar los resultados
function displayResults(results) {
  resultsDiv.innerHTML = ''; // Limpiar resultados anteriores
  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    resultItem.innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.description ? result.description[0] : 'Sin descripción'}</p>
      <a href="#" class="details-link" data-id="${result.id}">Ver más detalles</a>
    `;

    resultsDiv.appendChild(resultItem);
  });

  // Añadir evento a los enlaces de detalles
  const detailsLinks = document.querySelectorAll('.details-link');
  detailsLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.getAttribute('data-id');
      loadDetails(id);
    });
  });
}

// Función para cargar los detalles del objeto
async function loadDetails(id) {
  const response = await fetch(`https://www.loc.gov/search/?fa=online-format:pdf&fo=json&q=${id}`);
  const data = await response.json();

  if (data.results.length > 0) {
    const result = data.results[0];
    titleElement.textContent = result.title;
    descriptionElement.textContent = result.description ? result.description[0] : 'Sin descripción';
    pdfElement.src = result.url; // Asegúrate de que este URL sea un enlace directo al PDF

    // Mostrar la sección de detalles y ocultar los resultados
    resultsDiv.style.display = 'none';
    detailsDiv.style.display = 'block';
  } else {
    titleElement.textContent = 'No se encontró el documento';
  }
}

// Función para volver a los resultados
backButton.addEventListener('click', () => {
  detailsDiv.style.display = 'none';
  resultsDiv.style.display = 'block';
});
