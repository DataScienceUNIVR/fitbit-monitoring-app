import { sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection, activityGoalsCollection, AppVue, getBaseUserInfo, getOauth2Code, notifyAPIError, axios } from "../config/export";

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
    await getOauth2Code();
    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    };

    const result: any = {}; 
    const date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    for (let i = 0; i < activities.length; i++) {
        await axios.get(
            'https://api.fitbit.com/1/user/-/activities/'+activities[i]+'/date/today/'+currentDate+'.json',
            { 
                headers: headers
            }
        ).then(function (response) {
            result[activities[i]] = (response.data['activities-'+activities[i]]['0']['value']);
        }).catch(function (error: any) {
            notifyAPIError(error);
        });
    }
    return result;
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
