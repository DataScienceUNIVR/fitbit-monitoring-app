<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>CARICAMENTO DATI</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <br>
            <ion-row class="data-row">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>UPLOAD DATI FITBIT</ion-card-subtitle>
                        <ion-card-title class="data-ion-card-title">ATTIVITÀ SEDENTARIA</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Caricare i dati della tua attività fisica sedentaria in formato JSON del dispositivo fitbit.
                        <br />Attenzione: il caricamento sovrascriverà tutti gli
                        attuali dati!
                    </ion-card-content>
                    <input
                        type="file"
                        ref="sedentaryFile"
                        id="uploadSedentaryFile"
                        hidden
                        @change="uploadData('sedentary')"
                    />
                </ion-card>
                <ion-fab class="load-fab" horizontal="end">
                    <ion-fab-button @click="$refs.sedentaryFile.click()">
                        <ion-icon :icon="cloudUploadSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-row>
            <ion-row class="data-row">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>UPLOAD DATI FITBIT</ion-card-subtitle>
                        <ion-card-title class="data-ion-card-title">ATTIVITÀ LEGGERA</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Caricare i dati delle tua attività fisica leggera in formato JSON del dispositivo fitbit.
                        <br />Attenzione: il caricamento sovrascriverà tutti gli
                        attuali dati!
                    </ion-card-content>
                    <input
                        type="file"
                        ref="lightFile"
                        id="uploadLightFile"
                        hidden
                        @change="uploadData('light')"
                    />
                </ion-card>
                <ion-fab class="load-fab" horizontal="end">
                    <ion-fab-button class="data-light-ion-fab-button" @click="$refs.lightFile.click()">
                        <ion-icon :icon="cloudUploadSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-row>
            <ion-row class="data-row">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>UPLOAD DATI FITBIT</ion-card-subtitle>
                        <ion-card-title class="data-ion-card-title">ATTIVITÀ MODERATA</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Caricare i dati della tua attività fisica moderata in formato JSON del dispositivo fitbit.
                        <br />Attenzione: il caricamento sovrascriverà tutti gli
                        attuali dati!
                    </ion-card-content>
                    <input
                        type="file"
                        ref="moderateFile"
                        id="uploadmoderateFile"
                        hidden
                        @change="uploadData('moderate')"
                    />
                </ion-card>
                <ion-fab class="load-fab" horizontal="end">
                    <ion-fab-button class="data-moderate-ion-fab-button" @click="$refs.moderateFile.click()">
                        <ion-icon :icon="cloudUploadSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-row>
            <ion-row class="data-row">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>UPLOAD DATI FITBIT</ion-card-subtitle>
                        <ion-card-title class="data-ion-card-title">ATTIVITÀ INTENSA</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Caricare i dati della tua attività fisica intensa in formato JSON del dispositivo fitbit.
                        <br />Attenzione: il caricamento sovrascriverà tutti gli
                        attuali dati!
                    </ion-card-content>
                    <input
                        type="file"
                        ref="intenseFile"
                        id="uploadIntenseFile"
                        hidden
                        @change="uploadData('intense')"
                    />
                </ion-card>
                <ion-fab class="load-fab" horizontal="end">
                    <ion-fab-button class="data-intense-ion-fab-button" @click="$refs.intenseFile.click()">
                        <ion-icon :icon="cloudUploadSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-row>
            <ion-row class="data-row">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>DOWNLOAD DATI</ion-card-subtitle>
                        <ion-card-title class="data-ion-card-title">SCARICA TUTTI I DATI</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Scaricare i dati in formato JSON del dispositivo fitbit.
                        <br />I dati contengono tutta la storia dei passi
                        giornalieri registrati.
                    </ion-card-content>
                </ion-card>
                <ion-fab class="load-fab" horizontal="end">
                    <ion-fab-button class="data-upload-ion-fab-button" @click="deleteAccount">
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
    actionSheetController,
} from "@ionic/vue";

import { saveUserActivity, getUserActivity } from "../controllers/dataCTR";
import { cloudUploadSharp, cloudDownloadSharp, trash, sendSharp } from "ionicons/icons";
import { defineComponent, AppVue } from "../config/export";

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
        // Upload file function
        uploadData(type: string) {
            let src = null;
            let file = null;
            if (this.$el.querySelector("#uploadSedentaryFile").files[0]) {
                src = this.$el.querySelector("#uploadSedentaryFile");
                file = src.files[0];
            } else if (this.$el.querySelector("#uploadLightFile").files[0]) {
                src = this.$el.querySelector("#uploadLightFile");
                file = src.files[0];
            } else if (this.$el.querySelector("#uploadmoderateFile").files[0]) {
                src = this.$el.querySelector("#uploadmoderateFile");
                file = src.files[0];
            } else if (this.$el.querySelector("#uploadIntenseFile").files[0]) {
                src = this.$el.querySelector("#uploadIntenseFile");
                file = src.files[0];
            }

            if (!type || !src) {
                return AppVue.methods?.openToast(
                    "Si è verificato un errore, ripetere la procedura"
                );
            }
            // If it's not JSON file return
            if (!file || file.type !== "application/json") {
                return AppVue.methods?.openToast(
                    "Il file deve essere di tipo JSON!"
                );
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

                    await saveUserActivity(tmp, type);
                    return AppVue.methods?.openToast("Dati caricati correttamente!");
                } catch (e) {
                    return AppVue.methods?.openToast(e);
                }
            };
            reader.onerror = (evt) => {
                console.error(evt);
            };
        },

        // Upload file function
        downloadData() {
            // const doc = JSON.stringify(getUserActivity());
            // // console.log(doc);
            // const blob = new Blob([JSON.stringify(getUserActivity())], {
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
         async chooseActivityType() {
            const actionSheet = await actionSheetController.create({
                header: "Quali dati scariare?",
                cssClass: "my-custom-class",
                buttons: [
                    {
                        text: "Attività Sedentaria",
                        role: "destructive",
                        icon: sendSharp,
                        handler: () => {
                            getUserActivity("sedentary");
                            // $('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#container');
                        },
                    },
                    {
                        text: "Attività Leggera",
                        role: "destructive",
                        icon: sendSharp,
                        handler: () => {
                            getUserActivity("light");
                        },
                    },
                    {
                        text: "Attività Moderata",
                        role: "destructive",
                        icon: sendSharp,
                        handler: () => {
                            getUserActivity("moderate");
                        },
                    },
                    {
                        text: "Attività Intensa",
                        role: "destructive",
                        icon: sendSharp,
                        handler: () => {
                            getUserActivity("intese");
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
            this.chooseActivityType();
        },
    },

    setup() {
        return { cloudUploadSharp, cloudDownloadSharp, trash, sendSharp };
    },
});
</script>
