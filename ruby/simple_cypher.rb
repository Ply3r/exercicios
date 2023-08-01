require 'byebug'

class SimpleCypher
  class << self
    def encrypt(message)
      new_message = message.split('').map do |letter|
        charcode = letter.ord

        charcode % 2 == 0 ? (charcode + 2).chr : (charcode - 2).chr
      end

      new_message.join('')
    end

    def decrypt(message)
      new_message = message.split('').map do |letter|
        charcode = letter.ord

        charcode % 2 == 0 ? (charcode - 2).chr : (charcode + 2).chr
      end

      new_message.join('')
    end
  end
end

puts SimpleCypher.encrypt('Eae belezura?')
puts SimpleCypher.decrypt('C_c"dcnc|st_=')
