require "byebug"

class Cloth
  attr_accessor :price, :name, :quantity_by_size
  
  def initialize(args)
    args.each { |key, value| send("#{key}=", value)}
    @quantity_by_size ||= {}
  end

  def total_quantity
    self.quantity_by_size.values.sum || 0
  end

  def +(acc)
    byebug
    return acc + total_quantity if acc.is_a?(Numeric)
    acc.total_quantity + total_quantity
  end
end

class BoutiqueInventory
  attr_reader :items

  def initialize(items)
    @items = items.map { |item| Cloth.new(item) }
  end

  def item_names
    items.map(&:name).sort
  end

  def total_stock
    items.inject(0) { |acc, item| acc + item.total_quantity }
  end
end

shoes = { price: 30.00, name: "Shoes", quantity_by_size: { s: 1, xl: 4 } }
coat = { price: 65.00, name: "Coat", quantity_by_size: {} }
handkerchief = { price: 19.99, name: "Handkerchief", quantity_by_size: {} }
items = [shoes, coat, handkerchief]
puts BoutiqueInventory.new(items).total_stock