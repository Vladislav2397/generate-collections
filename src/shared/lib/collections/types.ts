import { Ref } from 'vue'
import { VueConstructor } from 'vue/types/umd'

type Counter = {
    all: number
    fill: number
}

export type Field<T> = {
    getValue(): T
    setValue(value: T): void
    setError(error: boolean): void
    isError: Ref<boolean>
    validate: () => boolean
    binding: Record<string, unknown>
    updateBinding: (binding: Record<string, unknown>) => void
    counter: Ref<Counter>
    listeners: Record<string, Function>
    getComponent: () => VueConstructor
}

export type Collection<T> = {
    getValue(): T
    validate: () => boolean
    isError: Ref<boolean>
    counter: Ref<Counter>
    getComponent: () => VueConstructor
    fields: Record<string, Field<T> | Collection<T>>
    layout: 'auto'[][]
}
