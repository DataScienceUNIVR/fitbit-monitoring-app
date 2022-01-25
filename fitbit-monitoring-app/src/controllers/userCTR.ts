import { firebase, storageRef, usersCollection, weightCollection, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection, activityGoalsCollection, reactive, AppVue, getOauth2Code, axios, notifyAPIError } from "../config/export";
import CLIENT from "../config/.env.fitbit";    

/**
 * Get the base information of the logged user (uid, email)
 * @returns currentUser
 */
export const getBaseUserInfo = () => {
    return firebase.auth().currentUser;
};

/**
 * Get user profile img URL
 * @return imgURL
 */
export const getProfileImage = async () => {
    let URL = null;
    const pathReference = storageRef.child(
        "profilePictures/" + getBaseUserInfo()?.uid
    );
    if (pathReference) {
        try {
            await Promise.resolve(pathReference.getDownloadURL()).then(function (
                value
            ) {
                if (value) {
                    URL = value;
                }
            });
            return URL;
        } catch (error) {
            return null;
        }
    }
};

/**
 * Get all information of the logged user (name, email, dateOfBirth, pwd, uid, img...)
 * @returns currentUser
 */
export const getAllUserInfo = async () => {
    const user = reactive<{
        name: any;
        dateOfBirth: any;
        email: any;
        imageURL: any;
        height: any;
        weight: any;
        averageDailySteps: any;
        oauth2Code: any;
        uid: any;
    }>({
        name: null,
        dateOfBirth: null,
        email: null,
        imageURL: null,
        height: null,
        weight: null,
        averageDailySteps: null,
        oauth2Code: null,
        uid: null,
    });

    user.uid = getBaseUserInfo()?.uid;

    // const snapshot = await usersCollection.where("uid", "==", user.uid).get();
    // if (snapshot.empty) {
    //     return AppVue.methods?.openToast(
    //         "Error: Please log out and re-authenticate"
    //     );
    // }

    // snapshot.forEach((doc: any) => {
    //     user.name = doc.get("name");
    //     user.dateOfBirth = doc.get("dateOfBirth");
    //     user.email = doc.get("email");
    //     user.height = doc.get("height");
    //     user.oauth2Code = doc.get("oauth2code");
    // });

    await getOauth2Code();
    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    };
    
    await axios.get(
        'https://api.fitbit.com/1/user/-/profile.json', 
        { 
            headers: headers
        }
    ).then(function (response) {
        user.name = response.data.user.displayName;
        user.dateOfBirth = response.data.user.dateOfBirth;
        user.email = "da_cambiare@gmail.com";
        user.weight = response.data.user.weight;
        user.height = response.data.user.height;
        user.averageDailySteps = response.data.user.averageDailySteps;
        // user.oauth2Code = response.data.;
    }).catch(function (error) {
        notifyAPIError(error);
    });

    await Promise.resolve(getProfileImage()).then(function (value) {
        if (value) {
            user.imageURL = value;
        }
    });
    return user;
};

/**
 * Upload user avatar image
 * @param file
 */
export const setProfileImage = async (file: File) => {
    const imagesRef = storageRef.child(
        "profilePictures/" + getBaseUserInfo()?.uid
    );
    // There is no need to delete the previous one because it is overwritten
    try {
        imagesRef.put(file).then(async () => {
            await Promise.resolve(getProfileImage()).then(function (value) {
                if (value) {
                    localStorage.setItem("imageURL", value);
                }
            });
            location.reload();
        });
    } catch (error) {
        throw AppVue.methods?.openToast(error);
    }
};

/**
 * Delete account with all user informations
 * @returns msg
 */
export const deleteAccountInfo = async () => {
    const uid = getBaseUserInfo()?.uid;

    // First delete profile img
    const res = storageRef.child("profilePictures/" + uid);
        res
        .delete()
        .then(() => {
            console.log("User profile img deleted");
        })
        .catch((error: any) => {
            console.log(error);
        });

    // Delete all data from collections
    const collections = [weightCollection, usersCollection, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, intenseActivityCollection, activityGoalsCollection];
    collections.forEach(async (collection) => {
        const snapshot = await collection
            .where("uid", "==", getBaseUserInfo()?.uid)
            .get();
        snapshot.forEach((row: any) => {
            row.ref.delete();
        });
    });

    // Delete real auth user
    const user = firebase.auth().currentUser;
    user?.delete().then(function () {
        return document.location.href="/login";
    }).catch(function (error: string) {
        return AppVue.methods?.openToast("Error deleting user auth: " + error);
    });

};

/**
 * Save user code returned by oauth2 call
 */
