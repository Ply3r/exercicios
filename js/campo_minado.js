function get_start_positions(matrix) {
  const positions = []

  matrix.forEach((rows, r_index) => {
    const indexes = []
    rows.forEach((n, i) => +n === 0 ? indexes.push([r_index, i]) : '')
    positions.push(...indexes)
  });

  return positions
}

function get_neighboors_pos(pos, matrix) {
  const [r, c] = pos

  const neighboors_pos = [
    matrix[r + 1] ? matrix[r + 1][c] : null,
    matrix[r + 1] ? matrix[r + 1][c + 1] : null,
    matrix[r + 1] ? matrix[r + 1][c - 1] : null,
    matrix[r][c + 1] ? matrix[r][c + 1] : null,
    matrix[r][c - 1] ? matrix[r][c - 1] : null,
    matrix[r - 1] ? matrix[r - 1][c] : null,
    matrix[r - 1] ? matrix[r - 1][c + 1] : null,
    matrix[r - 1] ? matrix[r - 1][c - 1] : null,
  ].filter(Boolean)

  return neighboors_pos
}

function check_neighboors(pos, matrix) {
  const neighboors_pos = get_neighboors_pos(pos, matrix)
}

function solveMine(map, n){
  const rows = map.split('\n')
  const matrix = rows.map(w => w.split(' '))
  
  const start_positions = get_start_positions(matrix)
  start_positions.forEach((pos) => check_neighboors(pos, matrix))
}

const training_data = `? ? ? ? ? ?
? ? ? ? ? ?
? ? ? 0 ? ?
? ? ? ? ? ?
? ? ? ? ? ?
0 0 0 ? ? ?`

const result = `1 x 1 1 x 1
2 2 2 1 2 2
2 x 2 0 1 x
2 x 2 1 2 2
1 1 1 1 x 1
0 0 0 1 1 1`

const teste_result = solveMine(training_data, 5) 

console.log('is result correct? ', teste_result === result ? 'yes' : 'no')
console.log(teste_result)
