<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>PROFILE</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="main">
            <ion-card class="profile-ion-card">
                <ion-card-header>
                    <ion-card-subtitle class="profile-ion-card-subtitle"
                        >DATA PROFILE</ion-card-subtitle
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
                            :alt="user.name" />
                        <input
                            type="file"
                            ref="file"
                            id="uploadProfilePicture"
                            hidden
                            @change="uploadProfilePicture"
                    /></ion-card-title>
                </ion-card-header>
                <ion-card-content class="profile-ion-card-content">
                    <b>NAME</b>: {{ user.name }} <br />
                    <b>SURNAME</b>: {{ user.surname }} <br />
                    <b>F.C</b>: {{ user.fiscalCode }} <br />
                    <b>EMAIL</b>: {{ user.email }} <br />
                    <b>WEIGHT</b>: {{ user.weight }} Kg <br />
                    <b>HEIGHT</b>: {{ user.height }} cm
                </ion-card-content>

                <ion-button
                    color="danger"
                    shape="round"
                    expand="full"
                    size="small"
                    class="profile-delete-account-button"
                    @click="deleteAccount"
                    >Delete Account</ion-button
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
            this.user.name = localStorage.getItem("name");
            this.user.surname = localStorage.getItem("surname");
            this.user.fiscalCode = localStorage.getItem("fiscalCode");
            this.user.imageURL = localStorage.getItem("imageURL");
            this.user.height = localStorage.getItem("height");
            this.user.weight = localStorage.getItem("weight");
            this.user.email = localStorage.getItem("email");

            await Promise.resolve(getAllUserInfo()).then((user) => {
                if (user) {
                    localStorage.setItem("name", user.name);
                    localStorage.setItem("surname", user.surname);
                    localStorage.setItem("fiscalCode", user.fiscalCode);
                    localStorage.setItem("imageURL", user.imageURL);
                    localStorage.setItem("height", user.height ? user.height : "---");
                    localStorage.setItem("weight", user.weight ? user.weight : "---");
                    localStorage.setItem("email", user.email);
                    localStorage.setItem("uid", user.uid);
                }
            });
        },

        async confirmDelete() {
            const actionSheet = await actionSheetController.create({
                header: (deleteConfirmation != 1) ? "Delete Account?" : "Confirm delete",
                cssClass: "my-custom-class",
                buttons: [
                    {
                        text: (deleteConfirmation != 1) ? "Delete Account" : "Delete definitely",
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
                        text: "Undo",
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
