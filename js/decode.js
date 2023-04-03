device.decode = function (w) {  
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,? -'
  const encodeArr = w.split('');
  const lettersEncoded = [];
  let alphabetEncoded = '';
  let result = '';
    
  alphabet.split('').forEach((alphabet_l) => {
    let encodedLongLetter = '';
    encodeArr.forEach(() => {
      encodedLongLetter += alphabet_l;
    })

    alphabetEncoded += device.encode(encodedLongLetter)[0]
    lettersEncoded.push(device.encode(encodedLongLetter));
  });

  encodeArr.forEach((letter, index) => {
    const firstLetter = lettersEncoded.find((arr) => arr[index] === letter)[0];
    const letterIndex = alphabetEncoded.split('').findIndex((l) => l === firstLetter);
    result += alphabet[letterIndex];
  });
  
  return result;
}