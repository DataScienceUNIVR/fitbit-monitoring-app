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
                            <ion-fab-button
                                class="profile-ion-fab"
                                @click="$refs.file.click()"
                            >
                                <ion-icon :icon="cameraSharp"></ion-icon>
                            </ion-fab-button> </ion-fab
                        ><ion-img
                            class="profile-img"
                            src="./assets/img/avatar.jpg"
                        >
                        </ion-img>
                        <input
                            type="file"
                            ref="file"
                            id="uploadProfilePicture"
                            hidden
                            @change="uploadProfilePicture"
                    /></ion-card-title>
                </ion-card-header>
                <ion-card-content class="profile-ion-card-content">
                    <b>NOME</b>: Mario <br /><b>COGNOME</b>: Rossi <br /><b
                        >C.F</b
                    >: MRNGCN10P19W201N <br /><b>EMAIL</b>: gmail@gmail.com
                    <br />
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
} from "@ionic/vue";
import { cameraSharp } from "ionicons/icons";
import { defineComponent } from "vue";
import AppVue from "@/App.vue";
import { uploadImage } from "../controllers/userCTR";

export default defineComponent({
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
    data() {
        return {
            selectedFile: null,
        };
    },
    methods: {
        // Upload file function
        uploadProfilePicture() {
            const src = this.$el.querySelector("#uploadProfilePicture");
            const image = src.files[0];
            if (
                !image ||
                (image.type !== "image/jpg" &&
                    image.type !== "image/jpeg" &&
                    image.type !== "image/png" &&
                    image.type !== "image/SVG")
            ) {
                return AppVue.methods?.openToast("Formato file non corretto");
            }
            uploadImage(image);
        },
    },

    mounted() {
        // getAllUserInfo();
    },

    setup() {
        return { cameraSharp };
    },
});
</script>
