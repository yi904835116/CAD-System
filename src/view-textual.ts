import { DrawableShape, Shape } from './shapes';
import { Model, Subject, Observer, } from './model';
import { TextController, TextSetter } from "./controller"

export class View implements Observer {
    subject: Subject;
    ctrl: TextSetter;

    // readonly textWindow = $("#form-control");
    readonly textWindow = document.getElementById("form-control");
    // readonly updateButton = $("#update");
    readonly updateButton = document.getElementById("update");

    // constructor(private model: Model) {
    constructor(subject: Subject) {
        this.subject = subject;
        this.subject.registerObserver(this);

        // this.updateButton.click(function () {
            // this.updateModification();
            // console.log("text is " + $("#form-control").val());
            // let value: string = $("#form-control").val();
            // let jsonObject: JSON = JSON.parse(value);

            // console.log("JSON is" + jsonObject);
        // });
        this.updateButton.addEventListener('click', (e) => { this.handleEventUpdate(e) });
    }

    setController(ctrl: TextController) {
        this.ctrl = ctrl;
    }


    handleEventUpdate(event: MouseEvent): void {
        console.log("text is " + $("#form-control").val());
        let value: string = $("#form-control").val();
        let jsonObject: JSON = JSON.parse(value);

        console.log("JSON is" + jsonObject);
    }

    // update modification          
    update(shapes: Shape[]) {
        let stringSum = "";
        for(let i = 0; i < shapes.length; i++){
            let shapeString = JSON.stringify(shapes[i]);
            stringSum += shapeString + "\n";
        }
        $("#form-control").val(stringSum);
        console.log($("#form-control").val());
    }
}