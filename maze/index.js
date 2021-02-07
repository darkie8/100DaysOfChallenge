var pixel = /** @class */ (function () {
    function pixel(weight, axis, char) {
        this.weight = weight;
        this.axis = axis;
        this.char = char;
    }
    return pixel;
}());
// maze class
var Maze = /** @class */ (function () {
    function Maze(x, decrement) {
        this.neo = 0; // maze width decrement
        this.x = x;
        this.mid = Math.floor(this.x / 2);
        this.decrement = decrement;
        this.InstructionArray = []; // maze instruction array initiation
        this.create2dInstructionArray(); // maze instruction array structure creation  
        this.createMaze(this.neo); // craete maze withing the instruction array
    }
    Maze.prototype.create2dInstructionArray = function () {
        this.InstructionArray = new Array(this.x);
        for (var i = 0; i < this.x; i++) {
            var m = new Array(this.x);
            for (var j = 0; j < this.x; j++) {
                m.splice(j, 1, undefined);
            }
            this.InstructionArray[i] = m;
        }
    };
    Maze.prototype.createMaze = function (neo) {
        // creating shell based structure and filling up with the pixel object
        // neo defines the differnce from outside wall to the current maze wall
        for (var i = neo; i < this.x; i++) {
            // filling left down maze wall
            if (neo > 0) { // filling other wall
                this.InstructionArray[i][neo] = new pixel(i + this.decrement - neo, -1, '@');
            }
            else { // filling outer most wall
                this.InstructionArray[i][neo] = new pixel(i + 1 - neo, -1, '@');
            }
            // filling bottom maze wall
            this.InstructionArray[this.x - 1][i] = new pixel(i - neo, 2, '@');
            // filling right up maze wall
            this.InstructionArray[this.x - i - 1 + neo][this.x - 1] = new pixel(i - neo, 1, '@');
            // filling up maze wall
            if (this.x - i > this.decrement || i < this.mid) { // only fill needed part
                this.InstructionArray[neo][this.x - i - 1 + neo] = new pixel(i - neo, -2, '@');
            }
            ;
        }
        if (neo > 0 && neo < this.mid) {
            //connecting two walls
            for (var i = 1; i < this.decrement; i++) {
                this.InstructionArray[neo - i][neo] = new pixel(this.decrement - i, -1, '@');
            }
        }
        this.x = this.x - this.decrement;
        this.neo = neo + this.decrement;
        this.x > this.decrement * 2 && this.createMaze(this.neo);
    };
    // returning raw object
    Maze.prototype.value = function () {
        return this.InstructionArray;
    };
    // returning characters positioning 
    Maze.prototype.charvalue = function () {
        return this.InstructionArray.map(function (row) {
            var q = row.map(function (el) { return ((el === null || el === void 0 ? void 0 : el.char) ? el.char : el); });
            return q;
        });
    };
    // returning numerical progression 
    Maze.prototype.weightvalue = function () {
        return this.InstructionArray.map(function (row) {
            var q = row.map(function (el) { return ((el === null || el === void 0 ? void 0 : el.char) ? el.weight.toString() : el); });
            return q;
        });
    };
    // returning axis information , 1 | -1  = X axis, 2 | -2 = Y axis
    Maze.prototype.axisvalue = function () {
        return this.InstructionArray.map(function (row) {
            var q = row.map(function (el) { return ((el === null || el === void 0 ? void 0 : el.char) ? el.axis : el); });
            return q;
        });
    };
    return Maze;
}());
var newMaze = new Maze(15, 2); // new maze object creation
console.table(newMaze.charvalue());
console.table(newMaze.weightvalue());
console.table(newMaze.axisvalue());
var charels = newMaze.charvalue();
// using grid to create the maze DOM style
var colTot;
var gridWidth;
var mazeElemnt = charels.map(function (row, i) {
    !colTot && (colTot = row.map(function (el) { return 'auto'; }).join(' '), gridWidth = 200 * (15 / row.length));
    return "" + row.map(function (el) { return "<div class=\"grid-item\">" + (el ? el : '') + "</div>"; }).reduce(function (prev, acc) { return (prev + acc); });
}).reduce(function (prev, acc) { return prev + acc; });
var appDiv = document.getElementById('app');
appDiv.innerHTML = "<div style=\"display: grid;\n;grid-template-columns: " + colTot + ";grid-row-gap: 10px;width: " + gridWidth + "px\">" + mazeElemnt + "</div>";
