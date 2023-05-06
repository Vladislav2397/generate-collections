import { CreateElement, VNode } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '../lib/collections/field'

@Component
export default class GenerateInput<T> extends Vue {
    @Prop() readonly value!: IField<T>
    @Prop() readonly error!: boolean
    @Prop() readonly disabled!: boolean
    @Prop() readonly loading!: boolean

    inputBackground() {
        if (this.disabled) return 'opacity: 0.5'
        if (this.error) return 'background: red'
        return ''
    }

    get styles() {
        const styles = ['display:block;']

        if (this.disabled) styles.push('opacity: 0.5;')
        if (this.error) styles.push('background: red;')

        return styles
    }

    render(h: CreateElement): VNode | VNode[] {
        return h('input', {
            class: 'generated-input',
            style: this.styles.join(''),
            domProps: {
                value: this.value,
            },
            on: {
                input: event => this.$emit('input', event.target.value),
            },
        })
    }
}
