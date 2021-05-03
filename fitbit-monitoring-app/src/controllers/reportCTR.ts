import { firebase, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection } from "../config/export";
import { getBaseUserInfo } from "./userCTR";

/**
 * Get activity values
 * @return statistic for each activity
 */
export const getActivityTimeWithRange = async () => {
    interface Activity {
        data: any;
        minutes: string;
    }
    const collections = [
        sedentaryActivityCollection,
        lightActivityCollection,
        moderateActivityCollection,
        intenseActivityCollection,
    ];
    const result: any = [];

    const date = new Date();
    date.setMonth(date.getMonth() - 100);
    const startDate = firebase.firestore.Timestamp.fromDate(date);

    const date2 = new Date();
    const endDate = firebase.firestore.Timestamp.fromDate(date2);

    let tmp: Activity[] = [];

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
                minutes: row.get("minutes") + '',
            });
        });
        result.push(tmp);
    }
    return result;
};
