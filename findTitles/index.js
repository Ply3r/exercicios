const { readFileSync } = require('fs');

const components = (array) => {
  const result = [];

  array.forEach((value) => {
    function componentsExist(obj) { 
      if (!obj) return;

      obj.component ? result.push(obj.component) : ''
      
      const filters = obj.filters || []
      const sort = obj.sort || []
      const columns = obj.columns || []
      const components = obj.components || [];
  
      components.forEach((children) => {
        result.push(children.component)

        componentsExist(children.settings)
      });

      filters.forEach((children) => {
        result.push(children.component)

        componentsExist(children.settings)
      });

      sort.forEach((children) => {
        result.push(children.component)

        componentsExist(children.settings)
      });

      columns.forEach((children) => {
        result.push(children.component)

        componentsExist(children.settings)
      });

      componentsExist(obj.settings)
      componentsExist(obj.filters_collection)
      componentsExist(obj.sort_collection)
      componentsExist(obj.footer_collection)
    }

    componentsExist(value)
  })

  return result;
}

const showComponents = () => {
  const json = readFileSync('exercise-interview/teste-json.json', 'utf-8');
  const array = JSON.parse(json);

  const result = components(array.components)

  return result;
}

console.log(showComponents());

