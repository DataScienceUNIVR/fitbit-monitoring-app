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
            <ion-row class="dati-row">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>UPLOAD DATI</ion-card-subtitle>
                        <ion-card-title>CARICA DATI FITBIT</ion-card-title>
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
                        @change="uploadData"
                    />
                </ion-card>
                <ion-fab horizontal="end">
                    <ion-fab-button @click="$refs.file.click()">
                        <ion-icon :icon="cloudUploadSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-row>
            <ion-row class="dati-row">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>DOWNLOAD DATI</ion-card-subtitle>
                        <ion-card-title>SCARICA DATI FITBIT</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Scaricare i dati in formato JSON del dispositivo fitbit.
                        <br />I dati contengono tutta la storia dei passi
                        giornalieri registrati.
                    </ion-card-content>
                </ion-card>
                <ion-fab horizontal="end">
                    <ion-fab-button @click="downloadData">
                        <ion-icon :icon="cloudDownloadSharp"></ion-icon>
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
import {
    sendStepsToFirebase,
    getStepsToFirebase,
} from "../hooks/firebase-crud";
import { cloudUploadSharp, cloudDownloadSharp } from "ionicons/icons";

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
        async openToast(msg: string) {
            const toast = await toastController.create({
                message: msg,
                duration: 2000,
            });
            return toast.present();
        },

        // Upload file function
        uploadData() {
            const src = this.$el.querySelector("#uploadFile");
            const file = src.files[0];

            // If it's not JSON file return
            if (!file || file.type !== "application/json"){
                this.openToast("Il file deve essere di tipo JSON!");
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = async (evt) => {
                let text = "";
                if (evt.target != null) {
                    text = evt.target.result + "";
                }
                try {
                    const tmp = JSON.parse(text);

                    // TODO: fix returned msg
                    const returnMsg = await sendStepsToFirebase(tmp);
                    this.openToast(returnMsg);
                } catch (e) {
                    this.openToast(e);
                }
            };
            reader.onerror = (evt) => {
                console.error(evt);
            };
        },

        // Upload file function
        downloadData() {
            // const doc = JSON.stringify(getStepsToFirebase());
            // // console.log(doc);
            // const blob = new Blob([JSON.stringify(getStepsToFirebase())], {
            //     type: "application/json",
            // });
            // if (navigator.msSaveBlob) {
            //     navigator.msSaveBlob(blob, "steps.json");
            // } else {
            //     const link = document.createElement("a");
            //     if (link.download !== undefined) {
            //         const url = URL.createObjectURL(blob);
            //         link.setAttribute("href", url);
            //         link.setAttribute("download", "steps.json");
            //         link.style.visibility = "hidden";
            //         document.body.appendChild(link);
            //         link.click();
            //         document.body.removeChild(link);
            //     }
            // }
        },
    },

    setup() {
        return { cloudUploadSharp, cloudDownloadSharp };
    },
});
</script>
