require 'byebug'
require_relative 'Helper'

def counting_sort(array, ceiling)
  counting_array = (0..10).to_a.fill(0)
  sorted_array = (0..10).to_a.fill(0)
  array.each { |num| counting_array[num] += 1 }

  for i in 0..counting_array.length - 2
    counting_array[i + 1] += counting_array[i]
  end

  for i in 1..counting_array.length - 2
    hold = counting_array[i]
    counting_array[i] = counting_array[i - 1]
    counting_array[i + 1] = hold
  end

end

array = Helper.randint_array(10)
counting_sort(array, 10)

