import { createContext, useEffect, useState } from "react";
import Box from "../components/Box.jsx";
import dijkstra from '../utils/dijkstra.js';

export const mainContext = createContext();

const MainProvider = ({ children }) => {
  const [dijkstraPath, setDijkstraPath] = useState([]);
  const [dijkstraArray, setDijkstraArray] = useState([]);
  const [elements, setElements] = useState([]);
  const [mouseActive, setMouseActive] = useState(false);
  const [maze, setMaze] = useState(dijkstra.teste);
  const [type, setType] = useState('wall');

  const generateNewMaze = () => {
    let maze = '';

    const table = document.querySelector('.labirinth');

    table.childNodes.forEach((element) => {
      const children = element.childNodes;
      const hold = Array.from(children);

      const str = hold.map(({ className  }) => {
        if (className === 'wall') return 'W';
        if (className === 'blank') return '.';
        if (className === 'start') return 'S';
        if (className === 'finish') return 'F';
        return '.'
      }).join('');

      maze += str + '\n'
    })

    console.log(maze);
    setMaze(maze)
    const newGrid = dijkstra.pathFinder(maze);

    setDijkstraArray(newGrid);
  }

  const createListners = () => {
    window.addEventListener('mousedown', () => {
      setMouseActive(true);
    })
    window.addEventListener('mouseup', () => {
      setMouseActive(false);
    })
  }

  const createElements = () => {
    const elements = dijkstraArray.map((column, cIndex) => {
      const rows = column.map((row, rIndex) => {
        let tdClassName = '';
  
        if (row === Infinity && dijkstraPath[cIndex][rIndex] === 'W') {
          tdClassName = 'wall';
        } else if (row === Infinity) {
          tdClassName = 'blank';
        } else {
          tdClassName = 'path';
        }
  
        if (dijkstraPath[cIndex][rIndex] === 'S') tdClassName = 'start';
        if (dijkstraPath[cIndex][rIndex] === 'F') tdClassName = 'finish';
  
        return (
          <Box className={ tdClassName } />
        )
      })
  
      return (
        <tr>{ rows }</tr>
      )
    })

    setElements(elements);
  }

  useEffect(() => {
    const path = dijkstra.generatePath(maze);
    const [firstGrid] = dijkstra.generateFirstShortDistance(path);

    setDijkstraArray(firstGrid);
    setDijkstraPath(path);
    createListners();
  }, []);

  useEffect(() => {
    createElements();
  }, [dijkstraArray, dijkstraPath])

  const values = {
    type,
    dijkstraPath,
    dijkstraArray,
    elements,
    mouseActive,
    generateNewMaze,
    createElements,
    setType,
    setMaze,
    setDijkstraPath,
    setDijkstraArray
  }

  return (
    <mainContext.Provider value={ values }>
      { children }
    </mainContext.Provider>
  )
}

export default MainProvider;
