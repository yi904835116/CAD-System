import { DrawableShape, Shape } from './shapes';
import { Model, Subject, Observer, } from './model';
import { TextController } from "./controller"

export class View implements Observer {
    subject: Subject;
    readonly updateButton = $("#update");

    constructor(private model: Model) {

        this.subject = model;
        this.subject.registerObserver(this);



        this.updateButton.click(function () {
            console.log("text is " + $("#form-control").val());
            this.updateModification();
        });
    }




    // update modification
    update(shapes: Shape[]) {
        let value: string = $("#form-control").val();
        let jsonObject: JSON = JSON.parse(value);
        console.log(jsonObject);
    }
}