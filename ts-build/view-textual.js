"use strict";
var View = (function () {
    function View(model) {
        this.model = model;
        this.updateButton = $("#update");
        this.subject = model;
        this.subject.registerObserver(this);
        this.updateButton.click(function () {
            console.log("text is " + $("#form-control").val());
            this.updateModification();
        });
    }
    // update modification
    View.prototype.update = function (shapes) {
        var value = $("#form-control").val();
        var jsonObject = JSON.parse(value);
        console.log(jsonObject);
    };
    return View;
}());
exports.View = View;
