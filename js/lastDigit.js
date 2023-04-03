function printNums(num1, num2) {
  return console.log(`${num1}^${num2}`)
}

function getSecondNumber(base, expoente) {
  const baseStr = base.toString()
  const expoenteStr = expoente.toString()
  const lastNum = +baseStr[baseStr.length - 1];
  const decimal = +expoenteStr[expoenteStr.length - 2];
 
  const isDecimalEven = decimal % 2 === 0;
  const isLastEven = lastNum % 2 === 0;
  
  let diff = 0;
  if (decimal) {
    if (isLastEven && !isDecimalEven) diff = 2
    if (!isLastEven && !isDecimalEven) diff = -8
  }
  
  const number = getFirstNumber(lastNum + diff);  
  const newNumber = +((isLastEven ? '1' : '2') + number) 
  return newNumber;
}

function getFirstNumber(num) {
  const str = num.toString()
  
  return +str[str.length - 1]
}

function lastDigit(arr) {
  if (arr.length === 1) return getFirstNumber(arr[0])
  if (!arr.length) return 1;
  
  arr.reverse();  
  const lastNumber = arr.reduce((acc, curr, index) => {
    if ([0, 1].includes(index)) {      
      acc = getFirstNumber(arr[1]) ** getFirstNumber(arr[0]);
      acc = getSecondNumber(acc, arr[0]);

      return acc;
    }    
    const result = getFirstNumber(curr) ** getFirstNumber(acc);
    acc = getSecondNumber(result, acc);
    
    return acc;
  }, 0)
  
  return getFirstNumber(lastNumber);
}

lastDigit([ 3, 4, 5 ])
