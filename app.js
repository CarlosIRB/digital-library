

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const searchQueryInput = document.getElementById('search-query');
  const resultsDiv = document.getElementById('results');
  const paginationDiv = document.getElementById('pagination');

  let currentQuery = '';
  let currentPage = 1;

  // Función para obtener los datos de la API
  async function fetchData(query, page = 1) {
    try {
      const response = await fetch(`https://www.loc.gov/search/?fa=online-format:pdf&fo=json&q=${query}&sp=${page}`);
      const data = await response.json();
      displayResults(data.results);
      setupPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Función para manejar la búsqueda
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    currentQuery = searchQueryInput.value;
    currentPage = 1; // Reiniciar a la primera página en nueva búsqueda
    fetchData(currentQuery, currentPage);
  });

  // Función para mostrar los resultados en pantalla
  function displayResults(results) {
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores
    if (results.length === 0) {
      resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }
console.log(results);
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('result-item');

      resultItem.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.description ? result.description[0] : 'Sin descripción'}</p>
        <img src="${result.image_url ? result.image_url[0] : '#'}" alt="${result.title}" />
        <a href="${result.url}" target="_blank" rel="noopener noreferrer">Ver más detalles</a>
      `;

      resultsDiv.appendChild(resultItem);
    });
  }

  // Función para configurar los botones de paginación
  function setupPagination(pagination) {
    paginationDiv.innerHTML = ''; // Limpiar paginación anterior

    if (pagination.previous) {
      const prevButton = createPageButton('Anterior', currentPage - 1);
      paginationDiv.appendChild(prevButton);
    }

    pagination.page_list.forEach(page => {
      if (page.number !== '...') {
        const pageButton = createPageButton(page.number, page.number);
        paginationDiv.appendChild(pageButton);
      } else {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        paginationDiv.appendChild(ellipsis);
      }
    });

    if (pagination.next) {
      const nextButton = createPageButton('Siguiente', currentPage + 1);
      paginationDiv.appendChild(nextButton);
    }
  }

  // Función para crear un botón de paginación
  function createPageButton(text, pageNumber) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('page-btn');
    if (pageNumber == currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      currentPage = pageNumber;
      fetchData(currentQuery, currentPage);
    });

    return button;
  }
});
