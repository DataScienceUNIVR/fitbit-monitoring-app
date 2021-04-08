<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>TRACKING PESO</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="main">
            <ion-card class="pulse" v-if="peso">
                <ion-card-header>
                    <ion-card-subtitle class="peso-ion-card-subtitle"
                        >IL TUO ULTIMO PESO REGISTRATO:</ion-card-subtitle
                    >
                </ion-card-header>
                <ion-card-title class="peso-ion-card-title"
                    >{{ peso }} KG</ion-card-title
                >

                <ion-card-content class="peso-ion-card-content">
                    {{ data }}
                </ion-card-content>
            </ion-card>
            <ion-row>
                <ion-card class="peso-input-ion-card">
                    <ion-card-header>
                        <ion-card-subtitle class="peso-ion-card-subtitle"
                            >AGGIORNA IL TUO PESO:</ion-card-subtitle
                        >
                    </ion-card-header>
                    <ion-card-title class="peso-ion-card-title">
                        <ion-item>
                            <ion-label>Valore: </ion-label>
                            <ion-input
                                ref="newWeight"
                                v-model="newWeight"
                                class="peso-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                                :readonly="false"
                            ></ion-input
                            >KG
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="peso-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="presentAlert">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-card>
            </ion-row>
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle class="peso-ion-card-subtitle"
                        >TRACKING DEI TUOI UTLIMI PESI
                        REGISTRATI</ion-card-subtitle
                    >
                </ion-card-header>
                <div id="weight-chart">
                    <!-- <img width="25%" src="./assets/logo.png" /> -->

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
import { defineComponent, ref } from "vue";
import { getLastWeight, addWeight, getWeights } from "../controllers/userCTR";
import { add } from "ionicons/icons";
import moment from "moment";
import ApexCharts from "apexcharts";
import AppVue from "@/App.vue";

const peso = null;
const data = "";
const dataCorrente = moment(new Date()).format("DD/MM/YYYY HH:mm");

const valoriPesiChart: number[] = [];
const datePesiChart: string[] = [];

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
            peso,
            data,
            dataCorrente,
            valoriPesiChart,
            datePesiChart,
        };
    },
    methods: {
        saveWeight() {
            const peso = this.$refs.newWeight as any;
            addWeight(peso.value);
        },

        async presentAlert() {
            const alert = await alertController.create({
                cssClass: "my-custom-class",
                header: "Immissione di un nuovo peso",
                message:
                    "Sei sicuro di voler inserire questo tuo nuovo peso con data odierna?",
                buttons: [
                    {
                        text: "Cancella",
                        role: "cancel",
                        cssClass: "secondary",
                        handler: () => {
                            return AppVue.methods?.openToast(
                                "Peso non salvato."
                            );
                        },
                    },
                    {
                        text: "Inserisci",
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
                    this.peso = value.peso;
                    // const tmp = moment(value.dateTime.toDate()).format(
                    //     "DD/MM/YYYY HH:mm");
                    this.data = moment(value.dateTime.toDate()).format(
                        "DD/MM/YYYY HH:mm"
                    );
                }
            })
            .catch((e) => {
                this.peso = null;
                this.data = "";
            });

        await Promise.resolve(getWeights())
            .then((element) => {
                if (element) {
                    element.forEach((item) => {
                        valoriPesiChart.unshift(item.valore);
                        datePesiChart.unshift(item.data);
                    });
                }
            })
            .catch((e) => {
                console.log("Errore");
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
                    data: this.valoriPesiChart,
                },
                // {
                //     name: "series2",
                //     data: [11, 32, 45, 32, 34, 52, 41],
                // },
            ],

            xaxis: {
                type: "date",
                categories: this.datePesiChart,
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
