/* 
* Throttling is a technique in which, no matter how many times the user fires the event, 
* the attached function will be executed only once in a given time interval.
* when a user clicks on a button, a helloWorld function is executed which prints Hello, world on the console. 
* Now, when throttling is applied with 1000 milliseconds to this helloWorld function, 
* no matter how many times the user clicks on the button, Hello, world will be printed only once in 1000 milliseconds. 
* Throttling ensures that the function executes at a regular interval.
*/

const throttle = function(callback, delay){
    // ? TimerId variable to save the setTimeout function id
    let timerId;
     // ? Time when throttle function called ( to save that time), 
     // ? We assigning zero because we want to call function at first time
    let lastTimecalled = 0;  

    const throttleFunction =  function(...args){
        let currentTime = Date.now();           // ? time when throttle function called;
        let timeSincelastCalled = currentTime - lastTimecalled  // ? Time between lasttimecalled and currentTime
        let delayRemaining = delay - timeSincelastCalled    // ? Time remaining for another call of function
    

        // ? If delayRemaining left zero or less than , means to call the function
        if(delayRemaining <= 0){            
                lastTimeCalled = currentTime;
                callback.apply(this, args);
        }else{
            clearTimeout(timerId);
           timerId =  setTimeout(() => {
                lastTimeCalled = Date.now();
                callback.apply(this, args);
            }, delayRemaining);
        }
    };

    throttleFunction.cancel = function(){
        clearTimeout(timerId);
    }

    return throttleFunction;
}


let callBackFunction = (x, y) => {
    console.log(`Hey ${x} and ${y}`)
}

let throttleFunctionExample = throttle(callBackFunction, 2000);

throttleFunctionExample("jay", "sharma");