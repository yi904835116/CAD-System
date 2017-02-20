"use strict";
var CanvasController = (function () {
    function CanvasController(model, CanvasView) {
        this.model = model;
        this.CanvasView = CanvasView;
    }
    CanvasController.prototype.addShape = function () {
    };
    CanvasController.prototype.deleteShape = function () {
    };
    CanvasController.prototype.moveShape = function () {
    };
    return CanvasController;
}());
exports.CanvasController = CanvasController;
var TextController = (function () {
    function TextController(game, textView) {
        this.game = game;
        this.textView = textView;
    }
    TextController.prototype.editShape = function (jsonObject) {
    };
    return TextController;
}());
exports.TextController = TextController;
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
