/* eslint-disable no-console */

export const print = (label: string, data: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(label);
    console.log(data);
    console.groupEnd();
  }
};
