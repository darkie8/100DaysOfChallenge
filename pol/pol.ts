const factorial = (n: number): number => {
    if(n === 0) {return 1}
    let total = 1;
    n = Math.abs(n);
    for(let i = 1; i <=n ; i++) {
        total = total * n;
        if(i === n) {
            return total;
        }
    }
}
interface indeterminate {
    value: string | indeterminate [];
    power: number;
    prefixConstant: number;
    carriesPrev?: indeterminate[];
}
class CreateIndeterminate implements indeterminate {
    value: string | indeterminate [];
    power: number;
    prefixConstant: number;
    carriesPrev = [];
    constructor(value: string | indeterminate[], power: number, prefixConstant: number, ...Prev: indeterminate[]) {
        this.value = value;
        this.power = power;
        this.prefixConstant = prefixConstant;
        Prev && Prev.length !== 0 && this.carriesPrev.push(...Prev);
    }
}
const combination = (n: number, r: number): number => {n= Math.abs(n); r = Math.abs(r); return factorial(n) / (factorial(n-r) * factorial(r))}
const POLMain = (power: number, ...indeterminateStrings: string[]) => {
    power = Math.abs(power);
    let final= [] as indeterminate[];
    const POL = (power: number, prev?: indeterminate ,...indeterminates: indeterminate[]) => {
        const a = indeterminates.shift();
        if(!a) {return}
        for(let i = 0; i <= power; i++) {
            // let na = new CreateIndeterminate(a.value, power - i , combination(power, i));
            // na.carriesPrev = a.carriesPrev || [];
            // prev && na.carriesPrev.push(prev);
            // console.log(na);
            
            // final.push(na);
            // if(i === power) {return}
            // POL(i, a, ...indeterminates)
            let na = new CreateIndeterminate(a.value, power - i , combination(power, i));
            na.carriesPrev = a.carriesPrev || [];
            prev && na.carriesPrev.push(prev);
        }
        } 

    
    POL(power, undefined, ...indeterminateStrings.map(el => (new CreateIndeterminate(el, power, 1))))
    return final;
}
(POLMain(2, 'a', 'b'))

let z  = document.getElementById('')
z.ondragstart = (ev) => {
setTimeout(() => {
    
}, 10);
}