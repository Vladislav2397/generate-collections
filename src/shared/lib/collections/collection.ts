import { computed } from 'vue'

import GenerateFields from '@/shared/ui/GenerateFields'

import type { Field, Collection } from './types'

export const useCollection = <T>(
    fields: Record<string, Collection<T> | Field<T>>,
    config: {
        layout: 'auto'[][]
    }
): Collection<T> => {
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

    const isFill = computed(() => !isError.value && counter.value.fill === counter.value.all)

    return {
        // @ts-ignore
        getValue,
        getComponent,
        validate,
        isError,
        isFill,
        counter,
        fields,
        layout: config.layout,
    }
}
