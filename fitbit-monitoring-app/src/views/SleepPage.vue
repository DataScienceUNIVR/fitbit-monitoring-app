<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>SLEEP REPORT</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-card v-if="confidence">
                <ion-card-header>
                    <ion-card-subtitle class="input-ion-card-subtitle">CONFIDENCE:</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="sleep-ion-card-content">
                    Sleep value expected for tonight:
                    <br>
                    <ion-badge color="medium" class="sleep-score"> {{sleepScore}} </ion-badge>
                    <div id="chart">
                        <hr />
                        <div ref="confidenceChart" class="margin-chart"></div>
                    </div>
                    <br>
                    Support:
                    <br>
                    <ion-badge color="medium" class="sleep-score"> {{support}} </ion-badge>
                </ion-card-content>
            </ion-card>

            <ion-card v-if="!confidence">
                <ion-card-content class="sleep-ion-card-content">
                    There seems to be no data on your sleep!
                    <br>
                    <ion-badge color="danger" class="sleep-score-alert">
                        <ion-icon :icon="alertCircleOutline"></ion-icon>
                    </ion-badge>
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
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonIcon
} from "@ionic/vue";
import { defineComponent, ApexCharts } from "../config/export";
import { getSleepAssociationRules } from "../controllers/sleepCTR";
import { alertCircleOutline } from "ionicons/icons";

const support: any = null;
const sleepScore: any = null;
const confidence: any = null;

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
        IonCardHeader,
        IonCardContent,
        IonCardSubtitle,
        IonIcon
    },
    data() {
        return {
            confidence,
            sleepScore,
            support
        };
    },
    methods: {},

    async mounted() {
        await Promise.resolve(getSleepAssociationRules()).then((result) => {
            if (result) {
                this.confidence = (result!['confidenza'] * 100).toFixed(0);
                this.sleepScore = (result!['sonno']);
                this.support = (result!['supporto'] * 1).toFixed(6);
            }
        });

        const confidenceOptions = {
            chart: {
                height: 400,
                type: "radialBar",
            },
            series: [this.confidence],
            colors: ["#A04000"],
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#333",
                        startAngle: -90,
                        endAngle: 90,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            fontSize: "40px",
                            show: true,
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "horizontal",
                    gradientToColors: ["#F5B041"],
                    stops: [0, 100],
                },
            },
            stroke: {
                lineCap: "butt",
            },
            labels: ["Progress"],
        };

        if (this.$refs.confidenceChart) {
            const chart = new ApexCharts(
                this.$refs.confidenceChart,
                confidenceOptions
            );
            chart.render();
        }
    },

    setup() {
        return { alertCircleOutline };
    },
});
</script>
