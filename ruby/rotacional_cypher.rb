class RotationalCipher
  FIRST_LETTER_CODE = 97
  LAST_LETTER_CODE = 122
  DISTANCE_BETWEEN_UP_AND_DOWN_CASE = 32
  ALPHABET_LENGTH = 26

  def self.rotate(phrase, rotation)
    RotationalCipher.new.rotate(phrase, rotation)
  end

  def rotate(phrase, rotation)
    rotation = rotation % ALPHABET_LENGTH
    cipher_phrase = ""

    for index in 0..phrase.length - 1
      cipher_phrase += get_new_letter(phrase[index], rotation)
    end

    cipher_phrase
  end

  private

  def get_new_letter(letter, rotation)
    letter_code = letter.ord
    is_upper = letter_code < FIRST_LETTER_CODE
    letter_code = letter_code + DISTANCE_BETWEEN_UP_AND_DOWN_CASE if is_upper
    return letter if not_an_letter(letter_code)

    new_letter_code = rotation + letter_code
    new_letter_code = FIRST_LETTER_CODE + (new_letter_code % (LAST_LETTER_CODE + 1)) if new_letter_code > LAST_LETTER_CODE
    (is_upper ? new_letter_code - DISTANCE_BETWEEN_UP_AND_DOWN_CASE : new_letter_code).chr
  end

  def not_an_letter(letter_code)
    letter_code < FIRST_LETTER_CODE || letter_code > LAST_LETTER_CODE
  end
end
