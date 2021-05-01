import firebase from "firebase";
import "firebase/firestore";
import AppVue from "@/App.vue";

const db = firebase.firestore();
const sedentaryActivityCollection = db.collection("sedentaryActivity");
const lightActivityCollection = db.collection("lightActivity");
const moderatelyActivityCollection = db.collection("moderatelyActivity");
const intenseActivityCollection = db.collection("intenseActivity");
const activityGoalsCollection = db.collection("activityGoals");
import { getBaseUserInfo } from "./userCTR";

const collections = [
    sedentaryActivityCollection,
    lightActivityCollection,
    moderatelyActivityCollection,
    intenseActivityCollection,
];

/**
 * Get daily activities data
 * @return activities data
 */
export const getDailyActivitiesData = async () => {
    const result: any = [];

    // Previus day at 23:59:59
    const date = new Date();
    date.setHours(0, 0, -1);
    const startDate = firebase.firestore.Timestamp.fromDate(date);
    // Today at 23:59:59
    date.setHours(48, 0, -1);

    const endDate = firebase.firestore.Timestamp.fromDate(date);

    for (const collection of collections) {
        const snapshot = await collection
            .orderBy("dateTime")
            .startAfter(startDate)
            .endAt(endDate)
            .where("uid", "==", getBaseUserInfo()?.uid)
            .get();
        let count = 0;
        snapshot.forEach((row) => {
            count += row.get("minutes");
        });
        result.push(count);
    }
    console.log(result);
    return result;
};

/**
 * Get daily activities goals
 * @return goals
 */
export const getDailyActivitiesGoals = async () => {
    const result: any = [];
    for (const collection of collections) {
        // console.log(collection.id)
        const snapshot = await activityGoalsCollection
            .where("uid", "==", getBaseUserInfo()?.uid)
            .where("activityType", "==", collection.id)
            .get();
        snapshot.forEach((row) => {
            result.push(row.get("minutes"));
        });
        if (snapshot.empty) {
            result.push(0);
        } 
    }
console.log(result);
    return result;
};

/**
 * Update daily goal of an activity type
 * @param activityType
 * @return goals
 */
export const updateDailyActivityGoal = async (
    activityType: string,
    minutes: number
) => {

    console.log(activityType);
    console.log(minutes);
    // First delete previous goal
    // const snapshot = await activityGoalsCollection
    //     .where("uid", "==", getBaseUserInfo()?.uid)
    //     .where("activityType", "==", activityType)
    //     .get();
    // snapshot.forEach((row) => {
    //     row.ref.delete();
    // });

    activityGoalsCollection
        .add({
            uid: getBaseUserInfo()?.uid,
            minutes: minutes,
            activityType: activityType,
        })
        .then(() => {
            location.reload(true);
        })
        .catch((error) => {
            throw AppVue.methods?.openToast("Errore nel salvataggio: " + error);
        });

    return "ok";
};
