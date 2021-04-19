import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore();
const usersCollection = db.collection("users");
const sedentaryActivityCollection = db.collection("sedentaryActivity");
const lightActivityCollection = db.collection("lightActivity");
const moderatelyActivityCollection = db.collection("moderatelyActivity");
const intenseActivityCollection = db.collection("intenseActivity");
import AppVue from "@/App.vue";
import { reactive } from "vue";
import { getBaseUserInfo } from "./userCTR";

/**
 * Get weight values
 * @return weight
 */
export const getActivityTimeWithRange = async () => {
    interface Attivita {
        data: any;
        minuti: any;
    }
    const collections = [sedentaryActivityCollection, lightActivityCollection];
    const result: [] = [];
    const listaAttivitaSedentaria: Attivita[] = [];
    const listaAttivitaLeggera: Attivita[] = [];
    const listaAttivitaModerat: Attivita[] = [];
    const listaAttivitaIntensa: Attivita[] = [];

    const date = new Date();
    date.setMonth(date.getMonth() - 100);
    const startDate = firebase.firestore.Timestamp.fromDate(date);

    const date2 = new Date();
    const endDate = firebase.firestore.Timestamp.fromDate(date2);

    collections.forEach(async collection => {
        switch (collection) {
            case sedentaryActivityCollection:
                // const lista = "";
                console.log("sedentaryActivityCollection");
                break;
            default:
                break;
        }
        const snapshot = await collection
        .orderBy("dateTime")
        .startAfter(startDate)
        .endAt(endDate)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
        snapshot.forEach((row) => {
            // lista.push({
            //     data:
            //         row
            //             .get("dateTime")
            //             .toDate()
            //             .getDate() +
            //         "/" +
            //         (row
            //             .get("dateTime")
            //             .toDate()
            //             .getMonth() +
            //             1) +
            //         "/" +
            //         row
            //             .get("dateTime")
            //             .toDate()
            //             .getFullYear(),
            //     minuti: row.get("minutes"),
            // });
        });
    });
    
    console.log(result);
    return listaAttivitaSedentaria;
};