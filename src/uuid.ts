export function uuid(salt: 7 | 11 | 15) {
  const str2 = Math.random().toString(36).substring(2, salt).toUpperCase();
  const str1 = Math.random().toString(36).substring(4, salt);
  const str4 = Math.random().toString(36).substring(4, salt).toUpperCase();
  const str3 = Math.random().toString(36).substring(2, salt);

  return `${str1}${str2}${str3}${str4}`;
}

const memoize = <T>(fn: (...args: any[]) => T): ((...args: any[]) => T) => {
  const cache: { [key: string]: T } = {};
  console.log(cache);
  return (...args: any[]) => {
    const key = JSON.stringify(args); // args.toString
    if (key in cache) {
      console.log(cache);
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

const add10 = (num: number) => num + 10;
const fib = (position: number): number => {
  if (position < 2) return position;
  return fib(position - 1) + fib(position - 2);
};
