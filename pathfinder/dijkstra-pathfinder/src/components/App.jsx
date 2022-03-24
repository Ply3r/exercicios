import { useEffect, useState } from 'react';
import dijkstra from '../utils/dijkstra.js';
import Table from './Table.jsx';
import '../css/app.css'

function App() {
  const [dijkstraPath, setDijkstraPath] = useState([]);
  const [dijkstraArray, setDijkstraArray] = useState([]);

  useEffect(() => {
    setDijkstraPath(dijkstra.path)
    setDijkstraArray(dijkstra.distancePaths)
  }, [dijkstra])

  return (
    <div className='main-container'>
      { !!dijkstraArray.length && <Table array={ dijkstraArray } path={ dijkstraPath } /> }
    </div>
  );
}

export default App;
