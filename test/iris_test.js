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

  /*module('jQuery#awesome', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.awesome(), this.elems, 'should be chaninable');
  });

  test('is awesome', 1, function() {
    strictEqual(this.elems.awesome().text(), 'awesomeawesomeawesome', 'should be thoroughly awesome');
  });

  module('jQuery.awesome');

  test('is awesome', 1, function() {
    strictEqual($.awesome(), 'awesome', 'should be thoroughly awesome');
  });

  module(':awesome selector', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is awesome', 1, function() {
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':awesome').get(), this.elems.last().get(), 'knows awesome when it sees it');
  });

  module('jQuery#awesome', {
    setup: function() {
      //this.elems = $('#qunit-fixture').children();
    }
  });*/


  test( "Iris lang load", function() {

    iris.lang.Load("es-ES", {TEST:{LABEL:"VALUE"}});

    var translated = iris.lang.Get("TEST.LABEL");
    strictEqual( translated, "VALUE", "Should get a lang value" );

    iris.lang.Locale("en-US");
    translated = iris.lang.Get("TEST.LABEL");
    strictEqual( translated, "??TEST.LABEL??", "Should get a non created value" );

  });

  test( "Iris date format", function() {

    var date = "1331954654564";
    var formatted = iris.util.DateFormat(date, "d/m/y h:i:s");
      strictEqual( formatted, "17/03/12 04:24:14", "Custom DateFormat" );
  });

  test( "Iris currency format", function() {

      var amount = 1234.56;
      iris.lang.Locale("es-ES");
      formatted = iris.util.Currency(amount);
      strictEqual( formatted, "1.234,56", "Currency Spanish Format" );
      

      iris.lang.Locale("en-US");
      formatted = iris.util.Currency(amount);
      strictEqual( formatted, "1,234.56", "Currency USA Format" );

  });

}(jQuery));
