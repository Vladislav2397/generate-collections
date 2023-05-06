<template lang="pug">
#app
    nav
        router-link(
            to="/"
        ) Home
        router-link(
            to="/about"
        ) About
    router-view
    ul
        each val in [1, 2, 3, 4, 5]
            li= val
</template>

<script lang="ts">
export default {
    name: 'App',
}
</script>
