const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

var tokenReceitaWs =
  "52241c65f987b23fc0778d457aba925ac79d28890cbd0d7f42ef1d7f3d34527d";

const file = path.join("postosTestes.csv");

csv({
  noheader: false,
  headers: ["nome", "cnpj", "produto", "data", "preco", "bandeira"],
  delimiter: "auto",
})
  .fromFile(file)
  .then((data) => {
    console.log(data.toString("utf8"));
  });
