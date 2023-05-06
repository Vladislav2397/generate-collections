<template lang="pug">

h1 Home page
    //- payment-collection
    passport-collection

</template>

<script lang="ts">
import { ref } from 'vue'
import { PaymentCollection } from '@/entities/company'
import { PassportCollection } from '@/entities/company'

export default {
    name: 'Home',
    components: {
        'payment-collection': PaymentCollection,
        'passport-collection': PassportCollection,
    },
    data: () => ({}),
}
</script>
