const hearts = Array.from(document.querySelectorAll(".far.fa-heart"));
const prices = Array.from(document.querySelectorAll("a.price"));
const dates = Array.from(document.querySelectorAll("p.date"));

function dataAtualFormatada(data) {
  (dia = data.getDate().toString()),
    (diaF = dia.length == 1 ? "0" + dia : dia),
    (mes = (data.getMonth() + 1).toString()), //+1 pois no getMonth Janeiro começa com zero.
    (mesF = mes.length == 1 ? "0" + mes : mes),
    (anoF = data.getFullYear());
  return diaF + "/" + mesF + "/" + anoF;
}

dates.forEach((date) => {
  let data = new Date(date.innerText);
  let hoje = new Date();
  let ontem = new Date();
  let haUmaSemana = new Date();
  let haUmMes = new Date();
  let estaSemana = new Date();
  let duasSemanas = new Date();

  ontem = new Date(ontem.setDate(ontem.getDate() - 1));
  estaSemana = new Date(estaSemana.setDate(estaSemana.getDate() - 6));
  haUmaSemana = haUmaSemana.setDate(haUmaSemana.getDate() - 7);
  duasSemanas = duasSemanas.setDate(duasSemanas.getDate() - 14);
  haUmMes = new Date(haUmMes.setDate(haUmMes.getDate() - 31));

  let dataFormatada = dataAtualFormatada(data);

  let hojeFormatado = dataAtualFormatada(hoje);

  let ontemFormatado = dataAtualFormatada(ontem);

  if (hojeFormatado == dataFormatada) {
    date.innerText = "Hoje";
  } else if (ontemFormatado == dataFormatada) {
    date.innerText = "Ontem";
  } else if (
    data.setDate(data.getDate()) < ontem &&
    data.setDate(data.getDate()) > haUmaSemana
  ) {
    date.innerText = "Esta semana";
  } else if (
    data.setDate(data.getDate()) < haUmaSemana &&
    data.setDate(data.getDate()) > duasSemanas
  ) {
    date.innerText = "Semana passada";
  } else if (
    data.setDate(data.getDate()) < duasSemanas &&
    data.setDate(data.getDate()) > haUmMes
  ) {
    date.innerText = "Este mês";
  } else {
    date.innerText = dataFormatada;
    date.setAttribute("data-toggle", "tooltip");
    date.setAttribute(
      "title",
      "O preço desse posto não é atualizado há mais de 1 mês Ajude a manter os preços atualizados, clique no preço e corrija agora mesmo!"
    );
    date.setAttribute("data-placement", "auto");
  }
});

function addColorsByPrice(array) {
  // SETA UM ARRAY COM OS VALORES EM FORMATO NUMERICO
  let values = [];
  array.forEach((p) => {
    let value = Number(p.innerText.replace("R$", "").replace(",", ".").trim());
    values.push(value);
  });

  // CALCULA A MEDIA DESSE ARRAY
  let media = values.reduce((a, b) => a + b) / values.length;
  media = media.toFixed(2);

  console.log("Função addColorsByPrice OK: " + media);

  // COMPARA OS VALORES COM A MEDIA E DEFINE A CLASSE
  array.forEach((p) => {
    let n = Number(p.innerText.replace("R$", "").replace(",", ".").trim());

    if (n > media * 1.01) {
      p.classList.add("high");
    } else if (n < media * 0.99) {
      p.classList.add("low");
    } else {
      p.classList.add("med");
    }
  });
}

addColorsByPrice(prices);

function showList() {
  event.preventDefault();
  var x = document.getElementById("sidebar");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

for (let i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener("mouseover", (e) => {
    hearts[i].classList.add("fas", "hover-change");
    hearts[i].classList.remove("far");
  });
}

for (let i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener("mouseleave", (e) => {
    if (hearts[i].classList.contains("hover-change")) {
      hearts[i].classList.add("far");
      hearts[i].classList.remove("fas", "hover-change");
    }
  });
}

function porPrecoMenor(a, b) {
  return (
    Number(
      a.firstElementChild.lastElementChild.children[2].children[4].innerText
        .replace("R$", "")
        .replace(",", ".")
        .trim()
    ) -
    Number(
      b.firstElementChild.lastElementChild.children[2].children[4].innerText
        .replace("R$", "")
        .replace(",", ".")
        .trim()
    )
  );
}

function mostrarLista(array) {
  let ol = array[0].parentNode;

  ol.innerHTML = "";

  array.forEach((a) => {
    ol.appendChild(a);
  });
}

const select = document.querySelector("#classificar");
let li = Array.from(document.querySelectorAll(".posto-item"));

console.log(li.sort(porPrecoMenor));

select.addEventListener("change", (e) => {
  if (e.target.value == "precoMenor") {
    console.log("precoMenor selecionado");

    li.sort(porPrecoMenor);

    mostrarLista(li);
  } else if (e.target.value == "maisCurtidas") {
    console.log("maisCurtidas selecionado");
  } else if (e.target.value == "melhorNota") {
    console.log("melhorNota selecionado");
  } else {
    console.log("menorDistancia selecionado");
  }
});
