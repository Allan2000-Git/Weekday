/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
    let timeoutID: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        clearTimeout(timeoutID!);
        timeoutID = setTimeout(() => {
            timeoutID = null;
            func.apply(this, args);
        }, delay);
    };
};
