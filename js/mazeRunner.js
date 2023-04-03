function mapNextPos(pos, direction) {
  switch (direction) {
      case "N":
        pos = [pos[0] - 1, pos[1]];
        break
      case "S":
        pos = [pos[0] + 1, pos[1]];
        break
      case "W":
        pos = [pos[0], pos[1] - 1];
        break
      case "E":
        pos = [pos[0], pos[1] + 1];
        break
      default:
        break
  }
  
  return pos;
}

function mapStartPos(maze) {
  let startPos = null;
  
  for (let row = 0; row < maze.length; row += 1) {
    for (let col = 0; col < maze[row].length; col += 1) {
      if (maze[row][col] === 2) {
        startPos = [row, col];
        break
      }
    }
    if (startPos) break;
  }
  
  return startPos;
}

function mazeRunner(maze, directions) {
  const visited_paths = [];
  let pos = mapStartPos(maze);
  
  for (direction of directions) {
    let maze_value = null;
    
    try {
      maze_value = maze[pos[0]][pos[1]]
    } catch (err) {}
    
    if ([null, 1, 3].includes(maze_value)) {
      visited_paths.push(maze_value);
      break
    }
    
    pos = mapNextPos(pos, direction);
    
    if (!maze[pos[0]]) {
      visited_paths.push(null);
      break
    }
    
    visited_paths.push(maze[pos[0]][pos[1]]);
  }
  
  console.log(visited_paths);
  if (![null, 1, 3].includes(visited_paths[visited_paths.length - 1])) return "Lost";
  if (visited_paths[visited_paths.length - 1] !== 3) return "Dead";
  return "Finish";
}


const maze = [
  [
    1, 1, 1, 1, 1,
    1, 1, 1, 0, 1
  ],
  [
    1, 3, 1, 0, 1,
    0, 0, 0, 0, 1
  ],
  [
    1, 0, 1, 0, 0,
    0, 1, 1, 0, 1
  ],
  [
    1, 0, 1, 1, 1,
    1, 1, 0, 0, 1
  ],
  [
    1, 0, 1, 0, 0,
    0, 0, 0, 0, 1
  ],
  [
    1, 0, 1, 0, 1,
    0, 1, 0, 0, 1
  ],
  [
    1, 0, 1, 0, 1,
    0, 0, 0, 0, 0
  ],
  [
    1, 0, 1, 0, 1,
    0, 1, 1, 0, 1
  ],
  [
    1, 0, 0, 0, 1,
    0, 0, 0, 0, 1
  ],
  [
    1, 1, 1, 0, 1,
    1, 1, 1, 2, 1
  ]
]

const directions = [
  'N', 'N', 'N', 'W',
  'W', 'W', 'N', 'N',
  'W', 'W', 'S', 'S',
  'S', 'S', 'S', 'S'
]


console.log(mazeRunner(maze, directions));
