import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import GenerateInput from '@/shared/ui/GenerateInput'
import { usePassportCollection } from '@/shared/lib/collections/passportCollection'

@Component({
    setup(props) {
        const passport = usePassportCollection({
            firstname: props.firstname,
            lastname: props.lastname,
            thirdName: props.thirdName,
        })

        return {
            collection: passport,
        }
    },
})
export default class PassportCollection extends Vue {
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
