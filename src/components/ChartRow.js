function ChartRow(props) {
  return (
    <tr>
      <td>{props.nombre}</td>
      <td>{props.precio}</td>
      <td>{props.descripcion}</td>
      <td>{props.tipo}</td>
      <td>{props.marca}</td>
      <td><a href={`http://${props.detalles}`}>Ver Detalles</a></td>
    </tr>
  );
}

export default ChartRow;
