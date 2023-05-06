import { watch } from 'vue'
import { useCollection } from './collection'
import { useField } from './field'
import { createTimeout } from './timeout'

const checkPassport = passport => {
    return passport.number === '1111'
}

export function usePassportCollection(fields) {
    const number = useField()
    const birthdayDate = useField()
    const birthdayPlace = useField()
    const date = useField()
    const code = useField()
    const issuedBy = useField()

    const localCollection = useCollection({
        ...fields,
        number,
        birthdayDate,
        birthdayPlace,
        date,
        code,
        issuedBy,
    })

    watch(localCollection.getValue, async value => {
        const isValid = localCollection.validate()

        if (!isValid) return

        const isCorrectPassport = await checkPassport(value)
    })

    const collection = useCollection({
        number,
        birthdayDate,
        birthdayPlace,
        date,
        code,
        issuedBy,
    })

    return collection
}