/*
* In the debouncing technique, no matter how many times the user fires the event, 
* the attached function will be executed only after the specified time once the user stops firing the event.
* Consider the cake example. This time you kept on asking your mom for the cake so many times that she got annoyed and told you that she will give you the cake only if you remain silent for one hour. This means you won’t get the cake if you keep on asking her continuously - you will only get it one hour after last time you ask, once you stop asking for the cake. 
* This is debouncing.
*/

// * without immediate parameter option
function debounce(callback, delay){
  let timer;

  return function(...args){
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  }
}

// * With immediate parameter option
function debounce2(callback, delay, immediate = false) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    let shouldCallImmediately = timer == null && immediate;
    if(shouldCallImmediately){
        callback.apply(this, args)
    }

    timer = setTimeout(() => {
      if (!immediate) {
        callback.apply(this, args);
      }
      timer = null;
    }, delay);
  };
}

