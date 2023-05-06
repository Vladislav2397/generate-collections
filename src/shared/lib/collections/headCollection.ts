import { watch } from 'vue'
import { useCollection } from './collection'
import { useField } from './field'
import { createTimeout } from './timeout'

const isValidBik = (bik: string) => {
    return bik.length === 9
}
const isValidBankAccount = (bankAccount: string) => {
    return bankAccount.length === 9
}

const fetchBankByBik = async (_: string) => {
    return {
        bankName: 'bank name',
        correspondentAccount: '12345678901234567890',
    }
}

export function useHeadCollection() {
    const bik = useField()
    const bankName = useField()
    const bankAccount = useField()
    const correspondentAccount = useField()

    const collection = useCollection({
        bik,
        bankAccount,
        bankName,
        correspondentAccount,
    })

    function updateDisabled(isDisabled: boolean) {
        bankAccount.updateBinding({
            loading: isDisabled,
            disabled: isDisabled,
        })
        correspondentAccount.updateBinding({
            loading: isDisabled,
            disabled: isDisabled,
        })
    }

    const disableFields = () => updateDisabled(true)
    const enableFields = () => updateDisabled(false)

    const timeout2 = createTimeout()
    watch(bik.getValue, async value => {
        if (!isValidBik(value)) return

        disableFields()

        const newFields = await fetchBankByBik(value)

        bankName.setValue(newFields.bankName)
        correspondentAccount.setValue(newFields.correspondentAccount)

        enableFields()
    })

    const { start, clear } = createTimeout()
    watch(bankAccount.getValue, value => {
        clear()

        start(() => {
            if (isValidBankAccount(value)) return

            // notifier.warning('Not valid bank account')
        }, 400)
    })

    return collection
}
