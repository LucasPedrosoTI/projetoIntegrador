function mostrarServicos() {
  var servicos = document.getElementById("servicos");
  var cadastro = document.getElementById("cadastro");
  var publicidade = document.getElementById("publicidade");

  if (servicos.style.display === "none") {
    servicos.style.display = "block";
    cadastro.style.display = "none";
    publicidade.style.display = "none";
  }
}

function mostrarCadastro() {
  if (cadastro.style.display === "none") {
    servicos.style.display = "none";
    cadastro.style.display = "block";
    publicidade.style.display = "none";
  }
}

function mostrarPublicidade() {
  if (publicidade.style.display === "none") {
    cadastro.style.display = "none";
    servicos.style.display = "none";
    publicidade.style.display = "block";
  }
}
