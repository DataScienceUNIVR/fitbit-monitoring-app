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
                        display-format="YYYY/MM/DD"
                        min="2000-01-01"
                        value="2021-04-20"
                    ></ion-datetime>
                </ion-item>
                <ion-item>
                    DATA FINE:&nbsp;&nbsp;
                    <ion-datetime
                        :picker-options="customPickerOptions"
                        display-format="DD/MM/YYYY"
                        min="2000-01-01"
                        value="2021-04-20"
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
                <ion-slide v-if="{ minutiSedentaryActivity }">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTI / GIORNO ATTIVITÀ SEDENTARIA
                            </ion-card-subtitle>
                        </ion-card-header>
                        <div id="chart">
                            <hr />
                            <div ref="sedentaryChart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide v-if="!minutiLightActivity.size">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTI / GIORNO ATTIVITÀ LEGGERA
                            </ion-card-subtitle>
                        </ion-card-header>
                        <div id="chart">
                            <hr />
                            <div ref="lightChart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide v-if="{ minutiModerateActivity }">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTI / GIORNO ATTIVITÀ MODERATA
                            </ion-card-subtitle>
                        </ion-card-header>
                        <div id="chart">
                            <hr />
                            <div ref="moderateChart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide v-if="{ minutiIntenseActivity }">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTI / GIORNO ATTIVITÀ INTENSA
                            </ion-card-subtitle>
                        </ion-card-header>
                        <div id="chart">
                            <hr />
                            <div ref="intenseChart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide
                    v-if="
                        minutiSedentaryActivity.lenght == 0 &&
                        minutiLightActivity.lenght == 0 &&
                        minutiModerateActivity.lenght == 0 &&
                        minutiIntenseActivity.lenght == 0
                    "
                >
                    <ion-card class="report-alert-ion-card">
                        <ion-card-header>
                            <ion-card-title> MI DISPIACE, </ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="report-ion-card-content">
                            PURTROPPO NON SEMBRANO ESSERCI DATI CARICATI PER
                            NESSUNA ATTIVITÀ!
                            <br /><br /><ion-icon
                                :icon="sad"
                                class="report-no-data-ion-icon"
                            ></ion-icon>
                        </ion-card-content>
                    </ion-card>
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
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonDatetime,
    IonFabButton,
    IonFab,
    IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import ApexCharts from "apexcharts";
import { getActivityTimeWithRange } from "../controllers/reportCTR";
import { filterSharp, sad } from "ionicons/icons";

interface Attivita {
    data: any;
    minuti: any;
}

const minutiSedentaryActivity: number[] = [];
const dataSedentaryActivity: string[] = [];
const minutiLightActivity: number[] = [];
const dataLightActivity: string[] = [];
const minutiModerateActivity: number[] = [];
const dataModerateActivity: string[] = [];
const minutiIntenseActivity: number[] = [];
const dataIntenseActivity: string[] = [];

export default defineComponent({
    name: "Report Attività",
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
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        IonDatetime,
        IonFabButton,
        IonFab,
        IonIcon,
    },
    data() {
        return {
            minutiSedentaryActivity,
            dataSedentaryActivity,
            minutiLightActivity,
            dataLightActivity,
            minutiModerateActivity,
            dataModerateActivity,
            minutiIntenseActivity,
            dataIntenseActivity,
        };
    },
    methods: {
        async getReport() {
            const result = await Promise.resolve(getActivityTimeWithRange());
            // const firstDate = null;
            // const lastDate = null;

            // const dates: any = [];
            // let secondDate = new Date();
            result[0].forEach((element: Attivita) => {
                // const firstDate = element?.data;
                // if (secondDate != null) {
                //     console.log(firstDate);
                //     console.log(secondDate);

                //     const date = new Date(firstDate);
                //     const prima = `${date.getDate()}/${
                //         date.getMonth() + 1
                //     }/${date.getFullYear()}`;

                //     const date2 = new Date(secondDate);
                //     const dopo = `${date.getDate()}/${
                //         date.getMonth() + 1
                //     }/${date.getFullYear()}`;

                //     while (dopo < prima) {
                //         console.log("OK");
                // this line modifies the original firstDate reference which you want to make the while loop work
                // firstDate.setDate(firstDate + 1);
                // this pushes a new date , if you were to push firstDate then you will keep updating every item in the array
                // dates.push(new Date(firstDate));
                //     }
                // }
                // secondDate = firstDate;

                // const date = new Date(element.data);
                // const newDate = `${date.getDate()}/${
                //     date.getMonth() + 1
                // }/${date.getFullYear()}`;
                // if () {

                // }
                // while (newDate >){

                // }
                // console.log(date);
                // console.log(newDate);

                minutiSedentaryActivity.push(element.minuti);
                dataSedentaryActivity.push(element.data);
            });

            result[1].forEach((element: Attivita) => {
                minutiLightActivity.push(element.minuti);
                dataLightActivity.push(element.data);
            });
            result[2].forEach((element: Attivita) => {
                minutiModerateActivity.push(element.minuti);
                dataModerateActivity.push(element.data);
            });
            result[3].forEach((element: Attivita) => {
                minutiIntenseActivity.push(element.minuti);
                dataIntenseActivity.push(element.data);
            });
        },
    },

    async mounted() {
        // const current = new Date();
        // const currentDate = `${current.getDate()}/${
        //     current.getMonth() + 1
        // }/${current.getFullYear()}`;
        // console.log(currentDate);

        // const tomorrow = `${current.getDate() + 1}/${
        //     current.getMonth() + 1
        // }/${current.getFullYear()}`;

        // console.log(currentDate);
        // console.log(tomorrow);
        // console.log(currentDate < tomorrow);

        await this.getReport();

        const sedentaryChartOptions = {
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
                    name: "minuti",
                    data: this.minutiSedentaryActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dataSedentaryActivity,
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        };

        const lightChartOptions = {
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
            colors: ["#FFEC62", "#E91E63", "#9C27B0"],
            series: [
                {
                    name: "minuti",
                    data: this.minutiLightActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dataLightActivity,
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        };

        const moderateChartOptions = {
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
            colors: ["#9147E1", "#E91E63", "#9C27B0"],
            series: [
                {
                    name: "minuti",
                    data: this.minutiModerateActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dataModerateActivity,
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        };

        const intenseChartOptions = {
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
            colors: ["#359946", "#E91E63", "#9C27B0"],
            series: [
                {
                    name: "minuti",
                    data: this.minutiIntenseActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dataIntenseActivity,
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        };

        if (this.$refs.sedentaryChart) {
            const chart = new ApexCharts(
                this.$refs.sedentaryChart,
                sedentaryChartOptions
            );
            chart.render();
        }
        if (this.$refs.lightChart) {
            const chart = new ApexCharts(
                this.$refs.lightChart,
                lightChartOptions
            );
            chart.render();
        }
        if (this.$refs.moderateChart) {
            const chart = new ApexCharts(
                this.$refs.moderateChart,
                moderateChartOptions
            );
            chart.render();
        }
        if (this.$refs.intenseChart) {
            const chart = new ApexCharts(
                this.$refs.intenseChart,
                intenseChartOptions
            );
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
            sad,
        };
    },
});
</script>
