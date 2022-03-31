import { useContext } from 'react';
import Table from './Table.jsx';
import Menu from './Menu.jsx';
import { mainContext } from '../provider/mainProvider';
import '../css/app.css'

function App() {
  const { setDijkstraArray, setDijkstraPath } = useContext(mainContext)

  return (
    <div className='main-container'>
      <Menu />
      <Table />
    </div>
  );
}

export default App;
