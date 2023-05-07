<template lang="pug">

h1 Home page
    //- payment-collection
    //- passport-collection
    //- head-collection
    company-collection

</template>

<script lang="ts">
import {
    PaymentCollection,
    PassportCollection,
    HeadCollection,
    CompanyCollection,
} from '@/entities/company'

export default {
    name: 'Home',
    components: {
        'payment-collection': PaymentCollection,
        'passport-collection': PassportCollection,
        'head-collection': HeadCollection,
        'company-collection': CompanyCollection,
    },
    data: () => ({}),
}
</script>
