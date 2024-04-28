require 'byebug'

class Luhn
  def self.valid?(card_numbers)
    Luhn.new.valid?(card_numbers)
  end

  def valid?(card_numbers)
    return false if card_numbers.length <= 1
    card_numbers = card_numbers.gsub(' ', '').chars.map { |char| char.to_i }
    index = card_numbers.length - 2

    while index >= 0
      card_numbers[index] = double_number(card_numbers[index])
      index -= 2
    end
    
    card_numbers.sum % 10 == 0
  end

  def double_number(num)
    num = num * 2
    num > 9 ? num - 9 : num
  end
end


Luhn.valid?('059')