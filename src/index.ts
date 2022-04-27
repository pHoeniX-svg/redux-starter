import { pipe } from 'lodash/fp';

let input = '   Javascript is a scripting language   ';

const trim = (str: string) => str.trim();
const wrap = (type: string) => (str: string) => `<${type}>${str}</${type}>`;
const toLowerCase = (str: string) => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrap('span')); // or use compose

const output = transform(input);
// const output = add2(1)(5);

// function composition

console.log(output);
