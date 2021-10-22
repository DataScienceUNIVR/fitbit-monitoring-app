import firebase from "firebase";
import "firebase/firestore";
import AppVue from "@/App.vue";
import { reactive, toRefs, ref, defineComponent } from "vue";
import { Md5 } from "md5-typescript";
import ApexCharts from "apexcharts";
import { useRouter } from "vue-router";
import VueFlip from "vue-flip";
import { getBaseUserInfo } from "../controllers/userCTR";
import { getUserOauth2Code } from "../controllers/userCTR";
import axios from 'axios';

export const storage = firebase.storage();
export const storageRef = storage.ref();
export const db = firebase.firestore();

export const usersCollection = db.collection("users");
export const weightCollection = db.collection("weight");
export const sedentaryActivityCollection = db.collection("sedentaryActivity");
export const lightActivityCollection = db.collection("lightActivity");
export const moderateActivityCollection = db.collection("moderateActivity");
export const intenseActivityCollection = db.collection("intenseActivity");
export const activityGoalsCollection = db.collection("activityGoals");
export const sleepQualityCollection = db.collection("sleepQuality");

export async function getOauth2Code() {
    let oauth2Code = null;
    await Promise.resolve(getUserOauth2Code()).then(function (value) {
        if (value != null) {
            oauth2Code = value;
        }
    });
}

export function notifyAPIError(error: any) {
    if (error.response) {
        throw AppVue.methods?.openToast("Response error: " + error.response.data);
    } else if (error.request) { 
        throw AppVue.methods?.openToast("Error " + error.request);
    } else { 
        throw AppVue.methods?.openToast("Error during setting up request " + error.message);
    }
}

export {firebase, AppVue, reactive, toRefs, ref, defineComponent, Md5, ApexCharts, useRouter, VueFlip, axios, getBaseUserInfo, getUserOauth2Code}