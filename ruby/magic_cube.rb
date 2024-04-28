require 'byebug'

class MagicCube
  private
  attr_writer :cube
  TOP_RANGE = (0..2)
  RIGHT_RANGE = (2..4)
  BOTTOM_RANGE = (4..6)
  LEFT_RANGE = (6..8)

  RIGHT_FACES = [0, 1, 5, 3, 0]
  LEFT_FACES = [3, 5, 1, 0, 3]
  UP_FACES = [0, 4, 5, 2, 0]
  DOWN_FACES = [2, 5, 4, 0, 2]

  AMOUNT_OF_SHUFFLE = 25

  def initialize
    @cube = [
      ['W'] * 9,
      ['B'] * 9,
      ['Y'] * 9,
      ['O'] * 9,
      ['G'] * 9,
      ['R'] * 9,
    ]
  end

  def make_rotation(faces, range)
    faces = faces.map { |index| [index, cube[index]] }
    first_face_index, first_face = faces.first
    current_blocks = first_face[range]

    faces.each do |index, face|
      hold = face[range]
      hold_last_block = face[-1]
      face[range] = current_blocks
      cube[index] = face
      current_blocks = hold

      if cube[index][-1] != hold_last_block
        modified_block = cube[index][-1] 
        cube[index][-1] = hold_last_block
        cube[index][0] = modified_block
      end
    end

    cube
  end


  public
  attr_reader :cube

  def shuffle
    legal_moviments = {
      top: [:right, :left],
      bottom: [:right, :left],
      right: [:up, :down],
      left: [:up, :down],
    }

    AMOUNT_OF_SHUFFLE.times do
      side = legal_moviments.keys[rand(0..3)]
      direction = legal_moviments[side][rand(0..1)]
      rotate(side, direction)
    end
  end

  def rotate(side, direction)
    range =  MagicCube.const_get("#{side.to_s.upcase}_RANGE")
    faces = MagicCube.const_get("#{direction.to_s.upcase}_FACES")
    make_rotation(faces, range)
  end
end

magic_cube = MagicCube.new

puts magic_cube.cube.to_s
magic_cube.shuffle
puts magic_cube.cube.to_s