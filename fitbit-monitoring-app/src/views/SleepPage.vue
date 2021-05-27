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
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle class="input-ion-card-subtitle">CONFIDENZA:</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    Valore sonno previsto per stasera:
                    <ion-badge color="primary"> {{sleepScore}} </ion-badge>
                    <div id="chart">
                        <hr />
                        <div ref="confidenceChart" class="margin-chart"></div>
                    </div>
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
    IonBadge
} from "@ionic/vue";
import { defineComponent, ApexCharts } from "../config/export";
import { getSleepAssociationRules } from "../controllers/sleepCTR";

const support = 0;
const sleepScore: any = null;
const confidence: any = null;

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
        IonBadge
    },
    data() {
        return {
            confidence,
            sleepScore
        };
    },
    methods: {},

    async mounted() {
        await Promise.resolve(getSleepAssociationRules()).then((result) => {
            if (result) {
                this.confidence = (result!['confidenza'] * 100).toFixed(0);
                this.sleepScore = (result!['sonno']);
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

    // setup() {
    // },
});
</script>
