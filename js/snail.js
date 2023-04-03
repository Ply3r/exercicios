function snail(array) {
  const result = [];

  while(array.length) {
    result.push(...array.shift());
    for(let i = 0; i < array.length; i += 1) {
      result.push(array[i].pop());
    }
    result.push(...(array.pop() || []).reverse())
    for(let i = array.length - 1; i > 0; i -= 1) {
      result.push(array[i].shift());
    }
  }
  
  return result;
}

console.log(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));