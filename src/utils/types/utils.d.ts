declare global {
  type ValueOf<T> = T[keyof T];
  type Overwrite<T, U extends Partial<Record<keyof T, unknown>>> = Omit<T, keyof U> & U;
}

export {};
