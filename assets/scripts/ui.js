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
export function formulario(aoEnviar){
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
            experienciaMeses: Number(experiencia),
        };

        localStorage.setItem("perfil", JSON.stringify(candidato));//salva o perfil do candidato em local storage.

        aoEnviar(candidato);
    });
}

export function mostrarCards(resultados){ //renderiza um card para cada vaga.
    const lista = document.getElementById("lista-vagas");
    lista.innerHTML = ""; //para limpar os cards anteriores.

    resultados.forEach(resultado => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${resultado.empresa}</h3>
            <p>${resultado.cargo}</p>
            <p><strong>${resultado.compatibilidade}%</strong> — ${resultado.classificacao}</p>
            <p>Você possui essas habilidades: ${resultado.habilidadesEncontradas.join(", ") || "nenhuma habilidade em comum."} </p>
            <p>Falta estudar: ${resultado.habilidadesFaltantes.join(", ") || "você já possui todas as habilidades para essa vaga!"}</p>
            ${resultado.distancia !== undefined ? `<p>A empresa localiza-se em: ${resultado.cidade} — ${resultado.distancia} km de você</p>` : ""}
            `;

            lista.appendChild(card);

    });
}


export function mostrarDestaque(melhorVaga){ //Mostra o destaque da vaga mais compatível.
    const destaque = document.getElementById("destaque");

    let recomendacao;
    if (melhorVaga.habilidadesFaltantes.length === 0){
        recomendacao = "Parabéns! Você possui todo o conhecimento para essa vaga"
    }else{
        recomendacao = `Para se candidatar a essa vaga, você precisa reforçar o conhecimento em: ${melhorVaga.habilidadesFaltantes.join(", ")}.`;
    }

    destaque.innerHTML = `
    <h3>Vaga mais compatível</h3>
    <p><strong>${melhorVaga.empresa}</strong> - ${melhorVaga.compatibilidade}% de compatibilidade.</p>
     ${melhorVaga.distancia !== undefined ? `<p> A empresa localiza-se em:  ${melhorVaga.cidade} — ${melhorVaga.distancia} km de você</p>`: ""}
    <p>${recomendacao}</p>
    `;
}



export function mostrarPerfil(candidato){ //resumo do perfil do candidato.
    const destaque = document.getElementById("destaque");

    const perfil = document.createElement("p"); //cria o parágrafo do perfil do candidato com experiencia.
    perfil.classList.add("perfil-resumo");
    perfil.textContent = `Seu perfil: ${candidato.nome} - ${candidato.area} - ${candidato.experienciaMeses} meses de experiência`;

    destaque.prepend(perfil); //prepend = organiza o perfil do candidato antes do conteúdo de destaque das vagas.

}


export function carregarPerfilSalvo(){ //Função que devolve os dados digitados no perfil com localstorage.
    const informacoesPerfil = localStorage.getItem("perfil");

    if(informacoesPerfil === null){ //caso nao encontre as informacoes salvas (primeira vez que acessa, volta vazio).
        return;
    }

    const perfil = JSON.parse(informacoesPerfil);

    document.getElementById("nome").value=perfil.nome;
    document.getElementById("area").value=perfil.area;
    document.getElementById("habilidades").value=perfil.habilidades;
    document.getElementById("experiencia").value=perfil.experienciaMeses;

}

export function alternarTema(){ //alterna entre tema dark e light e salva em localStorage.
    const botao = document.getElementById("botao-tema");
    const salvarTema = localStorage.getItem("tema");
    const logo = document.getElementById("logo");


    if(salvarTema === "escuro"){
        document.body.classList.add("dark-mode");
        botao.textContent = "Light mode";
        logo.src = "./assets/img/logo-invertido.png";
    }

    botao.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode"); //Uso do toggle para alternar entre as classes. Se a classe não está, ele adiciona. Se está, ele remove. 
        
        if(document.body.classList.contains("dark-mode")){
            botao.textContent = "Light mode";
            localStorage.setItem("tema", "escuro");
            logo.src = "./assets/img/logo-invertido.png";

        }else{
            botao.textContent = "Dark mode";
            localStorage.setItem("tema", "claro");
            logo.src = "./assets/img/logo.png";

        }
    });

}