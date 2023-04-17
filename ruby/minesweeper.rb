require 'byebug'

class MineSweeper
  def initialize(size: 10, mine_qnt: 5)
    @game = []
    @game_resolved = []
    @size = size
    @mine_qnt = mine_qnt

    generate_game
  end

  def open(row:, column:)
    puts 'select a row and a column' and return if row.nil? && column.nil?
    result = @game_resolved[row][column]

    if result == 'x'
      show_game
      puts 'OMG!! You hit the mine :('

      @game = []
      @game_resolved = []
      return
    end

    @game[row][column] = result
    show_game
  end

  def show_game
    @game.each do |row|
      puts row.join(' ')
    end

    return
  end

  private

  def check_game_win
    @game.all? do |row|
      
    end
  end

  def generate_game
    total_mines = 0

    for r in 1..@size
      row = []
      for c in 1..@size
        sorted_num = rand(@size)
        cell = '?'

        if sorted_num == 1 && total_mines < @mine_qnt
          cell = 'x'
          total_mines += 1
        end

        row << cell
      end

      @game << Array.new(@size, '?')
      @game_resolved << row
    end

    resolve_game
    show_game
  end

  def check_neighboors(pos)
    matrix = @game_resolved
    r, c = pos[0], pos[1]

    is_mine = matrix[r][c] == 'x'
    return if is_mine

    neighboors = [
      matrix[r + 1] ? matrix[r + 1][c] : nil,
      matrix[r + 1] ? matrix[r + 1][c + 1] : nil,
      matrix[r + 1] ? matrix[r + 1][c - 1] : nil,
      matrix[r][c + 1] ? matrix[r][c + 1] : nil,
      matrix[r][c - 1] ? matrix[r][c - 1] : nil,
      matrix[r - 1] ? matrix[r - 1][c] : nil,
      matrix[r - 1] ? matrix[r - 1][c + 1] : nil,
      matrix[r - 1] ? matrix[r - 1][c - 1] : nil,
    ]

    total_mines_in_neighboors = neighboors.reduce(0) do |acc, curr|
      if curr == 'x'
        acc += 1
      end

      acc
    end

    @game_resolved[r][c] = total_mines_in_neighboors
  end

  def resolve_game
    for r in 0..@size - 1
      for c in 0..@size - 1
        check_neighboors([r, c])
      end
    end
  end
end
