//Página destinada a funcionalidades do software

//GEOLOCALIZAÇÃO:
export function obterLocalizacao(){
    return new Promise((resolve,reject) => {
        if (!navigator.geolocation){
            reject("Localização não válida para o navegador.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function(posicao){
                resolve({
                    lat: posicao.coords.latitude,
                    long: posicao.coords.longitude
                });
            },
            function(erro){
                reject("Não foi possível encontrar a sua localização");
            }
        );
    });
}