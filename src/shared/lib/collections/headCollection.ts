import { watch } from 'vue'
import { useCollection } from './collection'
import { useField } from './field'
import { usePassportCollection } from './passportCollection'
import { createTimeout } from './timeout'

export function useHeadCollection() {
    const firstname = useField({
        binding: {
            placeholder: 'firstname',
        },
    })
    const lastname = useField({
        binding: {
            placeholder: 'lastname',
        },
    })
    const thirdName = useField({
        binding: {
            placeholder: 'thridName',
        },
    })
    const collection = useCollection({
        inn: useField({
            binding: {
                placeholder: 'inn',
            },
        }),
        firstname,
        lastname,
        thirdName,
        passport: usePassportCollection({
            firstname,
            lastname,
            thirdName,
        }),
    })

    return collection
}
