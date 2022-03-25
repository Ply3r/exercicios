import { useEffect, useState } from 'react';
import dijkstra from '../utils/dijkstra.js';
import Table from './Table.jsx';
import '../css/app.css'

function App() {
  const [dijkstraPath, setDijkstraPath] = useState([]);
  const [dijkstraArray, setDijkstraArray] = useState([]);
  const [dijkstraShort, setDijkstraShort] = useState([]);

  useEffect(() => {
    setDijkstraPath(dijkstra.path)
    setDijkstraArray(dijkstra.distancePaths)
    // setDijkstraShort(dijkstra.shortWay)
  }, [dijkstra])

  return (
    <div className='main-container'>
      { !!dijkstraArray.length && <Table array={ dijkstraArray } path={ dijkstraPath } shortWay={ dijkstraShort } /> }
    </div>
  );
}

export default App;
