"use strict";
/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
var View = (function () {
    function View(model) {
        //event listeners (DOM for readability/speed)
        var _this = this;
        this.model = model;
        this.canvas = $('#graphics-view canvas')[0];
        this.brush = this.canvas.getContext('2d'); //will be correctly typed!
        this.updateButton = $("update");
        // connect with the model by following Observer
        this.subject = model;
        this.subject.registerObserver(this);
        this.canvas.addEventListener('mousedown', function (e) { _this.handleMouseDown(e); });
        this.canvas.addEventListener('mouseup', function (e) { _this.handleMouseUp(e); });
        this.canvas.addEventListener('mousemove', function (e) { _this.handleMove(e); });
        var optionButtons = $("#graphics-view input:radio");
        this.action = optionButtons.val(); //current (initial) selection    
        optionButtons.change(function (e) { _this.action = $(e.target).val(); console.log(_this.action); }); //update action
        //responsive canvas
        $(window).resize(function () { _this.resizeCanvas(); }); //call function on window resize
        this.resizeCanvas(); //initial sizing
    }
    // ?????
    View.prototype.update = function () {
        //update the display
        this.display();
    };
    View.prototype.display = function () {
        //erase canvas
        this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var shapes = this.model.getShapes(); //read from the model   should change to controller
        //draw all the shapes!
        for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var shape = shapes_1[_i];
            shape.draw(this.brush);
        }
    };
    View.prototype.handleMouseDown = function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        if (this.action === 'move') {
            this.selected = this.model.getShapeAt(x, y); // should change to controller
        }
        else if (this.action === 'delete') {
            //TODO: delete shape at x,y coordinates
            this.model.deleteShape(x, y);
            this.display();
        }
        else {
            //TODO: create shape (based on action) at x,y coordinates
            console.log("The action is " + this.action);
            this.model.addShape(this.action, x, y);
            this.display();
        }
    };
    View.prototype.handleMouseUp = function (event) {
        this.selected = undefined;
    };
    View.prototype.handleMove = function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        if (this.selected) {
        }
    };
    //make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
    View.prototype.resizeCanvas = function () {
        var ratio = 1; //4/3;
        var canvasElem = $(this.canvas);
        canvasElem.attr('width', canvasElem.parent().width());
        canvasElem.attr('height', ratio * canvasElem.width());
        this.display();
    };
    return View;
}());
exports.View = View;
