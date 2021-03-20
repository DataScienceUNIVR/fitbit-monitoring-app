<template>
    <ion-page>
        <ion-header>
            <ion-title>CARICAMENTO DATI</ion-title>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-header collapse="condense">
                <!-- <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar> -->
            </ion-header>
            <ion-row>
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>UPLOAD DATI</ion-card-subtitle>
                        <ion-card-title>DATI FITBIT</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Caricare i dati in formato JSON del dispositivo fitbit.
                        <br />Attenzione: il caricamento sovrascriverà tutti gli
                        attuali dati!
                    </ion-card-content>
                    <input
                        type="file"
                        ref="file"
                        id="uploadFile"
                        hidden
                        @change="selectedFile"
                    />
                </ion-card>
                <ion-fab horizontal="end">
                    <ion-fab-button @click="$refs.file.click()">
                        <ion-icon :icon="cloudUploadSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-row>
            <ion-row>
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>UPLOAD DATI</ion-card-subtitle>
                        <ion-card-title>DATI FITBIT</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Caricare i dati in formato JSON del dispositivo fitbit.
                        <br />Attenzione: il caricamento sovrascriverà tutti gli
                        attuali dati!
                    </ion-card-content>
                </ion-card>
                <ion-fab horizontal="end">
                    <ion-fab-button @click="$refs.file.click()">
                        <ion-icon :icon="cloudUploadSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-row>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonIcon,
    IonFab,
    IonFabButton,
    IonRow,
    toastController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { sendData2Firebase } from "../hooks/firebase-crud";
import { cloudUploadSharp } from "ionicons/icons";

export default defineComponent({
    name: "Main",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonCard,
        IonCardTitle,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonIcon,
        IonFab,
        IonFabButton,
        IonRow,
    },
    methods: {
        // Open toast component
        async openToast() {
            const toast = await toastController.create({
                message: "Your settings have been saved.",
                duration: 2000,
            });
            return toast.present();
        },

        // Upload file function
        selectedFile() {
            const src = this.$el.querySelector("#uploadFile");
            const file = src.files[0];

            // If it's not JSON file return
            if (!file || file.type !== "application/json") return;
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = (evt) => {
                let text = "";
                if (evt.target != null) {
                    text = evt.target.result + "";
                }
                try {
                    // Parse JSON file
                    // TODO: Check JSON file regularity
                    const tmp = JSON.parse(text);
                    Object.keys(tmp).forEach((key) => {
                        // in-case properties are nested objects
                        // const value = JSON.stringify(tmp[key]);

                        const value = tmp[key]; // for primitive nested properties
                        console.log(value["value"]);
                    });
                    // regex control input data
                    sendData2Firebase("Roberto", "test");
                } catch (e) {
                    alert(
                        "Sorry, your file doesn't appear to be valid JSON data."
                    );
                }
            };
            reader.onerror = (evt) => {
                console.error(evt);
            };
        },
    },

    setup() {
        return { cloudUploadSharp };
    },
});
</script>
