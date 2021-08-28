<template>
    <ion-app ng-strict-di>
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
                        <ion-label v-if="loggedUser != null">
                            {{ loggedUser.email }}</ion-label
                        >
                    </ion-chip>

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
                            <ion-icon slot="start" :icon="p.iosIcon"></ion-icon>
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
                            <ion-icon slot="start" :icon="p.iosIcon"></ion-icon>
                            <ion-label>{{ p.title }}</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                </ion-list>
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
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import {
    fitnessOutline,
    fitnessSharp,
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
    home,
    speedometerOutline,
    medalOutline,
    medicalSharp,
    optionsOutline,
    options,
    moonOutline,
    moonSharp
} from "ionicons/icons";
import { useRouter } from "vue-router";
import useFirebaseAuth from "./controllers/authCTR";
import getLoggedUserData from "./controllers/authCTR";
import { getAllUserInfo, getUserOauth2Code } from "./controllers/userCTR";
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
                cssClass: "toast-message",
            });
            return toast.present();
        },
    },
    setup() {
        const selectedIndex = ref(0);
        const { logout, user } = useFirebaseAuth();
        const router = useRouter();
        const loggedUser = getLoggedUserData().user;

        const doLogout = async () => {
            await logout();
            router.replace({ path: "/login" });
        };
        
        let oauth2Code = "";
        onBeforeMount(async () => {
            await Promise.resolve(getUserOauth2Code()).then((value) => {
                if (value) {
                    oauth2Code = value;
                }

                if (!oauth2Code) {
                    router.replace({ path: "/oauth" });
                }
            });
        });

        const appPages = [
            {
                title: "HOME",
                url: "/home",
                iosIcon: home,
                mdIcon: home,
            },
            {
                title: "REPORT",
                url: "/report",
                iosIcon: fitnessOutline,
                mdIcon: fitnessSharp,
            },
            {
                title: "WEIGHT",
                url: "/weight",
                iosIcon: speedometerOutline,
                mdIcon: speedometerOutline,
            },
            {
                title: "SLEEP",
                url: "/sleep",
                iosIcon: moonOutline,
                mdIcon: moonSharp,
            },
            {
                title: "STATISTICS",
                url: "/statistics",
                iosIcon: medalOutline,
                mdIcon: medicalSharp,
            },
            {
                title: "GOALS",
                url: "/goals",
                iosIcon: optionsOutline,
                mdIcon: options,
            },
            {
                title: "DATA MANAGEMENT",
                url: "/loadData",
                iosIcon: ribbonOutline,
                mdIcon: ribbonSharp,
            },
            {
                title: "PROFILE",
                url: "/profile",
                iosIcon: personCircleOutline,
                mdIcon: personCircleSharp,
            },
            {
                title: "LOGOUT",
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
            fitnessOutline,
            fitnessSharp,
            bookmarkOutline,
            bookmarkSharp,
            ribbonOutline,
            ribbonSharp,
            homeOutline,
            homeSharp,
            home,
            paperPlaneSharp,
            personCircleOutline,
            personCircleSharp,
            logOutOutline,
            logOutSharp,
            speedometerOutline,
            medalOutline,
            medicalSharp,
            optionsOutline,
            options,
            moonOutline,
            moonSharp,
            doLogout,
            user,
            loggedUser,
            // isSelected: (url: string) => (url === route.path ? "selected" : ""),
        };
    },
});
</script>