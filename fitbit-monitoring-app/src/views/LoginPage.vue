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
                        Welcome!
                    </ion-card-title>
                    <ion-card-subtitle class="login-ion-card-subtitle"
                        >Sign in or Sign up</ion-card-subtitle
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
                        <ion-label position="floating">Name</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="name"
                            required="true"
                            @ionChange="
                                ($event) =>
                                    (credentials.name = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Surname</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="surname"
                            required="true"
                            @ionChange="
                                ($event) =>
                                    (credentials.surname = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating"
                            >Fiscal Code</ion-label
                        >
                        <ion-input
                            class="login-input-text"
                            v-model="fiscalCode"
                            @ionChange="
                                ($event) =>
                                    (credentials.fiscalCode = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Weight (KG)</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="weight"
                            inputmode="decimal"
                            type="number"
                            @ionChange="
                                ($event) =>
                                    (credentials.weight = $event.detail.value)
                            "
                        ></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Height (cm)</ion-label>
                        <ion-input
                            class="login-input-text"
                            v-model="height"
                            @ionChange="
                                ($event) =>
                                    (credentials.height = $event.detail.value)
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
import useFirebaseAuth from "../controllers/authCTR";
import { reactive, ref, toRefs, AppVue, useRouter } from "../config/export";

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
            name: string;
            surname: string;
            fiscalCode: string;
            weight: number;
            height: number;
            email: string;
            password: string;
        }>({
            name: "",
            surname: "",
            fiscalCode: "",
            weight: 0,
            height: 0,
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
                return AppVue.methods?.openToast("Non-compliant email");
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
                !credentials.value.name ||
                !credentials.value.surname ||
                !credentials.value.email
            ) {
                return AppVue.methods?.openToast(
                    "The information appears to be incomplete"
                );
            }

            // Regular password length check
            if (!credentials.value.password.match(/^.{6,}$/i)) {
                return AppVue.methods?.openToast(
                    "The password must contain at least 6 characters"
                );
            }

            // Regular mail sintax check
            if (
                !credentials.value.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
                return AppVue.methods?.openToast("Non-compliant email");
            }

            // Regular fiscalCode sintax check
            if (credentials.value.fiscalCode) {
                if (
                    !credentials.value.fiscalCode.match(
                        /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i
                    )
                ) {
                    return AppVue.methods?.openToast(
                        "The fiscal code entered is incorrect"
                    );
                }
            }

            // Check weight value
            if (credentials.value.weight) {
                if (credentials.value.weight <= 0) {
                    return AppVue.methods?.openToast(
                        "The weight must be a positive valueo"
                    );
                }
            }

            // Check height value
            if (credentials.value.height) {
                if (credentials.value.height <= 0) {
                    return AppVue.methods?.openToast(
                        "Height must be a positive value"
                    );
                }
            }

            await register(
                credentials.value.name,
                credentials.value.surname,
                credentials.value.fiscalCode,
                credentials.value.weight,
                credentials.value.height,
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