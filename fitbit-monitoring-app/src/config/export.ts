import firebase from "firebase";
import "firebase/firestore";
import AppVue from "@/App.vue";
import { reactive, toRefs, ref, defineComponent } from "vue";
import { Md5 } from "md5-typescript";
import ApexCharts from "apexcharts";
import { useRouter } from "vue-router";
import VueFlip from "vue-flip";

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

export {firebase, AppVue, reactive, toRefs, ref, defineComponent, Md5, ApexCharts, useRouter, VueFlip}