"use strict";
require("autoresize-textarea");
var View = (function () {
    // autoResize(document.getElementById("form-control"));
    // constructor(private model: Model) {
    function View(subject) {
        var _this = this;
        this.textarea = document.querySelector('textarea');
        // readonly textWindow = $("#form-control");
        this.textWindow = document.getElementById("form-control");
        // readonly updateButton = $("#update");
        this.updateButton = document.getElementById("update");
        this.subject = subject;
        this.subject.registerObserver(this);
        $("#form-control");
        this.updateButton.addEventListener('click', function (e) { _this.handleEventUpdate(e); });
    }
    View.prototype.setController = function (ctrl) {
        this.ctrl = ctrl;
    };
    View.prototype.handleEventUpdate = function (event) {
        var lines = $('#form-control').val().split('\n');
        this.ctrl.updateModification(lines);
    };
    // update modification          
    View.prototype.update = function (shapes) {
        var stringSum = "";
        for (var i = 0; i < shapes.length; i++) {
            var shapeString = JSON.stringify(shapes[i]);
            stringSum += shapeString + "\n";
        }
        $("#form-control").val(stringSum);
        if (shapes.length >= 2) {
            $("#form-control").attr("rows", "" + shapes.length);
        }
        console.log($("#form-control").val());
    };
    return View;
}());
exports.View = View;
