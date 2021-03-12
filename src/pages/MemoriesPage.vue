<template>
    <base-layout page-title="Titolo pagina">
        <ion-list>
            <ion-item 
                v-for='memory in memories' 
                v-bind:key="memory.id"
                router-link="/memories/${memory.id}"
                >

            <ion-thumbnail slot="start">
                <ion-img :src="memory.image" :alt="memory.title"></ion-img>
            </ion-thumbnail>
            <ion-label>
                {{ memory.title }}
            </ion-label>

            </ion-item>                
        </ion-list>
    </base-layout>
</template>

<script>
import { 
    IonList,
    IonItem,
    IonImg,
    IonLabel,
    IonThumbnail,
} from '@ionic/vue'

export default {
    components: {
        IonList,
        IonItem,
        IonImg,
        IonLabel,
        IonThumbnail
    },

    data() {
        return {
            memories: [
                { 
                    id: 'item1', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NYCS-bull-trans-1.svg/1024px-NYCS-bull-trans-1.svg.png",
                    title: 'Title of item 1', 
                    description: 'Description of item 1'
                },
                { 
                    id: 'item2', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/NYCS-bull-trans-2.svg/480px-NYCS-bull-trans-2.svg.png",
                    title: 'Title of item 2', 
                    description: 'Description of item 2'
                },
                { 
                    id: 'item3', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Icon_3_red.svg/600px-Icon_3_red.svg.png",
                    title: 'Title of item 3', 
                    description: 'Description of item 3'
                },
                { 
                    id: 'item4', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/NYCS-bull-trans-4-red.svg/1200px-NYCS-bull-trans-4-red.svg.png",
                    title: 'Title of item 4', 
                    description: 'Description of item 4'
                }
            ]
        }
    }
}

</script>