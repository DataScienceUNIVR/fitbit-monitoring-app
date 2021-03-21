<template>
    <ion-page>
        <ion-header>
            <ion-title>STATISTICHE</ion-title>
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
                 <ion-item>
      <ion-label>PERIODO STATISTICHE</ion-label>
      <ion-select placeholder="SELEZIONA">
        <ion-select-option value="f">Ultimo giorno</ion-select-option>
        <ion-select-option value="m">Ultima settimana</ion-select-option>
        <ion-select-option value="m">Ultimo mese</ion-select-option>
      </ion-select>
    </ion-item>
            </ion-header>
            <ion-row class="statistiche-row">
                <ion-card style="background-color: #4a0f81;">
                    <ion-card-header>
                        <ion-card-subtitle>TITOLO 1</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">
                            5241 <ion-icon src="assets/img/lightly_active.svg"></ion-icon>
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                            <ion-icon :icon="cloudUploadSharp"></ion-icon>

                        Caricare i dati in formato JSON del dispositivo fitbit.
                    </ion-card-content>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card style="background-color: #2d65c5;">
                    <ion-card-header>
                        <ion-card-subtitle>DOWNLOAD DATI</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">8526 - 52,2%</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Scaricare i dati in formato JSON del dispositivo fitbit.
                    </ion-card-content>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card style="background-color: #626032;">
                    <ion-card-header>
                        <ion-card-subtitle>DOWNLOAD DATI</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">100</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Scaricare i dati in formato JSON del dispositivo fitbit.
                    </ion-card-content>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card style="background-color: #246c4d;">
                    <ion-card-header>
                        <ion-card-subtitle>DOWNLOAD DATI</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">15741</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Scaricare i dati in formato JSON del dispositivo fitbit.
                    </ion-card-content>
                </ion-card>
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
    IonRow,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonToolbar,
} from "@ionic/vue";
import { cloudUploadSharp} from "ionicons/icons";


export default {
    name: "Main",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonRow,
        IonSelect,
        IonSelectOption,
        IonIcon,
        IonToolbar,
    },
    setup() {
        return { cloudUploadSharp };
    },
};
</script>