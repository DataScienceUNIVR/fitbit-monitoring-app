<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
                <ion-title>Proovla</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
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
                    Send
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
// import { createUser } from "/hooks/firebase-crud";
import { sendData } from "../hooks/firebase-crud";

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
        async openToast() {
            const toast = await toastController.create({
                message: "Your settings have been saved.",
                duration: 2000,
            });
            return toast.present();
        },
    },
    setup() {
        const send = async () => {
            console.log(sendData("test", "test"));
        };

        return { send };
    },
});
</script>
