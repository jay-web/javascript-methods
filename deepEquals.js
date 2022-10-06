function deepEquals(valueOne, valueTwo){
    // * Case One
    // * typeof of both parameters are not equals - so return false
    if(typeof valueOne !== typeof valueTwo){
        return false;
    }


    // * Case Two
    // * Since both have same type passing from step one
    // * Now check are they primitive type or not
    if(typeof valueOne !== 'object'){
        
        // * Since they are primitive means not a function or object
        // ! Special case for NaN
        if(Number.isNaN(valueOne) && Number.isNaN(valueTwo)) return true;

        // * simply return strict equality
        return valueOne === valueTwo;
    }

    // * Case Three
    // * null is primitive data type
    // * But typeof null return "object"  and typeof NaN return "number"
    if(valueOne === null || valueTwo === null){
        return valueOne === valueTwo;
    }

    // * Case Four
    // * Both values are same array or object so using strictly compare
    if(valueOne === valueTwo){
        return true;
    }

    // * Case Four
    // * Both values are array
    if(Array.isArray(valueOne) && Array.isArray(valueTwo)){
        // * Step one check lengths are equal or not
        if(valueOne.length !== valueTwo.length) return false;

        for (let i = 0; i < valueOne.length; i++) {

            // * using recursive to check every element in both array are same
            if(!deepEquals(valueOne[i], valueTwo[i])) return false;
        }

        return true;
    }


    // * Case Five
    // * Since we passed case four, where both values are array
    // * here we check any value is array and other is object
    if(Array.isArray(valueOne) || Array.isArray(valueTwo)) return false;


    // * Case Six
    // * Both are objects
    let keysOfObjectOne = Object.keys(valueOne);
    let keysOfObjectTwo = Object.keys(valueTwo);

    // * if both have diff length return false
    if(keysOfObjectOne.length !== keysOfObjectTwo.length) return false;

    // * if have same length so iterate using recursive and check same element or key/value pairs

    for(const key of keysOfObjectOne){
        // ! special case when property not available because here we only iterating in valueOne
        if(!valueTwo.hasOwnProperty(key)) return false;
        
        // * Check recursively
        if(!deepEquals(valueOne[key], valueTwo[key])) return false
    }
    return true;
}