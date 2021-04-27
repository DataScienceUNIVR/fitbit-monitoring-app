<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>OBBIETTIVI</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="main">
            <ion-row>
                <ion-card class="peso-input-ion-card">
                    <ion-card-header>
                        <ion-card-subtitle class="peso-ion-card-subtitle"
                            >OBBIETTIVO 1:</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="peso-ion-card-title">
                        <ion-item class="peso-text-input">
                            <ion-label>Valore: </ion-label>
                            <ion-input
                                ref="newWeight"
                                v-model="newWeight"
                                class="peso-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                                :readonly="false"
                            ></ion-input
                            >KG
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="peso-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="presentAlert">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
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
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonFab,
    IonFabButton,
    IonRow,
    IonItem,
    IonLabel,
    IonIcon,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { add } from "ionicons/icons";
import moment from "moment";

const dataCorrente = moment(new Date()).format("DD/MM/YYYY HH:mm");

export default defineComponent({
    name: "Weight",
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
        IonRow,
        IonItem,
        IonLabel,
        IonIcon,
    },
    data() {
        return {
            dataCorrente,
        };
    },
    methods: {
        
    },

    mounted() {
        console.log("GoalsPage");
    },

    setup() {
        return {
            add,
        };
    },
});
</script>
