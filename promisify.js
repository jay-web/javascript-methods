/* 
* Write a promisify function (similar to the util.promisify Node.js function) that takes in a required
* callback function and returns a new "promisifed" version of that function.
* The callback function can take in any number of parameters, but its last parameter is guaranteed
* to be another callback function, which takes in two parameters: an error and a value. We'll call this
 * other callback function handleErrorAndValue for simplicity.
*/

function promisify(callback){
    return function(...args){
        return new Promise((resolve, reject) => {
            function handleErrorAndValue(error, value){
                if(error == null){
                    resolve(value);
                }else{
                    reject(error);
                }
            }

            callback.call(this, ...args, handleErrorAndValue)
        })
    }
}


// ? ----TESTING

function adder(x, y, handleErrorAndValue){
    let sum = x + y;
    if(typeof sum !== 'number'){
        let error = new Error("Passed arguments are not the numbers");
        handleErrorAndValue(error, null)
    }else{
        handleErrorAndValue(null, sum);
    }
}


// ? Now create the promisify version of the above adder function

let adderWithPromisify = promisify(adder);

adderWithPromisify(15,25)
    .then((value) => console.log(value))
    .catch((error) => console.log(error.message));


adderWithPromisify(15,"jay")
    .then((value) => console.log(value))
    .catch((error) => console.log(error.message));