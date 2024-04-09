// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};
