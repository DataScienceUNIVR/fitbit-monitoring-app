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
                    <ion-badge color="primary" class="recommendation-sleep-goal">SLEEP >= {{sleepScoreGoal}}</ion-badge>
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
                        <!--<ion-badge color="medium" class="recommendation-confidence">CONFIDENCE = 0.968</ion-badge>-->
                        <ion-badge color="medium" class="suggestion">Fitbit suggestion: {{res}}</ion-badge>
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
} from "@ionic/vue";
import { defineComponent, axios } from "../config/export";
import { alertCircleOutline, add } from "ionicons/icons";
import { getDailyActivitiesGoals } from "../controllers/goalsCTR";

const sleepValuesChart: string[] = [];
const sleepDateChart: string[] = [];
const support: any = null;
const sleepScore: any = null;
const confidence: any = null;
const sleepScoreGoal = "...";
const res = "";

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
            sleepScoreGoal,
            res
        };
    },
    methods: {
        async getSleepScoreGoal() {
            const goals = await Promise.resolve(getDailyActivitiesGoals());
            this.sleepScoreGoal = goals[4] ? goals[4] : 4
            console.log(goals);
            console.log(this.sleepScoreGoal);
            //temporary query until we find a way to creaty them automatically
            const query = "HA_1_t2";
            let suggestion = {
                description : "",
                typeMatch : "",
                ruleMatch : ""
            };
            const rawData = {
                data: "pm1",
                sleep_value: "1",
                temporal_window:"3",
                min_confidence: "0.1",
                min_support: "0.1",
                my_query: query,
                filterT0:"off"
            };
                                            /*http://127.0.0.1:5000/*/
            suggestion = await axios.post('https://lookbackapriorialgorithm.herokuapp.com/',rawData,{
                headers: {
                    'Content-Type': 'text/plain',
                }
            }).then((response) => {
                console.log(response.data);
                return response.data;
            }).catch((error) => {
                console.log(error);
            });
            console.log(suggestion);
            const l = suggestion.ruleMatch.indexOf(">");
            console.log(l);
            if(suggestion.ruleMatch[l+2]=="Z"){
                this.res = "Sleep at least " + Number(suggestion.ruleMatch[l+5])*4 + " more hours";
            }else if(suggestion.ruleMatch[l+2]=="R"){
                this.res = "You need to rest at least " + Number(suggestion.ruleMatch[l+5])*3 + " more hours";
            }else if(suggestion.ruleMatch[l+2]=="M"){
                this.res = "Maybe try some activity for " + Number(suggestion.ruleMatch[l+5])*2 + " hours";
            }else if(suggestion.ruleMatch[l+2]=="L"){                
                this.res = "Maybe try some activity for " + Number(suggestion.ruleMatch[l+5]) + " hours";
            }else if(suggestion.ruleMatch[l+2]=="H"){
                this.res = "Maybe try some intensive activity for " + Number(suggestion.ruleMatch[l+5])*2 + " hours";
            }else {
                this.res = "No suggestions found";
            }
            console.log(this.res);

        },
    },

    async beforeMount() {
        await this.getSleepScoreGoal();
    },
    setup() {
        return { alertCircleOutline, add };
    },
});
</script>
