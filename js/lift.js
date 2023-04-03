
var theLift = function(queues, capacity) {
  console.log(queues, capacity);
  const totalPersons = queues.reduce((a, b) => a + b.length, 0);
  
  const floors_visited = [];
  const persons_delivered = [];
  let persons_inside_lift = [];

  function in_out_logistic(persons_entering, floor) {
    const is_persons_leaving = persons_inside_lift.includes(floor);

    if (is_persons_leaving) {
      persons_delivered.push(...persons_inside_lift.filter((destination) => destination === floor));
      persons_inside_lift = persons_inside_lift.filter((destination) => destination !== floor);
    }

    const persons_standing = persons_entering.length + capacity;
    persons_entering = capacity_logistic(persons_entering);

    if (persons_entering.length || is_persons_leaving || persons_standing > capacity) {
      persons_inside_lift.push(...persons_entering);
      persons_entering.forEach((person) => {
        const p_index = queues[floor].findIndex((p) => p === person);
        queues[floor].splice(p_index, 1);
      });

      if (floors_visited[floors_visited.length - 1] !== floor) {
        floors_visited.push(floor);
      }
    }
  }

  function capacity_logistic(persons_entering) {
    if (persons_entering.length + persons_inside_lift.length > capacity) {
      persons_entering = persons_entering.slice(0, capacity - persons_inside_lift.length);
    }

    return persons_entering;
  }
  
  while(persons_delivered.length < totalPersons) {
    for (let floor = 0; floor <= queues.length - 1; floor += 1) {
      let persons_entering = queues[floor].filter((destination) => destination > floor);

      in_out_logistic(persons_entering, floor);
    }
  
    for (let floor = queues.length - 1; floor >= 0; floor -= 1) {
      let persons_entering = queues[floor].filter((destination) => destination < floor);

      in_out_logistic(persons_entering, floor);
    }
  }

  if (floors_visited[floors_visited.length - 1] !== 0) floors_visited.push(0);
  if (floors_visited[0] !== 0) floors_visited.unshift(0);
  return floors_visited;
}

const queues = [
  [],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ]
]

console.log(theLift(queues, 5));
