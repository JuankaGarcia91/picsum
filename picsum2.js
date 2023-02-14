(function(){
    document.getElementById("boton").addEventListener("click", cargarDatos);

    function cargarDatos(){

        const pagina = document.getElementById("pagina").value; //select
        const cantidad = document.getElementById("cantidad").value; //text

        let urlFinal = 'https://picsum.photos/v2/list?';

        if(pagina > 0 && cantidad > 0 && cantidad <100){
            urlFinal += `page=${pagina}&limit=${cantidad}`;
            renderFotos(urlFinal)
        }
        else{
            alert("Debe seleccionar correctamente la pagina y cantidad")
        }     
    }

    function renderFotos(url){
        fetch(url)
        
        .then(resp => {
            if(resp.ok && resp.status==200){
                return resp.json();
            }  
        })
        .then(data => {

            let contenidoDiv = document.getElementById("contenido");
            contenidoDiv.innerHTML = "";
            const escalaGrises = document.getElementById("grises").checked; //check
            const blur = document.getElementById("blur").value; //select
            let urlFoto = "";
            
            if(escalaGrises){
                urlFoto += `grayscale`
            }

            if(blur > 0){
                urlFoto += `&blur=${blur}`
            }

            for(let item of data){
                contenidoDiv.innerHTML += 
                `<div class="card" style="width: 18rem;">
                    <img src="${item.download_url}?${urlFoto}" class="card-img-top" alt="..." class="img">
                    <div class="card-body">
                        <h5 class="card-title">${item.author}</h5>
                        <p class="card-text">ID del autor: ${item.id}</p>
                        <a href="${item.url}" class="btn btn-danger btn-sm btn-block active">URL</a>
                    </div>
                </div>`;
            }
        })
        .catch(error => {
            console.log(`Error en API ${error}`);
        });
    }
    
})()