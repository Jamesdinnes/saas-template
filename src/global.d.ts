/**
 * Trap for `*.scss.d.ts` files which are not generated yet.
 */
declare module '*.scss' {
  let classes: any;
  export = classes;
}
