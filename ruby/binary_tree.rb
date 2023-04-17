require 'byebug'
require_relative 'randint_array'

class BinaryTree
  attr_accessor :value
  attr_accessor :left
  attr_accessor :right

  def initialize(value:, left: nil, right: nil)
    @value = value
    @left = left
    @right = right
  end

  def to_array
    array = []
    get_all_values(self, array)

    array
  end

  def insert(item)
    find_and_insert(item, self)
  end

  def find(value)

  end

  private

  def find_node(value, node)

  end

  def find_and_insert(item, node = self)
    return item if node.nil?

    value = item.value

    if value <= node.value
      node.left = find_and_insert(item, node.left)
    else
      node.right = find_and_insert(item, node.right)
    end

    node
  end

  def get_all_values(node, array)
    return if node.nil?

    get_all_values(node.left, array)
    get_all_values(node.right, array)

    array.push(node.value)
  end
end

root = BinaryTree.new(value: 5)

array = [3, 7, 2, 4, 9, 6]
array.each { |value| root.insert(BinaryTree.new(value: value)) }

puts root.to_array.to_s
