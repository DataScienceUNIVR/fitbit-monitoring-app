<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>GOALS</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="main">
            <ion-row>
                <ion-card class="input-ion-card blue-gradient">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >SEDENTARY ACTIVITY:</ion-card-subtitle
                        >
                    </ion-card-header>
                    
                    <ion-card-title class="input-on-card-title">
                        <ion-item class="text-input">
                            <ion-label>Value: </ion-label>
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
                            >min
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
                <ion-card class="input-ion-card red-gradient">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >LIGHT ACTIVITY:</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="input-on-card-title">
                        <ion-item class="text-input">
                            <ion-label>Value: </ion-label>
                            <ion-input
                                ref="lightActivity"
                                id="lightActivity"
                                v-model="lightActivity"
                                class="goal-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                                :readonly="false"
                            ></ion-input
                            >min
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="input-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="updateGoal('lightActivity')" color="light">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-card>
                <ion-card class="input-ion-card purple-gradient">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >MODERATE ACTIVITY:</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="input-on-card-title">
                        <ion-item class="text-input">
                            <ion-label>Value: </ion-label>
                            <ion-input
                                ref="moderateActivity"
                                id="moderateActivity"
                                v-model="moderateActivity"
                                class="goal-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                                :readonly="false"
                            ></ion-input
                            >min
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="input-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="updateGoal('moderateActivity')" color="light">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-card>
                <ion-card class="input-ion-card green-gradient">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >INTENSE ACTIVITY:</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="input-on-card-title">
                        <ion-item class="text-input">
                            <ion-label>Value: </ion-label>
                            <ion-input
                                ref="intenseActivity"
                                id="intenseActivity"
                                v-model="intenseActivity"
                                class="goal-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                                :readonly="false"
                            ></ion-input
                            >min
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="input-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="updateGoal('intenseActivity')" color="light">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-card>
                <ion-card class="input-ion-card orange-gradient">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >SLEEP SCORE GOAL:</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="input-on-card-title">
                        <ion-item class="text-input">
                            <ion-label>Value: </ion-label>
                            <ion-input
                                ref="sleepScore"
                                id="sleepScore"
                                v-model="sleepScore"
                                class="goal-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                                :readonly="false"
                            ></ion-input>
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="input-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="updateGoal('sleepScore')" color="light">
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
import { add } from "ionicons/icons";
import { getDailyActivitiesGoals, updateDailyActivityGoal } from "../controllers/goalsCTR";
import { defineComponent } from "../config/export";

const sedentaryActivityGoal = 0;
const lightActivityGoal = 0;
const moderateActivityGoal = 0;
const intenseActivityGoal = 0;
const sleepScoreGoal = 0;

export default defineComponent({
    name: "Goals",
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
            sedentaryActivityGoal,
            lightActivityGoal,
            moderateActivityGoal,
            intenseActivityGoal,
            sleepScoreGoal,
        };
    },
    methods: {
        async getDailyReport() {
            const goals = await Promise.resolve(getDailyActivitiesGoals());
            this.sedentaryActivityGoal = goals[0] ? goals[0] : 0;
            this.lightActivityGoal = goals[1] ? goals[1] : 0;
            this.moderateActivityGoal = goals[2] ? goals[2] : 0;
            this.intenseActivityGoal = goals[3] ? goals[3] : 0;
            this.sleepScoreGoal = goals[4] ? goals[4] : 0;

            (document.getElementById("sedentaryActivity") as HTMLInputElement).value = this.sedentaryActivityGoal.toString();
            (document.getElementById("lightActivity") as HTMLInputElement).value = this.lightActivityGoal.toString();
            (document.getElementById("moderateActivity") as HTMLInputElement).value = this.moderateActivityGoal.toString();
            (document.getElementById("intenseActivity") as HTMLInputElement).value = this.intenseActivityGoal.toString();
            (document.getElementById("sleepScore") as HTMLInputElement).value = this.sleepScoreGoal.toString();
        },

        updateGoal(activityType: any) {
            let value = null;
            switch (activityType) {
                case "sedentaryActivity":
                    value = this.$refs.sedentaryActivity as any;
                    break;
                case "lightActivity":
                    value = this.$refs.lightActivity as any;
                    break;
                case "moderateActivity":
                    value = this.$refs.moderateActivity as any;
                    break;
                case "intenseActivity":
                    value = this.$refs.intenseActivity as any;
                    break;
                case "sleepScore":
                    value = this.$refs.sleepScore as any;
                    break;
                default:
                    break;
            }    
            updateDailyActivityGoal(activityType, parseInt(value.value));
        }
        
    },

    async mounted() {
        await this.getDailyReport();
    },

    setup() {
        return {
            add,
        };
    },
});
</script>
