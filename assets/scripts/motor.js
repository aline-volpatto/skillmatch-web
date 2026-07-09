//Arquivo destinado a ser o motor do SkillMatch.

//Classe
export class Vaga{ //Calcula a própria compatibilidade
    constructor(id, empresa, cargo, requisitos, salario, modalidade){ //Recebe os dados e guarda em "this"
        this.id= id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }

//Método
calcularCompatibilidade(candidato){
    const transformarMinusculo = candidato.habilidades.map(habilidade => habilidade.toLowerCase()); //trata o que foi digitado para minusculo.
    const encontradas = this.requisitos.filter(requisito => transformarMinusculo.includes(requisito.toLowerCase()));
    const faltantes = this.requisitos.filter(requisito => !transformarMinusculo.includes(requisito.toLowerCase()));
    const percentual = Math.round((encontradas.length / this.requisitos.length) * 100);
    
    return{
        empresa: this.empresa,
        cargo: this.cargo,
        compatibilidade: percentual,
        habilidadesEncontradas: encontradas,
        habilidadesFaltantes: faltantes,
        classificacao: this.classificar(percentual)
    };

    }

    classificar(percentual){
        if(percentual>=80){
            return "Alta compatibilidade"
        }else if(percentual>=50){
            return "Média compatibilidade"
        }else{
            return "Baixa compatibilidade"
        }
    }
}

export class VagaFrontEnd extends Vaga{
    constructor(id, empresa, cargo, requisitos, salario, modalidade, senioridade){
        super(id, empresa, cargo, requisitos, salario, modalidade);
        this.senioridade = senioridade;
    }

    mostrarVaga(){
        return `${this.cargo} - Nível ${this.senioridade}`;
    
    }
}

//CLOSURE - Contador que lembra quantas análises já foram feitas.
export function criarContadorDeAnalises(){
    let total = 0;
    return function (){
        total++;
        return total;
    };
}

//CALLBACK - Recebe a função e executa ela ao final da análise.
export function finalizarAnalise(nomeCandidato, callback){
    callback(nomeCandidato);
}