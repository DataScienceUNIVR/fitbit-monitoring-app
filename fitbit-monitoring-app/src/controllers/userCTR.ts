import { firebase, storageRef, usersCollection, weightCollection, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection, activityGoalsCollection, reactive, AppVue, axios } from "../config/export";
import { getLastWeight } from "./weightCTR";

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
 * Get all information of the logged user (name, surname, email, fiscalCode, pwd, uid, img)
 * @returns currentUser
 */
export const getAllUserInfo = async () => {
    const user = reactive<{
        name: any;
        surname: any;
        fiscalCode: any;
        email: any;
        imageURL: any;
        height: any;
        weight: any;
        oauth2Code: any;
        uid: any;
    }>({
        name: null,
        surname: null,
        fiscalCode: null,
        email: null,
        imageURL: null,
        height: null,
        weight: null,
        oauth2Code: null,
        uid: null,
    });

    user.uid = getBaseUserInfo()?.uid;

    const snapshot = await usersCollection.where("uid", "==", user.uid).get();
    if (snapshot.empty) {
        return AppVue.methods?.openToast(
            "Error: Please log out and re-authenticate"
        );
    }

    snapshot.forEach((doc: any) => {
        user.name = doc.get("name");
        user.surname = doc.get("surname");
        user.fiscalCode = doc.get("fiscalCode");
        user.email = doc.get("email");
        user.height = doc.get("height");
        user.oauth2Code = doc.get("oauth2code");
    });

    await Promise.resolve(getProfileImage()).then(function (value) {
        if (value) {
            user.imageURL = value;
        }
    });

    await Promise.resolve(getLastWeight()).then(function (value) {
        if (value != null) {
            user.weight = value["weight"];
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
            location.reload(true);
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
export const saveOAuth2UserCode = async (code: string) => {
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
 * Get user fitbit access token
 * @return accessToken
 */
 export const getUserAccessToken = async () => {
    const request = await require('request');
    // const baseEncode = btoa("23BG9G:323bcf9d46a073c68db989b6cec3070d");
    const CLIENT_ID = "23BG9G";
    const CLIENT_SECRET = "323bcf9d46a073c68db989b6cec3070d";
    // console.log(baseEncode);
    const headers = {
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const dataString = 'clientId=23BG9G&grant_type=authorization_code&redirect_uri=https://www.univr.it/it&code=59295927c1c44375e81d0137644e7845db7b73e6';

    const options = {
        url: 'https://api.fitbit.com/oauth2/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    
    function callback(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
            console.log(response);
        }
    }
    
    request(options, callback);

    // const response = await axios({
    //     url: 'https://api.fitbit.com/oauth2/token',
    //     method: 'POST',
    //     headers: {
    //       'Authorization': 'Basic ' + btoa("23BG9G:323bcf9d46a073c68db989b6cec3070d"),
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     data: new URLSearchParams({
    //         'clientId': '23BG9G',
    //         'grant_type': 'authorization_code',
    //         'redirect_uri': 'https://www.univr.it/it',
    //         'code': '530069bb4b9077ff7bad57a1d4920615371313b2',
    //     })
    //   });
      
};


