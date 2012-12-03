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

  test("Date format", function() {

    var date = "1331954654564";
    var formatted = iris.date(date, "d/m/y h:i:s");
    strictEqual(formatted, "17/03/12 04:24:14", "Custom DateFormat");

  });

  test("Currency format", function() {

    var amount = 1234.56;
    iris.locale("es-ES");
    var formatted = iris.currency(amount);
    strictEqual(formatted, "1.234,56", "Currency Spanish Format");


    iris.locale("en-US");
    formatted = iris.currency(amount);
    strictEqual(formatted, "1,234.56", "Currency USA Format");

  });

}(jQuery));