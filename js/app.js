const grillaProductos = $(".grilla-productos");
let carrito = [];

grillaProductos.click(agregarProducto);

$("#vaciar-carrito").click(vaciarCarrito);

$("document").ready(() => {
    if (JSON.parse(localStorage.getItem('carrito'))) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        visualizarTitulosCarrito();
        if (carrito.length === 0) {
            ocultarTitulosCarrito();
        }
    };
    renderizarHTML();
})

if (carrito.length === 0) {
    ocultarTitulosCarrito();

} else {
    agregarProducto();
}

function visualizarTitulosCarrito() {
    $(".carrito-vacio").hide();
    $(".modal-body__titles").show();
    $(".modal-footer").find(".btn-secondary").show();
    $(".modal-footer").find(".btn-primary").show();
    $(".modal-body").find(".carrito-vacio").remove();
    $(".modal-footer").find(".btn-primary").text("Finalizar compra");
    $("#vaciar-carrito").show();
}

function ocultarTitulosCarrito() {
    $(".modal-body__titles").hide();
    $(".modal-body").append('<p class="carrito-vacio">Aún no hay productos en tu carrito.</p>');
    $(".modal-footer").find(".btn-secondary").hide();
    $(".modal-footer").find(".btn-primary").hide();
    $("#vaciar-carrito").hide();
}

function agregarProducto(e) {

    let target = e.target;

    visualizarTitulosCarrito();

    if (target.classList.contains("sumar-carrito")) {
        e.preventDefault();
        const cardProducto = $(target).parents(".grilla-productos__card");
        obtenerDatosProducto(cardProducto);
    }
}

function obtenerDatosProducto(cardProducto) {

    const productoAgregado = {
        imagen: cardProducto.find("img").attr("src"),
        cantidad: 1,
        precio: cardProducto.find("p").text(),
        id: Number(cardProducto.find("button").attr("data-id"))
    }

    const repite = carrito.some(producto => producto.imagen === productoAgregado.imagen);
    if (repite) {
        const productos = carrito.map(producto => {
            if (producto.imagen === productoAgregado.imagen) {
                producto.cantidad++;
                producto.precio = `$${productoAgregado.precio.slice(1) * producto.cantidad}`;
                return producto;
            } else {
                return producto;
            }
        })
    } else {
        carrito.push(productoAgregado);
    }

    guardarEnStorage();
    renderizarHTML();

}

function renderizarHTML() {

    limpiarHTML();

    carrito.forEach(producto => {
        $(".modal-body").append(`
        <div class="producto-agregado d-flex flex-row justify-content-around justify-content-lg-around align-items-center">
            <img class="modal-body__img col-3" src="${producto.imagen}" alt="Imagen de producto en carrito">
            <div class="div__cantidad d-flex flex-row justify-content-between col-3">
            <button class="btn-resta bg-danger" data-id="${producto.id}">-</button>
            <p class="producto-cantidad col-1">${producto.cantidad}</p>
            <button class="btn-suma bg-primary" data-id="${producto.id}">+</button>
            </div>
            <p>${producto.precio}</p>
        </div>
    `);
    })

    operarCantidades();
    guardarEnStorage();

}

function limpiarHTML() {
    $(".producto-agregado").remove();
}

function operarCantidades() {

    $(".div__cantidad").click((e) => {

        let idProductoHtml = Number(e.target.dataset.id);

        if (e.target.classList.contains("btn-suma")) {
            carrito.forEach(producto => {
                if (producto.id === idProductoHtml) {
                    producto.cantidad++;
                    producto.precio = `$${Number(producto.precio.slice(1)) + 7000}`
                    renderizarHTML();
                }
            })
        } else if (e.target.classList.contains("btn-resta")) {
            carrito.forEach(producto => {
                if (producto.id === idProductoHtml && producto.cantidad > 1) {
                    producto.cantidad--;
                    producto.precio = `$${Number(producto.precio.slice(1)) - 7000}`
                    renderizarHTML();
                }
            })
        }
    })
}

function guardarEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
    $(".modal-body .producto-agregado").remove();
    ocultarTitulosCarrito();
    carrito = [];
    guardarEnStorage()
}






