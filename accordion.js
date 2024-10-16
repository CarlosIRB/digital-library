var acc = document.getElementsByClassName("accordion");
var panels = document.getElementsByClassName("panel");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Cerrar todos los demás paneles
    for (var j = 0; j < acc.length; j++) {
      if (acc[j] !== this) {
        acc[j].classList.remove("active");
        acc[j].querySelector(".icon").textContent = "+";
        panels[j].style.maxHeight = null;
      }
    }

    // Alternar el estado del panel seleccionado
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    var icon = this.querySelector(".icon");

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      icon.textContent = "+";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      icon.textContent = "-";
    }
  });
}