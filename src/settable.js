(function($) {

  /**
   * Settable class to manage object configurations.
   */
  var Settable = function() {
      iris.Event.call(this);

      this.cfg = {};
  };

  iris.inherits(Settable, iris.Event);

  var pSettable = Settable.prototype;

  pSettable.settings = function(settings) {
    return $.extend(this.cfg, settings);
  };

  pSettable.setting = function(label, value) {
    if ( value === undefined ) {
      if ( !this.cfg.hasOwnProperty(label) ) {
        iris.log("setting '" + label + "' missing", this.cfg, this);
      }
      return this.cfg[label];
    } else {
      this.cfg[label] = value;
    }
  };

  iris.Settable = Settable;

})(jQuery);
