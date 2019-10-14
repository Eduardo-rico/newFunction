/**
 * LO QUE NECESITA ESTE CODIGO ES EL index.html y el main.js (en la carpeta js)
 * SE HACE USO DE GET_POSTS_COLLECTION, FILL_ENTRIES Y SE GENERAN OTRAS TRES FUNCIONES.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

const GET_POSTS_COLLECTION = () => {
    $.ajax({
        method:"GET",
        url: 'https://blog-general.firebaseio.com/post/.json',
        success: (response) => {
            FILL_ENTRIES(response);
            //alert("conectado y ya tenido")
            //console.log(response)
        }
    });
}

const FILL_ENTRIES = (postsData) => {
    $(".entries-wrapper").empty();
    //console.log(postsData);
    $.each(postsData, (index,value) => {
        $(".entries-wrapper").append(`
            <div class="col-12 col-lg-6">
                <div id="entry-${index} class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                        <img src="${value.imgUrl}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 id="card-sample-title" class="card-title">${value.title}</h5>
                            <p class="card-text card-content">${value.content}</p>
                            <p class="card-text"><small class="text-muted card-date">${value.createDate}</small></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })  
}



function getSelecter(){
    let propiedadAOrdenar = "";

             if ($("#inlineRadio1").is( ":checked" )){
                //alert("propiedad nombre")
                return propiedadAOrdenar = "name";
            }else if ($("#inlineRadio2").is( ":checked" )){
                //alert("propiedad fecha")
                return propiedadAOrdenar = "createDate";
            }else if ($("#inlineRadio3").is( ":checked" )){
                //alert("propiedad titulo")
                return propiedadAOrdenar = "title";
            }

}

var sortThisPls = (response, propiedadAOrdenar) => {
    let sinCorchetes = "";
    let algo = response.sort(function (a, b) {
        var x = a[propiedadAOrdenar];
        var y = b[propiedadAOrdenar];

        if (true) {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
    });
    //console.log(algo)
    sinCorchetes = algo.slice(1,-1) 
    //console.log(typeof(sinCorchetes))
    return sinCorchetes
}



function ORDER_PLS() {
    $.ajax({
        method:"GET",
        url: 'https://blog-general.firebaseio.com/post/.json',
        success: (response) => {
            //alert("sacando y ordenado")
            //console.log(response)
            let array = []
            for (cosas in response){
                //console.log(response[cosas])
                array.push(response[cosas])
            }
            FILL_ENTRIES(sortThisPls(array, getSelecter()));

            let fecha = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }) //////ASI PONGAN LA FECHA
            console.log(fecha)

        }

    });

    

        
    
};

ORDER_PLS()
