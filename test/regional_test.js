/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  var iris = window.iris;

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


  test("Regional Test", function() {
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

    iris.regional("locale-test", testRegional);

    iris.locale("locale-test");

    deepEqual(iris.regional(), testRegional);

    deepEqual(iris.regional("currency"), testRegional.currency);


  });

}(jQuery));