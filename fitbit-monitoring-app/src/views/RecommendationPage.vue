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
                    <!-- Sleep Recommendation
                    <b>GOAL:</b>
                    <br>
                    <ion-badge color="primary" class="recommendation-sleep-goal">SLEEP >= {{sleepScoreGoal}}</ion-badge>
                    <br><br>
                    -->
                    <b>NEXT STEP:</b>
                    <ion-card class="recommendation-next-step">
                        <ion-card-content class="sleep-ion-card-content" style="text-align: left;font-size: 16px;">
                            {{ suggestionToDisplay }}
                        </ion-card-content>
                    </ion-card>
                    <b>AVOID:</b>
                    <ion-card class="recommendation-avoid-step">
                        <ion-card-content class="sleep-ion-card-content" style="text-align: left;font-size: 16px;">
                            {{ avoidToDisplay }}
                        </ion-card-content>
                    </ion-card>
                        <!--<ion-badge color="medium" class="recommendation-confidence">CONFIDENCE = 0.968</ion-badge>-->
                        <ion-badge color="medium" class="suggestion">Result: {{ result }}</ion-badge>
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
            suggestionToDisplay: "",
            avoidToDisplay: "",
            result: "",
        };
    },
    methods: {
        async getSleepScoreGoal() {
            const goals = await Promise.resolve(getDailyActivitiesGoals());
            this.sleepScoreGoal = goals[4] ? goals[4] : 4
            console.log(goals);
            console.log(this.sleepScoreGoal);
            //temporary consts until we find a way to creaty them automatically
            const query = "HA_3_t2 + MA_3_t1 + R_1_t1";
            //const temp = "HA_2_t2 + MA_3_t1 + R_1_t1 + LA_3_t0 -> ZL_3_t0";
            //const tempAvoid = "HA_3_t2 + R_1_t1 + HA_2_t0 -> ZL_1_t0";
            let suggestion = {
                description : "",
                typeMatch : "",
                ruleMatch : ""
            };
            let avoid = {
                description : "",
                typeMatch : "",
                ruleMatch : ""
            };
            const rawDataSuggerimento = {
                data: "pm1",
                // eslint-disable-next-line
                sleep_value: "3",
                // eslint-disable-next-line
                temporal_window:"2",
                // eslint-disable-next-line
                min_confidence: "1.0",
                // eslint-disable-next-line
                min_support: "0.03",
                // eslint-disable-next-line
                my_query: query,
                filterT0:"on"
            };
            const rawDataAvoid = {
                data: "pm1",
                // eslint-disable-next-line
                sleep_value: "1",
                // eslint-disable-next-line
                temporal_window:"2",
                // eslint-disable-next-line
                min_confidence: "0.0001",
                // eslint-disable-next-line
                min_support: "0.03",
                // eslint-disable-next-line
                my_query: query,
                filterT0:"on"
            };
                                            /*http://127.0.0.1:5000/*/
            suggestion = await axios.post('http://127.0.0.1:5000/',rawDataSuggerimento,{
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
            let quantity = "";
            if(suggestion.ruleMatch[l-6] == "1"){
                quantity = " little time.";
            }
            else if(suggestion.ruleMatch[l-6] == "2"){
                quantity = " some time.";
            }
            else if(suggestion.ruleMatch[l-6] == "3"){
                quantity = " a lot of time.";
            }else {
                quantity = "";
            }
            if(suggestion.ruleMatch[l-8]=="Z"){
                this.suggestionToDisplay = "Sleep at least " + quantity;
            }else if(suggestion.ruleMatch[l-9]=="R"){
                this.suggestionToDisplay = "You need to rest at least " + quantity;
            }else if(suggestion.ruleMatch[l-9]=="M"){
                this.suggestionToDisplay = "Try doing some moderate activity for " + quantity;
            }else if(suggestion.ruleMatch[l-9]=="L"){                
                this.suggestionToDisplay = "Try doing some light activity for " + quantity
            }else if(suggestion.ruleMatch[l-9]=="H"){
                this.suggestionToDisplay = "Try doing some intensive activity for " + quantity;
            }else {
                this.suggestionToDisplay = "No suggestions found";
            }
            console.log(this.suggestionToDisplay);

            let sleepQuantity = "";
            if(suggestion.ruleMatch[l+5] == "1"){
                sleepQuantity = " little time.";
            }
            else if(suggestion.ruleMatch[l+5] == "2"){
                sleepQuantity = " some time.";
            }
            else if(suggestion.ruleMatch[l+5] == "3"){
                sleepQuantity = " a lot of time.";
            }else {
                sleepQuantity = "";
            }
            this.result = "You will be able to sleep good for" + sleepQuantity;
            console.log(this.result);
            



            avoid = await axios.post('http://127.0.0.1:5000/',rawDataAvoid,{
                headers: {
                    'Content-Type': 'text/plain',
                }
            }).then((response) => {
                console.log(response.data);
                return response.data;
            }).catch((error) => {
                console.log(error);
            });
            console.log(avoid);
            const l2 = avoid.ruleMatch.indexOf(">");
            console.log(l2);
            let quantity2 = "";
            if(avoid.ruleMatch[l2-6] == "1"){
                quantity2 = " little time.";
            }
            else if(avoid.ruleMatch[l2-6] == "2"){
                quantity2 = " some time.";
            }
            else if(avoid.ruleMatch[l2-6] == "3"){
                quantity2 = " a lot of time.";
            }else {
                quantity2 = "";
            }

            if(avoid.ruleMatch[l2-8]=="Z"){
                this.avoidToDisplay = "Sleep for" + quantity2;
            }else if(avoid.ruleMatch[l2-9]=="R"){
                this.avoidToDisplay = "You need to rest for" + quantity2;
            }else if(avoid.ruleMatch[l2-9]=="M"){
                this.avoidToDisplay = "Doing some moderate activity for" + quantity2;
            }else if(avoid.ruleMatch[l2-9]=="L"){
                this.avoidToDisplay = "Doing some light activity for" + quantity2;
            }else if(avoid.ruleMatch[l2-9]=="H"){
                this.avoidToDisplay = "Doing some intensive activity for" + quantity2;
            }else {
                this.avoidToDisplay = "No suggestions found";
            }

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
