//Arquivo destinado a User Interface. 

export function mostrarStatus (mensagem){ //Mostra a mensagem na área de status (Status: Carregando, vzio e erro).
 const status = document.getElementById("status"); //puxa o <p> pelo id do status do html
 status.textContent = mensagem; //escreve no <p> do html a mensagem correta.
}

export function limparStatus (){ //Limpa a mensagem de status, quando as vagas carregam com sucesso.
    const status = document.getElementById("status");
    status.textContent = "";
}