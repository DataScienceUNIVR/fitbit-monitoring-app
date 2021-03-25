<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>PROFILO</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="main">
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle class="profile-ion-card-subtitle"
                        >PROFILO DATI</ion-card-subtitle
                    >
                    <ion-card-title
                        ><ion-fab vertical="bottom" horizontal="end">
                            <ion-fab-button class="profile-ion-fab" @click="$refs.file.click()">
                                <ion-icon :icon="cameraSharp"></ion-icon>
                            </ion-fab-button> </ion-fab
                        ><ion-img
                            class="profile-img"
                            src="./assets/img/avatar.jpg"
                        >
                        </ion-img
                    >
                    <input
                        type="file"
                        ref="file"
                        id="uploadProfilePicture"
                        hidden
                        @change="uploadProfilePicture"
                    /></ion-card-title>
                </ion-card-header>
                <ion-card-content class="profile-ion-card-content">
                    <b>NOME</b>: Mario
                    <br/><b>COGNOME</b>: Rossi
                    <br/><b>C.F</b>: MRNGCN10P19W201N
                    <br /><b>EMAIL</b>: gmail@gmail.com <br />
                    <b>PESO</b>: 80 KG <br />
                    <b>ALTEZZA</b>: 175 cm
                </ion-card-content>
            </ion-card>
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
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
    IonFab,
    IonFabButton,
    IonIcon,
    toastController
} from "@ionic/vue";
import { cameraSharp } from "ionicons/icons";

export default {
    name: "Profile",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonImg,
        IonFab,
        IonFabButton,
        IonIcon,
    },

methods: {
        // Open toast component
        async openToast(msg: string) {
            const toast = await toastController.create({
                message: msg,
                duration: 2000,
            });
            return toast.present();
        },

        // Upload file function
        uploadProfilePicture() {
            const src = this.$el.querySelector("#uploadProfilePicture");
            const image = src.files[0];
            console.log(image);
            // If it's not JSON file return
            // if (!file || file.type !== "application/json"){
            //     this.openToast("Il file deve essere di tipo JSON!");
            //     return;
            // }
            // const reader = new FileReader();
            // reader.readAsText(file, "UTF-8");
            // reader.onload = async (evt) => {
            //     let text = "";
            //     if (evt.target != null) {
            //         text = evt.target.result + "";
            //     }
            //     try {
            //         const tmp = JSON.parse(text);

            //         // TODO: fix returned msg
            //         const returnMsg = await sendStepsFirebase(tmp);
            //         this.openToast(returnMsg);
            //     } catch (e) {
            //         this.openToast(e);
            //     }
            // };
            // reader.onerror = (evt) => {
            //     console.error(evt);
            // };
        },
    },

    setup() {
        return { cameraSharp };
    },
};
</script>
