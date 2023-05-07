import Vue, { reactive, computed } from 'vue'

export interface IField<T> {
    subscribe(watcher: Watcher<T>): void
    unsubscribe(watcher: Watcher<T>): void
    setLoading(flag: boolean): IField<T>
    setDisabled(flag: boolean): IField<T>
    validate(): Promise<boolean>
    getValue(): T
    setValue(value: T): void
    getBindings(): Record<string, unknown>
    getListeners(): Record<string, Function>
}

type Watcher<T> = (value: T) => unknown

// TODO: Перекомпоновать

export class Field<T> implements IField<T> {
    public constructor({ initialValue }: { initialValue: T }) {
        this.value = initialValue
    }

    private watchers = new Set<Watcher<T>>()

    public subscribe(watcher: Watcher<T>) {
        this.watchers.add(watcher)
    }

    public unsubscribe(watcher: Watcher<T>) {
        this.watchers.delete(watcher)
    }

    private isLoading = false
    public setLoading(flag: boolean): IField<T> {
        this.isLoading = flag
        return this
    }

    private isDisabled = false
    public setDisabled(flag: boolean): IField<T> {
        this.isDisabled = flag
        return this
    }

    public async validate(): Promise<boolean> {
        const isValid = Boolean(this.value)

        if (!isValid) {
            this.setError(true)
        }

        return isValid
    }

    private value: T
    public getValue(): T {
        return this.value
    }
    public setValue(value: T): void {
        console.log('update value', value)

        this.value = value
        this.setError(false)

        this.watchers.forEach(watcher => {
            watcher(value)
        })
    }

    public setError(isError: boolean) {
        this.error = isError
    }

    private error = false

    public getBindings() {
        return {
            value: this.getValue(),
            error: this.error,
            loading: this.isLoading,
            disabled: this.isDisabled,
        }
    }

    public getListeners() {
        return {
            input: value => this.setValue(value),
            'update:error': value => this.setError(value),
        }
    }
}

export const useField = <T = string>(config?: {
    initialValue?: T
    binding: Record<string, unknown>
}) => {
    const state = reactive({
        value: config?.initialValue ?? '',
        error: false,
        ...config?.binding,
    })

    const getValue = () => state.value

    const setValue = value => {
        state.value = value
        setError(false)
    }

    const setError = (error: boolean) => {
        state.error = error
    }

    const validate = () => {
        const isValid = Boolean(state.value)

        if (!isValid) {
            setError(true)
        }

        return isValid
    }

    const updateBinding = (binding: {}) => {
        Object.entries(binding).forEach(([key, value]) => {
            Vue.set(state, key, value)
        })
    }

    const counter = computed(() => ({
        all: 1,
        fill: +Boolean(state.value),
    }))

    const isError = computed(() => state.error)

    return {
        getValue,
        setValue,
        setError,
        isError,
        validate,
        updateBinding,
        counter,
        binding: state,
        listeners: {
            input: value => setValue(value),
            'error:update': error => setError(error),
        },
    }
}
