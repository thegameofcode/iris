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

  module('Module Util', {
      setup: function() {
          iris._reset();
          iris.enableLog(false);
          createLocales();
      },
      teardown: function () {
          clearBody();
      }
  });

  function createLocales () {

    iris.locale(
      "en_US", {
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dateFormat: "m/d/Y h:i:s",
        currency: {
          formatPos: "s n",
          formatNeg: "(s n)",
          decimal: ".",
          thousand: ",",
          precision: 2,
          symbol : "$"
        },
        number : {
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
          formatPos: "n s",
          formatNeg: "- n s",
          decimal: ",",
          thousand: ".",
          precision: 2,
          symbol : "€"
        },
        number : {
          decimal: ",",
          thousand: ".",
          precision: 2
        }
      }
    );

  }

  function clearBody() {
      var irisGeneratedCode = $("#start_iris").nextAll();
      if (irisGeneratedCode !== undefined) {
          irisGeneratedCode.remove();
      }
  }

/*
  test("Date format", function() {
    stop();

    iris.locale("es_ES");
    var date = 1331954654564;
    var formatted = iris.date(date, "d/m/y h:i:s");
    strictEqual(formatted, "17/03/12 04:24:14", "Custom DateFormat");

    start();

  });
*/

  test("Currency format", function() {
    stop();

    iris.locale("en_US");
    var amount = 1234.559;
    var formatted = iris.currency(amount);
    strictEqual(formatted, "$ 1,234.56", "Default currency format");
    
    amount = 1234.559;
    iris.locale("es_ES");
    formatted = iris.currency(amount);
    strictEqual(formatted, "1.234,56 €", "Currency Spanish Format");


    iris.locale("en_US");
    formatted = iris.currency(amount);
    strictEqual(formatted, "$ 1,234.56", "Currency USA Format");

    start();

  });

  test("Currency with custom format", function() {
    stop();

    var amount = 1234.559;
    var formatted = iris.currency(amount, {
      formatPos: "n s",
      formatNeg: "- n s",
      symbol : "€"
    });
    strictEqual(formatted, "1,234.56 €", "Custom currency format");

    start();

  });

  test("With precision zero", function() {
    stop();

    var amount = 1234567.959;
    var formatted = iris.currency(amount, {
      formatPos: "n s",
      formatNeg: "- n s",
      symbol : "€",
      precision: 0
    });
    strictEqual(formatted, "1,234,567 €", "Custom currency format with precision zero");

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
        },
        number : {
          decimal: ",",
          thousand: ".",
          precision: 2
        }
    });

    iris.locale("custom-locale");

    formatted = iris.currency(amount);
    strictEqual(formatted, "1.234.567", "Precision zero without symbol");

    formatted = iris.currency(-amount);
    strictEqual(formatted, "-1.234.567", "Precision zero without symbol");

    formatted = iris.currency(-amount, {
      formatPos: "n s",
      formatNeg: "(n) s",
      symbol : "¥",
      precision: 0
    });
    strictEqual(formatted, "(1.234.567) ¥", "Precision zero with custom symbol");

    start();
  });

  test("Number format", function() {
    stop();

    var num = -3456123.89866;
    var formatted = iris.number(num);
    strictEqual(formatted, "- 3,456,123.90", "Custom number format");

    start();
  });

  test("Number with custom format", function() {
    stop();

    var format = {
      decimal: ",",
      thousand: ".",
      precision: 4
    };

    var num = -3456123.89866;
    var formatted = iris.number(num, format);
    strictEqual(formatted, "- 3.456.123,8987", "Custom number format");

    start();
  });

  test("Number with regional format", function() {
    stop();

    iris.locale("custom",{
      number:{
        decimal: ",",
        thousand: ".",
        precision: 1
      }
    });
    iris.locale("custom");

    var num = -6123.89866;
    var formatted = iris.number(num);
    strictEqual(formatted, "- 6.123,9", "Custom number format");

    start();
  });

  test("Get Object Value", function() {
    stop();

    var test = {p1:{p2:{p3:"value"}}};
    var value = iris.val(test, "p1.p2.p3");
    strictEqual(value, "value", "Object value should be the same");

    start();
  });

}(jQuery));