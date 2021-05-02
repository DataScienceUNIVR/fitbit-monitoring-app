import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore();
const weightCollection = db.collection("weight");
import AppVue from "@/App.vue";
import { getBaseUserInfo } from "./userCTR";

/**
 * Get last weight value loaded
 * @return weight
 */
export const getLastWeight = async () => {
    let weightData: any = null;
    const snapshot = await weightCollection
        .orderBy("dateTime", "desc")
        .limit(1)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((element) => {
        weightData = element.data();
    });
    return weightData;
};

/**
 * Get last 10 weight values
 * @return weight
 */
export const getWeights = async () => {
    interface Weight {
        date: any;
        value: any;
    }
    const weightsList: Weight[] = [];

    const snapshot = await weightCollection
        .orderBy("dateTime", "desc")
        .limit(10)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((row) => {
        weightsList.push({
            date:
                row
                    .get("dateTime")
                    .toDate()
                    .getDate() +
                "/" +
                (row
                    .get("dateTime")
                    .toDate()
                    .getMonth() +
                    1) +
                "/" +
                row
                    .get("dateTime")
                    .toDate()
                    .getFullYear(),
            value: row.get("weight"),
        });
    });

    return weightsList;
};

/**
 * Add a new weight value
 */
export const addWeight = async (value: number) => {
    // Now add user weight to peso table (trace history)
    const currenteDateTime = firebase.firestore.Timestamp.fromDate(new Date());
    weightCollection
        .add({
            uid: getBaseUserInfo()?.uid,
            weight: value,
            dateTime: currenteDateTime,
        })
        .then(() => {
            location.reload(true);
        })
        .catch((error) => {
            throw AppVue.methods?.openToast("Errore nel salvataggio: " + error);
        });
};
