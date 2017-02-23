import { DrawableShape, Shape } from './shapes';
import { Model, Subject, Observer, } from './model';
import { TextController, TextSetter } from "./controller"
import "autoresize-textarea";

export class View implements Observer {
    subject: Subject;
    ctrl: TextSetter;

    textarea = document.querySelector('textarea');

    // readonly textWindow = $("#form-control");
    readonly textWindow = document.getElementById("form-control");
    // readonly updateButton = $("#update");
    readonly updateButton = document.getElementById("update");
    // autoResize(document.getElementById("form-control"));


    // constructor(private model: Model) {
    constructor(subject: Subject) {
        this.subject = subject;
        this.subject.registerObserver(this);

        $("#form-control")
        this.updateButton.addEventListener('click', (e) => { this.handleEventUpdate(e) });
    }

    setController(ctrl: TextController) {
        this.ctrl = ctrl;
    }

    handleEventUpdate(event: MouseEvent): void {
        let lines = $('#form-control').val().split('\n');
        this.ctrl.updateModification(lines);
    }

    // update modification          
    update(shapes: Shape[]) {
        let stringSum = "";
        for (let i = 0; i < shapes.length; i++) {
            let shapeString = JSON.stringify(shapes[i]);
            stringSum += shapeString + "\n";
        }
        $("#form-control").val(stringSum);
        if (shapes.length >= 2) {
            $("#form-control").attr("rows", "" + shapes.length);
        }
        console.log($("#form-control").val());
    }
}