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
  const totalLen = globalLen + localLen;

  function appendShort([g, l]) {
    const distance = g + l;
    shortest[g][l] = distance;

    visited.push([g, l].toString())

    if (g === globalLen && l === localLen) throw new Error()

    const ways = [
      [g + 1, l].toString(),
      [g - 1, l].toString(),
      [g, l + 1].toString(),
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
        const sumA = a[0] + a[1];
        const distanceToEndA = (totalLen - sumA)

        const sumB = b[0] + b[1];
        const distanceToEndB = (totalLen - sumB)

        return (sumA + distanceToEndA) - (sumB + distanceToEndB)
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

const maze = `...W.W...........W..W.W...W.W.......W.W.....WW...WWWW.W.......W......WWW....W.....W.W.W.....W..W....
W..W...W.W....W......W.............W.....WW.W.W.....W....W...W....WW...W.WW.....W.W.WW..WWWW......W.
....WWW..W...........W...W..WWWWW.....WW.W.W.W.W..W...WW.....W....W....W.........WW.W.WW...W.W..WWWW
W........WW........WWW...............W....W....W.W.W..WW..WW...W.W.....W.WWW......W......W.WWWW.W.WW
..WW............W...W........W.W.W.WWW......W......W........W.WWW..W...W...W.....WWW.......WW...W...
W...W................WW...WWW......W.WW........W.W......W.WW.WWW..W...W..W.....W..WWW..WW.....WWW..W
....W......W.W.....WW.WW.W..WWW........W.W...W...WWW..W..W..W.W...W.W....W.....W........W..W..W...W.
.W...............WWW..W.....W.WW.........W..WWW.......W....W.....W......W.W.W....W.W.W..........WWWW
...........W.......W.....W.W....W......W..W..W....W.....W..W......W.WW................W....W....W...
W..W..W.W..W....WW.WW....W.........W.................W.WW...WW...W.WWW..W.......W.W...W...WW.WW.W..W
...........WW....W.W...W....W.WW.W.W.....W.....WW.WW...W..WW..W.......W..WW.W........W.........WW.W.
....WW........WW...W..W....W..W......W.W....W......W....W......W.....W....W.W.W.....W..W.W.W.W.WW...
........W.W.............WW...WW.W...WW...WW..........W.....W.W..W.......WWW.W...............W...W..W
..W.....W........W.W.W..WW..W.......WW....W..WWWWW...WW......W.........W...W.WW.W.W.W.WW......WWWW..
.W..W..WW..W.WW..WWW....W.W..W..W......W.W.W.....W...W...W.W....WWW..WW.....W....WW.W.......W.W.WWWW
...W..W.W..W.............WW.W..W....W.W..WWW.WW...W..W..WWW.....W....W...........WWW.W.......WW..WWW
.W......W..............WW...WW....W...W...W..W..........W.WW.W........W....W..WW............W.W.WWWW
.W...........WW.WW...W........W..........W....W.W.W.W.W...............WW.....W..W...W...W.WW......W.
....W......W......WW.WWW...W.WW.W.....W..W........W....W.WWWW.W.WW...W.W.......W........WW.WWW..WWW.
..W...W.W......WWWW.W...WW...W..WW.WW.W....W...WW.W.W.W.W.W..WW..WW.W.W.W..W....W.W.......WWWW...W.W
.WW.WW.W.W.W..WW.......WW.WW........W.........W.W.....W............W.....WW.W....WW........W...W..W.
W...........W........WW..W.WW..W..W.WW...W.W.W...W.....W.W.....W..W.W.....WW.....W.W.....W.W........
..W...W....WW.W..WW......WW.W.......W.W....W...W..W.WWW...W.....W.........W.W...W...W.....WW...W...W
..W.W..W..WW....W.W.W.....W....W..W.W.WWW..WWW.W....W.W.W..WW....WW....WW.WW.....W...WWW...WW.......
...........W...WW..W......WW...W.....W.W..W..W.........WW...W..WW....W......W.W..W...WWW.....WW....W
..WW...W.W..W........W..........W..W.W.WW...W..WW...W.WWW.W.WWW.WW.......W..WW.....W....W.W.........
..WWW.W...W...W.W...WW....WW.....W.W.W...............WW..W..W..WWWW.W.W...............W......W..WW..
...WWWW.WWW.WWW.W...............WW..W.............W......W..WWW..W...W.....WWWW.....W..W.W......WW..
..WW.W..W...W..WW...W..W....W...W...W.W.W...W..........WW.WWWW...W.W........WWW......WW..WW...WWWW..
.W.......W.W..W..WW..W.WWW.......W....W.........WW........W.....W..W..W......WWW.W..W...W..........W
.W.......W.W.W.......W..WW.W.W.....W...W.......WW.............W.....W.W.W.....WW.......W..W...WW....
.WW.W.....W...W.....W........W....W.....W...W..WW..W..WWWW.W...WW..W..W...W.......WW...W.W..WWW...W.
...W..WW......W.......WW.W.W...WW.WW.W....W..WWW.....W.W...W..W.WW....W.WW.W....WWWW...W..W...WWW.W.
.W..WWW.W.......W....W..W.WW.W...W...W.W..WW.W..W...W.W.W...WWW...............WWW.WWW.....WW..W..WW.
...................W.W.W......W.WW.W........W....W.....W.WW....W........WW..WW.W....W....W..W.WW..W.
..W.W..W.W....WW............W........WW....W......W.W...WW........W..WW..WWW..W....WWW.W...........W
W...W.WW......WW.....W..W....W..W..W..W....WWW..W...W...W..WW..W.........WW..W..W.WW............W...
...W.WW.....W..............W.....W....WW.W...W.W.........W..W......WWW.WW......WW.W..W..W...W.......
..W...W..W......WW.W....WW..W......W........W...W.........WW.....W..WWWW.W.........W...W..W.........
..W...........W.........W.WW.....W.W....W.W......W.....WWWW...W..WW.........W...W..W.WW........WW...
.....W....W.....W............W..W..W..WW.WW.W.....W....W....WW.W.......WW....WW.W.WW...WW......W.W..
.....WW.W.W........W...........WW..WW....W...WW...........W.W........WWW.WWW........W...WW.W.W...WW.
......WWW....WWW.W..W.......W...W....W...W.......W...W....W.WW..W.W.W................W.W............
.W.W..W..W.W.....W...W..W..W.W...W.....W...........W.W...W......W........W.W.W....WWWW...W..W.....W.
...W..W..WW.WWW..W..W..W.WW.WW..WW..W.WWWW...W..W.WWW.....WWW.W....WW..W.W..WW..WW.....WWW.....WW...
.W.W........W..W....W.WW....W..WW..W..W....W..WWW..........WWWW....WW..WW.WW..W.W..W..WW.WW.W......W
....WWWW...W.W.WW.............WW.WWW.WW.WW.....W.W.W............W.W....W....W.WW...W.......W.W.....W
.W.W...........W...W.W...W..W....W.......WWW.W......WW...W.....WW.....WWW...W....WW.WW.......W......
.....WW.WW..W..........W...WWW..............WW..W......WWW...W.W.....W.W..........W.W............W..
......W.W....WWWWW.WW.........WW....W.W......W...W....W.....W...W.W.......WWWWW........W.......WW...
W.W..........W.....W.WW.W........W...W....W.WWWW...W...W.W.W..W..W..WW............W.W..WW....WW....W
.....WW...W.WW.......W........W...W.W..W......W...WW....W...W..WW...W.WWW..WWW.......W.W..........WW
WWW.......W.W..W....W.WWWW..WWW..W....W.W.W........W.WW.W..W.W.....W....W..W.W...W.....WWW.WWW....W.
WW..WW......W..W.......W...W..WW..W..WWWW......W...W..WW..........WW..W.....WW.....WWW........W.....
.W..W.WW....W...W......W....W....W.....W..W..............WW..W...W...W..W.W....WW...W......W..W.....
....WW.W........W..W.WW..W.W...W.WWW..W..WW..W.W........W.......W.W......W.....WW...WW..W.W....W....
.....W....W.W.W...W...W..WW...WW........W.WW...WW.....W..W....W..W.....W...W.W..........W..W.....W..
.WW.......W..W..W......WW...W.W..W..W.WW...WW........WW..WWWW.W.WW.W...W...W....W...W......W........
WW.W..W.....W..W........W......W.......W.W...WW...........W..W.......W.W....WW......W....WW....W....
W.WWWW...W...WW.WWW......WWW...WW...W.W........WW...W....W..W............W...WWW....W..W............
...WWWW.W..W..W...WW.W......W.....W..WW.W..W.W...W.WWW..W.WW.............WW...W..........WW..W....W.
W.......W......WW....WW.W.W..WW.W...W.W...W..W...W.WW.W...W........W....WW........W...W.W...WWWW...W
..W...W...WW.WW.....W.W....W..W.W.....W...W....W..WW.WW.WWW.W..W....WW......WW...W...W.W...W....W...
.W........W.W.W.WW..WW..WW..WWW.........W.W.W..W.W.....W.....W.W......W.W...W....W...WW........WW..W
W.....W..WW..W...WW.WW....W.WWW...WW.W...W...WW.WW....WW.W......WW.W.WWW.WWW.....W.WW...W....WW..W..
............W..W....WWW...........W.................W........WW..W.WWW..W....WW.....W.W.WW.W..W.....
.....WW....W..W.....W....W.......W.W..W.....W..W...W.......W..W....W.W....W......W.....WW.........W.
W..W.W..........W..W..WW......WW.WW.WWW..WWW............WW.W....W.........W.......WWW..W.....W......
WW...W......W.W.W..WW.WW...........W.W.W.....W...W...W.W..W...W.WWWW..W................W....W..W.WWW
W......W..WW.......W...W..W.W.W................WW......WW..WW....W.W..WW..WW.WW..W..W.W.W.W.......W.
W.....W.........W.......W....WW...W.WW.W....W........W..W...WW...W..WW.WW.....W.W.W..WWW.WW.W.......
..W........W......W..WWW..W......W...W........W..W.........W.W.....WWWW....W...W...W...W......W.W...
WW.....W...WW....WWW.W.....WW.W...W..W.WW......W...WW...W..W..WW.....W.W..W.WW.W..W....W...W......W.
W..W.W.....WWW..WW.............W.W..WW....W...WWW.W.W..WW.....WW..WW.W......WW.W..WWWW...WWW..W.....
.W..W.....W....W.W.WW..WWW....W....W..W...W.W......W........WW.WW..WW.......W.....W...W..W.WW.WWW.WW
.W.W...W......WW..W.W....W...W.W.....WW.W.W.WW.W.W..WWW...WW......W......W.W.W.....WW.W.....W.......
......W..W....WW.WW.W........WWW....WW...W.W.........W..WW...W..W.W.....W....WW..WWW...W..WW.WW.....
..WW...W.W..W.W...W........W.W......W.W.W..W......W....W.WWW..W..W.W.......WW...WWW......W....WW....
........W..........W.......WW....W.W..WW...W.W......W.W........W.....W.W.W..W.WWW.WW..........W.....
....W........W...W..W..WW..W.W......WW...W......W.WWW..WW.....WW.W...W.W.....WW.........W...W.W.....
.WWWW.WW.WWW..........W..W..W.WWW.......W..........WWWWW.W.....W.W.W..W..W.WW.....W...WW....WWW.....
........W.W..WW.WW.....................WW.W..W..WW..W...........W.W.........WW...W..W.W..W.WWW.W.WWW
.W...W...W.W.W...WW...W.WW.W.W.W..W...WW....W..................WW..W...W........W.W......W.W...W....
.......W.WWW.WW.WWWW...W.W..W..W...W....WW...WW.WW.W.W......W..W....W..W..WWW...WW.....W..W.W....W..
..WWW...W...WW..W..WW.W........WW......W.........WWW.W.W...WW....W....WW.W...WW..WW...WW........W.W.
.........W....W.W.W..........W..W...........W.....W..W.............W...W.....W.WWW...W.W....WWW....W
....W.W...W.WW.W.WWW.WW..W.WW.......WW..W......WWW...W.W.W......W.W....W.W.W..........WW.W.......W.W
.......W.W.....W...W........W..W.....W....WW.W.W...W...W.W...WW....W..W..W..WW.WW..WW.W..WWW.....W..
.W.W..........WW..W.......WW....W.W.W...W...W.......WW.......WW.....W.W.W.WW...WW.W...W....W.W...W.W
.....W....W.......W..WW..W........W.W......W....WW......W.W........W....W.....W...............WW....
........W.WW.......W..W.....WW...W..W...W.WWW.....W....W...W...........W....WW..W...W.....WWW......W
.W..W....WW.W.W......WW.W.......W..WW.W.....W.WW....WW.W..........W..W...WWW..W....WW..W.......W....
W...W.W.WW.WW.W.......W.....W.W.W.W.W.WWW...W...W......WW.W....W...W...W..................W.......W.
W..W..........W.W......W.WW.................W.WWWW.W.W..W.........WW...W......W.W..W..W.W.WW.....WW.
..W......W..W..W.W...W....WW.W..W....W..........W.....WW..WW..WW.......W.....WW.W..WW...W.WWW..W....
W.WW....W....W....W.W.W.............WW.W.......W....WW.....WW.W...W..W.............W..W..W..WW.W.W.W
..W..W.W..W.W.W...W....W..W..........W....W.W..W.......WW.W.W....W..W...W...W..WW.....WW............
...W..W..W..W....WW..W.....W.........W..W..W.W....W...W.W......W....W...............W.W..W.W...W....
W.....W...............WW.WW.W.W.W.WWW.....W..W.........W..........W..WWWW.W......W..W.WW.W.W..WWW.W.
.W.WW.W..W..W...W..WWW.W.....W.W..WWWWW..W...WW......W...W.W..W.....W......WWW.W..W.W....W..........`

const path = generatePath(maze);
const distancePaths = pathFinder(maze);

const hold = { path, distancePaths }

export default hold;
