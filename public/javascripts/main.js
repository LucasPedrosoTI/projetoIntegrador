const select = document.querySelector("#classificar");
const li = Array.from(document.querySelectorAll(".posto-item"));
const hearts = Array.from(document.querySelectorAll(".far.fa-heart"));
const prices = Array.from(document.querySelectorAll("a.price"));
const dates = Array.from(document.querySelectorAll("p.date"));
var postosFiltrados;

function mostrarLista(array) {
  let ol = array[0].parentNode;
  ol.innerHTML = "";
  array.forEach(function (a) {
    ol.appendChild(a);
  });
}

function filtrarPostos(distancia) {
  return (
    Number(
      distancia.firstElementChild.lastElementChild.firstElementChild.children[0].innerText.trim()
    ) <= 10
  );
}

// Calcular distância entre 2 pontos
function calcularDistancia(latitudeP, longitudeP, latitude, longitude) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function menorDistancia() {
    const radius = 6371;
    const dLat = deg2rad(latitude - latitudeP);
    const dLon = deg2rad(longitude - longitudeP);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(latitude)) *
        Math.cos(deg2rad(latitudeP)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distancia = radius * center; // returns the distance in km
    return distancia;
  }

  return menorDistancia(latitudeP, longitudeP, latitude, longitude);
}

