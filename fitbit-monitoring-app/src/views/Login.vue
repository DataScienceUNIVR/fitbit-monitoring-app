<template>
    <ion-page>
        <ion-header>
            <ion-img
                class="login-header"
                src="/assets/img/logo_app_white.png"
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
                                : signUp(name, email, password)
                        "
                    >
                        <ion-item v-if="mode === AuthMode.SignUp">
                            <ion-label position="floating">Name</ion-label>
                            <ion-input v-model="name"></ion-input>
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
            axios
                .get("http://localhost/tirocinio/crud-api/api/users/" + email)
                .then(function (response) {
                    if (response.data.password === md5(password)) {
                        state.nome = response.data.nome;
                        state.cognome = response.data.cognome;
                        state.cf = response.data.codice_fiscale;
                        state.email = response.data.email;
                        state.password = md5(response.data.password);
                        state.errorMsg = "";

                        router.push("/folder");
                        console.log("redirect");
                        return;
                    } else {
                        state.errorMsg = "WRONG PASSWORD!";
                    }
                })
                .catch(function (error) {
                    state.errorMsg = "USER NOT FOUND!";
                })
                .then(function () {
                    return;
                });
        };

        const createUser = async (email: string, password: string) => {
            // Check user credentials
            axios
                .post("http://localhost/tirocinio/crud-api/api/users/" + email)
                .then(function (response) {
                    if (response.data.password === md5(password)) {
                        state.errorMsg = "LOGGED IN";
                        return true;
                    } else {
                        state.errorMsg = "WRONG PASSWORD!";
                        return;
                    }
                })
                .catch(function (error) {
                    state.errorMsg = "USER NOT FOUND!";
                    return;
                })
                .then(function () {
                    // always executed
                });
        };

        const signIn = async (email: string, password: string) => {
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
            name: string,
            email: string,
            password: string
        ) => {
            console.log(name, email, password);
            //   try {
            //     if (!name || !email || !password) {
            //       state.errorMsg = "Name, email, and password required!";
            //       return;
            //     }

            //     const authRes = await auth.createUser(
            //       email,
            //       password
            //     );

            //     db.collection("users").doc(authRes.user?.uid).set({
            //       name,
            //       email,
            //     });

            //     router.push("/tabs/tab1");
            //   } catch (error) {
            //     state.errorMsg = error.message;
            //   }
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

<style>
.center {
    display: flex;
    height: 90vh;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.error-message {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
    text-align: center;
}
.login-header {
    padding-top: 15%;
    padding-bottom: 15%;
}
</style>