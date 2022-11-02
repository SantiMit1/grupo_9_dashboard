import { useState, useEffect, useRef } from 'react';


function CreateForm() {
    const [marcas, setMarcas] = useState([])
    const [tipos, setTipos] = useState([])

    const nombre = useRef()
    const precio = useRef()
    const descuento = useRef()
    const categoria = useRef()
    const tipo = useRef()
    const marca = useRef()
    const descripcion = useRef()
    const feedback = useRef()

    async function getOptions() {
        const marcasApi = await fetch("https://ninetech.herokuapp.com/api/productos/marcas").then(res => res.json())
        setMarcas(marcasApi)

        const tiposApi = await fetch("https://ninetech.herokuapp.com/api/productos/tipos").then(res => res.json())
        setTipos(tiposApi)
    }

    async function createProduct(e) {
        e.preventDefault()

        const producto = {
            name: nombre.current.value,
            price: Number(precio.current.value),
            description: descripcion.current.value,
            enOferta: descuento.current.value ? 1 : 0,
            discount: Number(descuento.current.value),
            category: Number(categoria.current.value),
            type: Number(tipo.current.value),
            brand: Number(marca.current.value)
        }

        if (producto.name
            && producto.price
            && producto.description
            && producto.category
            && producto.type
            && producto.brand) {
            await fetch("https://ninetech.herokuapp.com/api/productos/crear", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            }).then(res => res.json())

            feedback.current.style.color = "green"
            feedback.current.innerText = "Producto creado"
        } else {
            feedback.current.style.color = "red"
            feedback.current.innerText = "Completa los datos restantes"
        }
    }

    useEffect(() => {
        getOptions()
    }, [])

    return (
        <div>
            <form>
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
                        <option value="">Seleccione una opción</option>
                        <option value="1">Hardware</option>
                        <option value="2">Audio y video</option>
                        <option value="3">Mouse y teclado</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tipo">Tipo de producto</label>
                    <select ref={tipo} className="form-control" style={{ "width": "40%" }} id="tipo" required>
                        <option value="">Seleccione una opción</option>
                        {tipos && tipos.map((tipo, i) => {
                            return <option value={tipo.id} key={i}>{tipo.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="marca">Marca del producto</label>
                    <select ref={marca} className="form-control" style={{ "width": "40%" }} id="marca" required>
                        <option value="">Seleccione una opción</option>
                        {marcas && marcas.map((marca, i) => {
                            return <option value={marca.id} key={i}>{marca.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción del producto</label>
                    <textarea ref={descripcion} className='form-control' style={{ "width": "40%", "resize": "none" }} id="descripcion" cols="30" rows="10"></textarea>
                </div>
                <input onClick={createProduct} type="submit" value="Crear producto" />
            </form>
            <span ref={feedback}></span>
        </div>
    )
}

export default CreateForm