function ChartRow(props) {
  async function deleteProduct() {
    await fetch(`http://ninetech.herokuapp.com/api/productos/detalles/borrar/${props.id}`, {
      method: "delete"
    })
    props.function()
  }

  return (
    <tr>
      <td>{props.nombre}</td>
      <td>{props.precio}</td>
      <td>{props.descripcion}</td>
      <td>{props.tipo}</td>
      <td>{props.marca}</td>
      <td><a href={`http://${props.detalles}`}>Ver Detalles</a></td>
      <td><button onClick={deleteProduct}>Eliminar producto</button></td>
    </tr>
  );
}

export default ChartRow;
