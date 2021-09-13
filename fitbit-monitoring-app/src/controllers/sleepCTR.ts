import { firebase, sleepQualityCollection, getBaseUserInfo, axios, AppVue } from "../config/export";

/**
 * Get base sleep association rules
 * @returns rule
 */
export const getSleepAssociationRules = async () => {
    let result = null;
    await axios.get('http://127.0.0.1:5000/fitbit?window_length=2&frozenset_activity=[%27N%27]_3', {
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "http://localhost:8100",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    })
    .then(response => {
        if(!response.data.error) {
            result = response.data;
            const re = /'/gi;
            result = result.replace(re, '"');
            result = JSON.parse(result);
        } else {
            throw AppVue.methods?.openToast("Error in handling requests. Please try again");
        }
    })
    .catch(e => {
        console.log(e);
    })
    return result;
};

/**
 * Add a new sleep quality of the user
 */
 export const addSleepQuality = async (value: string) => {
    const currenteDateTime = firebase.firestore.Timestamp.fromDate(new Date());
    sleepQualityCollection
        .add({
            uid: getBaseUserInfo()?.uid,
            quality: value,
            dateTime: currenteDateTime,
        })
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            throw AppVue.methods?.openToast("Error in saving: " + error);
        });
};

/**
 * Get last 10 sleep quality score values
 * @return scores
 */
 export const getSleepQuality = async () => {
    interface SleepQuality {
        date: any;
        value: any;
    }
    const scoreList: SleepQuality[] = [];

    const snapshot = await sleepQualityCollection
        .orderBy("dateTime", "desc")
        .limit(10)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((row) => {
        scoreList.push({
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
            value: row.get("quality"),
        });
    });

    return scoreList;
};
