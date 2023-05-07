import { CreateElement, VNode } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ICollection } from '../lib/collections/collection'
import { IField } from '../lib/collections/field'
import GenerateInput from './GenerateInput'

@Component
export default class GenerateFields<T> extends Vue {
    @Prop() readonly collection!: ICollection<Record<string, any>>
    @Prop() readonly values!: Record<string, unknown>

    render(h: CreateElement): VNode | VNode[] {
        console.log('values', this.values)

        return h(
            'div',
            { class: 'generated-fields' },
            Object.values(this.collection.fields).map(field => {
                if (field.binding) {
                    return h(GenerateInput, {
                        style: 'display: block;margin-bottom:8px;',
                        props: {
                            ...field.binding,
                        },
                    })
                }
                return h(GenerateFields, {
                    props: {
                        collection: field,
                    },
                })
            })
        )
    }
}
