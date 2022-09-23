let array = [2, 3, 5, 9, 10];

Array.prototype.myMap = function(callback){
    let newArray = [];

    for (let i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
    }

    return newArray;
}


let multipliedByTwo = array.myMap((el, i) => {
    return el * 2;
})


console.log(multipliedByTwo)