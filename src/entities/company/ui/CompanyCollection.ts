import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import { useHeadCollection } from '@/shared/lib/collections/headCollection'
import { usePaymentCollection } from '@/shared/lib/collections/paymentCollection'
import { useCollection } from '@/shared/lib/collections/collection'
import { Collection } from '@/shared/lib/collections/types'

@Component({
    setup() {
        const payment = usePaymentCollection()
        const head = useHeadCollection()

        const collection = useCollection(
            {
                payment,
                head,
            },
            {
                layout: [['auto'], ['auto']],
            }
        )

        return {
            collection,
        }
    },
})
export default class HeadCollection extends Vue {
    declare collection: Collection<unknown>

    render(h: CreateElement): VNode | VNode[] {
        const { collection } = this

        return h('div', [
            h('p', [JSON.stringify(collection.counter.value)]),
            h('p', [JSON.stringify(collection.isFill.value)]),
            h(collection.getComponent(), {
                props: { collection },
                class: 'company-collection',
            }),
            h(
                'button',
                {
                    on: {
                        click: collection.validate,
                    },
                },
                ['Validate']
            ),
        ])
    }
}
