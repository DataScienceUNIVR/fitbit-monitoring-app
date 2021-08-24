<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>ACTIVITY REPORT</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-toolbar>
                <ion-item>
                    START DATE:
                    <ion-datetime
                        :picker-options="customPickerOptions"
                        display-format="DD/MM/YYYY"
                        min="2000-01-01"
                        value="2021-04-20"
                    ></ion-datetime>
                </ion-item>
                <ion-item>
                    END DATE:&nbsp;&nbsp;
                    <ion-datetime
                        :picker-options="customPickerOptions"
                        display-format="DD/MM/YYYY"
                        min="2000-01-01"
                        value="2021-07-14"
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
            <ion-card-header>
                <ion-card-subtitle class="report-ion-card-subtitle">
                    TOTAL BREAKDOWN IN MINUTES
                </ion-card-subtitle>
            </ion-card-header>
            <div id="chart">
                <hr />
                <div ref="pieChart" class="margin-chart"></div>
            </div>

            <ion-slides pager="true" :options="slideOpts">
                <ion-slide v-if="{ minutesSedentaryActivity }">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTES / DAY SEDENTARY ACTIVITY
                            </ion-card-subtitle>
                        </ion-card-header>
                        <div id="chart">
                            <hr />
                            <div ref="sedentaryChart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide v-if="!minutesLightActivity.size">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTES / DAY LIGHT ACTIVITY
                            </ion-card-subtitle>
                        </ion-card-header>
                        <div id="chart">
                            <hr />
                            <div ref="lightChart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide v-if="{ minutesModerateActivity }">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTES / DAY MODERATE ACTIVITY
                            </ion-card-subtitle>
                        </ion-card-header>
                        <div id="chart">
                            <hr />
                            <div ref="moderateChart" class="chart"></div>
                        </div>
                    </ion-card>
                </ion-slide>
                <ion-slide v-if="{ minutesIntenseActivity }">
                    <ion-card class="chart-ion-card">
                        <ion-card-header>
                            <ion-card-subtitle class="report-ion-card-subtitle">
                                MINUTES / DAY INTENSE ACTIVITY 
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
                        minutesSedentaryActivity.lenght == 0 &&
                        minutesLightActivity.lenght == 0 &&
                        minutesModerateActivity.lenght == 0 &&
                        minutesIntenseActivity.lenght == 0
                    "
                >
                    <ion-card class="report-alert-ion-card">
                        <ion-card-header>
                            <ion-card-title> SORRY, </ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="report-ion-card-content">
                            UNFORTUNATELY THERE DOES NOT APPEAR TO BE UPLOADED FOR
                            NO ACTIVITY!
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
    alertController,
} from "@ionic/vue";
import { getActivityTimeWithRange } from "../controllers/reportCTR";
import { filterSharp, sad } from "ionicons/icons";
import { ApexCharts, defineComponent } from "../config/export";

interface Activity {
    date: any;
    minutes: any;
}

const minutesSedentaryActivity: number[] = [];
const dateSedentaryActivity: string[] = [];
const minutesLightActivity: number[] = [];
const dateLightActivity: string[] = [];
const minutesModerateActivity: number[] = [];
const dateModerateActivity: string[] = [];
const minutesIntenseActivity: number[] = [];
const dateIntenseActivity: string[] = [];

let totalMinutesSedentaryActivity = 0;
let totalMinutesLightActivity = 0;
let totalMinutesModerateActivity = 0;
let totalMinutesIntenseActivity = 0;

const isEmpty = true;
export default defineComponent({
    name: "Activity Report",
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
            minutesSedentaryActivity,
            dateSedentaryActivity,
            minutesLightActivity,
            dateLightActivity,
            minutesModerateActivity,
            dateModerateActivity,
            minutesIntenseActivity,
            dateIntenseActivity,

            totalMinutesSedentaryActivity,
            totalMinutesLightActivity,
            totalMinutesModerateActivity,
            totalMinutesIntenseActivity,
            isEmpty
        };
    },
    methods: {
        async getReport() {
            const result = await Promise.resolve(getActivityTimeWithRange());
            // const firstDate = null;
            // const lastDate = null;

            // const dates: any = [];
            // let secondDate = new Date();
            result[0].forEach((element: Activity) => {
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

                minutesSedentaryActivity.push(element.minutes);
                dateSedentaryActivity.push(element.date);
                totalMinutesSedentaryActivity += parseInt(element.minutes);
                this.isEmpty = false;
            });

            result[1].forEach((element: Activity) => {
                minutesLightActivity.push(element.minutes);
                dateLightActivity.push(element.date);
                totalMinutesLightActivity += parseInt(element.minutes);
                this.isEmpty = false;
            });
            result[2].forEach((element: Activity) => {
                minutesModerateActivity.push(element.minutes);
                dateModerateActivity.push(element.date);
                totalMinutesModerateActivity += parseInt(element.minutes);
                this.isEmpty = false;
            });
            result[3].forEach((element: Activity) => {
                minutesIntenseActivity.push(element.minutes);
                dateIntenseActivity.push(element.date);
                totalMinutesIntenseActivity += parseInt(element.minutes);
                this.isEmpty = false;
            });
        },
        
        async presentAlert() {
            const alert = await alertController.create({
                header: "No data found!",
                message:
                    "Warning: Reports cannot be viewed. There appears to be no data uploaded for any type of activity related to this user.",
                buttons: [
                    {
                        text: "Ok",
                    },
                ],
            });
            return alert.present();
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

        if (this.isEmpty) {
            this.presentAlert();
        }
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
            colors: ["#008ffb"],
            series: [
                {
                    name: "minuti",
                    data: this.minutesSedentaryActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dateSedentaryActivity,
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
            colors: ["#00e396"],
            series: [
                {
                    name: "minuti",
                    data: this.minutesLightActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dateLightActivity,
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
            colors: ["#feb019"],
            series: [
                {
                    name: "minuti",
                    data: this.minutesModerateActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dateModerateActivity,
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
            colors: ["#a62fd8"],
            series: [
                {
                    name: "minuti",
                    data: this.minutesIntenseActivity,
                },
            ],
            xaxis: {
                type: "date",
                categories: this.dateIntenseActivity,
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy",
                },
            },
        };

        const pieChartOptions = {
            chart: {
                width: "100%",
                type: "pie",
                foreColor: "white",
            },
            dataLabels: {
                enabled: false,
            },
            series: [
                totalMinutesSedentaryActivity,
                totalMinutesLightActivity,
                totalMinutesModerateActivity,
                totalMinutesIntenseActivity,
            ],
            colors: ["#008ffb", "#00e396", "#feb019", "#a62fd8"],
            labels: [
                "Sedentary Activity",
                "Light Activity",
                "Moderate Activity",
                "Intense Activity",
            ],

            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
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
        if (this.$refs.pieChart) {
            const chart = new ApexCharts(this.$refs.pieChart, pieChartOptions);
            chart.render();
        }
    },

    setup() {
        const customPickerOptions = {
            buttons: [
                {
                    text: "Cancel",
                    handler: () => {
                        console.log("Canceled");
                    },
                },
                {
                    text: "Seleziona",
                    handler: () => {
                        console.log("Selected");
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
