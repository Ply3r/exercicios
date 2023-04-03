// Feel free to write and use any additional functions, variables, objects, etc. as you wish

const options = {
  'A': ['B', 'F', 'E', 'H', 'D', { letter: 'C', crossed: 'B' }, { letter: 'I', crossed: 'E' }, { letter: 'G', crossed: 'D' }],
  'B': ['C', 'F', 'I', 'E', 'G', 'D', 'A', { letter: 'H', crossed: 'E' }],
  'C': ['F', 'H', 'E', 'D', 'B', { letter: 'I', crossed: 'F' }, { letter: 'G', crossed: 'E' }, { letter: 'A', crossed: 'B' }],
  'D': ['A', 'B', 'C', 'E', 'I', 'H', 'G', { letter: 'F', crossed: 'E' }],
  'E': ['A', 'B', 'C', 'F', 'I', 'H', 'G', 'D'],
  'F': ['C', 'B', 'A', 'E', 'G', 'H', 'I', { letter: 'D', crossed: 'E' }],
  'G': ['D', 'B', 'E', 'F', 'H', { letter: 'A', crossed: 'D' }, { letter: 'C', crossed: 'E' }, { letter: 'I', crossed: 'H' }],
  'H': ['G', 'D', 'A', 'E', 'C', 'F', 'I', { letter: 'B', crossed: 'E' }],
  'I': ['H', 'D', 'E', 'B', 'F', { letter: 'G', crossed: 'H' }, { letter: 'A', crossed: 'E' }, { letter: 'C', crossed: 'F' }],
}

function countPatternsFrom(firstPoint, length) {
  const visitedPaths = [];
  let allCombinations = 0;
  let pathLen = 0;
  
  function recursion(letter) {
    if (length === 0 || length > 9) return;
    if (letter.crossed && !visitedPaths.includes(letter.crossed)) return;

    letter = letter.letter ? letter.letter : letter;
    if (visitedPaths.includes(letter)) return;
    
    visitedPaths.push(letter);
    pathLen += 1;
    
    if (pathLen >= length) {
      allCombinations += 1;
      visitedPaths.pop();
      pathLen -= 1;
      return;
    }
    
    options[letter].forEach((letter_option) => {
      recursion(letter_option)  
    });

    visitedPaths.pop();
    pathLen -= 1;
  }
  
  recursion(firstPoint);
  
  return allCombinations;
}

console.log(countPatternsFrom('C', 2))

