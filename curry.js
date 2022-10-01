
function sum(a, b, c){
    return a + b + c;
}
// * Basic curry function
function curry(func){
    return function(a){
        return function(b){
            return function(c){
                return func(a, b, c);
            }
        }
    }
}

let addSum = curry(sum);
console.log("Basic Curry function ", addSum(2)(7)(9));


// * === Advance Curry function ===

/* 
 *   Curry function that takes in a required callback function and returns a curried version of
 *   that function. This callback function can take in any number of arguments, including none at all.
 *   If the curried function is called with arguments, it should return a new function, which can be called
 *   with more arguments, to be passed to the underlying callback .
 *   If the curried function (or one of the returned new functions) is called with no arguments, this should
 *   be considered the end of the curried function calls, and the callback should be called with every
 *   argument that was passed, in the correct order.
*/

function advancedCurry(callback){
    
    let curriedFunction = (...args) => {
        if(args.length == 0){
            return callback();
        }

        return (...otherArgs)=> {
            if(otherArgs.length == 0){
                return callback(...args);
            }

            return curriedFunction(...args, ...otherArgs);
        }
    }

    return curriedFunction;
}


// * callback function to test advanceCurry function

const reducerSum = (...numbers) => {
   return numbers.reduce((total, number) => {
        return total + number;
    }, 0)
}
let cf = advancedCurry(reducerSum);
console.log("Advance Curry function ");
console.log(cf());                          // * return 0
console.log(cf(10)())                         // * return 10
console.log(cf(10)(12)())                       // * return 22
console.log(cf(10)(12)(12, 25)())               // * return 59
console.log(cf(10)(12)(12, 25))                     // * return function