require_relative 'randint_array'

def order(key, next_key, direction)
  direction == :asc ? key < next_key : key > next_key
end

def selection_sort(array, direction = :asc)
  minor_index = 0

  while minor_index < array.length - 1
    curr_minor_index = minor_index

    for i in minor_index..array.length - 1
      curr_minor_index = i if order(array[i], array[curr_minor_index], direction)
    end

    hold = array[minor_index]
    array[minor_index] = array[curr_minor_index]
    array[curr_minor_index] = hold

    minor_index += 1
  end

  array
end

array = randint_array(10000)
sorted_array = selection_sort(array)
