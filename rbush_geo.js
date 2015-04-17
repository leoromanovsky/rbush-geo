/*
 (c) 2015, Leo Romanovsky
 RBushGeo
 https://github.com/leoromanovsky/rbushGeo

 Wrapper and extensions for:
 https://github.com/mourner/rbush by Vladimir Agafonkin.
 */

(function () { 'use strict';
    var rbush;
    if (typeof module !== 'undefined') {
        rbush = require('rbush');
    } else {
        rbush = window.rbush;
    }

    function rbushGeo(maxEntries, format) {
        if (!(this instanceof rbushGeo)) {
            return new rbushGeo(maxEntries, format);
        }

        this._rbush = new rbush(maxEntries, format);

        this.clear();

        //return this._rbush;
    }

    rbushGeo.prototype = {
        all: function () {
            return this._rbush.all().map(function(d) {
              return {
                    latitude: d[0],
                    longitude: d[1],
                    id: d[4].id
              };
            });
        },

        insert: function(lat, lng, id) {
            this._rbush.insert([lat, lng, lat, lng, {id: id}]);

            return this;
        },

        /*
            data = [
                [lat, lng, id],
                [lat, lng, id]
            ]
         */
        load: function(data) {
            var converted = [];
            data.forEach(function(d) {
               converted.push([d[0], d[1], d[0], d[1], {id: d[2]}]);
            });

            this._rbush.load(converted);

            return this;
        },

        /*
        Search inside a bounding box.
         */
        search: function(sw, ne) {
            return this._rbush.search([sw[0], sw[1], ne[0], ne[1]]).map(function(d) {
              return {
                latitude: d[0],
                longitude: d[1],
                id: d[4].id
              };
            });
        },

        /*
        Find the k nearest objects to (lat, lng)
        */
        nearest: function(lat, lng) {
          var data = this.all();
          var len = data.length;

          if (len === 0) {
            return null;
          }

          var minDistance = this._distance([lat, lng], data[0]);
          var minDatum = data[0];
          var curDistance;

          for (var i = 1; i < len; i++) {
            curDistance = this._distance(minDistance, data[i]);
            if (curDistance < minDistance) {
              minDistance = curDistance;
              minDatum = data[i];
            }
          }

          return minDatum;
        },

        clear: function() {
            this._rbush.clear();
            return this;
        },

        /*
        point1 [lat, lng], point2 [lat, lng]
        */
        _distance: function(point1, point2) {
          var xs = 0;
          var ys = 0;

          xs = point2[0] - point1[0];
          xs = xs * xs;

          ys = point2[1] - point1[1];
          ys = ys * ys;

          return Math.sqrt(xs + ys);
      }
    };

    // export as AMD/CommonJS module or global variable
    if (typeof define === 'function' && define.amd) define('rbushGeo', function() { return rbushGeo; });
    else if (typeof module !== 'undefined') module.exports = rbushGeo;
    else if (typeof self !== 'undefined') self.rbushGeo = rbushGeo;
    else window.rbushGeo = rbushGeo;
})();
