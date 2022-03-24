const Table = ({ array, path }) => {
  const elements = array.map((column, cIndex) => {
    const rows = column.map((row, rIndex) => {
      let tdClassName = '';

      if (row === Infinity && path[cIndex][rIndex] === 'W') {
        tdClassName = 'wall';
      } else if (row === Infinity) {
        tdClassName = 'blank';
      } else {
        tdClassName = 'path';
      }

      if (rIndex === 0 && cIndex === 0) tdClassName = 'start';
      if (rIndex === column.length - 1 && cIndex === array.length - 1) tdClassName = 'finish';

      return (
        <td className={ tdClassName } />
      )
    })

    return (
      <tr>{ rows }</tr>
    )
  })

  return (
    <table className="labirinth">
      { elements }
    </table>
  );
}

export default Table;
