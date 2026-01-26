export type CloneFn<F, T = F> = (x: F) => T;

export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}
