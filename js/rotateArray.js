function rotate(matrix, direction) {
  const newMatrix = [];
  
  matrix.forEach((row) => {
    if (direction === 'clockwise') {
      row.forEach((num, index) => newMatrix[index] = [num, ...newMatrix[index] || []]);
      return;
    }

    const hold = [...row].reverse();
    hold.forEach((num, index) => newMatrix[index] = [...newMatrix[index] || [], num])
  })

  return newMatrix;
}

var matrix = [[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]];

const teste_falha = [[ 3, 2, 1 ],  // [9, 6, 3]
                     [ 6, 5, 4 ],  // [8, 5, 2]
                     [ 9, 8, 7 ]]; // [7, 4, 1]

console.log(rotate(teste_falha, 'clockwise'));
