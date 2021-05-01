import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore();
const sedentaryActivityCollection = db.collection("sedentaryActivity");
const lightActivityCollection = db.collection("lightActivity");
const moderatelyActivityCollection = db.collection("moderatelyActivity");
const intenseActivityCollection = db.collection("intenseActivity");
import { getBaseUserInfo } from "./userCTR";

/**
 * Get activity values
 * @return weight
 */
export const getActivityTimeWithRange = async () => {
    interface Attivita {
        data: any;
        minuti: string;
    }
    const collections = [
        sedentaryActivityCollection,
        lightActivityCollection,
        moderatelyActivityCollection,
        intenseActivityCollection,
    ];
    const result: any = [];

    const date = new Date();
    date.setMonth(date.getMonth() - 100);
    const startDate = firebase.firestore.Timestamp.fromDate(date);

    const date2 = new Date();
    const endDate = firebase.firestore.Timestamp.fromDate(date2);

    let tmp: Attivita[] = [];

    for (const collection of collections) {
        const snapshot = await collection
            .orderBy("dateTime")
            .startAfter(startDate)
            .endAt(endDate)
            .where("uid", "==", getBaseUserInfo()?.uid)
            .get();
        tmp = [];
        snapshot.forEach((row) => {
            tmp.push({
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
                minuti: row.get("minutes") + '',
            });
        });
        result.push(tmp);
    }
    return result;
};
