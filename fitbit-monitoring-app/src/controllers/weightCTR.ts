import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore();
const pesoCollection = db.collection("peso");
import AppVue from "@/App.vue";
import { getBaseUserInfo } from "./userCTR";

/**
 * Get last weight value loaded
 * @return weight
 */
export const getLastWeight = async () => {
    let datiPeso: any = null;
    const snapshot = await pesoCollection
        .orderBy("dateTime", "desc")
        .limit(1)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((element) => {
        datiPeso = element.data();
    });
    return datiPeso;
};

/**
 * Get weight values
 * @return weight
 */
export const getWeights = async () => {
    interface Peso {
        data: any;
        valore: any;
    }
    const listaPesi: Peso[] = [];

    const snapshot = await pesoCollection
        .orderBy("dateTime", "desc")
        .limit(10)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((row) => {
        listaPesi.push({
            data:
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
            valore: row.get("peso"),
        });
    });

    return listaPesi;
};

/**
 * Get last weight value loaded
 * @return weight
 */
export const addWeight = async (value: number) => {
    // Now add user weight to peso table (trace history)
    const currenteDateTime = firebase.firestore.Timestamp.fromDate(new Date());
    pesoCollection
        .add({
            uid: getBaseUserInfo()?.uid,
            peso: value,
            dateTime: currenteDateTime,
        })
        .then(() => {
            location.reload(true);
        })
        .catch((error) => {
            throw AppVue.methods?.openToast("Errore nel salvataggio: " + error);
        });
};
