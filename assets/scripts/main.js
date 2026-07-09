import {carregarVagas} from "./dados.js";
import {mostrarStatus, limparStatus, formulario, mostrarCards, mostrarDestaque, mostrarPerfil} from "./ui.js";
let vagasCarregadas = [];


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

formulario(function(candidato){
    const resultados = vagasCarregadas.map(vaga => vaga.calcularCompatibilidade(candidato));
    const melhorVaga = resultados.reduce((melhor, atual) =>
        atual.compatibilidade > melhor.compatibilidade ? atual : melhor
);

mostrarCards(resultados);
mostrarDestaque(melhorVaga); 
mostrarPerfil(candidato); 

});