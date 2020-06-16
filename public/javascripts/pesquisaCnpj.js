const nomePosto = document.getElementById("nomePosto");
const cep = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const cnpjPosto = document.getElementById("cnpj-posto");

function limpaFormularioCnpj() {
  //Limpa valores do formulário de cep.
  cnpjPosto.value = "";
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

        if (data.status === "ERROR") {
          alert("Formato de CNPJ inválido.");
          limpaFormularioCnpj();
        }

        nomePosto.value = data.nome;
        cep.value = data.cep;
        endereco.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.municipio;
        uf.value = data.uf;
      } catch (error) {
        console.log(error);
      }
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpaFormularioCnpj();
  }
}
