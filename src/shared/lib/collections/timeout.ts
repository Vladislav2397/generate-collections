const isPromise = <T>(arg: T | Promise<T>): arg is Promise<T> =>
    arg instanceof Promise

export const createTimeout = () => {
    let timeout: ReturnType<typeof setTimeout>

    const start = (cb: () => unknown | Promise<unknown>, ms = 0) => {
        timeout = setTimeout(() => {
            const result = cb()

            if (isPromise(result)) {
                result.then(clear)
            } else {
                clear()
            }
        }, ms)
    }

    const clear = () => {
        clearTimeout(timeout)
    }

    return { start, clear }
}
