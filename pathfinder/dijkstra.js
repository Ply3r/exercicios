function pathFinder(maze){
  const array = maze.split('\n');

  const path = array.map((str) => str.split(''));
  const shortest = generateFirstShortDistance(array);
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
    return shortest[globalLen][localLen] !== Infinity;
  }

  return shortest[globalLen][localLen] !== Infinity;
}

console.log(pathFinder(`..W.W.WWW..WWW.....W....W.W.....W....WW..W.W..WW..........W...W...W..............W....W...W.W..W....
..WWW.WW..W............WW.WW....W......WW.....W....W.W.W......W..W.....W.W...WW.W...W.......W.W.....
......W.......WW..W.W...WWW...W.W...WW.W.W.W.W..WWW.W..W.W.....W....W.WWW...W....W.W..WW.W.....W....
..W..W..W.....WWWW...W..W...WWW.W.WW.......W...W.....W....WW..........WW...W..WW.W....W...W...W.W...
...W.............WWW..W....W.....W..W....WW..WW.WW....W....W.W.W....WW...W..........W......W.W.W..W.
.......W..............W....W.......WW.WWWW.WWW....WWW...W..W...WW..........W.....WW.W..W.W..W.....W.
..W.....W..W..W.....W....W....WW........WWW.WW..W.......W....W.WW.......W...W..W..........WW...WW.W.
W...WW..............W...WW........W...W...W.W.WW...W.W....W..W.W.WWW.W..W.WW..W.W.............W.....
WWW................W.......W.....W...WW.....WW.WW.WW..W.....WW.....WWW........W.........W.W...WW....
.W.........................W.W...WW...W...W.........WW........W..W.........W...W..WW...WW.W..W.W.W..
....W.....WWW......W..WW.W...W.......W.....W.......W......W..WW..W.WWWWWWW..W.....W.W.W.W..W......W.
.W...WW...W.....W....W..WW..........W.W.W.....WW....W...........W......WW.W.......W..WWW......W.....
.WWW.W.WW........W...WW...W...W.....W.W..WW.........W.......W......W....W.W....WW...W..W.W.W...WW.W.
..W..WWWW..WW.....W...WW.W.....WW.W.....WW...W.W..W...W......W....W.WW.W.WWW.W..WW....W.W........W..
.W.........W......W...W...W....W.....W..WWW......W...WW...W..W.W..W....W......W....W..WW..W..W..WW..
W......WW........W..W....WWW..W..W....WWW..WW.WW..WW..WW.....W........W.W..W......WW...W..........W.
.....W...W..W........W....W....W.W.W..W..W.WW..........W.W.W.W......WWWW.......W..W..W......W.WWW...
...WW.....WW....WW.W......W.W..W....W.WW......W..W.......WW..W....W....WWW..W.WW......W.............
WW......W...W.W...WW..W....WW....W..W..WW.WW........W....W.W.W...W..........W....W.WW..WW...W.......
WW..W.........W.....WWWW..W..WW..W........W.W.WW......WW.W..WW.W......W.....W..W.....WW..W..WW.W...W
.WWW......W.W...W..W..W...W...WW.WW...W..W...WW..W....W.W.....W...W.W.....W.WW..WW..WWW.....WW.W...W
WW...W........W............WW.W.W.W...........W.....W...WW.....W...WWW.W.W..W..W..W..WW..W..W.W...W.
W....W.......W.W..W....W.W..W...W...W.W..W.........WW.......W......W....W......WW....W.......W.....W
.W......W.W......W......WW...W...W......W....WWWW...W.W..W.......WW......W.W..W..WW...WW..W..W....WW
..W.......W.WW..W..W....W...........W..W................W.........W.......W.W......W...WW..W.W....W.
WW...W...W.....W....WW...WWWWW.W.W...W.WW...W..W......W.WWW......W..W.......W..W..W..W...WW..W...WW.
...W...W..........WW...WW....W......WW.W..........W....W.WW......W.....W...W..W..W........WW..W.W..W
..WWW...WW..WW........W.........W........W...WW..W..W......W..W..W.....W.W....W.....WWWWW....W......
..W..W...W....WWW..WW...W.....W....W.....WW....W...W..W..W..W....WW..WW..W..WWW.WWW.WW...WW..W...W.W
..W.W.WW...WW...W.W.....W.....WW........W...W....W.....W.WW..WWW...WW....W...WW............W...W....
.WW.WW....W...W.WW...WWW.W...W..W............W.W.W.W...W.WW..WW......W....W.W.......W........W.W...W
.WW.WW.W.W...W....W.W...WW.W..W.......W....W..W.............W..W...W.W....W.W..W......WWWW..W.......
.W.......W....W....W.W....WW..WWW.W..W.......W..W..W.WW.WW.WWW.W.........WWW.....W..W...W.....W.W..W
W...W.WW..WW.....W.............W......W....W..W...W...W....W..W.....W......WW.W......WW....W.WWWW..W
....W..........W....W....WWWWWW.W....W..WW.W.W..............W....WW...WW....WW.....W.W.....W...W....
W.W...W...W..WW....W....WW.....WWW...W...............WW..........W........W.WW.....W.W............WW
W..W.......WW..W..W..WW.W.W....WW.WW...WW...WWW.W.........W.....W........WWWWWW...WW..W.............
W....W..W..W..WW....W.........W.....WW....WW......W....WW.W.W......W...WWWW......W.W.........W......
........W.....W...W..W..W.W....W.......WW...W...WW.W.WWWW...W.........W..W........W...W....W........
WW..........WW..W..W.WW.........W...W.........W.W..WW....WW.W...W....W........W...WW...W...W......WW
W........W.W.......W.......WWW...W..W.W.W...WW..WW...WW.....WW.W.W.WWW.........W.W...........WW..W.W
...W.........W..W...W..W...WW...W..W......W...WW..W....W....WW..W..W...........W.W..WW..............
.....WW.......W.......WW..WW.....W...........W.....WWW...WWWWWW....W.......WWW.....W...WW...W..W....
...WW....W.....W..........W....W.....W...W.....W.W..WW.WWW......W....WW....W.WW.....WW....W.W.......
W.W...W.............W....W..W.........W....W....WW........WW...W.WW.W.W..W.W..W......W........W.W...
....WW...WWWW......W.....WWW.....WWW.W.W...WWW......W.W..W..WW......W.W....W..W....W..W....W....WW..
W....W.W..W....WWWW..W......W.W.W.W.....W..WW.............W........W..W...W........W..W.....W...W.W.
W...W......W...W.W....W.....W........WWW.WW..........W.....W.......W....W..W........W.........W..WWW
.......W..........W...W..W..........WW..W.W.WWWWWWW....WWW....W..WW..W.W.W.W.W...W......W.W.W....W..
.WW.WWW.WW.......W..W.W...W...W...WW.W...W.W.W........W.W.....WW.........W...WW....W..W.WW.WW..W.W..
....W...W..W....W.......W..WW.WW...WW..W.W..W........W......W.......W.W..W..W....WW..W..WW...WWWW.W.
..W..W.WWW.WW..W..WWW..WW.W.WWWW.W..WW.W...WW.......W..W..W.W.W.W.WW.W.W.......W.W....W.W.W.W.......
....W.W...W..W.......W..W.W..W.....WWW.W..WW.......W.......W....WWWWW.W.........W.WW....W........W..
.W....W...W.............W....WWWW.WW...WWW.........WWW........W....W.WW...W.W.W............W.W.W....
..W..WW.W.W.W............W...WWW.W..WWW.W..W..W..WWW.W....W.......................W..W.......W.....W
.W........W.WW..W.......W......W..W.WWW.W......W..W.W.WW....W...W.W.W...W......W.....W..WWW...W...W.
..W.W.W.W..WW.WW..W..WW.W..W.W.........W.WW..W..W.WW.....WWWW........W..............WW.WWW..W.......
.W.W.W.WWW....WW.WWW.W....WWWWW...W.....W...W.WWWW..WW....W.W.....W..W......W....W.WW..W..W.W...W.W.
.........W.WW..W...W.W.W..WW....WWW.W..W.....WW..WWW.W...W.W.WW..WW.WW..W.W.W..W............W....WW.
..W.W.W.W................WW.....WW...WWW.......W.....WWWW....W.......W.W...W.W.W.W......W...W..W..W.
.W........W..W...W...WWWW.W........W.....W.W...W..WWW.W.WW.W.......W.................W...WWWW....W.W
.W..W..WW..W...WW..WWW....WW...WW..W.......WW...WW...........W.W.W.W.W.....W...WW........W.W.WW.WW.W
W....WW...........W...WW.......WW.......W.....WW.W..........WW..WWW.W..W..W..W...W.W.........W.....W
...W....W..W........W......W..W..WW.....W..WW....W..W....WW.....W...W.W.W.W..WW...W....W..W.......W.
...W.....WWW.W.W..W.....WW....W...W.......W....WWW..WWW........W....WW.W.W.W...W..WW...WW.WW...W....
..W...W.W.W.W..W.W...W............W..WWWW.........W..W...W.....W...W.W.W....W....W..W..W....WWW....W
........W.WWW...W.W..WW.W...........W..........W.W..WW...W.W....W....W.....WW..WW.WW..W.W..........W
..W..WWW...W......WW.W...W...W..W...WW.......W.WW..W......W...W.WW......W.W.W.W....W...W.WW..W.W....
.W....WW.....W.WW.W........W.........W.......W.WWW...W.W...W.W..WW..W......WWWWW......W.WWW...W.....
W.W.......W...........W.....W..W....W.W.W.WWW..WW....WWWW.W.......WWWW..W.W...W.W...................
.WWW...W.W...W....WW..WW..W..WW...W.WW........W.W..W..........W.W............W...W..W........W..W...
...WW..W.WW...................W..WW......W.........W.......WW.W...W....W.W...WW.WW....WW.W........WW
.WW.WW........WWW.........W.....W....WW.W..........W...W....W.W...W.W.W...WW......W.....WW....WWW..W
....WW.W....WW.W....WW..W..W.....W.....W..W...W..W........W.....W...W.....W..W...W..W.......WW..WWW.
.........WW..WWWW......W............WW...W.W....WW...WW......WWW.....W........W....WWW.....W.W......
..W.W...W..W...W.WW.....WW.WW...W...W..W...W.W.W.W.....W...WWW..W..W.....W...W.WW.WWW.W..W.W.WW..W..
.WW........WW....WW...W.WW....W....W.....WW.....W.WW.......WW.W..WW....W......WWW..W.WW.WW..WW.....W
.W...W.......W..............WW.WW......W....W.W....W..............W....W..........W....W.....W....W.
WWW...W.......W......W...WW.WW...W.W...WW...WW.W.W.W......WW..W.W.W.WW......WW.........W.........WWW
..W....W.........W...W..W..W........W..W..W...W..WWW....WW..W.....W....W...W..WW..........WWWWWWW..W
...WW.....WW...W..W.....W..W..WW.....W..W..........WW...W........WW....W......................W...WW
.W...W....WW..W.WW....W.W...W.W.W.W......W.......W...WW.W.W.W.....WW...WW....W.......W.W.W.....WW..W
.....W.....W.......W...WW.W...W.....WW.....W.....WW......WWW....W......W...W.....W.......WW......W.W
....W.W....WW..............WW...WW.WWW............W.WWW.W...WW......W....WW..W....W....W.WW..W.WW...
W..............W........W....W.W....W..W...WW.....W...W.W....WW.WW.....W....W..W......W.WW.W.WW.....
...W.W.W..................W........WWWWW.WW..W..WW.W....W......W.......W.W..W.W..W.......W.W.......W
WW...W.......W.........W....W.......W..W...........WW..W..WW.W.W....W.W...WWWW.W..........W..WWWWW.W
..WWW....W..W...W.W......W....W.W.WW.WW.W.WW...W.W..WW..WW..WWW....W.W..W.W.......WW.W...WW...W.....
.WW.....WW....W..W......W..........WWWW..W..W............WW.W.WW.W.WW.W..W.W.W....W.........W.WW..WW
W...W..WW.....W......WW...W..W..WWW........WW......WW..WWW.......W...WW.W...WWW.WW.WW.W.W.W.W.WW.W..
W....W.....W.....WWWW...WW.....W.W...W...W..W.WW.......W.WW..W.......W..WW.WW...W...W....WW.W....W..
......WWW..W.WWW........WW.....WW.......W..WW.W..W...W.W.WWW.W..W...W..W.WW..W....WWWWW.W...W...WW.W
WW.WWW.WW...W..W......WWWWWWW....WW...W...W...W....W...W....W...WW...WW.....WW.WW.WW.WWW....W....WW.
....WW.WW..W....W.W...W.W..........W.........WW.WW.........W.W..WWWWW....W.W.W...WWWW..WW...........
.WW.....W..W.W....W.W...W..W......WW.W..W..W....W..W....W.WW......W..WW....W...W.W......WWW......WW.
WW..WW.W.WW..W.W.WW..WW..W......W.W..W.W...W....W..W....W........W.W..W......WW....W.W..W..W..W....W
W......WW.......W.WW..W.W.WWW.W...WW..W....W......W...WW..WW...WW.......WWW.W...W.WWW............W..
W..W...W..WW.WW.........W.WWW.W......W..W.W.......W..WW.....W....W.WW.WW.W.........WW......W.....WWW
W.....WW..W..W..W..W.....W......W.....W.....W.WW...WW.WW.W..W...WWW..W..W...........W......W.....W..
.....W.....WW.W...W..W..W....W.....W....W.W..WW.W..W................W...W............W.W..W...W.....`))

function generateFirstShortDistance(array) {
  const shortDistances = array.map((value, index) => {
    const splittedValue = value.split('');
    
    const newValue = splittedValue.map((_currValue, currIndex) => {
      if (index === 0 && currIndex === 0) {
        return 0
      }
      return Infinity
    });
      
    return newValue;
  })
  
  return shortDistances
}
