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
            <ion-card class="profile-ion-card">
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
                            </ion-fab-button>
                        </ion-fab>
                        <img
                            class="profile-img"
                            :src="user.imageURL ? user.imageURL : './assets/img/avatar.jpg'"
                            :alt="user.nome" />
                        <input
                            type="file"
                            ref="file"
                            id="uploadProfilePicture"
                            hidden
                            @change="uploadProfilePicture"
                    /></ion-card-title>
                </ion-card-header>
                <ion-card-content class="profile-ion-card-content">
                    <b>NOME</b>: {{ user.nome }} <br />
                    <b>COGNOME</b>: {{ user.cognome }} <br />
                    <b>C.F</b>: {{ user.cf }} <br />
                    <b>EMAIL</b>: {{ user.email }} <br />
                    <b>PESO</b>: {{ user.peso }} Kg <br />
                    <b>ALTEZZA</b>: {{ user.altezza }} cm
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
    IonFab,
    IonFabButton,
    IonIcon,
} from "@ionic/vue";
import { cameraSharp } from "ionicons/icons";
import { defineComponent } from "vue";
import AppVue from "@/App.vue";
import { getAllUserInfo, setProfileImage } from "../controllers/userCTR";
interface Utente {
    nome?: any;
    cognome?: any;
    cf?: any;
    email?: any;
    imageURL?: any;
    altezza?: any;
    peso?: any;
    uid?: any;
}
const user: Utente = {};

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
        IonFab,
        IonFabButton,
        IonIcon,
    },
    data() {
        return {
            selectedFile: null,
            user,
        };
    },
    methods: {
        // Upload file function
        async uploadProfilePicture() {
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
            await setProfileImage(image);
        },
        async getUser() {
            await Promise.resolve(getAllUserInfo()).then((user) => {
                if (user) {
                    this.user.nome = user.nome;
                    this.user.cognome = user.cognome;
                    this.user.cf = user.cf;
                    this.user.imageURL = user.imageURL;
                    this.user.altezza = user.altezza ? user.altezza : "---";
                    this.user.peso = user.peso ? user.peso : "---";
                    this.user.email = user.email;
                    this.user.uid = user.uid;
                }
            });
        },
    },

    mounted() {
        this.getUser();
    },

    setup() {
        return { cameraSharp };
    },
});
</script>
