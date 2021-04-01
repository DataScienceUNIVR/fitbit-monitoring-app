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
                    <ion-card-subtitle class="peso-ion-card-subtitle">IL TUO ULTIMO PESO REGISTRATO:</ion-card-subtitle>
                </ion-card-header>
                <ion-card-title class="peso-ion-card-title">{{ peso }} KG</ion-card-title>

                 <ion-card-content class="peso-ion-card-content">
                    {{ data }}
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
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonFab,
    IonFabButton,
    IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import AppVue from "@/App.vue";
import { getLastWeight } from "../controllers/userCTR";
import moment from 'moment'

const peso = null;
const data = null;

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
        IonIcon,
    },
    data() {
        return {
            peso,
            data,
        };
    },
    methods: {},

    async mounted() {
        await Promise.resolve(getLastWeight())
            .then((value) => {
                if (value) {
                    this.peso = value.peso;
                    this.data = moment(value.dateTime.toDate()).format('DD/MM/YYYY HH:mm');
                }
            })
            .catch((e) => {
                this.peso = null;
                this.data = null;
            });
    },

    setup() {
        return {};
    },
});
</script>
