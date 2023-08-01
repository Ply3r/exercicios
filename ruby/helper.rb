module Helper
  class << self
    def integer_rand_array(max)
      array = []

      for i in 1..max
        is_negative = rand(3) == 1
        num = rand(max)
        num = is_negative ? -num : num

        array << num
      end

      return array
    end

    def randint_array(max)
      array = []

      for i in 1..max
        array << rand(max)
      end

      return array
    end
  end
end
