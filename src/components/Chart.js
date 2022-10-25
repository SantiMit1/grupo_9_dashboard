import ChartRow from './ChartRow';
import { useEffect, useState } from 'react'

function Chart (){

    const [products, setProducts] = useState([]);

    async function getProducts() {
        const allProducts = await fetch("http://ninetech.herokuapp.com/api/productos/").then(res => res.json()).then(data => data.data)
        setProducts(allProducts)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descripcion</th>
                                <th>Marca</th>
                                <th>Tipo</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => {
                                return <ChartRow key={i} nombre={product.producto.name} precio={`$${product.producto.price}`} descripcion={product.producto.description} tipo={product.producto.type.name} marca={product.producto.brand.name} detalles={product.detalle} id={product.producto.id} function={getProducts}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;