var favoritos = document.getElementById("favoritos");
var cadastro = document.getElementById("cadastro");
var comentarios = document.getElementById("comentarios");

function mostrarFavoritos() {
  if (favoritos.style.display === "none") {
    favoritos.style.display = "block";
    cadastro.style.display = "none";
    comentarios.style.display = "none";
  }
}

function mostrarCadastro() {
  if (cadastro.style.display === "none") {
    cadastro.style.display = "block";
    favoritos.style.display = "none";
    comentarios.style.display = "none";
  }
}

function mostrarComentarios() {
  if (comentarios.style.display === "none") {
    comentarios.style.display = "block";
    favoritos.style.display = "none";
    cadastro.style.display = "none";
  }
}
