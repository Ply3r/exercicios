def randint_array(max)
  array = []

  for i in 1..max
    array << rand(max)
  end

  return array
end
