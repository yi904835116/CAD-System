import { View as CanvasView} from "./view-canvas";
import {    View as TextView} from './view-textual';
import { Model, Subject, Observer } from './model';
import { DrawableShape, Shape } from './shapes';

export interface CanvasSetter {
    addShape(action:string,x: number, y: number);
    deleteShape(x: number, y: number);
    moveShape(shape:Shape,x: number, y: number);
    getShape(x: number, y: number):Shape;
}

export interface TextSetter {
    editShape(jsonObject: JSON);
}

export class CanvasController implements CanvasSetter {

    constructor(private model: Model, private CanvasView: CanvasView) { }

    addShape(action:string,x: number, y: number) {
        this.model.addShape(action,x,y);
    }

    moveShape(shape:Shape,x: number, y: number) {
        this.model.moveShape(shape,x,y);
    }

    deleteShape(x: number, y: number){
        this.model.deleteShape(x,y);
    }

    getShape(x: number, y: number):Shape{
        return this.model.getShapeAt(x,y);
    }
}

export class TextController implements TextSetter {

    constructor(private game: Model, private textView: TextView) { }

    editShape(jsonObject: JSON) {

    }

}


// export class Controller {
//     constructor(private game: Model, private CanvasView: View, ) { }

//     //starts the game
//     play() {
//         this.view.printBoard();
//         this.takeTurn();
//     }

//     takeTurn() {
//         this.view.printPrompt();
//         io.question('> ', (input) => {
//             try {
//                 let cell = input.split(',');
//                 //make a move!
//                 let result = this.game.makeMove(Number(cell[0]), Number(cell[1]));
//                 if (result) { //legal move
//                     this.view.printBoard();
//                     if (this.game.getWinner() !== undefined) {
//                         this.view.printWinner(this.game.getWinner());
//                         io.close();
//                         return; //end
//                     }
//                 }
//             } catch (e) { } //for parsing errors

//             this.takeTurn(); //recurse!
//         })
//     }

//     addShape() {

//     }

//     deleteShape() {

//     }

//     editShape(){}

// }