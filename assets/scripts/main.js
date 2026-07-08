import {carregarVagas} from "./dados.js"; //Importa as vagas de "dados.js"
import {mostrarStatus, limparStatus} from "./ui.js"; //Importa as mensagens que aparecerão na tela.


async function iniciarSistema(){
    mostrarStatus("Carregando vagas..."); // STATUS 1: Busca as vagas...

    try{
        const vagas = await carregarVagas(); //Await necessário, pois é assíncrono.
        if (vagas.length === 0){
            mostrarStatus("Nenhuma vaga por aqui."); // STATUS 2: Nenhuma vaga encontrada.
            return;
        }

        limparStatus();
        console.log("Vagas carregadas com sucesso!", vagas); // STATUS 3: Vagas encontradas.

        

    }catch (erro){
        mostrarStatus("Desculpe! Erro ao carregar as vagas. Tente novamente mais tarde! :) "); // STATUS 4: Erro. 
        console.error(erro);
    }
}

iniciarSistema(); //Iniciar o fluxo.




//import {montarInterface} from "./ui.js";
//import {Vaga} from "./motor.js";

//console.log("main.js carregado - conectado");
//console.log("motor.js", Vaga);
//console.log("ui.js", montarInterface);


