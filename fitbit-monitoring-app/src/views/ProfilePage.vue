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
                            :src="
                                user.imageURL
                                    ? user.imageURL
                                    : './assets/img/avatar.jpg'
                            "
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
                    <b>NOME</b>: {{ user.name }} <br />
                    <b>COGNOME</b>: {{ user.surname }} <br />
                    <b>C.F</b>: {{ user.fiscalCode }} <br />
                    <b>EMAIL</b>: {{ user.email }} <br />
                    <b>PESO</b>: {{ user.weight }} Kg <br />
                    <b>ALTEZZA</b>: {{ user.height }} cm
                </ion-card-content>

                <ion-button
                    color="danger"
                    shape="round"
                    expand="full"
                    size="small"
                    class="profile-delete-account-button"
                    @click="deleteAccount"
                    >Cancella Account</ion-button
                >
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
    IonButton,
    IonIcon,
    actionSheetController,
} from "@ionic/vue";
import { cameraSharp, trash } from "ionicons/icons";
import { defineComponent, AppVue } from "../config/export";
import {
    getAllUserInfo,
    setProfileImage,
    deleteAccountInfo,
} from "../controllers/userCTR";

interface User {
    name?: any;
    surname?: any;
    fiscalCode?: any;
    email?: any;
    imageURL?: any;
    height?: any;
    weight?: any;
    uid?: any;
}
const user: User = {};
let deleteConfirmation = 0;
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
        IonButton,
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
                    this.user.name = user.name;
                    this.user.surname = user.surname;
                    this.user.fiscalCode = user.fiscalCode;
                    this.user.imageURL = user.imageURL;
                    this.user.height = user.height ? user.height : "---";
                    this.user.weight = user.weight ? user.weight : "---";
                    this.user.email = user.email;
                    this.user.uid = user.uid;
                }
            });
        },

        async confirmDelete() {
            const actionSheet = await actionSheetController.create({
                header: (deleteConfirmation != 1) ? "Cancellare Account?" : "Conferma cancellazione",
                cssClass: "my-custom-class",
                buttons: [
                    {
                        text: (deleteConfirmation != 1) ? "Cancella Account" : "Cancella definitivamente",
                        role: "destructive",
                        icon: trash,
                        handler: () => {
                            if(deleteConfirmation != 1) {
                                deleteConfirmation++;
                                this.confirmDelete();
                            } else {
                                deleteAccountInfo();
                            }
                        },
                    },
                    {
                        text: "Annulla",
                        role: "cancel",
                        handler: () => {
                            console.log("Cancel clicked");
                        },
                    },
                ],
            });
            await actionSheet.present();

        },

        async deleteAccount() {
            this.confirmDelete();
            console.log("cancellazione");
        },
    },

    mounted() {
        this.getUser();
    },

    setup() {
        return { cameraSharp, trash };
    },
});
</script>
