let message = "Hello";
//Javascript is dynamic type
//typescript is static type

message = 2; // change type it valid

let age = 20;
let isActive = true;
let number = [1,2,3];

/*
Javasctript vs type script
1) Static Type
    Javascript is dynamic type
    typescript is static type
2) Run typescript:
    - tsc demo1.ts : compile and convert into javascript
    - node demo1.js : than run js file
    typescript = js + Additional features

*/

function add(a,b) {
    return a+b;
}

add(3,"4");

let user ={name:"Jay",age:35};

user.location= "ahmedabad";