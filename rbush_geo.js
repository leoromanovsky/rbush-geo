/*
 (c) 2015, Leo Romanovsky
 RBushGeo
 https://github.com/leoromanovsky/rbushGeo

 Wrapper for https://github.com/mourner/rbush by Vladimir Agafonkin.
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
    }

    rbushGeo.prototype = {
        all: function () {
            return this._rbush.all().map(function(d) {
              return [d[0], d[1]];
            });
        },

        insert: function(lat, lng) {
            this._rbush.insert([lat, lng, lat, lng]);

            return this;
        },

        /*
            data = [
                [lat, lng],
                [lat, lng
            ]
         */
        load: function(data) {
            var converted = [];
            data.forEach(function(d) {
               converted.push([d[0], d[1], d[0], d[1]]);
            });

            this._rbush.load(converted);

            return this;
        },

        /*
        Search inside a bounding box.
         */
        search: function(sw, ne) {
            return this._rbush.search([sw[0], sw[1], ne[0], ne[1]]).map(function(d) {
              return [d[0], d[1]];
            });
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
