require 'byebug'
require_relative 'helper'

class BinaryTree
  attr_accessor :value
  attr_accessor :left
  attr_accessor :right

  def initialize(value: nil, left: nil, right: nil)
    @value = value
    @left = left
    @right = right
  end

  def to_array
    sorted_list(self, [])
  end

  def insert(item)
    if !self.value
      self.value = item.value
      self.left = item.left
      self.right = item.right
      return
    end

    x = self
    y = nil

    while x != nil
      y = x

      if item.value < x.value
        x = x.left
      else
        x = x.right
      end
    end

    item.value < y.value ? y.left = item : y.right = item
  end

  def find(item)
    result = nil
    x = self

    while x != nil
      if x.value == item
        result = x
        break
      end

      if item < x.value
        x = x.left
      else
        x = x.right
      end
    end

    result
  end

  private

  def sorted_list(node, array)
    return if node.nil?

    sorted_list(node.left, array)
    array.push(node.value)
    sorted_list(node.right, array)
    array
  end
end

root = BinaryTree.new

array = Helper.randint_array(1000)
array.each { |value| root.insert(BinaryTree.new(value: value)) }

puts root.to_array.to_s
