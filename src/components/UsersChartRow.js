function UsersChartRow(props) {
  return (
    <tr>
      <td>{props.nombre}</td>
      <td>{props.apellido}</td>
      <td>{props.email}</td>
    </tr>
  );
}

export default UsersChartRow;
