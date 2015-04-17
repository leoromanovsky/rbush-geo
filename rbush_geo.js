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
        nearest: function(lat, lng, k) {
          console.log(k);
          return [];
        },

        clear: function() {
            this._rbush.clear();
            return this;
        }
    };

    // export as AMD/CommonJS module or global variable
    if (typeof define === 'function' && define.amd) define('rbushGeo', function() { return rbushGeo; });
    else if (typeof module !== 'undefined') module.exports = rbushGeo;
    else if (typeof self !== 'undefined') self.rbushGeo = rbushGeo;
    else window.rbushGeo = rbushGeo;
})();
