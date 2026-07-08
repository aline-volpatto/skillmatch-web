//Arquivo destinado a User Interface. 

export function mostrarStatus (mensagem){ //Mostra a mensagem na área de status (Status: Carregando, vzio e erro).
 const status = document.getElementById("status"); //puxa o <p> pelo id do status do html
 status.textContent = mensagem; //escreve no <p> do html a mensagem correta.
}

export function limparStatus (){ //Limpa a mensagem de status, quando as vagas carregam com sucesso.
    const status = document.getElementById("status");
    status.textContent = "";
}

//Pega o formulário do html, fica disponível para preencimento, envia o formulário e previne de recarregar a página.
export function formulario(){
    const form = document.getElementById("form-perfil");
    const erro = document.getElementById("form-erro");

    form.addEventListener("submit", function (evento){
        evento.preventDefault();

        //pega os dados digitados no formulário.
        const nome = document.getElementById("nome").value;
        const area = document.getElementById("area").value;
        const habilidadesTexto = document.getElementById("habilidades").value;
        const experiencia = document.getElementById("experiencia").value;

        if(nome === "" || area === "" || habilidadesTexto === ""){ //Caso nome, área ou experiencia estejam em branco, retorna mensagem de erro.
            erro.textContent = "Por gentileza, preencha todos os campos."
            return;
        }
        erro.textContent = ""; //Se algo estava escrito, limpa o erro anterior.

        //Transforma o conteúdo digitado entre vírgulas, em um novo array.
        const habilidades = habilidadesTexto.split(",").map(habilidade => habilidade.trim()); //trim: caso o usuário digite espaço, o trim apaga o espaço e a mensagem fica vazia. Evita burlar a validação usando espaços.

        //Monta o objeto do candidato (com todas informações)
        const candidato = {
            nome: nome,
            area: area,
            habilidades: habilidades,
            experienciaMeses: Number(experiencia)
        };

        console.log("Candidato", candidato);
    });
}