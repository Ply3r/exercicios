module Port
  IDENTIFIER = :PALE

  def self.get_identifier(city)
    city.slice(0, 4).upcase.to_sym
  end

  def self.get_terminal(ship_identifier)
    str = ship_identifier.to_s
    return :A if /OIL/.match(str) || /GAS/.match(str)
    :B
  end
end