import { useState, useEffect, useRef } from 'react';


function EditForm() {
    const [marcas, setMarcas] = useState([])
    const [tipos, setTipos] = useState([])
    const [producto, setProducto] = useState({})

    const nombre = useRef()
    const precio = useRef()
    const descuento = useRef()
    const categoria = useRef()
    const tipo = useRef()
    const marca = useRef()
    const descripcion = useRef()
    const productId = useRef()
    const feedback = useRef()

    async function getOptions() {
        const marcasApi = await fetch("https://ninetech.up.railway.app/api/productos/marcas").then(res => res.json())
        setMarcas(marcasApi)

        const tiposApi = await fetch("https://ninetech.up.railway.app/api/productos/tipos").then(res => res.json())
        setTipos(tiposApi)
    }

    async function getProduct(e) {
        const product = await fetch(`https://ninetech.up.railway.app/api/productos/detalles/${e.target.value}`).then(res => res.json()).then(data => data.producto)
        setProducto(product)
    }

    async function editProduct(e) {
        e.preventDefault()

        const productoAEditar = {
            name: nombre.current.value,
            price: Number(precio.current.value),
            description: descripcion.current.value,
            enOferta: descuento.current.value ? 1 : 0,
            discount: Number(descuento.current.value),
            category: Number(categoria.current.value),
            type: Number(tipo.current.value),
            brand: Number(marca.current.value)
        }

        if (productId.current.value
            &&productoAEditar.name
            && productoAEditar.price
            && productoAEditar.description
            && productoAEditar.category
            && productoAEditar.type
            && productoAEditar.brand) {
            await fetch(`https://ninetech.up.railway.app/api/productos/detalles/editar/${productId.current.value}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoAEditar)
            }).then(res => res.json())

            feedback.current.style.color = "green"
            feedback.current.innerText = "Producto editado"
        } else {
            feedback.current.style.color = "red"
            feedback.current.innerText = "Completa los datos restantes"
        }
    }

    useEffect(() => {
        getOptions()
    }, [])

    useEffect(() => {
        if (producto) {
            nombre.current.value = producto.name ? producto.name : ""
            precio.current.value = producto.price
            descuento.current.value = producto.discount
            descripcion.current.value = producto.description ? producto.description : ""
        } else {
            nombre.current.value = ""
            precio.current.value = ""
            descuento.current.value = ""
            descripcion.current.value = ""
        }
    }, [producto])

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="id">Id del producto</label>
                    <input ref={productId} onBlur={getProduct} className="form-control" style={{ "width": "40%" }} type="number" id="nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del producto</label>
                    <input ref={nombre} className="form-control" style={{ "width": "40%" }} type="text" id="nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio del producto</label>
                    <input ref={precio} className="form-control" style={{ "width": "40%" }} type="number" id="precio" required min={1} />
                </div>
                <div className="form-group">
                    <label htmlFor="descuento">Descuento del producto</label>
                    <input ref={descuento} className="form-control" style={{ "width": "40%" }} type="number" id="descuento" min={0} max={100} />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoria del producto</label>
                    <select ref={categoria} className="form-control" style={{ "width": "40%" }} id="categoria" required>
                        <option value="">Seleccione una opci??n</option>
                        <option value="1" selected={producto && producto.category_id === 1}>Hardware</option>
                        <option value="2" selected={producto && producto.category_id === 2}>Audio y video</option>
                        <option value="3" selected={producto && producto.category_id === 3}>Mouse y teclado</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tipo">Tipo de producto</label>
                    <select ref={tipo} className="form-control" style={{ "width": "40%" }} id="tipo" required>
                        <option value="">Seleccione una opci??n</option>
                        {tipos && tipos.map((tipo, i) => {
                            return <option selected={producto && producto.type_id === tipo.id} value={tipo.id} key={i}>{tipo.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="marca">Marca del producto</label>
                    <select ref={marca} className="form-control" style={{ "width": "40%" }} id="marca" required>
                        <option value="">Seleccione una opci??n</option>
                        {marcas && marcas.map((marca, i) => {
                            return <option selected={producto && producto.brand_id === marca.id} value={marca.id} key={i}>{marca.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripci??n del producto</label>
                    <textarea ref={descripcion} className='form-control' style={{ "width": "40%", "resize": "none" }} id="descripcion" cols="30" rows="10"></textarea>
                </div>
                <input onClick={editProduct} type="submit" value="Editar producto" />
            </form>
            <span ref={feedback}></span>
        </div>
    )
}

export default EditForm