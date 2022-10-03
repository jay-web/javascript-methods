/* 
? Without calling Promise.race() , Promise.any() , Promise.all() , Promise.allSettled(), 
? implement the following four similar functions on the native Promise object:

* 1. myRace(promises) : 
*    Takes in an array of Promises and returns a new Promise. This new
*    Promise should resolve or reject as soon as any Promise in the array resolves or rejects, with the
*    value from that settled Promise.

*/

Promise.myrace = (arrayOfPromises) => {
    return new Promise((resolve, reject) => {
        arrayOfPromises.forEach((promise) => {
           promise.then(resolve).catch(reject);
        });
    })
}

/*

* 2. myAny(promises) : 
*    Takes in an array of Promises and returns a new Promise. This new
*    Promise should resolve as soon as any Promise in the array resolves, with the value from that
*    resolved Promise. If every Promise in the array rejects, the new Promise should reject with the
*    string "all promises rejected".
*/

Promise.myAny = (arrayOfPromises) => {
    return new Promise((resolve, reject) => {
        let rejectCount = 0;
        arrayOfPromises.forEach((promise) => {
            promise.then(resolve).catch(() => {
                rejectCount++;
                if(rejectCount == arrayOfPromises.length){
                    reject("all promises rejected")
                }
            });
        })
    })
}


/*

* 3. myAll(promises) : 
*    Takes in an array of Promises and returns a new Promise. This new
*    Promise should resolve as soon as every Promise in the array resolves, with an array of the
*    values from those resolved Promises. This array should be in the same order as they were
*    passed to myAll (not in the order they resolved). If any Promise in the array rejects, the new
*    Promise should immediately be rejected with that value.
*/

Promise.myAll = (arrayOfPromises) => {
    return new Promise((resolve, reject) => {
        let resolveCount = 0;
        let resolveValue = [];
        arrayOfPromises.forEach((promise, i) => {
            promise.then((value) => {
                resolveCount++;
                resolveValue[i] = value;
                if(resolveCount == arrayOfPromises.length){
                    resolve(resolveValue);
                }
            }).catch((error) => reject(error))

        })
    })
}

/*
* 4. myAllSettled(promises) : 
*    Takes in an array of Promises and returns a new Promise. This
*    new Promise should resolve as soon as every Promise in the array settles, with an array of
*    objects detailing the results of each Promise. Each of these objects should have a "status" key set
*    to either "fulfilled" or "rejected", based on the state of the Promise. If the Promise was fulfilled,
*    there should also be a "value" key set to the value from that resolved Promise. If the Promise was
*    rejected, there should be an "error" key set to the error the Promise was rejected with. This array
*    should be in the same order as they were passed to myAllSettled (not in the order they resolved ).

*/

Promise.myAllSettled = (arrayOfPromises) => {
    return new Promise((resolve, reject) => {
       let resolveCount = 0;
       let result = [];

       arrayOfPromises.forEach((promise, i) => {
        promise.then((value) => {
            result[i] = value;
        }).catch((error) => {
            result[i] = error;
        }).finally(() => {
            resolveCount++;
            if(resolveCount === arrayOfPromises.length){
                resolve(result);
            }
        })
       })
    })
}


// todo ==============TESTING ==============

let pro1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("I am from Promise 1 success after 500 miliseconds")
    }, 500);
});

let pro2 = new Promise((resolve, reject) => {
    reject("I am from Promise 2 failure")
})

let pro3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("I am from Promise 3 success after 1000 miliseconds")
    }, 500);
});


let pro4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("I am from Promise 4 failure after 2000 miliseconds")
    }, 2000);
    
});

let arrayOfPromises = [pro1, pro2, pro3, pro4];

Promise.myrace(arrayOfPromises)
        .then((value) => console.log("myRace result ", value))
        .catch((error) => console.log("myRace error ", error));
// * Output will pro2 promise - Because myRace will return as pro2 reject instantly, 
// * so don't need to wait for any other promise success or failure


Promise.myAny(arrayOfPromises)
        .then((value) => console.log("myAny result ", value))
        .catch((error) => console.log("myAny error ", error));

// * Output will pro1 promise - Because myAny will return as pro1 success after 500 miliseconds, 
// * so don't need to wait for any other promise success or failure
// * Since at least one promise get success so it return success


Promise.myAll(arrayOfPromises)
        .then((value) => console.log("myAll result ", value))
        .catch((error) => console.log("myAll error ", error))
// * Output will pro2 promise - Because myAll will return as pro2 failure after instantantly, 
// * so don't need to wait for any other promise success or failure
// * Since at least one rejection will return rejection



Promise.myAllSettled(arrayOfPromises)
        .then((value) => console.log("myAllSettled result ", value));

// * Output will array of all promises - Because myAllSettled will return only resolve. 
// * array include rejection or success of all promises passed.


