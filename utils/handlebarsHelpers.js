const ifHelper = function (a, operator, b, opts) {
  let bool = false;
  switch (operator) {
    case '==':
      bool = a == b;
      break;
    case '>':
      bool = a > b;
      break;
    case '<':
      bool = a < b;
      break;
    default:
      throw 'Unknown operator ' + operator;
  }

  if (bool) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
};

module.exports = {
  ifHelper,
};
