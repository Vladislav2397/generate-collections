import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import { useHeadCollection } from '@/shared/lib/collections/headCollection'
import GenerateFields from '@/shared/ui/GenerateFields'

@Component({
    setup() {
        const head = useHeadCollection()

        return {
            collection: head,
        }
    },
})
export default class HeadCollection extends Vue {
    declare collection: { fields: Record<string, any> }

    render(h: CreateElement): VNode | VNode[] {
        const { collection } = this

        return h(GenerateFields, {
            props: {
                collection,
                layout: [
                    ['auto'],
                    ['auto', 'auto', 'auto'],
                    ['auto'],
                    ['auto'],
                ],
            },
            class: 'head-collection',
        })
    }
}
