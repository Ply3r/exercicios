$LOAD_PATH << '.'
require 'Helper'
require 'byebug'

def find_max_subarray(array, low, high)
  sum = 0
  subarray_sum = -Float::INFINITY
  new_high = high

  for i in low..high
    sum += array[i]

    if sum > subarray_sum
      subarray_sum = sum
      new_high = i
    end
  end

  return [low, new_high, subarray_sum]
end

def find_max_crossing_subarray(array, low, high)
  return [low, high, array[low] + array[high]] if high == low + 1

  mid = ((low + high) / 2).floor

  l_low, l_high, left_sum = find_max_subarray(array, low, mid)
  r_low, r_high, right_sum = find_max_subarray(array, mid + 1, high)

  cr_low, cr_high, cr_sum = find_max_crossing_subarray(array, l_high, r_high)

  return [l_low, l_high, left_sum] if left_sum > right_sum && left_sum > cr_sum
  return [r_low, r_high, right_sum] if right_sum > left_sum && right_sum > cr_sum

  return [cr_low, cr_high, cr_sum]
end

teste_array = Helper.integer_rand_array(10)
puts teste_array.to_s
puts find_max_crossing_subarray(teste_array, 0, teste_array.length - 1).to_s
