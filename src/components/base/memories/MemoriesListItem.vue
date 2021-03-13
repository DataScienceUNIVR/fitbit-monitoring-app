<template>
    <!-- All items into memories array are cycled and i concat link with they id to make dynamic menu-->
    <ion-item :router-link="`/memories/${memory.id}`">

    <ion-thumbnail slot="start">
        <ion-img :src="memory.image" :alt="memory.title"></ion-img>
    </ion-thumbnail>
    <ion-label>
        {{ memory.title }}
    </ion-label>

    </ion-item> 
</template>

<script>
import { IonItem, IonImg, IonThumbnail, IonLabel } from "@ionic/vue"

export default {
    props: ["memory"],
    components: {
        IonItem,
        IonImg,
        IonThumbnail,
        IonLabel
    }
}
</script>
