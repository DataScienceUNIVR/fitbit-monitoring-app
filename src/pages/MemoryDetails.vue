<template>
    <base-layout :page-title="loadedMemory ? loadedMemory.title : 'Caricamento....'" page-default-back-link="/memories">
    <h2 v-if="!loadedMemory">Non è possibile trovare un item dell'id passato.</h2>
    <h2 v-else>Caricato</h2>
    </base-layout>
</template>

<script>
import { 
} from '@ionic/vue'

export default {
    data() {
        return {
            memoryId: this.$route.params.id,
        } 
    },
    computed: {
        loadedMemory() {
            return this.$store.getters.memory(this.memoryId);
        }
    },
    // Bugged
    // watch: {
    //     $route(currentRoute){
    //         this.memoryId = currentRoute.params.id;
    //     }
    // }
}
</script>