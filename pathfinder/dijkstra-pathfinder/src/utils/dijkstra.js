function generatePath(maze) {
  const array = maze.split('\n');

  const path = array.map((str) => str.split(''));
  return path;
}

function generateFirstShortDistance(array) {
  let startIndex = [0, 0];
  let finishIndex = [array.length, array.length];

  const shortDistances = array.map((value, index) => { 
    const newValue = value.map((currValue, currIndex) => {
      if (currValue === 'F') {
        finishIndex = [index, currIndex]
      }

      if (currValue === 'S') {
        startIndex = [index, currIndex]
        return 0
      }
      return Infinity
    });
      
    return newValue;
  })
  
  return [shortDistances, startIndex, finishIndex]
}

function pathFinder(maze){
  const path = generatePath(maze)
  const [shortest, start, finish] = generateFirstShortDistance(path);
  const visited = [];

  const globalLen = finish[0];
  const localLen = finish[1];

  function appendShort([g, l]) {
    /*
    const halfPossibilities = Math.round((globalLen * localLen) / 2);

    if (globalLen >= 50  && visited[halfPossibilities] && visited.length > halfPossibilities) {
      const lastPositions = visited.slice(halfPossibilities + 1, visited.length);

      const lastPositionsDistances = lastPositions.map((pos) => {
        const array = pos.split(',');
        const numArray = array.map((n) => +n);
        const distance = numArray.reduce((acc, curr) => Math.abs(globalLen - acc) + Math.abs(localLen - curr))

        return distance;
      })

      const checkpoint = visited[halfPossibilities].split(',')
      const checkpointDistance = checkpoint
        .map((n) => +n)
        .reduce((acc, curr) => Math.abs(globalLen - acc) + Math.abs(localLen - curr));

      const allMinor = lastPositionsDistances.every((dist) => dist > checkpointDistance);
      if (allMinor) return;
    }
    */

    const distance = Math.sqrt((globalLen - g) ** 2 + (localLen - l) ** 2)
    shortest[g][l] = distance;

    visited.push([g, l].toString())

    if (g === globalLen && l === localLen) throw new Error()

    const ways = [
      [g, l + 1].toString(),
      [g + 1, l].toString(),
      [g - 1, l].toString(),
      [g, l - 1].toString(),
    ]

    const possibleWays = ways
      .filter((value) => !visited.includes(value))
      .map((value) => value.split(',').map((num) => +num))
      .filter((value) => {
        if (!path[value[0]]) return false;
        if (!path[value[0]][value[1]]) return false;
        if (path[value[0]][value[1]] === 'W') return false;

        const positives = value.every((num) => num >= 0);

        return positives;
      })
      .sort((a, b) => {
        // const distanceFromStartA = Math.sqrt((0 - a[0]) ** 2 + (0 - a[1]) ** 2);
        // const distanceFromStartB = Math.sqrt((0 - b[0]) ** 2 + (0 - b[1]) ** 2);
        // const distanceFromEndA = Math.sqrt((globalLen - a[0]) ** 2 + (localLen - a[1]) ** 2);
        // const distanceFromEndB = Math.sqrt((globalLen - b[0]) ** 2 + (localLen - b[1]) ** 2);
        // const sumA = distanceFromStartA + distanceFromEndA; 
        // const sumB = distanceFromStartB + distanceFromEndB;

        const sumA = Math.sqrt((globalLen - a[0]) ** 2 + (localLen - a[1]) ** 2);
        const sumB = Math.sqrt((globalLen - b[0]) ** 2 + (localLen - b[1]) ** 2);

        return sumA - sumB
      });

    possibleWays.forEach((value) => appendShort(value))
  }

  try {
    appendShort(start)
  } catch (err) {
    return shortest;
  }

  return shortest;
}

function generateMaze(columns, rows) {
  let maze = '';

  for (let i = 0; i < columns; i += 1) {
    let str = '';

    for (let c = 0; c < rows; c += 1) {
      const pathOrWall = (i === 0 && c === 0) || (i === columns -1 && c === rows - 1) ? '.' : Math.random() < 0.7 ? '.' : 'W';

      str += pathOrWall; 
    }

    i !== columns - 1 ? maze += str + '\n' : maze += str
  }

  return maze;
}

function findShortestWay(path, firstPos) {
  const visited = [];

  function nextPosition(array) {
    if (!array) return;

    const [g, l] = array;
    visited.push([g, l].toString())

    const ways = [
      [g, l + 1].toString(),
      [g + 1, l].toString(),
      [g - 1, l].toString(),
      [g, l - 1].toString(),
    ]

    const [shortWay] = ways
      .filter((way) => !visited.includes(way))
      .map((way) => way.split(',').map((n) => +n))
      .filter((way) => {
        if (!path[way[0]]) return false;
        if (!path[way[0]][way[1]]) return false;
        if (path[way[0][way[1]]] === Infinity) return false;

        return true;
      })
      .sort((a, b) => path[a[0]][a[1]] - path[b[0]][b[1]])

    nextPosition(shortWay);
  }

  nextPosition(firstPos)

  return visited.map((way) => way.split(',').map((n) => +n));
}

const teste = `.............................W...........W........
.......WWWWWWWWWWWWWWWWWWWWWWW..WWWWWWWWWW........
.......W.................................W........
.......W.................................W..S.....
.......W..WWWWWWWWW..WWWWWWWWWWWWWWWWW...W........
.......W..W.......W..W...............W..WWWWWWWW..
.......W..W.......W..W...............W..W..W...W..
.......W..WWWWWWWWW..W...............W..W..W...W..
.......W..........W..WWWWWWWW........W..W..W...W..
.......W..........W.........W........W..W..W...W..
.......W..WWWWWWWWW.........W........W..W..WWWWW..
.......W..W.......WWWWWWW...W........W..W.........
.......W..W.............W...W........W..W.........
.......W..W.............W...W........W..WWWWWWWW..
.......W..WWWWWWWWWWWWWWW...W........W............
.......W................W...W........W............
.......W................W...W........W............
.......W..WWWWWWWWWWW...WWWWW........WWWWWWWWWWWWW
.......W..W.........W...W...W.....................
.......W..W.........W...W.F.W.....................
.......W..W.........WWWWW...W.....................
.......W..W.............W...W.....................
.......W..W.............W...W.....................
.......W..W.............W...W.....................
.......W..W.............W...W.....................
.......W..WWWWWWWWWWWWWWW...W.....................
.......W....................W.....................
.......W....................W.....................
.......WWWWWWWWWWWWWWWWWWWWWW.....................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................`

const maze = generateMaze(50, 50)

const path = generatePath(maze);
const distancePaths = pathFinder(maze);
// const shortWay = findShortestWay(distancePaths, [distancePaths.length - 1, distancePaths[0].length - 1])

const hold = { teste, generatePath, generateFirstShortDistance, pathFinder }

export default hold;
