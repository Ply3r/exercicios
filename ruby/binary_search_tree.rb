require "byebug"

class Bst
  attr_accessor :data, :left, :right
  
  def initialize(data)
    @data = data
    @left = nil
    @right = nil
  end

  def insert(new_data)
    side = new_data > @data ? 'right' : 'left'
    node = send(side)
    return send("#{side}=", Bst.new(new_data)) if node.nil?
    node.insert(new_data)
  end

  def each(&block)
    return Enumerator.new { |yielder| each { |data| yielder << data } } unless block_given?

    @left&.each(&block)
    yield @data
    @right&.each(&block)
  end
end

bst = Bst.new(4)

bst.insert(2)
bst.insert(6)
bst.insert(1)
bst.insert(7)
bst.insert(8)

array = []
bst.each { |data| array << data }
puts array.to_s
puts bst.each.first(4).to_s
