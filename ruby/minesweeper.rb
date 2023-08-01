require 'byebug'

class MineSweeper
  def initialize(size: 10, mine_qnt: 5)
    @game = []
    @game_resolved = []
    @size = size
    @mine_qnt = mine_qnt

    generate_game
  end

  def open(row, column)
    puts 'select a row and a column' and return if row.nil? && column.nil?

    result = @game_resolved[row][column]
    @game[row][column] = result
    show_game

    is_winner = check_game_win
    if result == 'x' || is_winner
      show_game(game: @game_resolved)

      @game = []
      @game_resolved = []
      raise Exception.new 'OMG! You hit the mine :(' unless is_winner
    end

    result
  end

  def show_game(game: @game)
    str = ''
    game.each do |row|
      str += row.join(' ') + '\n'
      puts row.join(' ')
    end

    puts ' '
    return str
  end

  private

  def check_game_win
    is_winner = true

    @game.each_with_index do |row, r_index|
      break unless is_winner

      row.each_with_index do |col, c_index|
        if col == '?' && @game_resolved[r_index][c_index] != 'x'
          is_winner = false
          break
        end
      end
    end

    puts "Congratulations you win the game! :)" if is_winner
  end

  def generate_game
    puts "Lets start!"
    total_mines = 0

    for r in 1..@size
      row = []
      for c in 1..@size
        cell = '?'
        row << cell
      end

      @game << Array.new(@size, '?')
      @game_resolved << row
    end

    add_mines
    resolve_game
  end

  def add_mines
    for i in 0..@mine_qnt
      row, col = rand(@size - 1), rand(@size - 1)
      @game_resolved[row][col] = 'x'
    end
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
      matrix[r][c + 1],
      matrix[r][c - 1],
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
