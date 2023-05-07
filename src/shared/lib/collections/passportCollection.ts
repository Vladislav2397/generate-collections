import { watch } from 'vue'
import { useCollection } from './collection'
import { useField } from './field'
import { createTimeout } from './timeout'

const checkPassport = passport => {
    return passport.number === '1111'
}

export function usePassportCollection(fields) {
    const number = useField({
        binding: {
            placeholder: 'number',
        },
    })
    const birthdayDate = useField({
        binding: {
            placeholder: 'birthdayDate',
        },
    })
    const birthdayPlace = useField({
        binding: {
            placeholder: 'birthdayPlace',
        },
    })
    const date = useField({
        binding: {
            placeholder: 'date',
        },
    })
    const code = useField({
        binding: {
            placeholder: 'code',
        },
    })
    const issuedBy = useField({
        binding: {
            placeholder: 'issuedBy',
        },
    })

    const localCollection = useCollection({
        ...fields,
        number,
        birthdayDate,
        birthdayPlace,
        date,
        code,
        issuedBy,
    })

    const timeout = createTimeout()

    watch(localCollection.getValue, async value => {
        timeout.clear()

        timeout.start(async () => {
            const isValid = localCollection.validate()

            if (!isValid) return

            const isCorrectPassport = await checkPassport(value)
        }, 2000)
    })

    const collection = useCollection({
        number,
        birthdayDate,
        birthdayPlace,
        date,
        code,
        issuedBy,
    })

    return {
        ...collection,
        getComponent: () => PassportCardHOC,
    }
}

const PassportCardHOC = Generator => ({
    functional: true,
    render(h, { props, listeners }) {
        return h('div', { class: 'card' }, [h(Generator, { props, listeners })])
    },
})
