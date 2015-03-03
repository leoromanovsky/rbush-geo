'use strict';

/*eslint key-spacing: 0, comma-spacing: 0, quotes: 0*/

var rbushGeo = require('../rbush_geo.js'),
    t = require('tape');

function sortedEqual(t, a, b, compare) {
    t.same(a.slice().sort(compare), b.slice().sort(compare));
}

t('#all returns all points in the tree', function(t) {
    var data = [
      [37, -118],
      [38, -118],
      [39, -118]
    ];
    var tree = rbushGeo(4);
    tree.load(data);
    var result = tree.all();

    sortedEqual(t, result, data);

    t.end();
});
