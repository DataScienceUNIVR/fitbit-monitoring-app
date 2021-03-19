<template>
    <ion-page>
        <ion-header :translucent="true">
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
            <div id="container">
                <strong class="capitalize">{{ $route.params.id }}</strong>
                <p>TODO: Dashboard</p>
                <ion-button
                    expand="block"
                    color="primary"
                    class="ion-margin-top"
                    type="submit"
                    @click="send"
                >
                    Invia Dati
                </ion-button>

                <!-- Load JSON file section -->
                <input
                    type="file"
                    ref="file"
                    id="uploadFile"
                    hidden
                    @change="selectedFile"
                />
                <ion-button
                    expand="block"
                    id="prpvola"
                    color="primary"
                    class="send-button"
                    @click="$refs.file.click()"
                >
                    Carica ed elabora file JSON
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    toastController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { sendData2Firebase } from "../hooks/firebase-crud";

export default defineComponent({
    name: "Main",
    components: {
        IonButtons,
        IonButton,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
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
                    sendData2Firebase("Roberto", "test")
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
        // const send = async () => {
        //     console.log(sendData2Firebase("Roberto", "test"));
        // };
        // return { send };
    },
});
</script>
