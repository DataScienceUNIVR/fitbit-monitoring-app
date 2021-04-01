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
                                class="peso-input"
                                inputmode="decimal"
                                type="number"
                                min="0"
                            ></ion-input
                            >KG
                        </ion-item>
                    </ion-card-title>
                    <ion-card-content class="peso-ion-card-content">
                        <br />
                    </ion-card-content>
                    <ion-fab horizontal="center" vertical="bottom">
                        <ion-fab-button @click="saveWeight">
                            <ion-icon :icon="add"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </ion-card>
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
import { getLastWeight, addWeight } from "../controllers/userCTR";
import { add } from "ionicons/icons";
import moment from "moment";

const peso = null;
const data = "";
const dataCorrente = moment(new Date()).format("DD/MM/YYYY HH:mm");

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
            dataCorrente,
        };
    },
    methods: {
        saveWeight() {
            const peso = this.$refs.newWeight as any;
            addWeight(peso.value);
            console.log("fine");
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
                        "DD/MM/YYYY HH:mm");
                }
            })
            .catch((e) => {
                this.peso = null;
                this.data = "";
            });
    },

    setup() {
        return {
            add,
        };
    },
});
</script>
