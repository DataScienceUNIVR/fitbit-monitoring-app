<template>
    <base-layout page-title="Titolo pagina">
        <ion-list>
            <ion-item router-link="/memories/1">Item 1</ion-item>                
            <ion-item>Item 2</ion-item>                
            <ion-item>Item 3</ion-item>                
            <ion-item>Item 4</ion-item>                
        </ion-list>
    </base-layout>
</template>

<script>
import { 
    IonList,
    IonItem
} from '@ionic/vue'

export default {
    components: {
        IonList,
        IonItem    
    }
}

data() {
    return {
        memories: [
            { 
                id: 'item1', 
                title: 'Title of item 1', description: 'Description of item 1'
            },
            { 
                id: 'item2', 
                title: 'Title of item 2', description: 'Description of item 2'
            },
            { 
                id: 'item3', 
                title: 'Title of item 3', description: 'Description of item 3'
            },
            { 
                id: 'item4', 
                title: 'Title of item 4', description: 'Description of item 4'
            }
        ]
    }
}

</script>