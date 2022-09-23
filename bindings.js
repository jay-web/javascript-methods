let exampleObject = {firstName: "jay"};

let exampleFunction = function(...args)  {
    console.log(this.firstName, ...args)
}
// ! Note - DON'T USE THE ARROW FUNCTION FOR BINDING

// * Three ways to bind the function with object are :-

/* 
* First - call -  function.call(thisContext, ...args); - it will call the original function with
* thisContext bound to the function this key word. Passing all the remaining arguments as individual arguments to the function
*/

Function.prototype.myCall = function(thisObject, ...args)  {
    let symbol = Symbol();              // to get unique value;
    thisObject[symbol] = this;          // create the new property in object and save this function as value;
    let returnValue = thisObject[symbol](...args);   // call the function with arguments
    delete thisObject[symbol];          // return the newly created property as we don't want to mutate object

    return returnValue;         // return the value received from function called

}

/* 
* Second - apply -  function.apply(thisContext, args=[]); - it will call the original function with
* thisContext bound to the function 'this' key word. 
* Passing all the remaining arguments array as individual arguments to the function

*/
Function.prototype.myApply = function(thisObject, args = []){
    return this.myCall(thisObject, ...args);
}


/* 
* Third - bind - function.bind(thisContext, args=[]); - it will return new function with
* thisContext bound to the function 'this' key word.
* new functin will accept optional arguments, which will passed the original function
* after the arguments passed in bind function
*/

Function.prototype.myBind = function(thisObject, ...args){
    return (...newArguments) => this.apply(thisObject, [...args, ...newArguments]);
}
// ? TESTING ------

exampleFunction.myCall(exampleObject, "kumar", "sharma")

exampleFunction.myApply(exampleObject, ["kumar", "sharma"]);

let functionAfterBinding = exampleFunction.myBind(exampleObject, "kumar", "sharma");

functionAfterBinding("is a software engineer")