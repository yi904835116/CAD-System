"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shapes_1 = require("./shapes");
/**
 * The CAD drawing model currently being created
 */
var Model = (function () {
    function Model() {
        this.shapes = [];
        this.observers = [];
        this.factory = new ShapeFactory();
    }
    Model.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    Model.prototype.removeObserver = function (deleted) {
        //remove from array (e.g,. with lodash)
        this.observers = this.observers.filter(function (ele) { return ele != deleted; });
    };
    // 
    Model.prototype.notifyAll = function () {
        var _this = this;
        this.observers.forEach(function (observer) {
            observer.update(_this.shapes);
            // observer.update();
        });
    };
    Model.prototype.getShapes = function () {
        return this.shapes;
    };
    Model.prototype.getShapeAt = function (x, y) {
        var found;
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            if (shape.contains(x, y)) {
                found = shape;
            }
        }
        return found; //return last shape
    };
    Model.prototype.addShape = function (type, xCor, yCor) {
        if (type != null) {
            var shape = void 0;
            switch (type) {
                case "circle":
                    shape = this.factory.createCircle(xCor, yCor);
                    break;
                case "rectangle":
                    shape = this.factory.createRectangle(xCor, yCor);
                    break;
                case "triangle":
                    shape = this.factory.createTriangle(xCor, yCor);
                    break;
                default:
                    console.log("invalid shape type");
            }
            this.shapes.push(shape);
        }
        this.notifyAll();
    };
    Model.prototype.deleteShape = function (x, y) {
        var _this = this;
        this.shapes = this.shapes.filter(function (ele) { return ele != _this.getShapeAt(x, y); });
    };
    Model.prototype.editShape = function (x, y, json) {
        var edited = this.getShapeAt(x, y);
    };
    return Model;
}());
exports.Model = Model;
//an interface for a complex factory
var Factory = (function () {
    function Factory() {
    }
    return Factory;
}());
//a concrete class that implements the Factory
var ShapeFactory = (function (_super) {
    __extends(ShapeFactory, _super);
    // private TRIAN_HEIGHT = 40;
    // private TRIAN_EDGE = 40;
    function ShapeFactory() {
        var _this = _super.call(this) || this;
        _this.DEFAULT_RADIUS = 40;
        _this.DEFAULT_WIDTH = 60;
        _this.DEFAULT_HEIGHT = 60;
        return _this;
    }
    ShapeFactory.prototype.createRectangle = function (cx, cy) {
        return new shapes_1.Rectangle(cx, cy, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
    };
    ShapeFactory.prototype.createCircle = function (cx, cy) {
        return new shapes_1.Circle(cx, cy, this.DEFAULT_RADIUS);
    };
    ShapeFactory.prototype.createTriangle = function (cx, cy) {
        return new shapes_1.Triangle(cx, cy, cx - 0.5 * this.DEFAULT_WIDTH, cy - this.DEFAULT_HEIGHT, cx + 0.5 * this.DEFAULT_WIDTH, cy - this.DEFAULT_HEIGHT);
    };
    return ShapeFactory;
}(Factory));
