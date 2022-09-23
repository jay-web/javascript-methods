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

