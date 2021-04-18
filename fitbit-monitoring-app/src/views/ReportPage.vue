<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>REPORT ATTIVITA'</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-toolbar>
                <ion-item>
                    DATA INIZIO:
                    <ion-datetime
                        :picker-options="customPickerOptions"
                        display-format="DD/MM/YYYY"
                        min="2000-01-01"
                        value="new Date(2017, 9,  5)"
                    ></ion-datetime>
                </ion-item>
                <ion-item>
                    DATA FINE:&nbsp;&nbsp;
                    <ion-datetime
                        :picker-options="customPickerOptions"
                        display-format="DD/MM/YYYY"
                        min="2000-01-01"
                        value="2021-04-17"
                    ></ion-datetime>
                </ion-item>
                <ion-fab vertical="center" horizontal="end">
                    <ion-fab-button
                        color="light"
                        id="btnFilter"
                        @click="getReport"
                    >
                        <ion-icon :icon="filterSharp"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-toolbar>

            <ion-slides pager="true" :options="slideOpts">
                <ion-slide>
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="peso-ion-card-subtitle"
                                >ATTVITA' GENERALE SVOLTA</ion-card-subtitle
                            >
                        </ion-card-header>
                        <div id="weight-chart">
                            <hr />
                            <div ref="chart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide>
                    <h1>Slide 2</h1>
                </ion-slide>
                <ion-slide>
                    <h1>Slide 3</h1>
                </ion-slide>
            </ion-slides>
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
    IonSlides,
    IonSlide,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonItem,
    IonDatetime,
    IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import moment from "moment";
import ApexCharts from "apexcharts";
import { getLastWeight, getWeights } from "../controllers/weightCTR";
import { filterSharp } from "ionicons/icons";

const peso = null;
const data = "";

const valoriPesiChart: number[] = [];
const datePesiChart: string[] = [];

// const tmp = new Date("2017/5/10");

// const result = "" + tmp.getFullYear() + ((tmp.getMonth() + 1) > 9 ? '' : '0') + (tmp.getMonth() + 1) + (tmp.getDate() > 9 ? '' : '0') + tmp.getDate();

// console.log(tmp);

const current = new Date();
const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
}/${current.getFullYear()}`;
const startDate = `${current.getDate()}/${
    current.getMonth() + 2
}/${current.getFullYear()}`;
// localStorage.start = currentDate;
// console.log(date2);
// console.log(currentDate);
    localStorage.start = current.toISOString();
    console.log("2021-04-20");


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
        IonSlides,
        IonSlide,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonItem,
        IonDatetime,
        IonIcon,
    },
    data() {
        return {
            peso,
            data,
            valoriPesiChart,
            datePesiChart,
        };
    },
    methods: {
        getReport() {
            console.log("das");
        }
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
                height: "450",
                type: "area",
                foreColor: "white",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            colors: ["#F44336", "#E91E63", "#9C27B0"],
            series: [
                {
                    name: "series1",
                    data: this.valoriPesiChart,
                },
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
        const customPickerOptions = {
            buttons: [
                {
                    text: "Cancel",
                    handler: () => {
                        console.log("Annullato");
                    },
                },
                {
                    text: "Seleziona",
                    handler: () => {
                        console.log("Selezionato");
                    },
                },
            ],
        };

        const slideOpts = {
            initialSlide: 0,
            speed: 400,
            autoplay: true,
        };
        return {
            customPickerOptions,
            slideOpts,
            filterSharp,
        };
    },
});
</script>
