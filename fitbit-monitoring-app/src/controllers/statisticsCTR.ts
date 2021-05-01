import firebase from "firebase";
import "firebase/firestore";
import { getBaseUserInfo } from "./userCTR";

const db = firebase.firestore();
const sedentaryActivityCollection = db.collection("sedentaryActivity");
const lightActivityCollection = db.collection("lightActivity");
const moderateActivityCollection = db.collection("moderateActivity");
const intenseActivityCollection = db.collection("intenseActivity");

/**
 * Get statistics of the logged user
 * @param period 
 * @returns statistiche
 */
export const getStatistics = async (period: any) => {
    const uid = getBaseUserInfo()?.uid;
    const dateDiff = new Date();
    interface Statistic {
        tipology: any;
        minutes: any;
        distance: any;
      }
    const listaStatistiche: Statistic[] = [];
    switch (period) {
        case "d":
            dateDiff.setDate(dateDiff.getDate() - 1);
            break;
        case "w":
            dateDiff.setDate(dateDiff.getDate() - 7);
            break;
        case "m":
            dateDiff.setMonth(dateDiff.getMonth() - 48);
            break;
        default:
            dateDiff.setDate(dateDiff.getDate() - 1);
            break;
    }

    const dateTime = firebase.firestore.Timestamp.fromDate(dateDiff);
    let sedentaryActivityMinutes = 0;
    let lightActivityMinutes = 0;
    let moderateActivityMinutes = 0;
    let intenseActivityMinutes = 0;

    /**
     * Sedentary Activity: ~ 2 Km/h
     * Light Activity: ~ 4 Km/h
     * Moderate Activity: ~ 8 Km/h
     * Intense Activity: ~ 13 Km/h
     */
    let snapshot = sedentaryActivityCollection.where('uid', '==', uid).orderBy('dateTime').startAfter(dateTime).get();
    (await snapshot).forEach(element => {
        sedentaryActivityMinutes += element.get("minutes");
    });
    listaStatistiche.push({
        tipology: "sedentaryActivity",
        minutes: sedentaryActivityMinutes,
        distance: ((sedentaryActivityMinutes/60)*2).toFixed(1),
    });

    snapshot = lightActivityCollection.where('uid', '==', uid).orderBy('dateTime').startAfter(dateTime).get();
    (await snapshot).forEach(element => {
        lightActivityMinutes += element.get("minutes");
    });
    listaStatistiche.push({
        tipology: "lightActivity",
        minutes: lightActivityMinutes,
        distance: ((lightActivityMinutes/60)*4).toFixed(1),
    });

    snapshot = moderateActivityCollection.where('uid', '==', uid).orderBy('dateTime').startAfter(dateTime).get();
    (await snapshot).forEach(element => {
        moderateActivityMinutes += element.get("minutes");
    });
    listaStatistiche.push({
        tipology: "moderateActivity",
        minutes: moderateActivityMinutes,
        distance: ((moderateActivityMinutes/60)*5).toFixed(1),
    });

    snapshot = intenseActivityCollection.where('uid', '==', uid).orderBy('dateTime').startAfter(dateTime).get();
    (await snapshot).forEach(element => {
        intenseActivityMinutes += element.get("minutes");
    });
    listaStatistiche.push({
        tipology: "intenseActivity",
        minutes: intenseActivityMinutes,
        distance: ((intenseActivityMinutes/60)*13).toFixed(1),
    });
    return listaStatistiche;
};


