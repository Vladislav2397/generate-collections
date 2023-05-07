import type { CreateElement, VNode } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

import type { Collection } from '../lib/collections/types'

import GenerateInput from './GenerateInput'

@Component
export default class GenerateFields<T> extends Vue {
    @Prop() readonly collection!: Collection<T>

    get styles() {
        return `display:flex;flex-direction:column;`
    }

    render(h: CreateElement): VNode | VNode[] {
        // console.log('values', this.values)
        const { fields, layout } = this.collection
        const { styles: style } = this

        let index = 0
        const fieldList = Object.values(fields)

        return h(
            'div',
            { class: 'generated-fields', style },
            layout.map(row => {
                return h(
                    'div',
                    {
                        class: 'generated-fields__row',
                        style: 'display:flex;margin-bottom:12px;gap:12px',
                    },
                    row.map(() => {
                        const field = fieldList[index++]

                        if ('binding' in field) {
                            return h(field.getComponent(), {
                                props: field.binding,
                                on: field.listeners,
                                style: 'flex: 1;',
                            })
                        }
                        return h(field.getComponent(), {
                            props: {
                                collection: field,
                            },
                        })
                    })
                )
            })
        )
    }
}
