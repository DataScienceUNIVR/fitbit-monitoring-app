<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>LOGIN PAGE</ion-title>
            </ion-toolbar>
            <ion-img
                class="login-header"
                src="./assets/img/logo_app_white.png"
            ></ion-img>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-header>
                    <ion-card-title> Benvenuto! </ion-card-title>
                    <ion-card-subtitle>Accedi o registrati</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Nome</ion-label>
                        <ion-input v-model="nome"></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating">Cognome</ion-label>
                        <ion-input v-model="cognome"></ion-input>
                    </ion-item>
                    <ion-item v-if="mode === AuthMode.SignUp">
                        <ion-label position="floating"
                            >Codice Fiscale</ion-label
                        >
                        <ion-input v-model="cf"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Email</ion-label>
                        <ion-input
                            v-model="username"
                            @ionChange="
                                ($event) =>
                                    (credentials.username = $event.detail.value)
                            "
                            ></ion-input
                        >
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
                        @click="doLogin"
                    >
                        Sign In
                    </ion-button>

                    <ion-button
                        expand="block"
                        color="primary"
                        class="ion-margin-top"
                        type="submit"
                        v-if="mode === AuthMode.SignUp"
                        @click="doRegister"
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
                <!-- <ion-card-content v-if="errorMsg" class="error-message">
                    {{ errorMsg }}
                </ion-card-content> -->
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
        IonTitle,
        IonToolbar,
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
            username: string;
            password: string;
        }>({
            nome: "",
            username: "",
            password: "",
        });
        const { login, register } = useFirebaseAuth();
        const router = useRouter();

        const doLogin = async () => {
            await login(credentials.value.username, credentials.value.password);
            router.replace({ path: "/home" });
        };

        const doRegister = async () => {
            await register(
                credentials.value.nome,
                credentials.value.username,
                credentials.value.password
            );
            router.replace({ path: "/home" });
        };

        return {
            ...toRefs(state),
            credentials,
            doLogin,
            doRegister,
            AuthMode,
        };
    },
});
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>