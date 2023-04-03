function hackerlandRadioTransmitters(houses, range) {
    let qnt_transmitters = 0;
    const covered_houses = [];
    houses.sort((a, b) => a - b)
    
    houses.forEach((house, index) => {
      if (covered_houses.includes(house)) return;
      
      const nextPaths = [];
      const prevPaths = [];
      for (let c = 1; c <= range; c += 1) {
        if (house - range <= houses[index - c]) {
          prevPaths.push(index - c);
        }

        if (house + range >= houses[index + c]) {
          nextPaths.push(index + c);
        }
      }

      const nextAllowed = nextPaths.every((nextIndex) => !houses[nextIndex])
      const prevAllowed = !!prevPaths.length && prevPaths.every((prevIndex) => houses[prevIndex] && !covered_houses.includes(houses[prevIndex]))

      const is_allowed = prevAllowed || nextAllowed;
      
      if (!is_allowed) return;

      console.log(index);
      const houses_arr = [...prevPaths, index,...nextPaths].map((index) => houses[index]).filter(Boolean);

      qnt_transmitters += 1
      covered_houses.push(...houses_arr);
    })

    console.log(covered_houses);
    console.log(qnt_transmitters);

    return qnt_transmitters;
}


hackerlandRadioTransmitters('2 2 2 2 1 1 1 1'.split(" ").map((n) => +n), 2)