window.addEventListener("load", function () {
  function dataAtualFormatada(data) {
    (dia = data.getDate().toString()),
      (diaF = dia.length == 1 ? "0" + dia : dia),
      (mes = (data.getMonth() + 1).toString()), //+1 pois no getMonth Janeiro começa com zero.
      (mesF = mes.length == 1 ? "0" + mes : mes),
      (anoF = data.getFullYear());
    return diaF + "/" + mesF + "/" + anoF;
  }

  function formatarDatas(datas) {
    datas.forEach(function (date) {
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
  }

  function addColorsByPrice(array) {
    // SETA UM ARRAY COM OS VALORES EM FORMATO NUMERICO
    let values = [];
    array.forEach(function (p) {
      let value = Number(
        p.innerText.replace("R$", "").replace(",", ".").trim()
      );
      values.push(value);
    });

    // CALCULA A MEDIA DESSE ARRAY
    let media =
      values.reduce(function (a, b) {
        return a + b;
      }) / values.length;
    media = media.toFixed(2);

    console.log("Função addColorsByPrice executada: " + media);

    // COMPARA OS VALORES COM A MEDIA E DEFINE A CLASSE
    array.forEach(function (p) {
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

  function hoverHeart() {
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].addEventListener("mouseover", function (e) {
        hearts[i].classList.add("fas", "hover-change");
        hearts[i].classList.remove("far");
      });
    }

    for (let i = 0; i < hearts.length; i++) {
      hearts[i].addEventListener("mouseleave", function (e) {
        if (hearts[i].classList.contains("hover-change")) {
          hearts[i].classList.add("far");
          hearts[i].classList.remove("fas", "hover-change");
        }
      });
    }
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

  function porLikes(a, b) {
    return (
      Number(
        b.firstElementChild.firstElementChild.children[0].children[1].innerText
          .replace("likes", "")
          .trim()
      ) -
      Number(
        a.firstElementChild.firstElementChild.children[0].children[1].innerText
          .replace("likes", "")
          .trim()
      )
    );
  }

  function porNota(a, b) {
    return (
      Number(
        b.firstElementChild.firstElementChild.children[1].children[1].firstElementChild.firstElementChild.firstElementChild.innerText.trim()
      ) -
      Number(
        a.firstElementChild.firstElementChild.children[1].children[1].firstElementChild.firstElementChild.firstElementChild.innerText.trim()
      )
    );
  }

  function porMenorDistancia(a, b) {
    return (
      Number(
        a.firstElementChild.lastElementChild.firstElementChild.children[0].innerText.trim()
      ) -
      Number(
        b.firstElementChild.lastElementChild.firstElementChild.children[0].innerText.trim()
      )
    );
  }

  function controlarSelect(select) {
    select.addEventListener("change", function (e) {
      if (e.target.value == "precoMenor") {
        const postosFiltrados = li.filter(filtrarPostos);

        postosFiltrados.sort(porPrecoMenor);

        mostrarLista(postosFiltrados);
      } else if (e.target.value == "maisCurtidas") {
        const postosFiltrados = li.filter(filtrarPostos);

        postosFiltrados.sort(porLikes);

        mostrarLista(postosFiltrados);
      } else if (e.target.value == "melhorNota") {
        const postosFiltrados = li.filter(filtrarPostos);

        postosFiltrados.sort(porNota);

        mostrarLista(postosFiltrados);
      } else {
        const postosFiltrados = li.filter(filtrarPostos);

        postosFiltrados.sort(porMenorDistancia);

        mostrarLista(postosFiltrados);
      }
    });
  }

  controlarSelect(select);
  formatarDatas(dates);
  hoverHeart();
  addColorsByPrice(prices);
});

async function atualizarDistancias(li) {
  console.log("distâncias atualizadas: ", latitude, longitude);

  for (var i = 0; i <= li.length; i++) {
    var lat = parseFloat(li[i].children[1].value);
    var long = parseFloat(li[i].children[2].value);
    var latitudeUsuario = await window.latitude;
    var longitudeUsuario = await window.longitude;

    var distancia = calcularDistancia(
      lat,
      long,
      latitudeUsuario,
      longitudeUsuario
    );

    li[
      i
    ].firstElementChild.lastElementChild.firstElementChild.children[0].innerText = distancia.toFixed(
      0
    );
  }
}

function submeterAvaliacao(arrayDeButtons) {
  for (let i = 0; i < arrayDeButtons.length; i++) {
    arrayDeButtons[i].addEventListener("click", function () {
      let formSubmit = document.querySelectorAll("form[id|=form-posto]")[i];

      formSubmit.submit();
    });
  }
}

// document.getElementById("bars").addEventListener("click", function () {
// });

function filtrarAposAtualizarDistancias(array) {
  postosFiltrados = array.filter(filtrarPostos);

  console.log("postosFiltrados");

  if (postosFiltrados.length == 0) {
    const ol = array[0].parentNode;
    ol.innerHTML = "";

    const emptyLi = document.createElement("li");
    const h3 = document.createElement("h3");

    h3.innerText =
      "Ooops, parece que ainda não há postos cadastrados na sua região. Clique para cadastrar um novo posto ";
    h3.classList.add("postoNaoEncontrado");
    h3.setAttribute("data-toggle", "modal");
    h3.setAttribute("data-target", "#novo-posto");

    emptyLi.appendChild(h3);

    ol.appendChild(emptyLi);
  } else {
    mostrarLista(postosFiltrados);
  }

  const btns = Array.from(document.querySelectorAll(".salvar-form"));
  submeterAvaliacao(btns);
}

/**
 * Interval que tenta calcular as distâncias e atualizar a DOM até que a lat e lgn estejam disponíveis
 */
const intervalAtualizarDistancias = setInterval(() => {
  atualizarDistancias(li);

  if (latitude && longitude) {
    clearInterval(intervalAtualizarDistancias);
  }
}, 1000);

/**
 * Interval que tenta filtrar postos até que o primeiro posto tenha distancia menor que 10 ou caso não tenha postos nessa condição
 */
const intervalFiltrarPostos = setInterval(() => {
  filtrarAposAtualizarDistancias(li);

  if (postosFiltrados.length == 0) {
    clearInterval(intervalFiltrarPostos);
  }

  if (
    Number(
      postosFiltrados[0].firstElementChild.lastElementChild.firstElementChild.children[0].innerText.trim()
    ) <= 10
  ) {
    clearInterval(intervalFiltrarPostos);
  }
}, 1000);
