function ChartRow(props) {
  async function deleteProduct() {
    await fetch(`https://ninetech.herokuapp.com/api/productos/detalles/borrar/${props.id}`, {
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
      <td><a href={`https://${props.detalles}`}>Ver Detalles</a></td>
      <td><button style={{"border": "none", "backgroundColor": "transparent"}} onClick={deleteProduct}><i class="fas fa-trash" style={{"color": "red"}}></i></button></td>
    </tr>
  );
}

export default ChartRow;
