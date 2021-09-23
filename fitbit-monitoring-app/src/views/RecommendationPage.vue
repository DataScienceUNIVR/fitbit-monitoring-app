<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title class="recommendation-title">ACTIVITY RECOMMENDATION</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-card>
                <ion-card-content class="sleep-ion-card-content">
                    <b>GOAL:</b>
                    <br>
                    <ion-badge color="primary" class="recommendation-sleep-goal">SLEEP >= 11</ion-badge>
                    <br><br>
                    <b>NEXT STEP:</b>
                    <ion-card class="recommendation-next-step">
                        <ion-card-content class="sleep-ion-card-content" style="text-align: left;font-size: 16px;">
                            ✓ MODERATE LOW ACTIVITY
                            <br><hr style="height:1px;color:gray;background-color:#3bae3b">
                            ✓ LOW SEDENTARY ACTIVITY 
                        </ion-card-content>
                    </ion-card>
                    <b>AVOID:</b>
                    <ion-card class="recommendation-avoid-step">
                        <ion-card-content class="sleep-ion-card-content" style="text-align: left;font-size: 16px;">
                            ✗ SERIOUS HIGH ACTIVITY
                            <br><hr style="height:1px;color:gray;background-color:#b23c3c">
                            ✗ NO PHYSICAL ACTIVITY
                            <br><hr style="height:1px;color:gray;background-color:#b23c3c">
                            ✗ TOO MUCH SEDENTARY ACTIVITY
                        </ion-card-content>
                    </ion-card>
                    <ion-badge color="medium" class="recommendation-confidence">CONFIDENCE = 0.968</ion-badge>
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
    IonBadge,
    IonCard,
    alertController
} from "@ionic/vue";
import { defineComponent } from "../config/export";
import { alertCircleOutline, add } from "ionicons/icons";
import { getDailyActivitiesGoals } from "../controllers/goalsCTR";

const sleepValuesChart: string[] = [];
const sleepDateChart: string[] = [];
const support: any = null;
const sleepScore: any = null;
const confidence: any = null;
const sleepScoreGoal = 0;

export default defineComponent({
    name: "Sleep Report",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonBadge,
        IonCard,
    },
    data() {
        return {
            confidence,
            sleepScore,
            support,
            sleepValuesChart,
            sleepDateChart,
            sleepScoreGoal
        };
    },
    methods: {
        async getDailyReport() {
            const goals = await Promise.resolve(getDailyActivitiesGoals());
            this.sleepScoreGoal = goals[4] ? goals[4] : 0;

            (document.getElementById("sleepScore") as HTMLInputElement).value = this.sleepScoreGoal.toString();
        },
    },

    setup() {
        return { alertCircleOutline, add };
    },
});
</script>
