function makeMazeMatrix(str) {
  const maze = str.split('\n').map((row) => row.split(''));
  return maze;
}

function makeDistanceBoard(maze, start_pos) {
  const distance_board = maze.map((row, r_idx) => row.map((col, c_idx) => {
    if (col === 'W') return null;
    if (r_idx === start_pos[0] && c_idx === start_pos[1]) return 0;
    
    return Infinity;
  }))

  return distance_board;
}

const calc_g_cost = (next_move, start_pos) => (Math.abs(next_move[0] - start_pos[0]) * 5) + (Math.abs(next_move[1] - start_pos[1]) * 5 );

const calc_h_cost = (next_move, end_pos) => (Math.abs(next_move[0] - end_pos[0]) * 10) + (Math.abs(next_move[1] - end_pos[1]) * 10 );

function mapPossibleMoves(pos, start_pos, end_pos, distance_board, visited_paths, moves) {
  let new_moves = [
    [pos[0] - 1, pos[1]],
    [pos[0] + 1, pos[1]],
    [pos[0], pos[1] - 1],
    [pos[0], pos[1] + 1],
  ];
  
  new_moves = new_moves.filter((next_move) => {
    if ([undefined, null].includes(distance_board[next_move[0]])) return false;
    if ([undefined, null].includes(distance_board[next_move[0]][next_move[1]])) return false;
    return true;
  })

  new_moves.forEach((next_move) => {
    const g_cost = calc_g_cost(next_move, start_pos);
    const h_cost = calc_h_cost(next_move, end_pos);
    const distance = g_cost + h_cost;

    distance_board[next_move[0]][next_move[1]] = distance;
  });

  new_moves = [...moves, ...new_moves].filter((next_move) => !visited_paths.includes(next_move.toString()));
  return new_moves;
}

function sortBestMove(moves, distance_board) {
  moves.sort((a, b) => {
    const dist_a = distance_board[a[0]][a[1]];
    const dist_b = distance_board[b[0]][b[1]];

    if (dist_a === dist_b) return Math.abs(a[0] - a[1]) - Math.abs(b[0] - b[1]);
    return dist_a - dist_b;
  })
}

// function findShortestPath(start_pos, end_pos, distance_board, visited_paths) {
//   const start_value = start_pos.toString();
//   let possible_moves = [];
//   const short_path = [];
//   let pos = end_pos;

//   while (true) {
//     const pos_value = pos.toString();
//     if (pos_value === start_value) break

//     const moves = [
//       ...possible_moves,
//       [pos[0] - 1, pos[1]],
//       [pos[0] + 1, pos[1]],
//       [pos[0], pos[1] - 1],
//       [pos[0], pos[1] + 1],
//     ]
//       .filter((next_move) => {
//         if ([undefined, null].includes(distance_board[next_move[0]])) return false;
//         if ([undefined, null].includes(distance_board[next_move[0]][next_move[1]])) return false;
//         if (!visited_paths.includes(next_move.toString())) return false;
//         if (short_path.includes(next_move.toString())) return false;
//         return true;
//       })
//       .sort((a, b) => {
//         const dist_a = distance_board[a[0]][a[1]];
//         const dist_b = distance_board[b[0]][b[1]];

//         if (dist_a === dist_b) return Math.abs(b[0] - b[1]) - Math.abs(a[0] - a[1]);
//         return dist_b - dist_a;
//       });

//     possible_moves = [...moves];
//     short_path.push(pos_value);
//     pos = moves[0];
//   }

//   return [...new Set(short_path)];
// }

function findShortestPath(end_pos, visited_paths) {
  const shortest = [];
  let visited = [...visited_paths];
  let pos = [...end_pos];

  while (visited.length) {
    const moves = [
      [pos[0] - 1, pos[1]],
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] - 1],
      [pos[0], pos[1] + 1],
    ].filter((new_move) => visited_paths.includes(new_move.toString()));
      
    const [lastIndex] = moves
      .map((move) => visited_paths.findIndex((p) => p === move.toString()))
      .sort((a, b) => a - b);

    if (lastIndex === -1) break

    shortest.push(pos);
    pos = visited_paths[lastIndex].split(',').map((n) => +n);
    visited = visited.slice(0, lastIndex);
  };

  return shortest;
}


function findPath(start_pos, end_pos, distance_board) {
  const end_pos_value = end_pos.toString();
  const visited_paths = [];
  let possible_moves = [];
  let found_path = false;
  
  function recursion(pos) {
    if (!pos) return;
    const pos_value = pos.toString();

    if (pos_value === end_pos_value) {
      throw new Error(); // break the stack
    }

    visited_paths.push(pos_value);
    possible_moves = mapPossibleMoves(pos, start_pos, end_pos, distance_board, visited_paths, possible_moves);
    sortBestMove(possible_moves, distance_board);

    recursion(possible_moves[0]);
  }

  try { recursion(start_pos) } catch (err) { found_path = true }

  if (!found_path) return false;
  return findShortestPath(end_pos, visited_paths);
}

function pathFinder(maze) {
  const start_pos = [0, 0];
  const matrixMaze = makeMazeMatrix(maze);
  const end_pos = [matrixMaze.length - 1, matrixMaze[0].length - 1];
  const distance_board = makeDistanceBoard(matrixMaze, start_pos);

  const path = findPath(start_pos, end_pos, distance_board);
  return path;
}

const teste = `..W..W..W.
......W...
.W.WWWW...
....W..W.W
...W......
W..WW.W...
......W...
.....WW..W
.W.WWWW...
..W.W.....`;
console.log(pathFinder(teste));
