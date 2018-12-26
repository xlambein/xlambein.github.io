"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix = exports.Chart = void 0;

var _scrub = require("./scrub.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// The following class comes from
// https://stackoverflow.com/a/24216547
var Emitter = function Emitter() {
  var _this = this;

  _classCallCheck(this, Emitter);

  var delegate = document.createDocumentFragment();
  ['addEventListener', 'dispatchEvent', 'removeEventListener'].forEach(function (f) {
    return _this[f] = function () {
      return delegate[f].apply(delegate, arguments);
    };
  });
};

var Chart =
/*#__PURE__*/
function () {
  function Chart(opts) {
    _classCallCheck(this, Chart);

    this.margin = opts.margin || {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
    this.width = opts.width - this.margin.left - this.margin.right;
    this.height = opts.height - this.margin.top - this.margin.bottom;
    this.xlim = opts.xlim || [-1, 1];
    this.ylim = opts.ylim || [-1, 1];
    this.xscale = d3.scaleLinear().domain(this.xlim).range([0, this.width]);
    this.yscale = d3.scaleLinear().domain(this.ylim).range([this.height, 0]);
    this.chart = opts.elem.append("svg").attr("width", this.width + this.margin.left + this.margin.right).attr("height", this.height + this.margin.top + this.margin.bottom).append("g").attr("transform", "translate(".concat(this.margin.left, ", ").concat(this.margin.top, ")"));
    var xaxis = d3.axisTop(this.xscale).tickSizeOuter(0),
        yaxis = d3.axisRight(this.yscale).tickSizeOuter(0);
    this.chart.append("g").attr("class", "axis").attr("transform", "translate(0, ".concat(this.height / 2, ")")).call(xaxis);
    this.chart.append("g").attr("class", "axis").attr("transform", "translate(".concat(this.width / 2, ", 0)")).call(yaxis);
    this.vectors = this.chart.append("g");
  }

  _createClass(Chart, [{
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var vectors = this.vectors.selectAll(".vector").data(this.data);
      vectors.exit().remove();
      vectors.enter().append("circle").attr("class", "vector").attr("fill", function (d) {
        return "rgb(".concat(d.color[0], ",").concat(d.color[1], ",").concat(d.color[2], ")");
      }).attr("cx", function (d) {
        return _this2.xscale(d.vector[0]);
      }).attr("cy", function (d) {
        return _this2.yscale(d.vector[1]);
      }).attr("r", "4px");
      vectors.transition().ease(d3.easeLinear).duration(200).attr("cx", function (d) {
        return _this2.xscale(d.vector[0]);
      }).attr("cy", function (d) {
        return _this2.yscale(d.vector[1]);
      });
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      return this;
    }
  }]);

  return Chart;
}();

exports.Chart = Chart;

var Matrix =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Matrix, _Emitter);

  function Matrix(opts) {
    var _this3;

    _classCallCheck(this, Matrix);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Matrix).call(this));
    _this3.div = opts.elem.attr("class", "matrix");
    _this3.table = _this3.div.append("table");
    _this3.editable = opts.editable || false;
    _this3.inputEvent = new Event("input");
    return _this3;
  }

  _createClass(Matrix, [{
    key: "draw",
    value: function draw() {
      this.table.data([this.data]);
      var tr = this.table.selectAll("tr").data(this.data);
      tr.exit().remove();
      tr = tr.enter().append("tr").merge(tr);
      var td = tr.selectAll("td").data(function (d) {
        return d;
      });
      td.exit().remove();

      if (this.editable) {
        td = td.enter().append("td").merge(td);
        var input = td.selectAll("input").data(function (d) {
          return [d];
        });
        input.exit().remove();
        var matrix = this;
        input = input.enter().append("input") //	.attr("type", "number")
        //	.attr("step", "0.1")
        //	.attr("min", "-5")
        //	.attr("max", "5")
        .on("input", function () {
          var val = parseFloat(this.value);
          d3.select(this).datum(Number.isNaN(val) ? 0 : val);
          matrix.setData(math.reshape(input.data(), math.size(matrix.data))).draw();
          matrix.dispatchEvent(matrix.inputEvent);
        }).on("scrub", function () {
          this.value = d3.event.detail.toFixed(2);
          d3.select(this).dispatch('input');
        }).each(function () {
          (0, _scrub.makeScrubbable)(this);
        }).merge(input).property("value", function (d) {
          return d.toFixed(2);
        });
      } else {
        td = td.enter().append("td").merge(td).text(function (d) {
          return d.toFixed(2);
        });
      }

      return this;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      return this;
    }
  }]);

  return Matrix;
}(Emitter);

exports.Matrix = Matrix;