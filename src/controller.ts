import { View } from "./view-canvas";
import { Model, Subject, Observer } from './model';

export interface CanvasSetter {
    addShape();
    deleteShape();

}

export interface TextSetter {
    editShape(jsonObject: JSON);
}

export class CanvasController implements CanvasSetter {

    constructor(private model: Model, private CanvasView: View ) { }

    addShape() {

    }

    deleteShape() {

    }

    moveShape(){

    }
}

export class TextController implements TextSetter {

    constructor(private game: Model, private textView: View ) { }

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