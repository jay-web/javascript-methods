let array = [2,10,15,20,15,145,24,78];

Array.prototype.myFilter = function(callback){
    let filterArray = [];

    for (let i = 0; i < this.length; i++) {
        if(callback(this[i], i, this) === true){
            filterArray.push(this[i]);
        }
    }

    return filterArray;
}


let filtered = array.myFilter((el, i) => {
    return el % 5 === 0
})

console.log(filtered);