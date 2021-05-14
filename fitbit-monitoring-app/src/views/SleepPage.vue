<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>REPORT SONNO</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-card class="input-ion-card blue-gradient">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >SCORE SEDENTARIA:</ion-card-subtitle
                        >
                    </ion-card-header>
                    
                    <ion-card-title class="input-on-card-title">
                        <ion-item class="text-input">
                            <ion-label>Valore: </ion-label>
                            <ion-input
                                ref="sedentaryActivity"
                                id="sedentaryActivity"
                                v-model="sedentaryActivity"
                                class="goal-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                                :readonly="false"
                            ></ion-input
                            >KG
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="input-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="updateGoal('sedentaryActivity')" color="light">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
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
} from "@ionic/vue";
import { defineComponent } from "../config/export";
import { getSleepAssociationRules } from "../controllers/sleepCTR";

const sleepScore = null;
const support = null;
const confidence = null;

export default defineComponent({
    name: "Report Sonno",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
    },
    data() {
        return {
            
        };
    },
    methods: {
    },

    async mounted() {
        await Promise.resolve(getSleepAssociationRules()).then((result) => {
            if (result) {
                console.log(result);
            }
        });
    },

    // setup() {
    // },
});
</script>
