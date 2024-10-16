const searchInput = document.getElementById('search-input');
  const clearButton = document.getElementById('clear-button');

  // Mostrar el botón "x" solo si hay texto en el input
  searchInput.addEventListener('input', function() {
    if (this.value.length > 0) {
      clearButton.style.display = 'inline'; // Mostrar botón
    } else {
      clearButton.style.display = 'none'; // Ocultar botón
    }
  });

  // Limpiar el input cuando se haga clic en "x"
  clearButton.addEventListener('click', function() {
    searchInput.value = '';
    clearButton.style.display = 'none'; // Ocultar botón después de limpiar
  });