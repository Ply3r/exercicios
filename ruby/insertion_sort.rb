require_relative 'randint_array'

def order(key, prev_key, direction)
  direction == :asc ? key < prev_key : key > prev_key
end

# Tempo 10.000 ~ 0.945s
def insertion_sort(array, direction = :asc)
  for index in 1..array.length - 1
    key = array[index]
    prev_index = index

    while prev_index > 0 && order(key, array[prev_index - 1], direction)
      array[prev_index] = array[prev_index - 1]
      prev_index -= 1
    end

    array[prev_index] = key
  end

  array
end

array = randint_array(10000)
sorted_array = insertion_sort(array)
