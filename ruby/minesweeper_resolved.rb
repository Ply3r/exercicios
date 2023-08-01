require 'byebug'
require_relative 'minesweeper'

class MineSweeperResolver
  def initialize(maze)
    @backtrack = []
    @maze_array = []
    @maze = maze
  end

  def solve_maze
    @maze_array, first_pos = parse_maze
    enter_house(first_pos)
  end

  private

  def parse_maze
    game = @maze.show_game.split('\n')
    game = game.map { |row| row.split(' ') }
    first_pos = nil
    game.each_with_index do |row, idx|
      col_idx = row.index { |x| x != '?' }
      if col_idx
        first_pos = [idx, col_idx]
        break
      end
    end
    [game, first_pos]
  end

  def enter_house(pos)
    return if recurrent_path?(pos)

    @backtrack.push(pos.to_s)
    total_house_mines = @maze.open(pos[0], pos[1])
    @maze_array[pos[0]][pos[1]] = total_house_mines
    neighboors = get_neighboors(pos)

    if total_house_mines == 0
      neighboors.each { |n| enter_house(n[:pos]) }
      return
    end

    # best_neighboors = get_best_options(pos, neighboors, maze_array)
    # best_neighboors.each { |n| enter_house(n[:pos], maze, maze_array) }
  end

  def recurrent_path?(pos)
    @backtrack.any? { |x| x == pos.to_s }
  end

  def get_neighboors(pos)
    neighboors = [
      { mine_qnt: @maze_array[pos[0] + 1] ? @maze_array[pos[0] + 1][pos[1]] : nil, pos: [pos[0] + 1, pos[1]] },
      { mine_qnt: @maze_array[pos[0] + 1] ? @maze_array[pos[0] + 1][pos[1] + 1] : nil, pos: [pos[0] + 1, pos[1] + 1] },
      { mine_qnt: @maze_array[pos[0] + 1] ? @maze_array[pos[0] + 1][pos[1] - 1] : nil, pos: [pos[0] + 1, pos[1] - 1] },
      { mine_qnt: @maze_array[pos[0] - 1] ? @maze_array[pos[0] - 1][pos[1]] : nil, pos: [pos[0] - 1, pos[1]] },
      { mine_qnt: @maze_array[pos[0] - 1] ? @maze_array[pos[0] - 1][pos[1] + 1] : nil, pos: [pos[0] - 1, pos[1] + 1] },
      { mine_qnt: @maze_array[pos[0] - 1] ? @maze_array[pos[0] - 1][pos[1] - 1] : nil, pos: [pos[0] - 1, pos[1] - 1] },
      { mine_qnt: @maze_array[pos[0]][pos[1] + 1], pos: [pos[0], pos[1] + 1] },
      { mine_qnt: @maze_array[pos[0]][pos[1] - 1], pos: [pos[0], pos[1] - 1] },
    ]
    neighboors.select! { |n| !n[:mine_qnt].nil? }
    neighboors.map { |n| n.merge!({ open?: n[:mine_qnt] != '?' }) }
    neighboors
  end

  def get_best_options(pos, neighboors, maze_array)

  end
end

maze = MineSweeper.new
maze.open(1, 1)
MineSweeperResolver.new(maze).solve_maze
