import { mainContext } from '../provider/mainProvider';
import { useContext } from 'react';

const Table = () => {
  const { elements } = useContext(mainContext);

  return (
    <table className="labirinth">
      { !!elements && elements }
    </table>
  );
}

export default Table;
