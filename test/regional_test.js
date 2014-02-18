/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('Module Regional', {
      setup: function() {
          iris._reset();
          iris.enableLog(false);
      },
      teardown: function () {
          clearBody();
      }
  });

  function clearBody() {
      var irisGeneratedCode = $("#start_iris").nextAll();
      if (irisGeneratedCode !== undefined) {
          irisGeneratedCode.remove();
      }
  }

  test("Regional Test", function() {
    //stop();

    var testRegional = {
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      dateFormat: "d/m/Y H:i:s",
      currency: {
        formatPos: "n",
        formatNeg: "-n",
        decimal: ",",
        thousand: ".",
        precision: 2
      }
    };

    iris.locale("locale-test", testRegional);
    iris.locale("locale-test");

    //strictEqual(iris.locale(), "locale-test", "The locale must be locale-test because it's the first regional set");

    deepEqual(iris.regional(), testRegional);

    //start();
  });

}(jQuery));