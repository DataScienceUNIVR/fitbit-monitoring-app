<template>
    <ion-page>
        <ion-header :translucent="true">
        </ion-header>

        <ion-content class="login" >
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
                        <ion-input v-model="nome"></ion-input>
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
    // toastController
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
    // methods: {
    // async openToast() {
    //   const toast = await toastController
    //     .create({
    //       message: 'Your settings have been saved.',
    //       duration: 2000
    //     })
    //   return toast.present();
    // },
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
        
      
        const doSignIn = async () => {
            await login(credentials.value.username, credentials.value.password);
            router.replace({ path: "/home" });
        };

        const doSignUp = async () => {
            await register(
                credentials.value.nome,
                "cognome",
                "cf",
                credentials.value.username,
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