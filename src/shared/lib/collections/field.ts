import GenerateInput from '@/shared/ui/GenerateInput'
import Vue, { reactive, computed } from 'vue'

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

    const getComponent = () => GenerateInput

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
        getComponent,
    }
}
