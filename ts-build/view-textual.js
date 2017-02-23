"use strict";
var View = (function () {
    // constructor(private model: Model) {
    function View(subject) {
        var _this = this;
        // readonly textWindow = $("#form-control");
        this.textWindow = document.getElementById("form-control");
        // readonly updateButton = $("#update");
        this.updateButton = document.getElementById("update");
        this.subject = subject;
        this.subject.registerObserver(this);
        // this.updateButton.click(function () {
        // this.updateModification();
        // console.log("text is " + $("#form-control").val());
        // let value: string = $("#form-control").val();
        // let jsonObject: JSON = JSON.parse(value);
        // console.log("JSON is" + jsonObject);
        // });
        this.updateButton.addEventListener('click', function (e) { _this.handleEventUpdate(e); });
    }
    View.prototype.setController = function (ctrl) {
        this.ctrl = ctrl;
    };
    View.prototype.handleEventUpdate = function (event) {
        console.log("text is " + $("#form-control").val());
        var value = $("#form-control").val();
        var jsonObject = JSON.parse(value);
        console.log("JSON is" + jsonObject);
    };
    // update modification          
    View.prototype.update = function (shapes) {
        var stringSum = "";
        for (var i = 0; i < shapes.length; i++) {
            var shapeString = JSON.stringify(shapes[i]);
            stringSum += shapeString + "\n";
        }
        $("#form-control").val(stringSum);
        console.log($("#form-control").val());
    };
    return View;
}());
exports.View = View;
