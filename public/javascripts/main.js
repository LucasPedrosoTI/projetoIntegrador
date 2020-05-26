const hearts = Array.from(document.querySelectorAll(".far.fa-heart"));
const btns = Array.from(document.querySelectorAll(".salvar-form"));
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
  data = new Date(date.innerText);

  data = dataAtualFormatada(data);

  date.innerText = data;
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

  // COMPARA OS VALORES COM A MEDIA E DEFINE A CLASSE
  array.forEach((p) => {
    let n = Number(p.innerText.replace("R$", "").replace(",", ".").trim());

    if (n > media) {
      p.classList.add("high");
    } else if (n < media) {
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

// Listen for form submissions
document.addEventListener(
  "submit",
  function (event) {
    // Only run our code on .rating forms
    if (!event.target.matches(".rating")) return;

    // Prevent form from submitting
    event.preventDefault();

    // Get the selected star
    var selected = document.activeElement;
    if (!selected) return;
    var selectedIndex = parseInt(selected.getAttribute("data-star"), 10);

    // Get all stars in this form (only search in the form, not the whole document)
    // Convert them from a node list to an array
    // https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
    var stars = Array.from(event.target.querySelectorAll(".star"));

    // Loop through each star, and add or remove the `.selected` class to toggle highlighting
    stars.forEach(function (star, index) {
      if (index < selectedIndex) {
        // Selected star or before it
        // Add highlighting
        star.classList.add("selected");
      } else {
        // After selected star
        // Remove highlight
        star.classList.remove("selected");
      }
    });

    // Remove aria-pressed from any previously selected star
    var previousRating = event.target.querySelector(
      '.star[aria-pressed="true"]'
    );
    // REMOVE TAMBÉM O INPUT (LST CHILD) SE ELE JÁ EXISTIR AO CLICAR EM OUTRA ESTRELA
    if (previousRating) {
      previousRating.removeAttribute("aria-pressed");
      previousRating.lastElementChild.remove();
    }

    // ********************CRIAR INPUT DA NOTA ********************
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "nota");

    // Add aria-pressed role to the selected button
    selected.setAttribute("aria-pressed", true);

    // SETAR VALUE NOTA DE ACORCO COM A ESTRELA CLICADA
    input.setAttribute("value", Number(selected.getAttribute("data-star")));
    // ANEXAR INPUT AO BOTÃO
    selected.appendChild(input);
  },
  false
);

// Highlight the hovered or focused star
var highlight = function (event) {
  // Only run our code on .rating forms
  var star = event.target.closest(".star");
  var form = event.target.closest(".rating");
  if (!star || !form) return;

  // Get the selected star
  var selectedIndex = parseInt(star.getAttribute("data-star"), 10);

  // Get all stars in this form (only search in the form, not the whole document)
  // Convert them from a node list to an array
  // https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
  var stars = Array.from(form.querySelectorAll(".star"));

  // Loop through each star, and add or remove the `.selected` class to toggle highlighting
  stars.forEach(function (star, index) {
    if (index < selectedIndex) {
      // Selected star or before it
      // Add highlighting
      star.classList.add("selected");
    } else {
      // After selected star
      // Remove highlight
      star.classList.remove("selected");
    }
  });
};

// Listen for hover and focus events on stars
document.addEventListener("mouseover", highlight, false);
document.addEventListener("focus", highlight, true);

// Reset highlighting after hover or focus
var resetSelected = function (event) {
  // Only run our code on .rating forms
  if (!event.target.closest) return;
  var form = event.target.closest(".rating");
  if (!form) return;

  // Get all stars in this form (only search in the form, not the whole document)
  // Convert them from a node list to an array
  // https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
  var stars = Array.from(form.querySelectorAll(".star"));

  // Get an existing rating if there is one
  var selected = form.querySelector('.star[aria-pressed="true"]');
  var selectedIndex = selected
    ? parseInt(selected.getAttribute("data-star"), 10)
    : 0;

  // Loop through each star, and add or remove the `.selected` class to toggle highlighting
  stars.forEach(function (star, index) {
    if (index < selectedIndex) {
      // Selected star or before it
      // Add highlighting
      star.classList.add("selected");
    } else {
      // After selected star
      // Remove highlight
      star.classList.remove("selected");
    }
  });
};

// Reset selected on mouse off and blur
document.addEventListener("mouseleave", resetSelected, true);
document.addEventListener("blur", resetSelected, true);

// ******************** SUBMETER FORM COM JS ********************

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", (e) => {
    document.querySelectorAll("form[id|=form-posto]")[i].submit();
  });
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
