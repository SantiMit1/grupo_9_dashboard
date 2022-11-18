import ChartRow from './ChartRow';
import { useEffect, useState, useRef } from 'react'

function Chart() {

    const [products, setProducts] = useState([]);
    const [pagina, setPagina] = useState(1)
    const [total, setTotal] = useState(0)
    const busqueda = useRef()

    async function getTotal() {
        const productosTotales = await fetch("https://ninetech.up.railway.app/api/productos").then(res => res.json()).then(data => data.count)
        setTotal(productosTotales)
    }

    async function getProducts() {
        let allProducts = []
        if (busqueda.current.value) {
            allProducts = await fetch(`https://ninetech.up.railway.app/api/productos/busqueda?q=${busqueda.current.value}`).then(res => res.json()).then(data => data.data)
        } else {
            allProducts = await fetch(`https://ninetech.up.railway.app/api/productos?pagina=${pagina}`).then(res => res.json()).then(data => data.data)
        }
        setProducts(allProducts)
    }

    function handleLeftArrow() {
        if(pagina > 1) {
            busqueda.current.value = ""
            setPagina(pagina - 1)
        }
    }
    
    function handleRightArrow() {
        if(pagina < (total / 3)) {
            busqueda.current.value = ""
            setPagina(pagina + 1)
        }
    }

    useEffect(() => {
        getTotal()
        getProducts()
    }, [pagina])

    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <input className='form-control' style={{ "width": "20%", "marginBottom": "20px" }} placeholder='Buscar Producto' type="text" ref={busqueda} onChange={getProducts} />
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descripcion</th>
                                <th>Marca</th>
                                <th>Tipo</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && products.map((product, i) => {
                                return <ChartRow key={i} productId={product.producto.id} nombre={product.producto.name} precio={`$${product.producto.price}`} descripcion={product.producto.description} tipo={product.producto.type.name} marca={product.producto.brand.name} detalles={product.detalle} id={product.producto.id} function={getProducts} />
                            })}
                        </tbody>
                    </table>
                </div>
                {products.length < 1 ? (<div className="alert alert-warning" role="alert">No se encontraron productos</div>) : ""}
                <div style={{"textAlign": "center"}}>
                    <button style={{"margin": "auto 30px"}} onClick={handleLeftArrow}><i class="fas fa-arrow-left"></i></button>
                    <button style={{"margin": "auto 30px"}} onClick={handleRightArrow}><i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Chart;