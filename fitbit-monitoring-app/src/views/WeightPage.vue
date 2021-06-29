<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>WEIGHT TRACKING</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="main">
            <ion-card class="pulse" v-if="valueLastWeight">
                <ion-card-header>
                    <ion-card-subtitle class="input-ion-card-subtitle"
                        >YOUR LAST REGISTERED WEIGHT:</ion-card-subtitle
                    >
                </ion-card-header>
                <ion-card-title class="input-on-card-title"
                    >{{ valueLastWeight }} KG</ion-card-title
                >

                <ion-card-content class="input-ion-card-content">
                    {{ dateLastWeight }}
                </ion-card-content>
            </ion-card>
            <ion-row>
                <ion-card class="input-ion-card">
                    <ion-card-header>
                        <ion-card-subtitle class="input-ion-card-subtitle"
                            >UPDATE YOUR WEIGHT:</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="input-on-card-title">
                        <ion-item class="text-input">
                            <ion-label>Value: </ion-label>
                            <ion-input
                                ref="newWeight"
                                v-model="newWeight"
                                class="weight-input"
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
                        <ion-fab-button @click="presentAlert">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-card>
            </ion-row>
            <ion-card class="chart-ion-card">
                <ion-card-header>
                    <ion-card-subtitle class="input-ion-card-subtitle"
                        >TRACKING YOUR LAST REGISTERED WEIGHTS</ion-card-subtitle
                    >
                </ion-card-header>
                <div id="chart">
                    <hr />
                    <div ref="chart" class="chart"></div>
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
    alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { getLastWeight, addWeight, getWeights } from "../controllers/weightCTR";
import { add } from "ionicons/icons";
import moment from "moment";
import ApexCharts from "apexcharts";
import AppVue from "@/App.vue";

const valueLastWeight = null;
const dateLastWeight = "";
const currentDate = moment(new Date()).format("DD/MM/YYYY HH:mm");

const weightValuesChart: number[] = [];
const weightDateChart: string[] = [];

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
            valueLastWeight,
            dateLastWeight,
            currentDate,
            weightValuesChart,
            weightDateChart,
        };
    },
    methods: {
        saveWeight() {
            const weight = this.$refs.newWeight as any;
            addWeight(weight.value);
        },

        async presentAlert() {
            const alert = await alertController.create({
                header: "Entering a new weight",
                message:
                    "Are you sure you want to enter your new weight with today's date?",
                buttons: [
                    {
                        text: "Cancel",
                        role: "cancel",
                        cssClass: "secondary",
                        handler: () => {
                            return AppVue.methods?.openToast(
                                "Weight not saved."
                            );
                        },
                    },
                    {
                        text: "Insert",
                        handler: () => {
                            this.saveWeight();
                        },
                    },
                ],
            });
            return alert.present();
        },
    },

    async mounted() {
        await Promise.resolve(getLastWeight())
            .then((value) => {
                if (value) {
                    this.valueLastWeight = value.weight;
                    this.dateLastWeight = moment(value.dateTime.toDate()).format(
                        "DD/MM/YYYY HH:mm"
                    );
                }
            })
            .catch((e) => {
                this.valueLastWeight = null;
                this.dateLastWeight = "";
            });

        await Promise.resolve(getWeights())
            .then((element) => {
                if (element) {
                    element.forEach((item) => {
                        weightValuesChart.unshift(item.value);
                        weightDateChart.unshift(item.date);
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });

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
            series: [
                {
                    name: "series1",
                    data: this.weightValuesChart,
                },
            ],

            xaxis: {
                type: "date",
                categories: this.weightDateChart,
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        };

        if (this.$refs.chart) {
            const chart = new ApexCharts(this.$refs.chart, options);
            chart.render();
        }
    },

    setup() {
        return {
            add,
        };
    },
});
</script>
