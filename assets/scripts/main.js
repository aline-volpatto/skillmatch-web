import {carregarVagas} from "./dados.js";
import {mostrarStatus, limparStatus, formulario, mostrarCards, mostrarDestaque, mostrarPerfil, carregarPerfilSalvo, alternarTema, naoDeuMatch} from "./ui.js";
import { calculoDistancia, criarContadorDeAnalises } from "./motor.js";
import { obterLocalizacao } from "./funcionalidades.js";
let vagasCarregadas = [];
let ultimosResultados = []; // guarda os resultados da última análise.
const contarAnalises = criarContadorDeAnalises();


async function iniciarSistema(){

    try{
        const vagas = await carregarVagas();
        if (vagas.length === 0){
            mostrarStatus("Nenhuma vaga por aqui."); //Se o json estiver vazio, sem nenhuma vaga cadastrada. 
            return;
        }

        vagasCarregadas = vagas;

        console.log("Vagas carregadas com sucesso!", vagas); //Usado para teste, para saber se as vagas foram carregadas. 

    }catch (erro){
        mostrarStatus("Desculpe! Erro ao carregar as vagas. Tente novamente mais tarde! :) ");//Se der algum erro de conexão com o json.
        console.error(erro);
    }
}

iniciarSistema();

formulario(async function(candidato){
    const numeroAnalise = contarAnalises(); //faz a contagem, incrementando o numero de vezes que foi consultado e retorna o total.
    console.log("analise número: ", numeroAnalise);

    mostrarStatus("Carregando vagas, aguarde...");//Simula a consulta à API.
    await new Promise(resolve => setTimeout(resolve, 3000));
    limparStatus();

    const resultados = vagasCarregadas.map(vaga => vaga.calcularCompatibilidade(candidato));

    const deuMatch = resultados.some(resultado => resultado.compatibilidade > 0);
    if (!deuMatch){
        naoDeuMatch(); //Aqui o sistema diz que não encontrou nenhuma vaga para suas habilidades. 
        return;
    }

    const melhorVaga = resultados.reduce((melhor, atual) =>
        atual.compatibilidade > melhor.compatibilidade ? atual : melhor
);

//Implementa a geolocalização
    try{
        const coords = await obterLocalizacao();

        resultados.forEach((resultado, indice) => { //Adiciona a distancia para cada card (vaga)
            const vaga = vagasCarregadas[indice];

            resultado.distancia = calculoDistancia(coords.lat, coords.long, vaga.lat, vaga.long);
            resultado.cidade = vaga.cidade;
    });
    resultados.sort((a, b) => b.compatibilidade - a.compatibilidade);
    }catch (erro){
        console.log("Sem localização: ", erro);
    }
    
    ultimosResultados = resultados; //guarda resultados para poder ordenar quando o filtro for aplicado.



mostrarCards(resultados);
mostrarDestaque(melhorVaga); 
mostrarPerfil(candidato); 

});


const filtro = document.getElementById("filtro-ordenacao"); //Configuracao do filtro.
filtro.addEventListener("change", function(){
    const escolha = filtro.value;

    if(escolha === "compatibilidade"){
        ultimosResultados.sort((a,b) => b.compatibilidade - a.compatibilidade); //maior porcentagem primeiro.
    }else if (escolha === "distancia"){
        ultimosResultados.sort((a,b) => a.distancia - b.distancia); //mais perto primeiro.
    }

    mostrarCards(ultimosResultados); //mostra os cards com nova ordem.
})

carregarPerfilSalvo(); //carregar o localStorage
alternarTema();
