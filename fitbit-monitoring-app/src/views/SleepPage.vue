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
                <ion-card-content class="sleep-ion-card-content">
                    Tonight your sleep quality will be:
                    <br>
                    <ion-badge color="medium" class="sleep-score"> {{sleepScore}} </ion-badge>
                    <br><br><br>CONFIDENCE: 
                    <div id="chart">
                        <div ref="confidenceChart" class="sleep-margin-chart"></div>
                    </div>
                    <br>
                    <p style="font-size:16px;">Because you have been doing:</p> 
                    <ion-card class="sleep-daily-acivities">
                        <ion-card-content class="sleep-ion-card-content" style="text-align: left;font-size: 15px;">
                            <i>Yesterday:</i>
                            <br><br>
                            ✓ MODERATE INTENSE ACTIVITY LEVEL 3
                            <br><br>
                            ✓ LOW SEDENTARY ACTIVITY LEVEL 3
                            <br>
                            <hr style="height:1px;color:gray;background-color:#575757">
                            <i>2 days ago:</i>
                            <br><br>
                            ✓ MODERATE LOW ACTIVITY LEVEL 2
                            <br>
                        </ion-card-content>
                    </ion-card>
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

                <ion-card class="sleep-input-ion-card">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >HOW DID YOU SLEEP LAST NIGHT?</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="input-on-card-title">
                        <ion-item>
                            I slept: 
                            <ion-select
                                ref="newSleepQuality"
                                v-model="newSleepQuality"
                                class="sleep-select"
                            >
                                <ion-select-option value="4"
                                    >Very Well</ion-select-option
                                >
                                <ion-select-option value="3"
                                    >Well</ion-select-option
                                >
                                <ion-select-option value="2" selected="true"
                                    >Normally</ion-select-option
                                >
                                <ion-select-option value="1"
                                    >Badly</ion-select-option
                                >
                                <ion-select-option value="0"
                                    >Very Badly</ion-select-option
                                >
                            </ion-select>
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="input-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="presentAlert">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-card>
            <ion-card class="chart-ion-card">
                <ion-card-header>
                    <ion-card-subtitle class="input-ion-card-subtitle"
                        >TRACKING YOUR SLEEP QUALITY REGISTERED</ion-card-subtitle
                    >
                </ion-card-header>
                <div id="chart">
                    <hr />
                    <div ref="sleepQualityChart" class="chart"></div>
                </div>
                <ion-card-subtitle class="input-ion-card-subtitle">
                    LEGEND: <br><br>
                    <table class="sleep-legend-table">
                        <tbody>
                        <tr>
                            <th style="width: 100px;">V.B.</th>
                            <th style="width: 100px;">Very Badly</th>
                        </tr>
                        <tr>
                            <td>B.</td>
                            <td>Badly</td>
                        </tr>
                        <tr>
                            <td>N.</td>
                            <td>Normally</td>
                        </tr>
                        <tr>
                            <td>W.</td>
                            <td>Well</td>
                        </tr>
                        <tr>
                            <td>V.W.</td>
                            <td>Very Well</td>
                        </tr>
                        </tbody>
                        </table>
                </ion-card-subtitle>
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
    IonIcon,
    alertController
} from "@ionic/vue";
import { defineComponent, ApexCharts, AppVue } from "../config/export";
import { addSleepQuality, getSleepAssociationRules, getSleepQuality } from "../controllers/sleepCTR";
import { alertCircleOutline, add } from "ionicons/icons";
import moment from "moment";
import { getWeekFitbitLogs } from "@/controllers/userCTR";

const sleepValuesChart: string[] = [];
const sleepDateChart: string[] = [];
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
            support,
            sleepValuesChart,
            sleepDateChart,
        };
    },
    methods: {
        async presentAlert() {
            const sleepQuality = this.$refs.newSleepQuality as any;
            if(sleepQuality.value) {
                const alert = await alertController.create({
                    header: "Entering a new sleep quality",
                    message:
                        "Are you sure you want to add this new sleep score with today's date?",
                    buttons: [
                        {
                            text: "Cancel",
                            role: "cancel",
                            cssClass: "secondary",
                            handler: () => {
                                return AppVue.methods?.openToast(
                                    "Sleep score quality not saved."
                                );
                            },
                        },
                        {
                            text: "Insert",
                            handler: () => {
                                this.saveSleepQuality();
                            },
                        },
                    ],
                });
                return alert.present();
            } else {
                return AppVue.methods?.openToast("It's can't be empty!");
            }
        },

        saveSleepQuality() {
            const sleepQuality = this.$refs.newSleepQuality as any;
            addSleepQuality(sleepQuality.value);
        },
    },

    async mounted() {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const nextSyncTimestamp  = Number(localStorage.getItem("nextSyncServer"));
        if( nextSyncTimestamp != null
            &&
            currentTimestamp >= nextSyncTimestamp
        ){
            await getWeekFitbitLogs(4);
            AppVue.methods?.openToast("Sync with server...");
            localStorage.setItem("nextSyncServer", String(Math.floor((Date.now() / 1000) + 345600)));
        }

        await Promise.resolve(getSleepAssociationRules()).then((result) => {
            if (result) {
                // this.confidence = (result!['confidence'] * 100).toFixed(0);
                // this.sleepScore = (result!['consequents']);
                // this.support = (result!['support'] * 1).toFixed(6);
            }
        });

        this.confidence = (0.85 * 100).toFixed(0);
        this.sleepScore = "MEDIUM";
        this.support = (0.8514089 * 1).toFixed(6);
        await Promise.resolve(getSleepQuality())
            .then((element) => {
                if (element) {
                    element.forEach((item) => {
                        sleepValuesChart.unshift(item.value);
                        sleepDateChart.unshift(item.date);
                    });
                }
            })
            .catch((e) => {
                console.log(e);
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

        const options = {
            chart: {
                height: 550,
                type: "area",
                foreColor: "white",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            colors: ["#D68729"],
            series: [
                {
                    name: "series1",
                    data: this.sleepValuesChart,
                },
            ],

            xaxis: {
                type: "date",
                categories: this.sleepDateChart,
            },
            yaxis: {
                labels: {
                    formatter: function (value: number) {
                        if(value == 0) {
                            return "V.B.";
                        } else if(value == 1) {
                            return "B.";
                        } else if(value == 2) {
                            return "N.";
                        } else if(value == 3) {
                            return "W.";
                        } else if(value == 4) {
                            return "V.W.";
                        }
                }
                },
            },

            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        };

        if (this.$refs.sleepQualityChart) {
            const chart = new ApexCharts(
                this.$refs.sleepQualityChart, 
                options);
            chart.render();
        }
        if (this.$refs.confidenceChart) {
            const chart = new ApexCharts(
                this.$refs.confidenceChart,
                confidenceOptions
            );
            chart.render();
        }
    },

    setup() {
        return { alertCircleOutline, add };
    },
});
</script>
