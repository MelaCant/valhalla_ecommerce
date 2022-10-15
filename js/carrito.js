const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
const finalizarCompra = document.getElementById('finalizarCompra')
const carrito = []



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
       const carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


// Botón vaciar carrito //
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


// Agrega productos al carrito // 
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)

        carrito.push(item)
    }
    actualizarCarrito()
}

// Elimina individualmente productos del carrito //
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    
    actualizarCarrito() 
}


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p class="small p-1">${prod.nombre}</p>
        <p class="small p-1">Precio:$${prod.precio}</p>
        <p class="small p-1">Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar px-1"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    

    finalizarCompra.addEventListener('click', () => {
        if ((carrito.length > 0)){
            setTimeout (() =>{
                location.reload()
            }, 2500)
    
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por su compra!',
                showConfirmButton: false,
                width: '500',
                timer: 2500 
            })
            localStorage.removeItem('carrito')
        }else{
            Swal.fire({
                icon: 'error',
                title: 'El carrito está vacio',
                showConfirmButton: 'ok',
                confirmButtonColor: 'rgb(222, 135, 196)'
            })
        } 
    }) 
}



