function ChartRow(props) {
  async function deleteProduct() {
    await fetch(`http://localhost:3001/api/productos/detalles/borrar/${props.id}`, {
      method: "delete"
    })
    props.function()
  }

  return (
    <tr>
      <td>{props.nombre}</td>
      <td>{props.precio}</td>
      <td>{props.descripcion}</td>
      <td>{props.marca}</td>
      <td>{props.tipo}</td>
      <td><a href={`http://${props.detalles}`}>Ver Detalles</a></td>
      <td><button style={{"border": "none", "backgroundColor": "transparent"}} onClick={deleteProduct}><i class="fas fa-trash" style={{"color": "red"}}></i></button></td>
    </tr>
  );
}

export default ChartRow;
