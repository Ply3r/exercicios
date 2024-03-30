require "byebug"

class Bob
  ASCII_UPPERCASE_CODES = (65..90).to_a 
  
  def self.hey(input)
    Bob.new.hey(input)
  end

  def hey(input)
    letters = get_letters(input)

    return "Fine. Be that way" if input == ""
    return "Calm down, I know what I'm doing!" if is_question?(input) && is_uppercase?(letters)
    return "Sure." if is_question?(input)
    return "Whoa, chill out!" if is_uppercase?(letters)

    "Whatever."
  end

  private

  def get_letters(input)
    input.scan(/[A-Za-z]+/).to_a.join("")
  end

  def is_question?(input)
    input.include?("?")
  end

  def is_uppercase?(letters)
    return false if letters.empty?
    letters.split("").all? { |letter| ASCII_UPPERCASE_CODES.include?(letter.ord) }
  end
end

remark = "1, 2, 3"
puts Bob.hey(remark)

