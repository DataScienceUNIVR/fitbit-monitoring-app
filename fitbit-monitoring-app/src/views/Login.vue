<template>
    <ion-page>
        <ion-header>
            <ion-img
                class="login-header"
                src="./assets/img/logo_app_white.png"
            ></ion-img>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-card-header>
                    <ion-card-title> Benvenuto! </ion-card-title>
                    <ion-card-subtitle>Accedi o registrati</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <form
                        @submit.prevent="
                            mode === AuthMode.SignIn
                                ? signIn(email, password)
                                : signUp(nome, cognome, cf, email, password)
                        "
                    >
                        <ion-item v-if="mode === AuthMode.SignUp">
                            <ion-label position="floating">Nome</ion-label>
                            <ion-input v-model="nome"></ion-input>
                        </ion-item>
                        <ion-item v-if="mode === AuthMode.SignUp">
                            <ion-label position="floating">Cognome</ion-label>
                            <ion-input v-model="cognome"></ion-input>
                        </ion-item>
                        <ion-item v-if="mode === AuthMode.SignUp">
                            <ion-label position="floating">Codice Fiscale</ion-label>
                            <ion-input v-model="cf"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Email</ion-label>
                            <ion-input v-model="email"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input
                                v-model="password"
                                type="password"
                            ></ion-input>
                        </ion-item>
                        <ion-button
                            expand="block"
                            color="primary"
                            class="ion-margin-top"
                            type="submit"
                        >
                            {{
                                mode === AuthMode.SignIn ? "Sign In" : "Sign Up"
                            }}
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
                            {{
                                mode === AuthMode.SignIn ? "Sign Up" : "Cancel"
                            }}
                        </ion-button>
                    </form>
                </ion-card-content>
                <ion-card-content v-if="errorMsg" class="error-message">
                    {{ errorMsg }}
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonImg
} from "@ionic/vue";

import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import md5 from "js-md5";

enum AuthMode {
    SignIn,
    SignUp,
}

export default {
    name: "Authenication",
    components: {
        IonPage,
        IonHeader,
        IonContent,
        IonCard,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent,
        IonInput,
        IonButton,
        IonLabel,
        IonItem,
        IonCardHeader,
        IonImg
    },
    setup() {
        const router = useRouter();
        const state = reactive({
            nome: "",
            cognome: "",
            cf: "",
            email: "",
            password: "",
            mode: AuthMode.SignIn,
            errorMsg: "",
        });

        const checkUser = async (email: string, password: string) => {
            // Check user credentials
            axios({
                method: 'post',
                url: 'http://localhost/tirocinio/crud-api/api/users',
                data: {
                    email: email,
                    password: md5(password),
                }
            })
            .then(function (response) {
                if (response.data != null) {
                    state.nome = response.data.nome;
                    state.cognome = response.data.cognome;
                    state.cf = response.data.codice_fiscale;
                    state.email = response.data.email;
                    state.password = md5(response.data.password);
                    state.errorMsg = "";
                    router.push("/main/Home");
                    console.log("LOGGED IN");
                    return;
                } else {
                    state.errorMsg = "WRONG CREDENTIAL!";
                }
            })
            .catch(function (error) {
                state.errorMsg = "USER NOT FOUND!";
            })
            .then(function () {
                return;
            });
        };

        const createUser = async (nome: string, cognome: string, cf: string, email: string, password: string) => {
            // Create new user 
            axios({
                method: 'post',
                url: 'http://localhost/tirocinio/crud-api/api/users/',
                data: {
                    nome: nome,
                    cognome: cognome,
                    cf: cf,
                    email: email,
                    password: md5(password),
                }
            })
            .then(function (response) {
                if (response.data === true) {
                    router.push("/");
                    console.log("CREATED");
                    return;
                } else if (response.data === false) {
                    console.log("errore inserimento");
                    state.errorMsg = "ERRORE NELL'INSERIMENTO!";
                } else if (response.data.status === 0) {
                    console.log("errore già presente");

                    state.errorMsg = "UTENTE GIA PRESENTE!";
                }
            })
            .catch(function (error) {
                 console.log(error);
                state.errorMsg = "USER NOT FOUND!";
            })
            .then(function () {
                return;
            });
        }

        const signIn = async (
            email: string, 
            password: string
        ) => {
            try {
                if (!email || !password) {
                    state.errorMsg = "Inserisci email e password!";
                } else {
                    await checkUser(email, password);
                }
            } catch (error) {
                state.errorMsg = error.message;
            }
        };

        const signUp = async (
            nome: string,
            cognome: string,
            cf: string,
            email: string,
            password: string
        ) => {
                try {
                    // if (!nome || !cognome || !cf || !email || !password ) {
                    //     state.errorMsg = "Tutti i campi sono obbligatori!";
                    //     return;
                    // } else {
                        await createUser(
                            nome,
                            cognome,
                            cf,
                            email,
                            password
                        );
                    // }
                    router.push("/");
                } catch (error) {
                    state.errorMsg = error.message;
                }
        };

        return {
            ...toRefs(state),
            signIn,
            signUp,
            AuthMode,
        };
    },
};
</script>