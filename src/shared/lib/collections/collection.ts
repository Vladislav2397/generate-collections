import GenerateFields from '@/shared/ui/GenerateFields'
import { computed, type Ref } from 'vue'
import type { IField } from './field'

export interface ICollection<T> {
    subscribe(watcher: Watcher<T>): void
    unsubscribe(watcher: Watcher<T>): void
    setLoading(flag: boolean): ICollection<T>
    setDisabled(flag: boolean): ICollection<T>
    validate(): Promise<boolean>
    getValue(): T
    setValue(value: T): void
    get fields(): IField<string>[]
}

type Watcher<T> = (value: T) => unknown

// TODO: Перекомпоновать

export class Collection<
    T extends Record<string, IField<any> | ICollection<any>>
> implements ICollection<T>
{
    public constructor(fields: T) {
        this._fields = fields
    }

    _fields: T

    // @ts-ignore
    get fields() {
        return Object.values(this._fields)
    }

    values() {
        return this.fields.map(field => field.getValue())
    }

    private watchers = new Set<Watcher<T>>()

    public subscribe(watcher: Watcher<T>) {
        this.watchers.add(watcher)
    }

    public unsubscribe(watcher: Watcher<T>) {
        this.watchers.delete(watcher)
    }

    private isLoading = false
    public setLoading(flag: boolean): ICollection<T> {
        this.isLoading = flag
        return this
    }

    private isDisabled = false
    public setDisabled(flag: boolean): ICollection<T> {
        this.isDisabled = flag
        return this
    }

    public async validate(): Promise<boolean> {
        return true
    }

    public getValue(): T {
        return this._fields
    }
    public setValue(fields: T): void {
        this.watchers.forEach(watcher => {
            watcher(fields)
        })
        this._fields = fields
    }

    public setError(isError: boolean) {
        this.error = isError
    }

    private error = false

    updateFields(newFields: any) {
        Object.entries(newFields).forEach(([key, value]) => {
            this._fields[key].setValue(value)
        })
    }
}

type Field = {
    validate: () => boolean
    getValue: () => string
    isError: Ref<boolean>
    // binding: { error: boolean; value: string }
    counter: { value: { all: number; fill: number } }
}

export const useCollection = (fields: Record<string, Field>) => {
    const validate = () => {
        let isValid = true
        Object.values(fields).forEach(field => {
            if (!field.validate()) {
                isValid = false
            }
        })
        return isValid
    }

    const getValue = () => {
        return Object.entries(fields).reduce((total, [key, field]) => {
            total[key] = field.getValue()

            return total
        }, {})
    }

    const isError = computed(() =>
        Object.values(fields).some(field => field.isError.value)
    )

    const counter = computed(() =>
        Object.values(fields).reduce(
            (total, field) => {
                return {
                    all: total.all + field.counter.value.all,
                    fill: total.fill + field.counter.value.fill,
                }
            },
            { all: 0, fill: 0 }
        )
    )

    const getComponent = () => {
        return GenerateFields
    }

    const collection = {
        getValue,
        getComponent,
        validate,
        isError,
        counter,
        fields,
    }

    const render = h => {
        return h(getComponent(), {
            props: {
                collection,
            },
        })
    }

    return collection
}
