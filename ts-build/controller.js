"use strict";
var CanvasController = (function () {
    function CanvasController(model, CanvasView) {
        this.model = model;
        this.CanvasView = CanvasView;
    }
    CanvasController.prototype.addShape = function (action, x, y) {
        this.model.addShape(action, x, y);
    };
    CanvasController.prototype.moveShape = function (shape, x, y) {
        this.model.moveShape(shape, x, y);
    };
    CanvasController.prototype.deleteShape = function (x, y) {
        this.model.deleteShape(x, y);
    };
    CanvasController.prototype.getShape = function (x, y) {
        return this.model.getShapeAt(x, y);
    };
    return CanvasController;
}());
exports.CanvasController = CanvasController;
var TextController = (function () {
    function TextController(model, textView) {
        this.model = model;
        this.textView = textView;
    }
    TextController.prototype.editShape = function (jsonObject) {
    };
    TextController.prototype.updateModification = function (changes) {
        this.model.editShapes(changes);
    };
    return TextController;
}());
exports.TextController = TextController;
