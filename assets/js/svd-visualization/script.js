"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatrix = setMatrix;

var _chart = require("./chart.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var vectors = [{
  vector: [1, 1]
}, {
  vector: [1, .5]
}, {
  vector: [1, 0]
}, {
  vector: [1, -.5]
}, {
  vector: [1, -1]
}, {
  vector: [.5, 1]
}, {
  vector: [0, 1]
}, {
  vector: [-.5, 1]
}, {
  vector: [.5, -1]
}, {
  vector: [0, -1]
}, {
  vector: [-.5, -1]
}, {
  vector: [-1, 1]
}, {
  vector: [-1, .5]
}, {
  vector: [-1, 0]
}, {
  vector: [-1, -.5]
}, {
  vector: [-1, -1]
}];

function colorGradient2D(x, y) {
  return [Math.round(255 * ((y + 1) / 2)), Math.round(255 * (1 - (y + x + 2) / 4)), Math.round(255 * ((x + 1) / 2))];
}

for (var i = 0; i < vectors.length; i++) {
  vectors[i].color = colorGradient2D.apply(void 0, _toConsumableArray(vectors[i].vector));
}

var chart = new _chart.Chart({
  elem: d3.select(".chart"),
  width: 600,
  height: 450,
  xlim: [-6, 6],
  ylim: [-4.5, 4.5]
});

function update(data) {
  var transformedData = vectors.map(function (d, i) {
    var d2 = Object.assign({}, d);
    d2.vector = numeric.dot(d.vector, numeric.transpose(data));
    return d2;
  });
  chart.setData(transformedData).draw();
}

function updateReset() {
  update(mat.data);
}

function updateSVD(data) {
  var svd = numeric.svd(data);

  if (numeric.sum(numeric.lt(svd.U, 0)) + numeric.sum(numeric.lt(svd.V, 0)) > numeric.sum(numeric.gt(svd.U, 0)) + numeric.sum(numeric.gt(svd.V, 0))) {
    svd.U = numeric.neg(svd.U);
    svd.V = numeric.neg(svd.V);
  }

  U.setData(svd.U).draw();
  S.setData(numeric.diag(svd.S)).draw();
  V.setData(numeric.transpose(svd.V)).draw();
}

var mat = new _chart.Matrix({
  elem: d3.select("#M"),
  editable: true
});
mat.addEventListener("input", function () {
  update(mat.data);
  updateSVD(mat.data);
});
mat.setData([[1, 0], [0, 1]]).draw();
var U = new _chart.Matrix({
  elem: d3.select("#U")
});
var S = new _chart.Matrix({
  elem: d3.select("#S")
});
var V = new _chart.Matrix({
  elem: d3.select("#V")
});
var E = d3.selectAll(".matrix-vector");
E.on("mouseenter", function () {
  update([[1, 0], [0, 1]]);
});
V.div.on("mouseenter", function () {
  update(V.data);
});
S.div.on("mouseenter", function () {
  update(numeric.dot(S.data, V.data));
});
U.div.on("mouseenter", function () {
  update(mat.data);
});
mat.div.on("mouseenter", function () {
  update(mat.data);
});
E.on("mouseleave", updateReset);
V.div.on("mouseleave", updateReset);
S.div.on("mouseleave", updateReset);
U.div.on("mouseleave", updateReset);
mat.div.on("mouseleave", updateReset);
update(mat.data);
updateSVD(mat.data);

function setMatrix(data) {
  mat.setData(data).draw();
  update(mat.data);
  updateSVD(mat.data);
}

var presets = d3.selectAll("a[data-matrix]").on("click", function () {
  var matrix = JSON.parse(this.dataset.matrix);
  setMatrix(matrix);
});