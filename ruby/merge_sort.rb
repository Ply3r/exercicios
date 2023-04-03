require_relative 'randint_array'

# Tempo ~ 0.971s
def merge_sort(array)
  left = merge_sort(array[0..((array.length) / 2).floor - 1]) unless array.length <= 2
  right = merge_sort(array[(((array.length) / 2).floor)..array.length - 1]) unless array.length <= 2

  sorted = left || right ? [*left, *right] : array

  for i in 1..sorted.length - 1
    key = sorted[i]
    k = i

    while k > 0 && key < sorted[k - 1]
      sorted[k] = sorted[k - 1]
      k -= 1
    end

    sorted[k] = key
  end

  sorted
end

array = randint_array(100000)
sorted_array = merge_sort(array)
