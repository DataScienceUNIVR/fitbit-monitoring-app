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
                    105
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card counter2">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        PASSI ATTIVITÀ LEGGERA
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    105
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card counter3">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        PASSI ATTIVITÀ MODERATA
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    105
                </ion-card-content>
            </ion-card>
            <ion-card class="chart-ion-card counter4">
                <ion-card-header>
                    <ion-card-subtitle class="report-ion-card-subtitle">
                        PASSI ATTIVITÀ INTENSA
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content class="counter-ion-card">
                    105
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
const totaleMinutiSedentaryActivity = 0;
const totaleMinutiLightActivity = 0;
const totaleMinutiModerateActivity = 0;
const totaleMinutiIntenseActivity = 0;
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
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardContent,
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
            totaleMinutiSedentaryActivity,
            totaleMinutiLightActivity,
            totaleMinutiModerateActivity,
            totaleMinutiIntenseActivity,
        };
    },
    methods: {
        async getReport() {
            // const result = await Promise.resolve(getActivityTimeWithRange());
            // result[0].forEach((element: Attivita) => {
            //     minutiSedentaryActivity.push(element.minuti);
            //     dataSedentaryActivity.push(element.data);
            //     totaleMinutiSedentaryActivity += parseInt(element.minuti);
            // });
            // result[1].forEach((element: Attivita) => {
            //     minutiLightActivity.push(element.minuti);
            //     dataLightActivity.push(element.data);
            //     totaleMinutiLightActivity += parseInt(element.minuti);
            // });
            // result[2].forEach((element: Attivita) => {
            //     minutiModerateActivity.push(element.minuti);
            //     dataModerateActivity.push(element.data);
            //     totaleMinutiModerateActivity += parseInt(element.minuti);
            // });
            // result[3].forEach((element: Attivita) => {
            //     minutiIntenseActivity.push(element.minuti);
            //     dataIntenseActivity.push(element.data);
            //     totaleMinutiIntenseActivity += parseInt(element.minuti);
            // });
        },
    },
    async mounted() {
        // await this.getReport();
        const options3 = {
            chart: {
                type: "radialBar",
                height: 350,
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
                    startAngle: -180,
                    endAngle: 180,
                },
            },
            stroke: {
                lineCap: "round",
            },
            series: [71, 63, 77, 75],
            labels: [
                "A. sedentaria",
                "A. leggera",
                "A. moderata",
                "A. intensa",
            ],
            colors: ["#008ffb", "#00e396", "#feb019", "#a62fd8"],
            legend: {
                show: true,
                floating: true,
                position: "right",
                offsetX: -10,
                offsetY: 190,
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