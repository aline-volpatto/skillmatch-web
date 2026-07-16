//Arquivo destinado a ser o motor do SkillMatch.

//Classe
export class Vaga{ //Calcula a própria compatibilidade
    constructor(id, empresa, cargo, requisitos, salario, modalidade, cidade, lat, long){ //Recebe os dados e guarda em "this"
        this.id= id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
        this.cidade = cidade;
        this.lat = lat;
        this.long = long;
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
    constructor(id, empresa, cargo, requisitos, salario, modalidade, cidade, lat, long, senioridade){
        super(id, empresa, cargo, requisitos, salario, modalidade, cidade, lat, long);
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


//Calculo da distância entre candidato e cidades das vagas
export function calculoDistancia(lat1, long1, lat2, long2){
    const R = 6371; //raio da Terra(km)
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLong = (long2-long1) * Math.PI/180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2)+
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLong/2) * Math.sin(dLong/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
} 
//Fórmula de Haversine: Calcula dois pontos na superfície da Terra, 
//considerando a curvatura da Terra. 