/*
 (c) 2015, Leo Romanovsky
 RBushGeo
 https://github.com/leoromanovsky/rbush_geo

 Wrapper for https://github.com/mourner/rbush by Vladimir Agafonkin.
*/

(function () { 'use strict';

function rbush_geo(maxEntries, format) {
  if (!(this instanceof rbush_geo)) return new rbush_geo(maxEntries, format);
}

rbush_geo.prototype = {
  all: function () {
    console.log("all");
    return this._all(this.data, []);
  },

  _all: function (node, result) {
    console.log("_all");
    return [];
  },
}

// export as AMD/CommonJS module or global variable
if (typeof define === 'function' && define.amd) define('rbush_geo', function() { return rbush_geo; });
else if (typeof module !== 'undefined') module.exports = rbush_geo;
else if (typeof self !== 'undefined') self.rbush_geo = rbush_geo;
else window.rbush_geo = rbush_geo;

})();
