import {Vaga} from "./motor.js"; //Busca a classe Vaga.

export async function carregarVagas(){ //Nessa função, busco as vagas do arquivo json de forma assíncrona. Retorna um array de vagas convertido para o main.js usar.
    const resposta = await fetch("./assets/dados/vagas.json"); //Aqui espera o arquivo chegar.
    
    if (!resposta.ok){ //O fetch não considera 404 como erro; o .ok detecta isso e eu lanço o erro para o catch tratar no main.js
        throw new Error("Não foi possível carregar as vagas (status" + resposta.status + ")");
    }
    
    const dados = await resposta.json(); //Aqui converte o texto em um array.
    const vagas = dados.map(dadosVaga => new Vaga( //transforma cada objeto cru (json) em um novo objeto Vaga.
        dadosVaga.id,
        dadosVaga.empresa,
        dadosVaga.cargo,
        dadosVaga.requisitos,
        dadosVaga.salario,
        dadosVaga.modalidade,
    ));

    return vagas; //devolve instancias das vagas prontas.
}


//PERGUNTA:
//Aqui não posso usar o formato de "fetch() .then() .then()"
// por conta do async/await. Certo? Só existe essa forma acima
//para usar com o async/await.