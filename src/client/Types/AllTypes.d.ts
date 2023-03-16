// TS does not support sass imports, workaround by declared this module
declare module '*.scss' {
  // This adds support for css modules
  const content: {[className: string]: string};
  export = content;
}
