import {VagaFrontEnd} from "./motor.js"; //Busca a classe Vaga.

export async function carregarVagas(){ //Nessa função, busco as vagas do arquivo json de forma assíncrona. Retorna um array de vagas convertido para o main.js usar.
    await new Promise(resolve => setTimeout(resolve, 3000)); //Simula uma consulta ao API com delay de 3 segundos.
    console.log("Carregando vagas...");
    const resposta = await fetch("./assets/dados/vagas.json"); //Aqui espera o arquivo chegar.
    
    if (!resposta.ok){ //O fetch não considera 404 como erro; o .ok detecta isso e eu lanço o erro para o catch tratar no main.js
        throw new Error("Não foi possível carregar as vagas (status" + resposta.status + ")");
    }
    
    const dados = await resposta.json(); //Aqui converte o texto em um array.
    const vagas = dados.map(dadosVaga => new VagaFrontEnd( //transforma cada objeto cru (json) em um novo objeto Vaga. //Herança de vaga - vagaFrontEnd
        dadosVaga.id,
        dadosVaga.empresa,
        dadosVaga.cargo,
        dadosVaga.requisitos,
        dadosVaga.salario,
        dadosVaga.modalidade,
        dadosVaga.cidade,
        dadosVaga.lat,
        dadosVaga.long,
        dadosVaga.senioridade,
    ));

    return vagas; //devolve instancias das vagas prontas.
}

