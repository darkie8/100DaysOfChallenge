
class pixel {
    weight: number;
    axis: 1 | -1 | 2 | -2;
    char: string;
    constructor(weight: number, axis: 1 | -1 | 2 | -2, char: string) {
        this.weight = weight;
        this.axis = axis;
        this.char = char;
    }
}
// maze class
class Maze {
    private x: number;// maze width
    private decrement: number // difference between two maze walls
    private neo = 0; // maze width decrement
    private mid: number; // middle of the width
    private InstructionArray: (pixel | undefined)[][]
    constructor (x: number, decrement: number) {
        this.x = x;
        this.mid = Math.floor(this.x/2);
        this.decrement = decrement;
        this.InstructionArray = []; // maze instruction array initiation
        this.create2dInstructionArray(); // maze instruction array structure creation  
        this.createMaze(this.neo); // craete maze withing the instruction array
    }
    private create2dInstructionArray (): void {
        this.InstructionArray = new Array(this.x);
        for(let i = 0; i < this.x; i ++) {
            let m = new Array(this.x);
            for(let j = 0; j <this.x; j++) {
              m.splice(j, 1, undefined);
            }
            this.InstructionArray[i] = m;
        }
        
        
    }
    private createMaze (neo: number): void {
      // creating shell based structure and filling up with the pixel object
      // neo defines the differnce from outside wall to the current maze wall
        for(let i = neo ;i < this.x; i++) {
          // filling left down maze wall
            if(neo > 0) {  // filling other wall
                this.InstructionArray[i][neo] = new pixel(i + this.decrement - neo, -1, '@' );
             } else {  // filling outer most wall
            this.InstructionArray[i][neo] = new pixel(i + 1 - neo, -1, '@' );
            }
            // filling bottom maze wall
            this.InstructionArray[this.x - 1][i]  = new pixel(i - neo, 2, '@' );
            // filling right up maze wall
            this.InstructionArray[this.x - i - 1 + neo][this.x - 1] = new pixel(i - neo , 1, '@' );
             // filling up maze wall
            if(this.x -i > this.decrement || i < this.mid) { // only fill needed part
                this.InstructionArray[neo][this.x -i - 1 + neo] = new pixel(i - neo , -2, '@' );
            } ;
        }
        if(neo > 0 && neo < this.mid) {
           //connecting two walls
            for(let i = 1; i < this.decrement; i++)
            {
                this.InstructionArray[neo - i][neo] = new pixel(this.decrement - i, -1, '@' );
            }
        }
        this.x = this.x - this.decrement;
        this.neo = neo + this.decrement;
        this.x > this.decrement * 2  && this.createMaze(this.neo);
    }
    // returning raw object
    public value() : (pixel | undefined)[][] {
        return this.InstructionArray;
    }
    // returning characters positioning 
    public charvalue() : (string | undefined)[][] {
        return this.InstructionArray.map(row => {
            let q = row.map(el => (el?.char? el.char : el) as (string | undefined))
            return q;
        });
    }
    // returning numerical progression 
    public weightvalue() : (string | undefined)[][] {
        return this.InstructionArray.map(row => {
            let q = row.map(el => (el?.char? el.weight.toString() : el) as (string | undefined))
            return q;
        });
    }
   // returning axis information , 1 | -1  = X axis, 2 | -2 = Y axis
    public axisvalue() : (1 | -1 | 2 | -2 | undefined)[][] {
        return this.InstructionArray.map(row => {
            let q = row.map(el => (el?.char? el.axis : el) as (1 | -1 | 2 | -2 | undefined))
            return q;
        });
    }
    
}
const newMaze = new Maze(15,2); // new maze object creation
console.table(newMaze.charvalue());
console.table(newMaze.weightvalue());
console.table(newMaze.axisvalue());
const charels = newMaze.charvalue();
// using grid to create the maze DOM style
let colTot: string;
let gridWidth: number;
const mazeElemnt: string = charels.map(
  (row: string[], i) => {
    !colTot && (colTot = row.map(el => 'auto').join(' '), gridWidth = 200 * (15/ row.length));
    return `${row.map(el => `<div class="grid-item">${el? el : ''}</div>`).reduce((prev, acc) => (prev + acc))}`
  }
).reduce((prev, acc) => prev + acc);
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<div style="display: grid;
;grid-template-columns: ${colTot};grid-row-gap: 10px;width: ${gridWidth}px">${mazeElemnt}</div>`;


