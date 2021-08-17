$.ajax({
    url: "/data/camisetas.json",
    method: "GET",
    success: function (result) {
        let productos = result;
        productos.forEach((producto) => {
            $(".grilla-productos").append(`
            <div class="shadow-lg d-flex flex-column align-items-center p-3 grilla-productos__card">
            <img class="col-lg-6 col-md-8 grilla-productos__card__img" src="${producto.srcImg}" alt="">
            <h4 class="mt-4 fs-6">${producto.nombre}</h4>
            <p>${producto.precio}</p>
            <button type="button" class="sumar-carrito btn col-md-6 col-lg-4" data-id="${producto.id}">Comprar</button>
            </div>
            `)
        })
    },
    error: function (jqXHR, status, error) {
        console.log(jqXHR);
        console.log(status);
        console.log(error);
    }
});


