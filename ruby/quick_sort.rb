require_relative 'randint_array'
require 'byebug'

# Tempo ~ 0.049s
def quick_sort(array)
  return array if array.length <= 1

  sum_all = array.reduce(:+)
  pivot = sum_all / array.length
  left, right = array.partition { |num| num <= pivot }

  if left.empty? || right.empty?
    middle = (array.length / 2).floor - 1
    left, right = array[0..middle], array[middle + 1..array.length - 1]
  end

  left = quick_sort(left)
  right = quick_sort(right)

  intercalition_order(left, right)
end

def intercalition_order(left, right)
  result = []

  while result.length < left.length + right.length
    break if left.empty? || right.empty?
    result << (left.first < right.first ? left.shift : right.shift)
  end

  result.concat(left).concat(right)
end

array = randint_array(1000000)
sorted_array = quick_sort(array)
