import {carregarVagas} from "./dados.js";
import {mostrarStatus, limparStatus, formulario, mostrarCards, mostrarDestaque, mostrarPerfil, carregarPerfilSalvo, alternarTema} from "./ui.js";
import { calculoDistancia, criarContadorDeAnalises } from "./motor.js";
import { obterLocalizacao } from "./funcionalidades.js";
let vagasCarregadas = [];
const contarAnalises = criarContadorDeAnalises();


async function iniciarSistema(){
    mostrarStatus("Carregando vagas...");

    try{
        const vagas = await carregarVagas();
        if (vagas.length === 0){
            mostrarStatus("Nenhuma vaga por aqui.");
            return;
        }

        vagasCarregadas = vagas;
        limparStatus();
        console.log("Vagas carregadas com sucesso!", vagas);

    }catch (erro){
        mostrarStatus("Desculpe! Erro ao carregar as vagas. Tente novamente mais tarde! :) ");
        console.error(erro);
    }
}

iniciarSistema();

formulario(async function(candidato){
    const numeroAnalise = contarAnalises(); //faz a contagem, incrementando o numero de vezes que foi consultado e retorna o total.
    console.log("analise número: ", numeroAnalise);

    const resultados = vagasCarregadas.map(vaga => vaga.calcularCompatibilidade(candidato));
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
    


mostrarCards(resultados);
mostrarDestaque(melhorVaga); 
mostrarPerfil(candidato); 

});

carregarPerfilSalvo(); //carregar o localStorage
alternarTema();
