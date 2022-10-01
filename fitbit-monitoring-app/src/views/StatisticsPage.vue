<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>STATISTICS</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="main">
            <ion-toolbar collapse="condense">
                <ion-item>
                    <ion-label>STATISTICS PERIOD</ion-label>
                    <ion-select
                        placeholder="SELECT"
                        @ionchange="changePeriod"
                    >
                        <ion-select-option value="d" selected="true"
                            >Last Day</ion-select-option
                        >
                        <ion-select-option value="w"
                            >Last Week</ion-select-option
                        >
                        <ion-select-option value="m"
                            >Last Month</ion-select-option
                        >
                    </ion-select>
                </ion-item>
            </ion-toolbar>

            <ion-row class="statistics-row">
                <vue-flip
                    ref="sedentaryFlip"
                    active-click=true
                    width="100%"
                    height="100%"
                    id="flipCard1"
                >
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #4a0f81"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >SEDENTARY<br />
                                    ACTIVITY TIME</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ sedentaryActivityStatistics.minutes }}
                                    min
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #8848b4"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >DISTANCE TRAVELED<br />
                                    SEDENTARY ACTIVITY</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ sedentaryActivityStatistics.distance }}
                                    km
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
            </ion-row>
            <ion-row class="statistics-row">
                <vue-flip
                    ref="lightFlip"
                    active-click=true
                    width="100%"
                    height="100%"
                    id="flipCard2"
                >
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #7f3c2f"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >LIGHT<br />
                                    ACTIVITY TIME</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ lightActivityStatistics.minutes }} min
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #b46354"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >DISTANCE TRAVELED<br />
                                    LIGHT ACTIVITY</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ lightActivityStatistics.distance }} km
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
            </ion-row>
            <ion-row class="statistics-row">
                <vue-flip
                    ref="moderateFlip"
                    active-click=true
                    width="100%"
                    height="100%"
                    id="flipCard3"
                >
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #8d912f"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >MODERATE<br />
                                    ACTIVITY TIME</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ moderateActivityStatistics.minutes }} min
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #a6aa43"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >DISTANCE TRAVELED<br />
                                    MODERATE ACTIVITY</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ moderateActivityStatistics.distance }} km
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
            </ion-row>
            <ion-row class="statistics-row">
                <vue-flip
                    ref="intenseFlip"
                    active-click=true
                    width="100%"
                    height="100%"
                    id="flipCard4"
                >
                    <template v-slot:front class="front">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #3092a6"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >INTENSE<br />
                                    ACTIVITY TIME</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ intenseActivityStatistics.minutes }} min
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                    <template v-slot:back class="back">
                        <ion-card
                            class="statistics-ion-card"
                            style="background-color: #43acc3"
                        >
                            <ion-card-header>
                                <ion-card-subtitle
                                    class="statistics-ion-card-subtitle"
                                    >DISTANCE TRAVELED<br />
                                    INTENSE ACTIVITY</ion-card-subtitle
                                >
                                <ion-card-title
                                    class="statistics-ion-card-title"
                                >
                                    {{ intenseActivityStatistics.minutes }} km
                                </ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </template>
                </vue-flip>
            </ion-row>
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
    IonRow,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonItem,
    IonToolbar,
} from "@ionic/vue";
import { getStatistics } from "../controllers/statisticsCTR";
import { AppVue, VueFlip } from "../config/export";

interface Statistic {
    tipology?: any;
    minutes?: any;
    distance?: any;
}
const sedentaryActivityStatistics: Statistic = {};
const lightActivityStatistics: Statistic = {};
const moderateActivityStatistics: Statistic = {};
const intenseActivityStatistics: Statistic = {};

export default {
    name: "Main",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonRow,
        IonSelect,
        IonSelectOption,
        IonLabel,
        IonCard,
        IonCardSubtitle,
        IonCardTitle,
        IonCardHeader,
        IonItem,
        IonToolbar,
        "vue-flip": VueFlip,
    },
    data() {
        return {
            sedentaryActivityStatistics,
            lightActivityStatistics,
            moderateActivityStatistics,
            intenseActivityStatistics,
        };
    },
    async mounted() {
        await Promise.resolve(getStatistics(localStorage.period))
            .then((element) => {
                if (element) {
                    element.forEach((item) => {
                        switch (item.tipology) {
                            case "sedentaryActivity":
                                sedentaryActivityStatistics.tipology =
                                    item.tipology;
                                sedentaryActivityStatistics.minutes =
                                    item.minutes;
                                sedentaryActivityStatistics.distance =
                                    item.distance;
                                break;
                            case "lightActivity":
                                lightActivityStatistics.tipology =
                                    item.tipology;
                                lightActivityStatistics.minutes = item.minutes;
                                lightActivityStatistics.distance =
                                    item.distance;
                                break;
                            case "moderateActivity":
                                moderateActivityStatistics.tipology =
                                    item.tipology;
                                moderateActivityStatistics.minutes =
                                    item.minutes;
                                moderateActivityStatistics.distance =
                                    item.distance;
                                break;
                            case "intenseActivity":
                                intenseActivityStatistics.tipology =
                                    item.tipology;
                                intenseActivityStatistics.minutes =
                                    item.minutes;
                                intenseActivityStatistics.distance =
                                    item.distance;
                                break;
                            default:
                                return AppVue.methods?.openToast(
                                    "Impossibile caricare le statistiche"
                                );
                        }
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                return AppVue.methods?.openToast(
                    "Impossibile caricare le statistiche"
                );
            });

        for (let i = 1; i <= 4; i++) {
            // eslint-disable-next-line
            document.getElementById("flipCard"+i)!.click();
            // eslint-disable-next-line
            document.getElementById("flipCard"+i)!.click();
            
        }

        let msg = "";
        switch (localStorage.period) {
            case "d":
                msg = "Statistiche relative all'ultimo giorno";
                break;
            case "w":
                msg = "Statistiche relative all'ultima settimana";
                break;
            case "m":
                msg = "Statistiche relative all'ultimo mese";
                break;
            default:
                break;
        }
        return AppVue.methods?.openToast(msg);
    },
    methods: {
        changePeriod($event: any) {
            localStorage.setItem("period", $event.target.value);
            location.reload();
        },
    },
};
</script>