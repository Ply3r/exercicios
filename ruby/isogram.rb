require "byebug"

class Isogram
  def self.isogram?(input)
    str_arr = input.downcase.split("")
    str_obj = {}

    str_arr.each do |letter|
      next unless /\w/.match(letter)

      str_obj[letter] = 0 unless str_obj[letter]
      str_obj[letter] += 1

      return false if str_obj[letter] > 1
    end
   
    return true
  end
end

puts Isogram.isogram?("-Isogram-")