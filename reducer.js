let array = [2,10,15,20];

Array.prototype.myReducer = function(callback, initialValue){
    let accumulator = initialValue;

    for (let i = 0; i < this.length; i++) {
        if(i == 0 && initialValue == undefined){
            accumulator = this[0];
        }else{
            accumulator = callback(accumulator, this[i], i, this)
        }
    }

    return accumulator;
}


let finalSum = array.myReducer((acc, el, i, array) => {
    return el + acc;
},0 )


console.log(finalSum)

