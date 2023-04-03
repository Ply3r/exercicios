function makeDistanceBoard(board, last_pos) {
  const distance_board = board.map((row, r_idx) => row.map((col, c_idx) => {
    const row_dist = Math.abs(r_idx - last_pos[0]) * 10;
    const col_dist = Math.abs(c_idx - last_pos[1]) * 10;

    return row_dist + col_dist;
  }))

  return distance_board;
}

function makeChessBoard() {
  const positions = { 1: 'a', 2: "b", 3: 'c', 4: "d", 5: "e", 6: 'f', 7: "g", 8: 'h' }
  const chessboard = []

  for (let row = 0; row < 8; row++){
    const row_arr = [];

    for (let columns = 0; columns < 8; columns++){
      row_arr.push(Object.values(positions)[columns] + Object.keys(positions)[row])
    }

    chessboard.push(row_arr);
  }

  return chessboard;
}

const board = makeChessBoard();

function parseAlgebraicPos(algebraic_pos) {
  const pos = [];

  board.forEach((row, r_index) => {
    row.forEach((col, c_index) => {
      if (col === algebraic_pos) pos.push(...[r_index, c_index]);
    });
  });

  return pos;
}

function makeAlgebraicPos(pos) {
  return board[pos[0]][pos[1]]
}

function mapThePossibleMoves(pos, visited_path) {
  const options = {
    two_front: pos[0] + 2,
    two_back: pos[0] - 2,
    two_right: pos[1] + 2,
    two_left: pos[1] - 2,
    one_front: pos[0] + 1,
    one_back: pos[0] - 1,
    one_right: pos[1] + 1,
    one_left: pos[1] - 1,
  }

  const possible_ways = [
    board[options.two_front] ? [options.two_front, options.one_right] : null,
    board[options.two_front] ? [options.two_front, options.one_left] : null,
    board[options.two_back] ? [options.two_back, options.one_right] : null,
    board[options.two_back] ? [options.two_back, options.one_left] : null,
    board[options.one_front] ? [options.one_front, options.two_right] : null,
    board[options.one_back] ? [options.one_back, options.two_right] : null,
    board[options.one_front] ? [options.one_front, options.two_left] : null,
    board[options.one_back] ? [options.one_back, options.two_left] : null,
  ].filter(Boolean);

  return possible_ways.filter((pos) => makeAlgebraicPos(pos) != undefined && !visited_path.includes(makeAlgebraicPos(pos)));
}

function foundLastMove(moves, last_pos) {
  return moves.some((pos) => pos[0] === last_pos[0] && pos[1] === last_pos[1]);
}

function findBestMove(distance_board, move, visited_path) {
  const [best_move] = mapThePossibleMoves(move, visited_path)
    .map((pos) => {
      const dis = distance_board[pos[0]][pos[1]] - 30;
      if (dis === -30) return -10;

      return Math.abs(dis);
    })
    .sort((a, b) => a - b)

  return best_move;
}

function sortBestMoves(moves, distance_board, last_pos, visited_path) {
  const found = foundLastMove(moves, last_pos);
  const max_moves = 3;
  if (found) return [last_pos];

  moves.sort((a, b) => {
    const best_a = findBestMove(distance_board, a, visited_path);
    const best_b = findBestMove(distance_board, b, visited_path);

    return best_a - best_b;
  });

  return moves.length > max_moves ? moves.slice(0, max_moves) : moves;
}

function findShortestPath(distante_board, first_pos, last_pos) {
  const algebraic_last_pos = makeAlgebraicPos(last_pos);

  const visited_path = [];
  const combinations = [];
  let best_path_len = null;

  function recursion(pos) {
    const algebraic_pos = makeAlgebraicPos(pos);

    if (best_path_len && visited_path.length >= best_path_len) return;
    if (algebraic_pos === algebraic_last_pos) {
      const new_best = [...visited_path];
      combinations.push(new_best);
      best_path_len = new_best.length;
    }

    const moves = sortBestMoves(
      mapThePossibleMoves(pos, visited_path),
      distante_board,
      last_pos,
      visited_path
    );

    visited_path.push(algebraic_pos);
    moves.forEach((move) => recursion(move));
    visited_path.pop();
  }

  recursion(first_pos);

  const [shortest_path] = combinations.sort((a, b) => a.length - b.length);
  console.log(shortest_path);
  return shortest_path;
}

function knight(start, finish) {
  // Ha-ha, it's not "knight", it's a horse :D
  const first_pos = parseAlgebraicPos(start);
  const last_pos = parseAlgebraicPos(finish);

  const distance_board = makeDistanceBoard(board, last_pos);
  const shortest_path = findShortestPath(distance_board, first_pos, last_pos);
  return shortest_path.length;
}

knight('a1', 'f8')
