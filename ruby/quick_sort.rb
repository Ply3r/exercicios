require_relative 'randint_array'
require 'byebug'

# Tempo ~ 0.080s
def quick_sort(array)
  return array if array.length <= 1

  left, right = [], []
  pivot = array[0]
  for i in 1..array.length - 1
    left << array[i] if array[i] < pivot
    right << array[i] if array[i] >= pivot
  end

  quick_sort(left) + [pivot] + quick_sort(right)
end

array = randint_array(10)
sorted_array = quick_sort(array)
