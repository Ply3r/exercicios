require_relative 'randint_array'

# Tempo 10.000 ~ 4.739s
def bubble_sort(array)
  is_sorted = false

  while !is_sorted
    is_sorted = true

    for i in 0..array.length - 2
      if array[i] > array[i + 1]
        is_sorted = false

        hold = array[i]
        array[i] = array[i + 1]
        array[i + 1] = hold
      end
    end
  end

  array
end

array = randint_array(100)
sorted_array = bubble_sort(array)
puts sorted_array.to_s
