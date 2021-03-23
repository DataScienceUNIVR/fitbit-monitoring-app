<template>
    <ion-page>
        <ion-header :translucent="true"> </ion-header>

        <ion-content class="login">
            <ion-img
                class="login-header"
                src="./assets/img/logo_app_white.png"
            ></ion-img>

            <ion-card>
                <ion-card-header>
                    <ion-card-title> Benvenuto! </ion-card-title>
                    <ion-card-subtitle>Accedi o registrati</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Nome</ion-label>
                        <ion-input v-model="nome"
                        @ionChange="
                                ($event) =>
                                    (credentials.nome = $event.detail.value)
                            "></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Cognome</ion-label>
                        <ion-input v-model="cognome"
                        @ionChange="
                                ($event) =>
                                    (credentials.cognome = $event.detail.value)
                            "></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating"
                            >Codice Fiscale</ion-label
                        >
                        <ion-input v-model="cf"
                        @ionChange="
                                ($event) =>
                                    (credentials.cf = $event.detail.value)
                            "></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Email</ion-label>
                        <ion-input
                            v-model="email"
                            @ionChange="
                                ($event) =>
                                    (credentials.email = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Password</ion-label>
                        <ion-input
                            v-model="password"
                            @ionChange="
                                ($event) =>
                                    (credentials.password = $event.detail.value)
                            "
                            type="password"
                        ></ion-input>
                    </ion-item>
                    <ion-button
                        expand="block"
                        color="primary"
                        class="ion-margin-top"
                        type="submit"
                        v-if="mode === AuthMode.SignIn"
                        @click="doSignIn"
                    >
                        Sign In
                    </ion-button>

                    <ion-button
                        expand="block"
                        color="primary"
                        class="ion-margin-top"
                        type="submit"
                        v-if="mode === AuthMode.SignUp"
                        @click="doSignUp"
                    >
                        Sign Up
                    </ion-button>

                    <ion-button
                        expand="block"
                        color="secondary"
                        class="ion-margin-top"
                        @click="
                            mode =
                                mode === AuthMode.SignIn
                                    ? AuthMode.SignUp
                                    : AuthMode.SignIn
                        "
                    >
                        {{ mode === AuthMode.SignIn ? "Sign Up" : "Cancel" }}
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <div id="container">
                <!-- <ion-content class="ion-padding">
                    <ion-button @click="openToast">Open Toast</ion-button>
                </ion-content> -->
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonImg,
    toastController
} from "@ionic/vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "../hooks/firebase-auth";
enum AuthMode {
    SignIn,
    SignUp,
}
const state = reactive({
    mode: AuthMode.SignIn,
});
export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonInput,
        IonItem,
        IonLabel,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent,
        IonButton,
        IonImg,
    },
    
    setup() {
        const credentials = ref<{
            nome: string;
            cognome: string;
            cf: string;
            email: string;
            password: string;
        }>({
            nome: "",
            cognome: "",
            cf: "",
            email: "",
            password: "",
        });
        const { login, register } = useFirebaseAuth();
        const router = useRouter();

        const doSignIn = async () => {
            await login(credentials.value.email, credentials.value.password);
            router.replace({ path: "/home" });
        };

        const doSignUp = async () => {
            if (
                !credentials.value.nome ||
                !credentials.value.cognome ||
                !credentials.value.email
            ) {
                const toast = await toastController.create({
                    message: "Sembra che le informazioni non siano complete",
                    duration: 2000,
                });
                return toast.present();
            }
            // Regular CF sintax check
            if (!credentials.value.cf.match(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i)) {
                const toast = await toastController.create({
                    message: "Il codice fiscale immesso non è corretto",
                    duration: 2000,
                });
                return toast.present();
            } 
            // Regular password length check
            if (!credentials.value.password.match(/^.{6,}$/i)) {
                const toast = await toastController.create({
                    message: "La password deve contenere almeno 6 caratteri",
                    duration: 2000,
                });
                return toast.present();
            } 
            // TODO: regex mail

            await register(
                credentials.value.nome,
                credentials.value.cognome,
                credentials.value.cf,
                credentials.value.email,
                credentials.value.password
            );
            router.replace({ path: "/home" });
        };

        return {
            ...toRefs(state),
            credentials,
            doSignIn,
            doSignUp,
            AuthMode,
        };
    },
});
</script>