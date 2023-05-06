import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { usePaymentCollection } from '@/shared/lib/collections/paymentCollection'
import GenerateInput from '@/shared/ui/GenerateInput'

@Component({
    setup(props) {
        const payment = usePaymentCollection()

        return {
            collection: payment,
        }
    },
})
export default class PaymentCollection extends Vue {
    declare collection: { fields: Record<string, any> }

    render(h: CreateElement): VNode | VNode[] {
        return h('div', { class: 'payment-collection' }, [
            ...Object.values(this.collection.fields).map(field =>
                h(GenerateInput, {
                    props: field.binding,
                    on: field.listeners,
                })
            ),
            h(
                'button',
                {
                    on: {
                        click: () =>
                            Object.values(this.collection.fields).forEach(
                                field => field.validate()
                            ),
                    },
                },
                ['validate']
            ),
        ])
    }
}
