const { readFileSync } = require('fs');

const components = (object) => {
  const result = [];

  function componentsExist(obj) { 
    if (!obj) return;

    obj.component ? result.push(obj.component) : ''

    const values = Object.values(obj);

    values.forEach((value) => {
      if (Array.isArray(value) && typeof value[0] === 'object') {
        value.forEach((newObj) => componentsExist(newObj))
      } else if (typeof value === 'object') {
        componentsExist(value)
      }
    })
  }

  componentsExist(object);
  return result;
}

const showComponents = () => {
  const json = readFileSync('teste-json.json', 'utf-8');
  const objeto = JSON.parse(json);

  const result = components(objeto)

  return result;
}

console.log(showComponents());

