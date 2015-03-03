/*
 (c) 2015, Leo Romanovsky
 RBushGeo
 https://github.com/leoromanovsky/rbush_geo

 Wrapper for https://github.com/mourner/rbush by Vladimir Agafonkin.
 */

(function () { 'use strict';

    function rbush_geo(maxEntries, format) {
        this._rbush = new rbush(maxEntries, format);
        console.log("rbush", this._rbush);

        if (!(this instanceof rbush_geo)) {
            return new rbush_geo(maxEntries, format);
        }

        this.clear();
    }

    rbush_geo.prototype = {
        all: function () {
            console.log("all");
            return this._rbush.all();
        },

        insert: function(lat, lng) {
            console.log("add", lat, lng);
            this._rbush.insert([lat, lng, lat, lng]);
        },

        /*
            data = [
                [lat, lng],
                [lat, lng
            ]
         */
        load: function(data) {
            console.log("load", data);

            var converted = [];
            data.forEach(function(d) {
               converted.push([d[0], d[1], d[0], d[1]]);
            });

            this._rbush.load(converted);
        },

        /*
        Search inside a bounding box.
         */
        search: function(minX, minY, maxX, maxY) {
            console.log("search", minX, minY, maxX, maxY);
            return this._rbush.search([minX, minY, maxX, maxY]);
        },

        clear: function() {
            console.log("clear", this._rbush);
            this._rbush.clear();
            return this;
        }
    }

    // export as AMD/CommonJS module or global variable
    if (typeof define === 'function' && define.amd) define('rbush_geo', function() { return rbush_geo; });
    else if (typeof module !== 'undefined') module.exports = rbush_geo;
    else if (typeof self !== 'undefined') self.rbush_geo = rbush_geo;
    else window.rbush_geo = rbush_geo;
})();
