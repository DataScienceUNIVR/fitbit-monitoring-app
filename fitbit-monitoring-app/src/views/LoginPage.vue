<template>
    <ion-page>
        <ion-header :translucent="true"> </ion-header>

        <ion-content class="login">
            <ion-img
                class="login-header"
                src="./assets/img/logo_app_white.png"
            ></ion-img>

            <ion-card class="translucent-login">
                <ion-card-header>
                    <ion-card-title class="login-ion-card-title">
                        Benvenuto!
                    </ion-card-title>
                    <ion-card-subtitle class="login-ion-card-subtitle"
                        >Accedi o registrati</ion-card-subtitle
                    >
                </ion-card-header>
                <ion-card-content>
                    <ion-item class="login-item-top">
                        <ion-label position="floating">Email</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="email"
                            required="true"
                            @ionChange="
                                ($event) =>
                                    (credentials.email = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Nome</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="nome"
                            required="true"
                            @ionChange="
                                ($event) =>
                                    (credentials.nome = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Cognome</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="cognome"
                            required="true"
                            @ionChange="
                                ($event) =>
                                    (credentials.cognome = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating"
                            >Codice Fiscale</ion-label
                        >
                        <ion-input
                            class="login-input-text"
                            v-model="cf"
                            @ionChange="
                                ($event) =>
                                    (credentials.cf = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Peso (KG)</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="peso"
                            inputmode="decimal"
                            type="number"
                            @ionChange="
                                ($event) =>
                                    (credentials.peso = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Altezza (cm)</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="altezza"
                            @ionChange="
                                ($event) =>
                                    (credentials.altezza = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item class="login-item-bottom">
                        <ion-label position="floating">Password</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="password"
                            required="true"
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
                        @keyup.enter.native:
                        doSignIn
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
} from "@ionic/vue";
import { app } from "node_modules/firebase";
import AppVue from "@/App.vue";
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "../controllers/authCTR";

enum AuthMode {
    SignIn,
    SignUp,
}
const state = reactive({
    mode: AuthMode.SignIn,
});
export default {
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
            peso: number;
            altezza: number;
            email: string;
            password: string;
        }>({
            nome: "",
            cognome: "",
            cf: "",
            peso: 0,
            altezza: 0,
            email: "",
            password: "",
        });
        const { login, register } = useFirebaseAuth();
        const router = useRouter();

        const doSignIn = async () => {
            if (
                !credentials.value.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
                return AppVue.methods?.openToast("Email non conforme");
            } else {
                await login(
                    credentials.value.email,
                    credentials.value.password
                );
                router.replace({ path: "/home" });
            }
        };

        const doSignUp = async () => {
            if (
                !credentials.value.nome ||
                !credentials.value.cognome ||
                !credentials.value.email
            ) {
                return AppVue.methods?.openToast(
                    "Sembra che le informazioni non siano complete"
                );
            }

            // Regular password length check
            if (!credentials.value.password.match(/^.{6,}$/i)) {
                return AppVue.methods?.openToast(
                    "La password deve contenere almeno 6 caratteri"
                );
            }

            // Regular mail sintax check
            if (
                !credentials.value.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
                return AppVue.methods?.openToast("Email non conforme");
            }

            // Regular CF sintax check
            if (credentials.value.cf) {
                if (
                    !credentials.value.cf.match(
                        /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i
                    )
                ) {
                    return AppVue.methods?.openToast(
                        "Il codice fiscale immesso non è corretto"
                    );
                }
            }

            // Check peso value
            if (credentials.value.peso) {
                if (credentials.value.peso <= 0) {
                    return AppVue.methods?.openToast(
                        "Il peso deve essere un valore positivo"
                    );
                }
            }

            // Check altezza value
            if (credentials.value.altezza) {
                if (credentials.value.altezza <= 0) {
                    return AppVue.methods?.openToast(
                        "L'altezza deve essere un valore positivo"
                    );
                }
            }

            await register(
                credentials.value.nome,
                credentials.value.cognome,
                credentials.value.cf,
                credentials.value.peso,
                credentials.value.altezza,
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
};
</script>