export const saveUserOAuth2Code = async (code: string) => {
    const uid = getBaseUserInfo()?.uid;
    if (code && uid) {
        const snapshot = await usersCollection.where("uid", "==", uid).get();
        snapshot.forEach(element => {
            element.ref.update({'oauth2code': code});
        });
        localStorage.setItem("OAuth2Code", code);
        throw AppVue.methods?.openToast("Salvataggio OAuth2Code avvenuta correttamente");
    }
};

/**
 * Get user oath2 fitbit code
 * @return oauth2code
 */
 export const getUserOauth2Code = async () => {
    let oauth2Code: any = null;
    const snapshot = await usersCollection
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((element) => {
        oauth2Code = element.get("oauth2code");
    });
    return oauth2Code;
};

/**
 * Get user access token
 * @return refreshToken
 */
 export const getUserRefreshToken = async () => {
    let refreshToken: any = null;
    const snapshot = await usersCollection
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((element) => {
        refreshToken = element.get("refreshToken");
    });
    return refreshToken;
};

/**
 * Save user access token and refresh token on firebase
 */
 export const saveUserAccessToken = async (accessToken: string, refreshToken: string) => {
    const uid = getBaseUserInfo()?.uid;
    if (accessToken && refreshToken && uid) {
        const snapshot = await usersCollection.where("uid", "==", uid).get();
        snapshot.forEach(element => {
            element.ref.update({'accessToken': accessToken});
            element.ref.update({'refreshToken': refreshToken});
        });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }
};

/**
 * Get user refresh token from Fitbit
 * @return accessToken
 */
 export const getRefreshToken = async () => {
    const request = await require('request');

    const headers = {
        'Authorization': 'Basic ' + btoa(CLIENT['CLIENT_ID'] + ":" + CLIENT['CLIENT_SECRET']),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    let refreshToken = null;
    await Promise.resolve(getUserRefreshToken()).then(function (value) {
        if (value != null) {
            refreshToken = value;
        }
    });

    const dataString = 'grant_type=refresh_token&refresh_token='+refreshToken+'&expires_in=604800';
    const options = {
        url: 'https://api.fitbit.com/oauth2/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    
    function callback(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
            response = JSON.parse(response['body']);
            saveUserAccessToken(response['access_token'],  response['refresh_token']);
        }
    }
    
    request(options, callback);
      
};

/**
 * Get user access token
 * @return accessToken
 */
 export const getUserAccessToken = async () => {
    let accessToken: any = null;
    const snapshot = await usersCollection
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((element) => {
        accessToken = element.get("accessToken");
    });

    return accessToken;
};

/**
 * Get user access token from Fitbit
 */
 export const getAccessToken = async () => {
    const request = await require('request');

    const headers = {
        'Authorization': 'Basic ' + btoa(CLIENT['CLIENT_ID'] + ":" + CLIENT['CLIENT_SECRET']),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    let oauth2Code = null;
    await Promise.resolve(getUserOauth2Code()).then(function (value) {
        if (value != null) {
            oauth2Code = value;
        }
    });

    const dataString = 'clientId='+CLIENT['CLIENT_ID']+'&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fwww.univr.it%2Fit%2F&code='+oauth2Code+'&expires_in=604800';
    const options = {
        url: 'https://api.fitbit.com/oauth2/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    
    function callback(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
            response = JSON.parse(response['body']);
            saveUserAccessToken(response['access_token'],  response['refresh_token']);
        }
    }
    
    request(options, callback);
};

/**
 * Get user logs of sleep and activities from Fitbit
 * @return logs
 */
 export const getLastFitbitLogs = async (range: number) => {
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

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const endDate = date.toISOString().split('T')[0];

    date.setDate(date.getDate() - range);
    const startDate = date.toISOString().split('T')[0];

    const result: any[] = [];
    const activities = [
        'minutesSedentary',
        'minutesLightlyActive',
        'minutesFairlyActive',
        'minutesVeryActive',
    ];

    // All activities log of the last range days
    activities.forEach(activity => {
        const options = {
            url: 'https://api.fitbit.com/1/user/-/activities/'+activity+'/date/'+startDate+'/'+endDate+'.json',
            headers: headers
        };
        
        function callback(error: any, response: any, body: any) {
            if (!error && response.statusCode == 200) {
                response = JSON.parse(response['body']);
                result.push(response);
            }
        }
        request(options, callback);
    });

    // All sleep log of the last range days
    const options = {
        url: 'https://api.fitbit.com/1/user/-/sleep/date/'+startDate+'/'+endDate+'.json',
        headers: headers
    };
    
    function callback(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
            response = JSON.parse(response['body']);
            result.push(response);
        }
    }
    request(options, callback);
    
    console.log(result);
};




