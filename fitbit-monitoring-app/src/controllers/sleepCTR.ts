import { firebase, sleepQualityCollection, getBaseUserInfo, axios, AppVue } from "../config/export";

/**
 * Get base sleep association rules
 * @returns rule
 */
export const getSleepAssociationRules = async () => {
    let result = null;
    await axios.post('http://localhost/fitbit/api/associationRules?id=3', {
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })
    .then(response => {
        if(!response.data.error) {
            result = response.data;
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
            location.reload(true);
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
