import { pipe } from 'lodash/fp';

let input = '   Javascript is a scripting language   ';

const trim = (str: string) => str.trim();
const wrapInDiv = (str: string) => `<div>${str}</div>`;
const toLowerCase = (str: string) => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrapInDiv); // or use compose

const output = transform(input);

// function composition

console.log(output);
