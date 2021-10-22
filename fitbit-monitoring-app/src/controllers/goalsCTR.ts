import { firebase, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection, activityGoalsCollection, AppVue, getBaseUserInfo, getUserOauth2Code } from "../config/export";

const collections = [
    sedentaryActivityCollection,
    lightActivityCollection,
    moderateActivityCollection,
    intenseActivityCollection,
];

const activities = [
    'minutesSedentary',
    'minutesLightlyActive',
    'minutesFairlyActive',
    'minutesVeryActive',
];

/**
 * Get daily activities data
 * @return activities data
 */
export const getDailyActivitiesData = async () => {
    const request = await require('request');

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    };

    let oauth2Code = null;
    await Promise.resolve(getUserOauth2Code()).then(function (value) {
        if (value != null) {
            oauth2Code = value;
        }
    });
    
    // const result: any = [];
    const result: any = {
        minutesSedentary: 0,
        minutesLightlyActive: 0,
        minutesFairlyActive: 0,
        minutesVeryActive: 0
    };

    const date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    activities.forEach(activity => {
        // const options = {
        //     url: 'https://api.fitbit.com/1/user/-/activities/'+activity+'/date/today/'+currentDate+'.json',
        //     headers: headers
        // };
        
        // function callback(error: any, response: any, body: any) {
        //     if (!error && response.statusCode == 200) {
        //         response = JSON.parse(response['body']);
        //         result[activity] = response['activities-'+activity]['0']['value'];
        //     }
        // }
        // request(options, callback);
        
    });
    // console.log(result);
    return {
        "minutesSedentary": 566,
        "minutesLightlyActive": 48,
        "minutesFairlyActive": 17,
        "minutesVeryActive": 1
    };
};

/**
 * Get daily activities goals
 * @return goals
 */
export const getDailyActivitiesGoals = async () => {
    const result: any = [];
    
    for (const collection of collections) {
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
    const snapshot = await activityGoalsCollection
            .where("uid", "==", getBaseUserInfo()?.uid)
            .where("activityType", "==", "sleepScore")
            .get();
        snapshot.forEach((row) => {
            result.push(row.get("minutes"));
        });
        if (snapshot.empty) {
            result.push(0);
        }
    return result;
};

/**
 * Update daily goal of an activity type
 * @param activityType
 * @return goals
 */
export const updateDailyActivityGoal = async (
    activityType: string,
    value: number
) => {
    // First delete previous goal
    const snapshot = await activityGoalsCollection
        .where("uid", "==", getBaseUserInfo()?.uid)
        .where("activityType", "==", activityType)
        .get();
    snapshot.forEach((row) => {
        row.ref.delete();
    });

    activityGoalsCollection
        .add({
            uid: getBaseUserInfo()?.uid,
            minutes: value,
            activityType: activityType,
        })
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            throw AppVue.methods?.openToast("Error in saving: " + error);
        });

    return AppVue.methods?.openToast("Goals Updated");
};
