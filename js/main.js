const contenedorProductos = document.getElementById('contenedor-productos')
const stockProductos = []


// Crea cards dinámicamente //
const cargarCards = (stockProductos) =>{
    stockProductos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        <img src=${producto.imagen} alt= "${producto.descripcion}">
        <h3>${producto.nombre}</h3>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar al carrito</button>
        `
        contenedorProductos.appendChild(div)
    
        const boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
            alertaCheck("Se ha añadido al carrito", "success")
        })

        const alertaCheck = (mensaje, icono) =>{ 
            Swal.fire({
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                width: '500',
                timer: 1000 
            })
        }
    })
} 


const getData = async () =>{
    try{
        const response = await fetch('/data.json')
        const data = await response.json()
        cargarCards(data)
        stockProductos.push(...data)

    }
    catch(e){
        console.log(e)
    }
}
getData()



