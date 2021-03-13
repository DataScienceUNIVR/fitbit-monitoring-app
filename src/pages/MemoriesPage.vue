<template>
    <base-layout page-title="Titolo pagina">
        <memories-list :memories="memories"></memories-list>
    </base-layout>
</template>

<script>
import MemoriesList from '../components/base/memories/MemoriesList.vue'

export default {
    components: {
        MemoriesList
    },

    computed: {
        memories() {
            return this.$store.getters.memories;
        }
    }
}

</script>