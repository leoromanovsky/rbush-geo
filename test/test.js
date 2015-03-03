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

t('#search returns an empty array if nothing found', function (t) {
    var result = rbushGeo(4).load([]).search([200, 200], [210, 210]);

    t.same(result, []);
    t.end();
});

t('#search returns results', function (t) {
  var data = [
    [37, -118],
    [38, -118],
    [39, -118]
  ];

  var result = rbushGeo(4).load(data).search([35, -119], [38.5, -118]);

  t.same(result, [ [ 37, -118 ], [ 38, -118 ] ]);
  t.end();
});
