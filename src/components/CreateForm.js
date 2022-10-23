import { useState, useEffect } from 'react';


function CreateForm() {
    const [marcas, setMarcas] = useState([])
    const [tipos, setTipos] = useState([])

    async function getOptions() {
        const marcasApi = await fetch("http://ninetech.herokuapp.com/api/productos/marcas").then(res => res.json())
        setMarcas(marcasApi)

        const tiposApi = await fetch("http://ninetech.herokuapp.com/api/productos/tipos").then(res => res.json())
        setTipos(tiposApi)
    }

    useEffect(() => {
        getOptions()
    }, [])

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del producto</label>
                    <input className="form-control" style={{ "width": "20%" }} type="text" id="nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio del producto</label>
                    <input className="form-control" style={{ "width": "20%" }} type="number" id="precio" required min={1} />
                </div>
                <div className="form-group">
                    <label htmlFor="descuento">Descuento del producto</label>
                    <input className="form-control" style={{ "width": "20%" }} type="number" id="descuento" min={0} max={100} />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoria del producto</label>
                    <select className="form-control" style={{ "width": "20%" }} id="categoria" required>
                        <option value="">Seleccione una opción</option>
                        <option value="1">Hardware</option>
                        <option value="2">Audio y video</option>
                        <option value="3">Mouse y teclado</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tipo">Tipo de producto</label>
                    <select className="form-control" style={{ "width": "20%" }} id="tipo" required>
                        <option value="">Seleccione una opción</option>
                        {tipos && tipos.map((tipo, i) => {
                            return <option value={tipo.id} key={i}>{tipo.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="marca">Marca del producto</label>
                    <select className="form-control" style={{ "width": "20%" }} id="marca" required>
                        <option value="">Seleccione una opción</option>
                        {marcas && marcas.map((marca, i) => {
                            return <option value={marca.id} key={i}>{marca.name}</option>
                        })}
                    </select>
                </div>
                <input type="submit" value="Crear producto" />
            </form>
            <span style={{ "color": "green" }}>Producto creado</span>
        </div>
    )
}

export default CreateForm