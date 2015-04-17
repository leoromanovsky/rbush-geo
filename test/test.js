'use strict';

/*eslint key-spacing: 0, comma-spacing: 0, quotes: 0*/

var rbushGeo = require('../rbush_geo.js'),
    t = require('tape');

function sortedEqual(t, a, b, compare) {
    t.same(a.slice().sort(compare), b.slice().sort(compare));
}

t('#all returns all points in the tree', function(t) {
    var data = [
      [37, -118, 1],
      [38, -118, 2],
      [39, -118, 3]
    ];
    var tree = rbushGeo(4);
    tree.load(data);
    var result = tree.all();

    var expected = [
      {latitude: 37, longitude: -118, id: 1},
      {latitude: 38, longitude: -118, id: 2},
      {latitude: 39, longitude: -118, id: 3}
    ];
    sortedEqual(t, result, expected);

    t.end();
});

t('#search returns an empty array for empty cache', function (t) {
    var result = rbushGeo(4).load([]).search([200, 200], [210, 210]);

    t.same(result, []);
    t.end();
});

t('#search returns results', function (t) {
  var data = [
    [37, -118, 1],
    [38, -118, 2],
    [39, -118, 3]
  ];

  var result = rbushGeo(4).load(data).search([35, -119], [38.5, -118]);

  var expected = [
    {latitude: 37, longitude: -118, id: 1},
    {latitude: 38, longitude: -118, id: 2}
  ];

  t.same(result, expected);
  t.end();
});

t('#nearest returns an empty array for empty cache', function (t) {
    var result = rbushGeo(4).load([]).nearest(30, 30, 2);

    t.same(result, null);
    t.end();
});

t('#nearest returns the closest point', function (t) {
    var data = [
      [30, -100, 1],
      [35, -100, 2],
      [50, -100, 3]
    ];

    var result = rbushGeo(4).load(data).nearest(32, -100, 1);

    t.same(result, {latitude: 30, longitude: -100, id: 1});
    t.end();
});

t('#distance returns simple result', function (t) {
    var result = rbushGeo(4)._distance([0, 100], [0, 50]);

    t.same(result, 50);
    t.end();
});
