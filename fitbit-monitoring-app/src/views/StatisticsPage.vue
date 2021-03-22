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
                <ion-card class="statistiche-ion-card" style="background-color: #4a0f81;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">MINUTI DI ATTIVITA SEDENTARIA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">
                            5241
                        </ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card class="statistiche-ion-card" style="background-color: #8751b8;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">PASSI DI ATTIVITA SEDENTARIA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">
                            1620
                        </ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card class="statistiche-ion-card" style="background-color: #2d65c5;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">MINUTI DI ATTIVITA LEGGERA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">200</ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card class="statistiche-ion-card" style="background-color: #5b83c7;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">PASSI DI ATTIVITA LEGGERA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">2000</ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card class="statistiche-ion-card" style="background-color: #626032;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">MINUTI DI ATTIVITA MODERATA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">1570</ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card class="statistiche-ion-card" style="background-color: #858344;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">PASSI DI ATTIVITA MODERATA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">2100</ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card class="statistiche-ion-card" style="background-color: #246c4d;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">MINUTI DI ATTIVITA INTENSA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">25</ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-row>
            <ion-row class="statistiche-row">
                <ion-card class="statistiche-ion-card" style="background-color: #37a676;">
                    <ion-card-header>
                        <ion-card-subtitle class="statistiche-ion-card-subtitle">PASSI DI ATTIVITA INTENSA</ion-card-subtitle>
                        <ion-card-title class="statistiche-ion-card-title">3000</ion-card-title>
                    </ion-card-header>
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
    IonCard,
    IonLabel,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonItem,
    // IonIcon,
    IonToolbar,
} from "@ionic/vue";
// import { cloudUploadSharp} from "ionicons/icons";


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
        IonCard,
        IonLabel,
        IonCardTitle,
        IonCardHeader,
        IonCardSubtitle,
        IonItem,
        // IonIcon,
        IonToolbar,
    },
    // setup() {
    //     return { cloudUploadSharp };
    // },

    
};
</script>