const filterInputFormatter = (filters = {}) => {
  filters = JSON.parse(JSON.stringify(filters));
  let filterMap = [
    'and',
    'or',
    'nor',
    'eq',
    'lt',
    'lte',
    'gt',
    'gte',
    'ne',
    'nin',
    'in',
    'regex',
    'options',
  ];

  Object.keys(filters).map((key) => {
    if (filters[key] instanceof Object || filters[key] instanceof Array) {
      filters[key] = filterInputFormatter(filters[key]);
    }

    if (filterMap.includes(key)) {
      filters['$' + key] = JSON.parse(JSON.stringify(filters[key]));
      delete filters[key];
    }

    // mongodb multiple layer problem
    if (key.indexOf('_') > 0) {
      filters[JSON.parse(JSON.stringify(key).replace(/_/g, '.'))] =
        filters[key];
      delete filters[key];
    }
  });

  return filters;
};

export { filterInputFormatter };
