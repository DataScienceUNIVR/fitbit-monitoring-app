<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>HOME</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-card class="chart-ion-card blue-gradient">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        MINUTES SEDENTARY ACTIVITY
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totalMinutesSedentaryActivity }}
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card green-gradient">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        MINUTES LIGHT ACTIVITY
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totalMinutesLightActivity }}
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card red-gradient">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        MINUTES MODERATE ACTIVITY
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totalMinutesModerateActivity }}
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card purple-gradient">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        MINUTES INTENSE ACTIVITY
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totalMinutesIntenseActivity }}
                </ion-card-content>
            </ion-card>

            <ion-card class="chart-ion-card">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        DAILY GOALS:
                    </ion-card-subtitle>
                </ion-card-header>
                <div id="chart">
                    <hr />
                    <div ref="dailyReportChart" class="margin-chart"></div>
                </div>
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
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
} from "@ionic/vue";
import { defineComponent, ApexCharts } from "../config/export";
import { getDailyActivitiesData, getDailyActivitiesGoals } from "../controllers/goalsCTR";
import { filterSharp, sad } from "ionicons/icons";
import { getRefreshToken } from "../controllers/userCTR";
import { getFitbitDailyActivities } from "@/controllers/activitiesCTR";

const totalMinutesSedentaryActivity = 0;
const totalMinutesLightActivity = 0;
const totalMinutesModerateActivity = 0;
const totalMinutesIntenseActivity = 0;

const sedentaryActivityGoal = 0;
const lightActivityGoal = 0;
const moderateActivityGoal = 0;
const intenseActivityGoal = 0;

const sedentaryActivityPercentual = 0;
const lightActivityPercentual = 0;
const moderateActivityPercentual = 0;
const intenseActivityPercentual = 0;

export default defineComponent({
    name: "Homepage",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardContent,
    },
    data() {
        return {
            totalMinutesSedentaryActivity,
            totalMinutesLightActivity,
            totalMinutesModerateActivity,
            totalMinutesIntenseActivity,

            sedentaryActivityGoal,
            lightActivityGoal,
            moderateActivityGoal,
            intenseActivityGoal,

            sedentaryActivityPercentual,
            lightActivityPercentual,
            moderateActivityPercentual,
            intenseActivityPercentual,
        };
    },
    methods: {
        async getDailyReport() {
            const goals = await Promise.resolve(getDailyActivitiesGoals());
            this.sedentaryActivityGoal = goals[0] ? goals[0] : 1;
            this.lightActivityGoal = goals[1] ? goals[1] : 1;
            this.moderateActivityGoal = goals[2] ? goals[2] : 1;
            this.intenseActivityGoal = goals[3] ? goals[3] : 1;

            const result = await getDailyActivitiesData();
            this.totalMinutesSedentaryActivity = result['minutesSedentary'] ? result['minutesSedentary'] : 0;
            this.totalMinutesLightActivity = result['minutesLightlyActive'] ? result['minutesLightlyActive'] : 0;
            this.totalMinutesModerateActivity = result['minutesFairlyActive'] ? result['minutesFairlyActive'] : 0;
            this.totalMinutesIntenseActivity = result['minutesVeryActive'] ? result['minutesVeryActive'] : 0;

            this.sedentaryActivityPercentual = parseInt(((this.totalMinutesSedentaryActivity / this.sedentaryActivityGoal) * 100).toFixed(2));
            this.lightActivityPercentual =  parseInt(((this.totalMinutesLightActivity / this.lightActivityGoal) * 100).toFixed(2));
            this.moderateActivityPercentual =  parseInt(((this.totalMinutesModerateActivity / this.moderateActivityGoal) * 100).toFixed(2));
            this.intenseActivityPercentual =  parseInt(((this.totalMinutesIntenseActivity / this.intenseActivityGoal) * 100).toFixed(2));
        },
    },
    async mounted() {
        await getFitbitDailyActivities();
        await this.getDailyReport();
        
        const dailyReportChartOptions = {
            chart: {
                type: "radialBar",
                height: 450,
                // width: 380,
            },
            plotOptions: {
                radialBar: {
                    size: undefined,
                    inverseOrder: true,
                    hollow: {
                        margin: 30,
                        size: "30%",
                        background: "transparent",
                    },
                    track: {
                        show: false,
                    },
                    startAngle: 0,
                    endAngle: -360,
                },
            },
            stroke: {
                lineCap: "round",
            },
            series: [this.sedentaryActivityPercentual, this.lightActivityPercentual, this.moderateActivityPercentual, this.intenseActivityPercentual],
            labels: [
                "Sedentary A.",
                "Light A.",
                "Moderate A.",
                "Intense A.",
            ],
            colors: ["#008ffb", "#00e396", "#feb019", "#a62fd8"],
            legend: {
                show: true,
                position: "bottom",
            },
        };
        if (this.$refs.dailyReportChart) {
            const chart = new ApexCharts(this.$refs.dailyReportChart, dailyReportChartOptions);
            chart.render();
        }
    },

    async beforeCreate() {
        getRefreshToken();
    },
    setup() {
        return {
            filterSharp,
            sad,
        };
    },
});
</script>