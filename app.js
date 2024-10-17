document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const clearButton = document.getElementById("clear-button");
  const booksContainer = document.getElementById("books-container");
  const pagination = document.getElementById("pagination");
  const accordions = document.querySelectorAll(".accordion");
  let currentPage = 1;
  let totalResults = 0;
  let resultsPerPage = 10;
  //acordion de categorias
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  document.querySelectorAll(".panel-option").forEach(function (option) {
    option.addEventListener("click", function () {
      const textoSeleccionado = this.textContent.trim();
      fetchBooks(textoSeleccionado, 1);
    });
  });
  //busqueda en la api
  const fetchBooks = async (query, page = 1) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
      (page - 1) * resultsPerPage
    }&maxResults=${resultsPerPage}`;
    const response = await fetch(url);
    const data = await response.json();
    totalResults = data.totalItems;
    displayBooks(data.items);
    displayPagination(totalResults, page, query);
  };
  //mostrar las tarjetas con los libros
  const displayBooks = (books) => {
    booksContainer.innerHTML = "";
    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      const coverImg = book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://via.placeholder.com/150";
      bookCard.innerHTML = `
              <img src="${coverImg}" alt="${book.volumeInfo.title}">
              <h3>${book.volumeInfo.title}</h3>
              <p>${
                book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Autor Desconocido"
              }</p>
          `;
      bookCard.addEventListener("click", () => {
        window.open(book.volumeInfo.previewLink, "_blank");
      });
      booksContainer.appendChild(bookCard);
    });
  };

  //mostrar la paginacion

  //ADVERTENCIA
  //El numero de paginas se calcula con el dato de totalItems que esta en la respuesta del api
  // pero parece que el dato varia segun startIndex

  const displayPagination = (totalResults, page, query) => {
    pagination.innerHTML = "";

    const createPageButton = (pageNumber) => {
      const pageButton = document.createElement("button");
      pageButton.textContent = pageNumber;
      if (pageNumber === page) {
        pageButton.classList.add("active-page-button");
      }
      pageButton.addEventListener("click", () => {
        currentPage = pageNumber;
        fetchBooks(query, pageNumber);
      });
      return pageButton;
    };

    // Mostrar mensaje si no hay resultados
    if (totalResults === 0) {
      pagination.textContent = "No se encontraron resultados.";
      return;
    }

    if (page < 5) {
      for (let i = 1; i <= page; i++) {
        pagination.appendChild(createPageButton(i));
      }
    } else {
      
      pagination.appendChild(createPageButton(1));
      pagination.appendChild(document.createTextNode("..."));
      for (let i = page - 3; i <= page; i++) {
        pagination.appendChild(createPageButton(i));
      }
    }

    // Agregar un botón "Siguiente" al final

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.addEventListener("click", () => {
      currentPage++;
      fetchBooks(query, currentPage);
    });
    pagination.appendChild(nextButton);
  };

  searchButton.addEventListener("click", () => {
    fetchBooks(searchInput.value, 1);
  });
});
