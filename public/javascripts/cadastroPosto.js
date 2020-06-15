const nomePosto = document.getElementById("nomePosto");
const cep = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");

function limpa_formulário_cnpj() {
  //Limpa valores do formulário de cep.
  nomePosto.value = "";
  cep.value = "";
  endereco.value = "";
  bairro.value = "";
  cidade.value = "";
  uf.value = "";
}

async function pesquisaCnpj(valor) {
  //Nova variável "cep" somente com dígitos.
  let cnpj = valor.replace(/\D/g, "");

  //Verifica se campo cep possui valor informado.
  if (cnpj != "") {
    //Expressão regular para validar o cnpj.
    var validaCnpj = /^[0-9]{14}$/;

    //Valida o formato do cnpj.
    if (validaCnpj.test(cnpj)) {
      nomePosto.value = "...";
      cep.value = "...";
      endereco.value = "...";
      bairro.value = "...";
      cidade.value = "...";
      uf.value = "...";

      try {
        const { data } = await axios.get(
          `http://localhost:3000/posto/consulta?cnpj=${cnpj}`
        );
        console.log(data);

        nomePosto.value = data.nome;
        cep.value = data.cep;
        endereco.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.municipio;
        uf.value = data.uf;
      } catch (error) {
        console.log(error);
      }
    } else {
      //cep é inválido.
      limpa_formulário_cnpj();
      alert("Formato de CNPJ inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cnpj();
  }
}
