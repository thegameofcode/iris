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

  module('Module Util');

  iris.locale(
      "en_US", {
          dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          dateFormat: "m/d/Y h:i:s",
          currency: {
              formatPos: "n",
              formatNeg: "(n)",
              decimal: ".",
              thousand: ",",
              precision: 2
          }
      }
  );

  iris.locale(
      "es_ES", {
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
      }
  );



  test("Date format", function() {
    iris.locale("es_ES");
    var date = 1331954654564;
    var formatted = iris.date(date, "d/m/y h:i:s");
    strictEqual(formatted, "17/03/12 04:24:14", "Custom DateFormat");

  });

  test("Currency format", function() {

    var amount = 1234.559;
    iris.locale("es_ES");
    var formatted = iris.currency(amount);
    strictEqual(formatted, "1.234,56", "Currency Spanish Format");


    iris.locale("en_US");
    formatted = iris.currency(amount);
    strictEqual(formatted, "1,234.56", "Currency USA Format");

  });

  test("Currency with custom format", function() {

    iris.locale(
      "custom-locale", {
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        dateFormat: "d/m/Y H:i:s",
        currency: {
            formatPos: "n",
            formatNeg: "-n",
            decimal: ",",
            thousand: ".",
            precision: 0
        }
    });

    iris.locale("custom-locale");

    var amount = 34.818;
    var formatted = iris.currency(amount);
    strictEqual(formatted, "35", "Precision zero");

  });

  test("Get Object Value", function() {
    var test = {p1:{p2:{p3:"value"}}};
    var value = iris.val(test, "p1.p2.p3");
    strictEqual(value, "value", "Object value should be the same");
  });

}(jQuery));