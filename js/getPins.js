function getPINs(observed) {
  const answers = {
    '1': ['1', '2', '4'],
    '2': ['1', '2' ,'3', '5'],
    '3': ['2', '3', '6'],
    '4': ['1', '4', '5', '7'],
    '5': ['2', '4', '5', '6', '8'],
    '6': ['3', '5', '6', '9'],
    '7': ['4', '7', '8'],
    '8': ['5', '7', '8', '9', '0'],
    '9': ['6', '8', '9'],
    '0': ['0', '8']
  };
  
  const all_possibilities = [];
  const keys_pressed = observed.split('');
  
  keys_pressed.forEach((strNum) => {
    all_possibilities.push(answers[strNum]);
  })
  
  return getAllCombinations(all_possibilities);
}

function getAllCombinations(possibilities) {
  let str = '';
  const allCombinations = [];

  function recursion(arr, index) {
    if (!arr[index]) {
      allCombinations.push(str);
      str = str.slice(0, str.length - 1);
      return;
    }

    arr[index].forEach((num, inner_index) => {
      str += num;
      recursion(arr, index + 1);

      if (arr[index].length === inner_index + 1) {
        str = str.slice(0, str.length - 1);
      }
    });
  }

  recursion(possibilities, 0);
  return allCombinations;
}

console.log(getPINs("111"))
