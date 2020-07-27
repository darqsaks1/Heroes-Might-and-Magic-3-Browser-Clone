const handlers = Symbol("handlers");

/* eslint-disable no-param-reassign */
function makeObservable(targetToObserve) {
  targetToObserve[handlers] = [];

  targetToObserve.observe = function observe(handler) {
    this[handlers].push(handler);
  };

  return new Proxy(targetToObserve, {
    set(...rest) {
      const [target, property, value] = rest;
      const success = Reflect.set(...rest);
      if (success) {
        target[handlers].forEach((handler) => handler(property, value));
      }
      return success;
    },
  });
}
/* eslint-enable no-param-reassign */

export default makeObservable;
