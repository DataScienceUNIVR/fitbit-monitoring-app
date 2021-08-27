<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>OAUTH2 CHECK</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" class="main">
            <ion-card class="profile-ion-card">
                <ion-card-header>
                    <ion-card-subtitle class="profile-ion-card-subtitle"
                        >AUTHORIZATION</ion-card-subtitle
                    >
                </ion-card-header>
                <ion-card-content class="profile-ion-card-content">
                    Per proseguire con l'uso dell'app è necessario accedere al tuo account fitbit e fornire le autorizzazione per la raccolta dati fitbit.
                    Premere dunque sul pulsante ed acconsentire all'uso delle tue informazioni.
                    <hr />
                    <ion-button expand="block" href="#" onclick="window.open('https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23BG9G&redirect_uri=https%3A%2F%2Fwww.univr.it%2Fit%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800', '_system', 'location=yes'); return false;">FITBIT AUTHORIZE</ion-button>
                    <!-- returned URL: URL?code=f95e2d8ef0dea4606f660fdb7d59b66b582792ea#_=_ -->
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonButton
} from "@ionic/vue";
import { defineComponent } from "../config/export";

export default defineComponent({
    name: "Goals",
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonButton
    },
    data() {
        return {
        };
    },
    methods: {
    },

    created() {
        const uri = window.location.search.substring(1); 
        const params = new URLSearchParams(uri);
        const code = params.get("code") as string;
        if (params.get("code")) {
            localStorage.setItem("OAuth2Code", code);
        }
    },

    setup() {
        return {
        };
    },
});
</script>
