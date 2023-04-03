const sumAll = (arr) => arr.length ? arr.map((n) => n ** 2).reduce((a, b) => a + b) : 0;

function decompose(n) {
  const nSquare = n ** 2;
  let result = [];
  let number = n - 1;
   
  while (true) {
    for (let i = number; i >= 1; i -= 1) {
      const sum = sumAll(result);

      if ((i ** 2) + sum <= nSquare) {
        result.push(i);
      }
    }

    const sum = sumAll(result);
    if (sum === nSquare) break;

    number -= 1;
    result = [];
    if (number <= 0) {
      break
    };
  }

  result = result.length ? result.sort((a, b) => a - b) : null;
  return result;
}

console.log(decompose(12));
