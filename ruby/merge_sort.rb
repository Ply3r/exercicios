require_relative 'randint_array'

# Tempo 10.000 ~ 0.049s
def merge_sort(array)
  return array if array.length <= 1

  middle = ((array.length) / 2).floor
  left_array = merge_sort(array[0..middle - 1])
  right_array = merge_sort(array[middle..array.length - 1])

  result = []

  until left_array.empty? || right_array.empty?
    result << (left_array.first < right_array.first ? left_array.shift : right_array.shift)
  end

  result.concat(left_array).concat(right_array)
end

array = randint_array(10000)
sorted_array = merge_sort(array)
