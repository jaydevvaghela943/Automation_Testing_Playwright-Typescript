let message1:string = "Hello";
//strict type
//typescript is static type

let age1 : number = 20;
let isActive1:boolean = true;

let number1:number[] = [1,2,3];

let data:any = "this could be anything";
data = 42;

/*
Javasctript vs type script
1) Static Type
    Javascript is dynamic type
    typescript is static type
     Run typescript:
    - tsc demo1.ts : compile and convert into javascript
    - node demo1.js : than run js file
    typescript = js + Additional features

2) Strong Type
3) Type defination



*/

// define parameter stric type + return type
function add1(a:number,b:number):number {
    return a+b;
}

add1(3,4);


let user1:{name:string,age:number} ={name:"Jay",age:35}; 

//contract not define third parameter
//user1.location = "ahmedabad"
