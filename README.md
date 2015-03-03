# rbush-geo
Geo specific extensions for https://github.com/mourner/rbush

RBushGeo
=====

RBushGeo is a wrapper around RBush, a high-performance JavaScript library for 2D **spatial indexing** of points and rectangles by [Vladimir Agafonkin](http://github.com/mourner).

[![Build Status](https://travis-ci.org/leoromanovsky/rbush-geo.svg)](https://travis-ci.org/leoromanovsky/rbush-geo)

## Demos

TODO: Add a map demo here.

## Usage

### Creating a Tree

```js
var tree = rbush_geo(9);
```

An optional argument to `rbush_geo` defines the maximum number of entries in a tree node.
It drastically affects the performance, so you should adjust it
considering the type of data and search queries you perform.

### Adding and Removing Data

Insert an item:

```js
var item = [20, 40]; // [lat, lng]
tree.insert(item);
```

Clear all items:

```js
tree.clear();
```

### Data Format

RBushGeo assumes the format of data points to be `[lat, lng]`

### Bulk-Inserting Data

Bulk-insert the given data into the tree:

```js
// load(lat, lng)
tree.load([
	[10, 10],
	[12, 15],
	...
]);
```

Bulk insertion is usually ~2-3 times faster than inserting items one by one.
After bulk loading (bulk insertion into an empty tree), subsequent query performance is also ~20-30% better.

When you do bulk insertion into an existing tree, it bulk-loads the given data into a separate tree
and inserts the smaller tree into the larger tree.
This means that bulk insertion works very well for clustered data (where items are close to each other),
but makes query performance worse if the data is scattered.

### Search

```js
// search(southWest, northEast)
var result = tree.search([ [40, 20], [80, 70] ]);
```

Returns an array of data items (points or rectangles) that the given bounding box (`[minX, minY, maxX, maxY]`) intersects.

```js
var allItems = tree.all();
```

Returns all items of the tree.

## Development

```bash
npm install  # install dependencies
```

## Changelog

This project has not a formal release.
