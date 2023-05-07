import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import GenerateInput from '@/shared/ui/GenerateInput'
import { useHeadCollection } from '@/shared/lib/collections/headCollection'
import GenerateFields from '@/shared/ui/GenerateFields'

@Component({
    setup(props) {
        const head = useHeadCollection()

        return {
            collection: head,
        }
    },
})
export default class HeadCollection extends Vue {
    declare collection: { fields: Record<string, any> }

    render(h: CreateElement): VNode | VNode[] {
        return h('div', { class: 'head-collection' }, [
            h(GenerateFields, { props: { collection: this.collection } }),
        ])
    }
}
