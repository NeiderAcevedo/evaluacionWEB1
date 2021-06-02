const URLPOST="https://accounts.spotify.com/api/token";



let llave1="grant_type=client_credentials";
let llave2="client_id=c54c1c68f53d45eb93bbbcf98185c093";
let llave3="client_secret=0cea862b9caa4f6586ea44a622d1988c";

let  peticionPOST={
    method:"POST",
    headers:{"Content-Type": 'application/x-www-form-urlencoded'},
    body:llave1+'&'+llave2+'&'+llave3
}

fetch(URLPOST,peticionPOST)
.then(function(respuesta){
    return(respuesta.json());
})
.then(function(datos){
    console.log(datos);
    console.log(datos.access_token);
    let token=`${datos.token_type} ${datos.access_token}`;
    SolicitarCanciones(token);

})
function SolicitarCanciones(token){
    let URL="https://api.spotify.com/v1/artists/2o5jDhtHVPhrJdv3cEQ99Z/top-tracks?market=US";
    let peticionGET={
        method:"GET",
        headers:{Authorization:token}
    }

    fetch(URL,peticionGET)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datos){
        console.log(datos)
        depurarDatos(datos);
    })
}
function depurarDatos(datos){
    let pistas=datos.tracks;
    let datosFiltrados=pistas.map(function(pista){
        return({
            nombre:pista.name,
            nombreAlbum:pista.album.name,
            audio:pista.preview_url,
            imagen:pista.album.images[0].url,
            popularidad:pista.popularity

        })
     })
     console.log(datosFiltrados)
     pintarDatos (datosFiltrados)
}


function pintarDatos (datosFiltrados){
    let contenedorPadre=document.getElementById("contenedorPadre");
    datosFiltrados.map(function(pista){
        //PINTAR UN DIV CON CLASE COL

        let contenedorColumna=document.createElement("div")
        contenedorColumna.classList.add("col")
        //PINTAR UN DIV CON LA CLASE CARD
        let tarjeta=document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");
        //PINTAR UN IMG CON LA CLASE CARD-IMG-TOP
        let imagen=document.createElement("img");
        //let audio=document.setAttribute("Audio, controls");
        imagen.classList.add("card-img-top");
        imagen.src=pista.imagen;

        //--------------------------//
        //NECESITO INDICAR QUE LA FOTO VA DENTRO DE LA TARJETA
        tarjeta.appendChild(imagen);
        // LA TARJETA VA DENTRO DEL CONTENEDOR COLUMNA
        contenedorColumna.appendChild(tarjeta);
        //NECESITO INDICAR QUE QUE EL CONTENEDOR COLUMNA VA DENTRO DEL CONTENEDOR PADRE
        contenedorPadre.appendChild(contenedorColumna); 
})
}