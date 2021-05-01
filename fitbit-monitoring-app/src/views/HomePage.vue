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
            <ion-card class="chart-ion-card counter1">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        PASSI ATTIVITÀ SEDENTARIA
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totaleMinutiSedentaryActivity }}
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card counter2">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        PASSI ATTIVITÀ LEGGERA
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totaleMinutiLightActivity }}
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card counter3">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        PASSI ATTIVITÀ MODERATA
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totaleMinutiModerateActivity }}
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card counter4">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        PASSI ATTIVITÀ INTENSA
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    {{ totaleMinutiIntenseActivity }}
                </ion-card-content>
            </ion-card>

            <ion-card class="chart-ion-card">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        OBBIETTIVI GIORNALIERI:
                    </ion-card-subtitle>
                </ion-card-header>
                <div id="chart">
                    <hr />
                    <div ref="gaussianChart3" class="report-pie-chart"></div>
                </div>
            </ion-card>
            <ion-card class="chart-ion-card">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        GAUSSIAN
                    </ion-card-subtitle>
                </ion-card-header>
                <div id="chart">
                    <hr />
                    <div ref="gaussianChart2" class="report-pie-chart"></div>
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
import { defineComponent } from "vue";
import ApexCharts from "apexcharts";
import { getDailyActivitiesData, getDailyActivitiesGoals } from "../controllers/goalsCTR";
import { filterSharp, sad } from "ionicons/icons";

const totaleMinutiSedentaryActivity = 0;
const totaleMinutiLightActivity = 0;
const totaleMinutiModerateActivity = 0;
const totaleMinutiIntenseActivity = 0;

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
            totaleMinutiSedentaryActivity,
            totaleMinutiLightActivity,
            totaleMinutiModerateActivity,
            totaleMinutiIntenseActivity,

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

            const result = await Promise.resolve(getDailyActivitiesData());
            this.totaleMinutiSedentaryActivity = result[0] ? result[0] : 0;
            this.totaleMinutiLightActivity = result[1] ? result[1] : 0;
            this.totaleMinutiModerateActivity = result[2] ? result[2] : 0;
            this.totaleMinutiIntenseActivity = result[3] ? result[3] : 0;

            this.sedentaryActivityPercentual = (this.totaleMinutiSedentaryActivity / this.sedentaryActivityGoal) * 100;
            this.lightActivityPercentual = (this.totaleMinutiLightActivity / this.lightActivityGoal) * 100;
            this.moderateActivityPercentual = (this.totaleMinutiModerateActivity / this.moderateActivityGoal) * 100;
            this.intenseActivityPercentual = (this.totaleMinutiIntenseActivity / this.intenseActivityGoal) * 100;
        },
    },
    async mounted() {
        await this.getDailyReport();
        const options3 = {
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
            series: [this.sedentaryActivityPercentual, 95, 37.5, 50],
            labels: [
                "A. sedentaria",
                "A. leggera",
                "A. moderata",
                "A. intensa",
            ],
            colors: ["#008ffb", "#00e396", "#feb019", "#a62fd8"],
            legend: {
                show: true,
                // floating: true,
                position: "bottom",
                // offsetX: -0,
                // offsetY: -190,
            },
        };
        const options2 = {
            series: [67],
            chart: {
                height: 350,
                type: "radialBar",
                offsetY: -10,
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: "16px",
                            color: undefined,
                            offsetY: 120,
                        },
                        value: {
                            offsetY: 76,
                            fontSize: "22px",
                            color: undefined,
                            formatter: function (val: any) {
                                return val + "%";
                            },
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91],
                },
            },
            stroke: {
                dashArray: 4,
            },
            labels: ["ATTIVITA' MODERATA"],
        };
        if (this.$refs.gaussianChart2) {
            const chart = new ApexCharts(this.$refs.gaussianChart2, options2);
            chart.render();
        }
        if (this.$refs.gaussianChart3) {
            const chart = new ApexCharts(this.$refs.gaussianChart3, options3);
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