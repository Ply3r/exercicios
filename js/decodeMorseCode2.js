var decodeBits = function(bits){
  const small_time = [...bits.match(/1+|0+/g)].sort((a, b) => a.length - b.length)[0].length;
  console.log(small_time);

  let morseCode = bits;
  morseCode = morseCode.replace(new RegExp('0'.repeat(small_time * 3), 'g'), 'S');
  morseCode = morseCode.replace(new RegExp(`(?!=\d)(${'0'.repeat(small_time)})(?!=\d)`, 'g'), 's');
  morseCode = morseCode.replace(new RegExp(`(${'1'.repeat(small_time * 3)})`, 'g'), '-');
  morseCode = morseCode.replace(new RegExp(`(${'1'.repeat(small_time)})`, 'g'), '.');
  morseCode = morseCode.replace(/s/g, '');
  morseCode = morseCode.replace(/S/g, ' ');
  
  console.log(morseCode);
  return morseCode
}


var decodeMorse = function(morseCode){
  // ToDo: Accept dots, dashes and spaces, return human-readable message
  const words = morseCode.split("  ");
  const message = words.map((word) => word.split(' ').map((letter) => MORSE_CODE[letter]).join('')).join(' ');
  return message;
}

decodeBits('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011')