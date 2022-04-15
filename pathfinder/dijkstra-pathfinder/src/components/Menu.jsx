import { useContext } from "react"
import { mainContext } from "../provider/mainProvider"
import dijkstra from '../utils/dijkstra.js';


const Menu = () => {
  const { start, generateNewMaze, setDijkstraPath, setDijkstraArray, setMaze, setType } = useContext(mainContext);

  const generateBlankMaze = (size) => {
    let maze = '';

    for (let i = 0; i < size; i += 1) {
      let str = '';

      for (let c = 0; c < size; c += 1) {
        str += '.'; 
      }

      i !== size - 1 ? maze += str + '\n' : maze += str
    }

    return maze;
  }

  const clearMaze = () => {
    const blank = generateBlankMaze(50);

    const path = dijkstra.generatePath(blank);
    const [array] = dijkstra.generateFirstShortDistance(path);

    setMaze(blank);
    setDijkstraPath(path);
    setDijkstraArray(array);
  }

  return (
    <div>
      <button 
        onClick={ () => {
          generateNewMaze();
        } }
      >
        Start
      </button>
      <button onClick={ clearMaze }>Clear</button>
      <div>
        <button className="menu-bot wall" onClick={ () => setType('wall') } />
        <button className="menu-bot start" onClick={ () => setType('start') } />
        <button className="menu-bot finish" onClick={ () => setType('finish') } />
      </div>
    </div>
  )
}

export default Menu