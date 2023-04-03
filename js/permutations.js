function permutations(string) {
  const combinations = [];
  const visited_paths = [];
	const arr = string.split('').map((letter, index) => ({ letter, index }));
  
  function recursion(letter) {
    const index_arr = visited_paths.map(({ index} ) => index);
    if (index_arr.includes(letter.index)) return;
    visited_paths.push(letter);

    if (visited_paths.length === arr.length) {
      combinations.push([...visited_paths]);
      visited_paths.pop();
      return;
    }

    arr.forEach((other_letter) => recursion(other_letter));
    visited_paths.pop();
  }
  
  arr.forEach((letter) => recursion(letter));
  const parsed_combinations = combinations.map((e) => e.map(({ letter }) => letter).join(''));
  return [...new Set(parsed_combinations)]
}

console.log(permutations('aabb'));