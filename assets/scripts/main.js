import {carregarVagas} from "./dados.js"; //Importa as vagas de "dados.js"
import {mostrarStatus, limparStatus, formulario, mostrarCards} from "./ui.js"; //Importa as mensagens que aparecerão na tela.

let vagasCarregadas = []; //guarda as vagas num array vazio que tem comunicacao com o cormulário em ui.js

async function iniciarSistema(){
    mostrarStatus("Carregando vagas..."); // STATUS 1: Busca as vagas...

    try{
        const vagas = await carregarVagas(); //Await necessário, pois é assíncrono.
        if (vagas.length === 0){
            mostrarStatus("Nenhuma vaga por aqui."); // STATUS 2: Nenhuma vaga encontrada.
            return;
        }

        vagasCarregadas = vagas; //guarda as vagas no array que vem de ui.js

        limparStatus();
        console.log("Vagas carregadas com sucesso!", vagas); // STATUS 3: Vagas encontradas.

        

    }catch (erro){
        mostrarStatus("Desculpe! Erro ao carregar as vagas. Tente novamente mais tarde! :) "); // STATUS 4: Erro. 
        console.error(erro);
    }
}

iniciarSistema(); //Iniciar o fluxo.

formulario(function(candidato){
    const resultados = vagasCarregadas.map(vaga => vaga.calcularCompatibilidade(candidato));
    mostrarCards(resultados); //renderiza os cards
});
    



