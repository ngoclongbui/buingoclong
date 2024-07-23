// # Task

// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

var sum_to_n_a = function (n) {
  // using math formula
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  // using loop
  var result = 0;
  var index = n;
  do {
    result += index;
    index--;
  } while (index === 1);
  return result;
};

var sum_to_n_c = function (n) {
  // using functional programming
  return [...Array(n + 1).keys()].reduce((sumIdx, number) => sumIdx + number, 0);
};
