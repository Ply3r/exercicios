class Pangram
  ENGLISH_ALPHABET = ("a".."z").to_a

  def self.pangram?(phrase, alphabet: ENGLISH_ALPHABET)
    phrase = phrase.downcase
    alphabet.all? { |code| phrase.include?(code) }
  end
end