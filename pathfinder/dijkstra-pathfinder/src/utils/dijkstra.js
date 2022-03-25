function generatePath(maze) {
  const array = maze.split('\n');

  const path = array.map((str) => str.split(''));
  return path;
}

function generateFirstShortDistance(array) {
  const shortDistances = array.map((value, index) => { 
    const newValue = value.map((_currValue, currIndex) => {
      if (index === 0 && currIndex === 0) {
        return 0
      }
      return Infinity
    });
      
    return newValue;
  })
  
  return shortDistances
}

function pathFinder(maze){
  const path = generatePath(maze)
  const shortest = generateFirstShortDistance(path);
  const visited = [];

  const globalLen = shortest.length - 1;
  const localLen = shortest[0].length - 1;

  if (path[globalLen - 1][localLen] === 'W' && path[globalLen][localLen - 1] === 'W') 
    return shortest;

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
    appendShort([0, 0])
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

const teste = `..W.W.....WW.WWW.W....W....W.W.W..W.W.W.W..W..W....WW...W..W.....W.WW.....W....WWW.W..W.......W..W.W
.WW.......W...W.W...WW......W...W.W....W..W.W.W.WW..W........W...WW....W..WWW.WWW...WWW........W..W.
.......W..W.W...W....W.WWW....WW......WW.W............W....W.....WWWW...WWWW...WWW...W...........W.W
..W.W..WW.W.....W..WW..W.WWW.......W....WWW..W......WW.W.WW......WW.........W.......WW.WW.W.....W.WW
.....W.....W....W.........WW..WW..W.WW.W.W.W......W......................W.....W..WW.W...WW.WW...W..
W.......W....W..W.............W.W.....WW..W.....WW..W...WWWWW....W.............W.W.W..W...W.....W...
..W....WWWW...........WWW.......WW...W...............W...W.W.WW..W..W..W.W......WW.........W..WW.WW.
WWW....WW.W....W...WW..WWW.................WW...W..WW.WWWW...W.WWW..W.W..W..W..W...W......W.....W.W.
..W.W.........WWWWW...WW.....W....WWW.WW....W.....W....W....W..W.WW....W........W.W..W....WWW.....W.
.W..WW....W.W..W...W.W....WW.WWW.WW.......W.W.W.....W..............W....WW.W.W..WWW..WWW.....W......
.W............W..W.W.....W........WW.....WW..W.W.WW.W.WW....WW..WW.......WW.W.W...W....W....W..WW...
........W.W.WW......W......W..WW.WW..W....W..W....WW........WW................WW..W............W...W
....W..WW..WW...........W...W.............W.......W...WW.WW........WW..W...........WWW....WW..W.....
WW..W...........WW....W....W.....WW.W.WW..........W.WW..W.W...WW....W....W.W.W..W.....W........W.W..
WW..W..W.W.W.W.W....W.W.W....W.W.....W....W..W...W..WW..W...W.W............W.W.WWWW...W..W........W.
W.........WW..W..W...WW.....W...W...W......W.....W.W...W.W.W.....W...W.W..........W..W.....W...W.W.W
...W..W....W.WW.W....W..W.W.W...W.WW.....W..W.WW...........W..W.......W.W...WW.W.WWWW....W........W.
......W..W..W.........WWW........WW....W.W........W..W.W..W.........W.......WW...W..WWWW..W.W.......
.....WWWW.WWWWW.....W........W..W.....W.W.....W.W.W.W..WW..WWW..WW....W..W.W....WWWWWWW...W.WW......
....WWW..WWWW............W..WW.W....W.W.W.WW..W....WW...W........W.......W.W.WWW.W..WW..WW.W........
..WW..W...W..W...WW...W..W......WWWW..W.....W.W..W.W...W..W....W.......W.....W...W......W.....W.....
..WWW.......W..W.W......WWW..WW.WW...WW........WWW....WWW.....W........WWWWW............W..W.W.W..W.
.....W....W.......W..W..WWW..........W..WW..WW.W....WW.......WW..W....W.WW.....W...........W...WW...
.WW.....W......W.W..WW..........W.WW....W.W.....W...W............W.....W.WW.WWWW...WW...W......W....
.......WW.W.WWW.WWW.W..WW.W.W.....WW...W..W.....W......W..W.W.W.......W....W...W...........W.W.W....
.....W....WW......WW.....W......WW...WW....W..W...W.....WW.W...W...W.W.....WW..W..WWWW...WW.....WW..
.W.............W....W.W.WW..................WWW...W.............W.W....W.......W.WW..WW.W....W..W..W
W.W..W......W....W.WWW.W.W...WW...W.......W..W.WWWW.W..WW......W..WW....W.W.....W...W....W..W...W.W.
.WW..WWW..............WW.W.W.WW..........W.........W...WWWW..WW.W....W..WW.W.W..W.W...W........W....
....W....WWW.........W.......W................W..........W....WW....W....WW.....W......W........WW.W
W..W...W..W.W...W..W.............W.WW.....WW.WW...........W..........W..WW..W..W.W.W.........WW..WW.
WWWW..W...W..W.W...W....W..W....W.W..W....W....WWW...W.WWW.W........W.WWW..WWW..........W.W.....WWW.
.WW.W.....WW.W..WW.................W......WW.W.......W...W...W..W..W.....W.....W.W.WW.........WWW...
W...W...WW............W..W.W.W.....W...WW.WW.W.WW.W.W.......W.....W.W.W....W..W..WW....WW...WW....W.
...WWW.W.WWW.W.WW....W...W...................WWW..WW........WW..W..W...W.....W......W..W........WW..
W.WW.........WW..WW...W..W.WW...W...W.W.W.....W....WW......W...W.W.WWW.......W...W.W...WW..W.W...WW.
...W......W..W.W............W...........WW.WW..WW...........W.....................W.....WW..WW....W.
WW....WWWW........W......WWW.W.........W......W..W.......W....W...W.W..W..WW..W..W.....W..WW.......W
..W....................WW....W..W.W....W......W...WW.WW.W......WW..W...W...WW.W...W.W....W....W.W...
.W.W..W....W..W.............WW...W.W.........................W.WW...................W...W.....WW...W
.........W....WW....WW.........W..W...W..........W.W.....W.WW..WW..W.........W.......W..WW.W..W.W..W
W.W..W....W.W.W.....W.W.W.W.......W.WW..W..W.W.....W...W.W......................W..........W........
..WWWW.WWW......WW.W.WW.W.WWW.......W.....................W..WW.W..W.................W.W...WWW.WW...
W...W.W..WW.....W.........WW.W.WW...W............W.....W.W...WW.W......W...WW.W......W........W.....
.W.W...WWWW....W......W.W........WW....W.......W...WW.WW........W.....W..W..W..W..W.....WW.W..W.WW..
W......W...W....WW....WWW...WW....W.WW.W....W.W........WWW...W...W.WW..WW...WW.W..........W.WW.W...W
.......W.....W.W.......W...WWW....W.....WW..........W..........WWW....W....WWWWWW..W.W.....WW..W.WW.
WW.W..W...W..W.W.W.W......W.....WW.W.W...W.....W.W.....WWW...W...W........WW..WW....W.W...WW.....W.W
.....W..WWW...W..W..W.W.W...WW...WWW...W.W.......W.....W.W..W.W.....W.....W..W.W........W.W.WW.W....
..WW....W..W.W.....WWWWW..WWW.W.W............WWWW..W.......W..W....WWW........W........W..W....W.W..
........W....WW.....W.W.W.........WW...............W...............W.WWW......WW..W..........WW..W..
.WW.......WW....W.WW...W.W.WW....W..WW.....W.W.WW........W........W.W........W....W..W....WW........
..WW...........W....W.W..WW.W....W.........WWW....WW....W.W................WW..W.W.W....W..W..WW....
....W....W.W..W..W..WW......W..W.............W..W...WWW.WW..W.....WW..W..WWW.W..W..............W...W
W...WWW.WW.....WW.......W.W...W........W............W......W.W..WW...W..WWW.........WWWWWW.W.......W
.....WW.W.W.W.WW...WW.WW.........W.WWWW.W.W.W..W.W.W.......W..W..W...W.......W.WW....W..W...WWW....W
..WW..WWW..W.......W..W...WW.W.WWW.W..W...W....W.......WW.WW....WW...WW....W.....W..W......W.W......
...........WW...W.W.....WW..W...W.WW.WW.......W.W....WW....WW.W..WW.W..W.......W..W.W..........WW.W.
..W...W.....W......W..W....WW.WWWW.......W....WW....W...W....W....W.....WW..W...WW......WW..........
W.W...W.W......W...W.W....W...W..W...W.WW....W.WW..WW...W....W.W....WWWW.......W..WW.....W..W...W...
W.W.W...WW..W...W....WW..W.WW....W.W....WWWW.............W...W.......W....W.W.W..W.....W.WW..WW.....
...W..............W..W..WW.W..W......W..WWW.WWW.WW....W..W...W.W......WW.WW...WW...W...W...W.W.W..W.
..............W.....W.....W......W.WWW.WWW.WW....W.....W.......WW......W.W....W...........W.........
W.W.......W........WW..W.W.W...WWW....WW..W...W.WW......W.W......WWW...W......W.W.W...WW.W....WW.WWW
......WWW.....WW.W...W.W.W.....WWWW.WWW.....WWWW...W.......W.W.WWW..W..W..W.W....W..WWW.W..W........
...W.....W........W.......W.W...W....W..W..............W.WW.W.W...W.W..........W.W......W...WWW....W
..WWWW.W..W...W...W..W...W...............WW..WWW..WW........W......WW.....W....W...W.WW..........W..
.....W..........W..W.W..W...W.WW.......W.....W.W..W...W..WWWWW..WW...WW.W.WW.....W..W..W..WW..W.W..W
.W.W..WW.W..W..W.W..W.W.W.........W.W........W....W..WW.W.........W....WWW...W.WWW.....W.WWW....W...
..W...W..W..W.W....WWW....W......W..W..W............WWWW.............WW.WWW...W...W.W..WWW.....W.W.W
W.WW.....WW..........WWW...W..WW.........WW.W.....W.W...W....W....WW.....W..W.....W.W.W......W...W.W
..W..........W.W......W....WW.W.............W...WWW...W....W....W...WWW.......W.....W.W.W...W......W
.....W.W.W.WW.WW....W.W..W..W..W....W........WWW.WW.W..WWW.......W..WW..............WW..W........WWW
W........W........W.W......WW.W...W.W....W...W........W..W....W.WW........WW...W....W.......W..WWW..
.W......W....W..W...............WW.....W.....WWW...W....W......W....WW.W....W..WW....WW..W..........
.....W......W..W.W..W.W......W.W...W....W.W.W...W..W..W....WW............W..W................WW.W.W.
.W..WW...W.....W.W..WWWWWW...W.WW.WW..W...W.....W...W.....WW.......W.WW..WW.W.WW...W.W....WW.W.WW.W.
..W...W..WW...W.....W.W....WWW..W....W..W..W..........WW...W.WW.W....WW.......W.W..W.WW.W...W....W.W
W..W....W...W..W...W...W....W...W....W.W.W..W..WWW..W....W.....W....W.W....W.W.W........W...W..W..WW
......W.....WWW.........WWWW...W...W.....W...WW...W.W..W.............WW...W.WW.....W....WWW...W..W..
..W.W.W..W.......WW..........W.W.W..........W.W..WW......W...W.W..W.........W.....W.W.WW..W..W.W..WW
WW..........W...W.W.W.W.W.W...W.....W...W..W..W.........WW.....W...W...WW...W.W....W.W...W..W.W.W...
.W...W....WWWW...WW.W....W.....WW....W.W.......W...W....W......W.....WW.W.W..W..W..WW.WW...WW..W..WW
W.WWW.........WW..W................W...W.......W.W...W.....WW..WW.W....W.......W..W.W.W..W..WW....W.
.W.W.....W...W..W..W..W..W.WW.W..WWW.W........W...W......WW.W.W.......WW.W.W..WW..W.........W....W..
.W..W.W..W...WW....W...W.....WWWW...WWW...W...W...W......W.W.WWWWW.WWW...W...........WW...WW.W..W..W
.WW.W......W.W.....W.W..W.W.WW....W.........WWW..WWW...W.W..W....W...W.WW.....W......W.WW.WW.W......
W....W.W.......WWW.WW...W.....W...W.W.W...W....W.......WWW.WW.....WW..........W..W.WW.W.....W..W..W.
....W.............WWWW...W..W......W..WW.W.WW.W....W....W.....W..W...WW.WW.....W...W...W.....WWWW...
W.....W............WW.WW..W.W...WW...W.....W.....W..WWW..W..W.WW...WWW...W...W.W.WW...W.WW.....W....
WW.........W.......W....W..............WW..W.W.W.WW.W..W.WWW........W...WW..WWW.....W.WW..W.W.W....W
...W....WW.W.....W......W....W..WW..WWW.....W.W.W...W.....WW.....W...W....W.W...WW...W...W..........
W..W.......W..W.WWW..W....W...W.W.W.....WW..........W..WW...WW...W......W.W...W...WW...W......WW....
....W.W....W.W.W.W...............WW..W.....W...WW..W......WWWW..W..W...WW..W.W..W............W..W...
...WW.W.W..WWW.W.WW.W..WW..W.WWW...W.WWW....W..........W......W..WWWWW.WWWW.W..W.......WW..W.....W.W
.WWW....W.W.W...W...W......WW..W....W.W....W....WW.W.WW.W..W...W..W..WW.W...W..W.......WW.W..W..WW..
......WWW...W...WW..W.....WWW.WW......WW.WWW..W.W...W........W......WW.....W...WW.W....W.W....W.W...
....W...W.............WW.W....WW....W...W.W....WW..W.....W.....W...........W.W.W......W..W...WWW....
...WW.....W..W.WW.W...W.WWW..W.W.....W.........W.WWWWW..WW.....W...W..W......WW..W..W.........W.WW.W
..W.W..W.............W.WW.....W...........W......WW.WW.W.W.W.WWW..WW.....WWWW.....W.WWW..........W..`

const maze = generateMaze(100, 100)

const path = generatePath(maze);
const distancePaths = pathFinder(maze);
// const shortWay = findShortestWay(distancePaths, [distancePaths.length - 1, distancePaths[0].length - 1])

const hold = { path, distancePaths }

export default hold;
