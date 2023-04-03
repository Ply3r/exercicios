require_relative 'randint_array'

# Tempo ~ 0.971s
def my_sort_algo2(array)
  left = my_sort_algo2(array[0..((array.length) / 2).floor - 1]) unless array.length <= 2
  right = my_sort_algo2(array[(((array.length) / 2).floor)..array.length - 1]) unless array.length <= 2

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
sorted_array = my_sort_algo2(array)
