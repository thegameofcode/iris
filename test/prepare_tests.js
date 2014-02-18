
// When testMode is true, all reset functions are registered
window.testMode = true;

var resetFunctions = [];

// Register an iris reset function
window.addIrisReset = function (fn) {
  resetFunctions.push(fn);
};

// Call to all registered reset functions
window.resetIris = function () {
  for (var i = 0; i < resetFunctions.length; i++) {
      resetFunctions[i]();
  }
};
