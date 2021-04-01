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
                    <ion-select
                        placeholder="SELEZIONA"
                        @ionchange="changePeriod"
                    >
                        <ion-select-option value="d"
                            >Ultimo giorno</ion-select-option
                        >
                        <ion-select-option value="w"
                            >Ultima settimana</ion-select-option
                        >
                        <ion-select-option value="m"
                            >Ultimo mese</ion-select-option
                        >
                    </ion-select>
                </ion-item>
            </ion-header>

            <!-- TODO: ciclarli -->
            <ion-row class="statistiche-row">
                <vue-flip active-click="" width="100%" height="100%">
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #4a0f81"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >MINUTI DI ATTIVITA'
                                    SEDENTARIA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    25
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #8848b4"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >PASSI DI ATTIVITA
                                    SEDENTARIA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    5241
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
            </ion-row>
            <ion-row class="statistiche-row">
                <vue-flip active-click="" width="100%" height="100%">
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #7f3c2f"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >MINUTI DI ATTIVITA
                                    LEGGERA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    5241
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #b46354"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >PASSI DI ATTIVITA
                                    LEGGERA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    421
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
            </ion-row>
            <ion-row class="statistiche-row">
                <vue-flip active-click="" width="100%" height="100%">
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #8d912f"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >MINUTI DI ATTIVITA
                                    MODERATA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    3600
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #a6aa43"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >PASSI DI ATTIVITA
                                    MODERATA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    84
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
            </ion-row>
            <ion-row class="statistiche-row">
                <vue-flip active-click="" width="100%" height="100%">
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #3092a6"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >MINUTI DI ATTIVITA'
                                    INTESA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    60
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistiche-ion-card"
                            style="background-color: #43acc3"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistiche-ion-card-subtitle"
                                    >PASSI DI ATTIVITA'
                                    INTESA</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistiche-ion-card-title"
                                >
                                    9580
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
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
    IonLabel,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonItem,
    IonToolbar,
} from "@ionic/vue";
import VueFlip from "vue-flip";
import { getStatistics } from "../controllers/userCTR";
// let statistiche = "das";

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
        IonLabel,
        IonCard,
        IonCardSubtitle,
        IonCardTitle,
        IonCardHeader,
        IonItem,
        IonToolbar,
        "vue-flip": VueFlip,
    },
    /** Always executed when page is load */
    ready() {
        console.log("init");
    },
    methods: {
        changePeriod($event: any) {
            getStatistics($event.target.value);
            // location.reload();
        },
    },
};
</script>