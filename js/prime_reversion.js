function isPrime(num) {
  if (num <= 1) return false;
  let is_prime = true;

  for (let i = 2; i < num; i += 1) {
    if (num % i === 0) {
      is_prime = false;
      break;
    };
  }

  return is_prime;
}

function findingPrimes(a, b) {
  const range = [];
  for (let i = a; i < b; i += 1) { range.push(i) }

  const primes = [];
  range.forEach((num) => {
    if ([0, 1].includes(num)) return;
    
    if (isPrime(num)) {
      primes.push(num);
    }    
  })
  
  return primes;
}

function solve(a, b) {   
  const primes = findingPrimes(a, b);
  const prime_len = primes.length;
  const groups = [];

  for (const _ of [...Array(prime_len)]) {
    primes.forEach((inner_num) => {
      groups.push([primes[0], inner_num]);
    })

    primes.shift();
  }

  const revertPrime = groups.filter((arr) => {
    const sum = arr[0] * arr[1];
    const new_nums = sum.toString().split('').map((n) => +n);
    const new_num = new_nums.reduce((a, b) => a + b);

    return isPrime(new_num);
  })

  return revertPrime.length;
}

console.log(solve(0, 19))