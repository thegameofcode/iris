
(function($) {
  "use strict";

  /**
   * Settable class to manage object configurations.
   */
  var Settable = function() {
      this.cfg = {};
  };

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
