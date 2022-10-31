import ChartRow from './ChartRow';
import { useEffect, useState, useRef } from 'react'

function Chart() {

    const [products, setProducts] = useState([]);
    const busqueda = useRef()

    async function getProducts() {
        let allProducts = []
        if (busqueda.current.value) {
            allProducts = await fetch(`https://ninetech.herokuapp.com/api/productos/busqueda?q=${busqueda.current.value}`).then(res => res.json()).then(data => data.data)
        } else {
            allProducts = await fetch("https://ninetech.herokuapp.com/api/productos/").then(res => res.json()).then(data => data.data)
        }
        setProducts(allProducts)
    }

    useEffect(() => {
        getProducts()
    }, [])

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
                            {products.length > 0 ? products.map((product, i) => {
                                return <ChartRow key={i} productId={product.producto.id} nombre={product.producto.name} precio={`$${product.producto.price}`} descripcion={product.producto.description} tipo={product.producto.type.name} marca={product.producto.brand.name} detalles={product.detalle} id={product.producto.id} function={getProducts} />
                            }) : (<p>No se encontraron productos</p>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Chart;