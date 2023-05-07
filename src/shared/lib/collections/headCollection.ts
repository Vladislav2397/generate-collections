import { useCollection } from './collection'
import { useField } from './field'
import { usePassportCollection } from './passportCollection'

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
    const collection = useCollection(
        {
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
            address: useField({
                binding: {
                    placeholder: 'address',
                },
            }),
        },
        {
            layout: [['auto'], ['auto', 'auto', 'auto'], ['auto'], ['auto']],
        }
    )

    return collection
}
