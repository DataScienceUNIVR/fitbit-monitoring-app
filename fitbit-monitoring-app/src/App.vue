<template>
    <ion-app>
        <ion-menu content-id="main-content" type="overlay">
            <ion-content>
                <ion-list id="inbox-list">
                    <ion-list-header>
                        <ion-img
                            src="./assets/img/logo_app_white.png"
                            class="logo-menu"
                        ></ion-img>
                    </ion-list-header>

                    <ion-chip class="user-details">
                        <ion-avatar>
                            <img src="/assets/img/avatar.jpg" />
                        </ion-avatar>
                        <ion-label v-if="loggedUser != null"> {{ loggedUser.email }}</ion-label>
                    </ion-chip>

                    <!-- <ion-note></ion-note> -->
                    <ion-menu-toggle
                        auto-hide="false"
                        v-for="(p, i) in appPages"
                        :key="i"
                    >
                        <ion-item
                            v-if="p.title === 'LOGOUT'"
                            @click="doLogout"
                            lines="none"
                            detail="false"
                            class="hydrated menu-item"
                            :class="{ selected: selectedIndex === i }"
                        >
                            <ion-icon
                                slot="start"
                                :icon="p.iosIcon"
                            ></ion-icon>
                            <ion-label>{{ p.title }}</ion-label>
                        </ion-item>
                        <ion-item
                            v-if="p.title != 'LOGOUT'"
                            @click="selectedIndex = i"
                            router-direction="root"
                            :router-link="p.url"
                            lines="none"
                            detail="false"
                            class="hydrated menu-item"
                            :class="{ selected: selectedIndex === i }"
                        >
                            <ion-icon
                                slot="start"
                                :icon="p.iosIcon"
                            ></ion-icon>
                            <ion-label>{{ p.title }}</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                </ion-list>

                <!-- <ion-list id="labels-list">
            <ion-list-header>Labels</ion-list-header>
  
            <ion-item v-for="(label, index) in labels" lines="none" :key="index">
              <ion-icon slot="start" :ios="bookmarkOutline" :md="bookmarkSharp"></ion-icon>
              <ion-label>{{ label }}</ion-label>
            </ion-item>
          </ion-list> -->
            </ion-content>
        </ion-menu>
        <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-app>
</template>

<script lang="ts">
import {
    IonApp,
    IonRouterOutlet,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonImg,
    IonAvatar,
    IonChip,
    toastController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import {
    pulseOutline,
    pulseSharp,
    bookmarkOutline,
    bookmarkSharp,
    ribbonOutline,
    ribbonSharp,
    homeOutline,
    homeSharp,
    paperPlaneSharp,
    personCircleOutline,
    personCircleSharp,
    logOutOutline,
    logOutSharp,
    cloudUploadSharp,
    cloudDownloadSharp
} from "ionicons/icons";
import { useRouter } from "vue-router";
import useFirebaseAuth from "./hooks/firebase-auth";
import getLoggedUserData from "./hooks/firebase-auth";


export default defineComponent({
    name: "App",
    components: {
        IonApp,
        IonRouterOutlet,
        IonContent,
        IonIcon,
        IonItem,
        IonLabel,
        IonList,
        IonListHeader,
        IonMenu,
        IonMenuToggle,
        IonImg,
        IonAvatar,
        IonChip,
    },
    methods: {
        async openToast(msg: string) {
            const toast = await toastController.create({
                message: msg,
                duration: 3000,
                position: "bottom",
                translucent: true,
                cssClass: "toast-message"
            });
            return toast.present();
        },
    },
    setup() {
        const selectedIndex = ref(0);
        const { logout, user } = useFirebaseAuth();
        const router = useRouter();

        const doLogout = async () => {
            await logout();
            router.replace({ path: "/login" });
        };

        const loggedUser = getLoggedUserData().user;

        const appPages = [
            {
                title: "HOME",
                url: "/home",
                iosIcon: cloudUploadSharp,
                mdIcon: cloudUploadSharp,
            },
            {
                title: "GESTIONE DATI",
                url: "/loadData",
                iosIcon: ribbonOutline,
                mdIcon: ribbonSharp,
            },
            {
                title: "STATISTICHE",
                url: "/statistics",
                iosIcon: pulseOutline,
                mdIcon: pulseSharp,
            },
            {
                title: "PROFILO",
                url: "/profile",
                iosIcon: personCircleOutline,
                mdIcon: personCircleSharp,
            },
            {
                title: "LOGOUT",
                // url: '/login',
                doLogout,
                iosIcon: logOutOutline,
                mdIcon: logOutSharp,
            },
        ];

        const path = window.location.pathname.split("/")[1];
        if (path !== undefined) {
            selectedIndex.value = appPages.findIndex(
                (page) => page.title.toLowerCase() === path.toLowerCase()
            );
        }

        // const labels = ['Other'];

        const route = useRoute();

        return {
            // labels,
            selectedIndex,
            appPages,
            pulseOutline,
            pulseSharp,
            bookmarkOutline,
            bookmarkSharp,
            ribbonOutline,
            ribbonSharp,
            homeOutline,
            homeSharp,
            cloudUploadSharp,
            paperPlaneSharp,
            personCircleOutline,
            personCircleSharp,
            logOutOutline,
            logOutSharp,
            doLogout,
            user,
            loggedUser,
            // isSelected: (url: string) => (url === route.path ? "selected" : ""),
        };
    },
});
</script>