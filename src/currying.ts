export function add(a: number) {
  return (b: number) => a + b;
}

export const add2 = (a: number) => (b: number) => a + b;
