import { firebase, storageRef, usersCollection, weightCollection, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection, activityGoalsCollection, reactive, AppVue } from "../config/export";
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
        uid: any;
    }>({
        name: null,
        surname: null,
        fiscalCode: null,
        email: null,
        imageURL: null,
        height: null,
        weight: null,
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
