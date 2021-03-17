<template>
  <ion-app>
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>FITBIT MONITORING APP</ion-list-header>
            <ion-note>Nome Cognome</ion-note>
  
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
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
    IonNote, 
     } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { pulseOutline, pulseSharp, bookmarkOutline, bookmarkSharp, ribbonOutline, ribbonSharp, homeOutline, homeSharp, paperPlaneSharp, personCircleOutline, personCircleSharp, logOutOutline, logOutSharp } from 'ionicons/icons';

export default defineComponent({
  name: 'App',
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
    IonNote, 
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Home',
        url: '/main/Home',
        iosIcon: homeOutline,
        mdIcon: homeSharp
      },
      {
        title: 'Obiettivi',
        url: '/main/Obiettivi',
        iosIcon: ribbonOutline,
        mdIcon: ribbonSharp
      },
      {
        title: 'Statistiche',
        url: '/main/Statistiche',
        iosIcon: pulseOutline,
        mdIcon: pulseSharp
      },
      {
        title: 'Profilo',
        url: '/main/Profilo',
        iosIcon: personCircleOutline,
        mdIcon: personCircleSharp
      },
      {
        title: 'Logout',
        url: '/main/Logout',
        iosIcon: logOutOutline,
        mdIcon: logOutSharp
      }
    ];
    const path = window.location.pathname.split('main/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
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
     
      paperPlaneSharp, 
      personCircleOutline, 
      personCircleSharp, 
      logOutOutline, 
      logOutSharp,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  }
});
</script>