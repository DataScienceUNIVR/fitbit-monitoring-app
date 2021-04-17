import firebase from "firebase";
import "firebase/firestore";

const storage = firebase.storage();
const storageRef = storage.ref();
const db = firebase.firestore();
const usersCollection = db.collection("users");
const pesoCollection = db.collection("peso");
const sedentaryActivityCollection = db.collection("sedentaryActivity");
const lightActivityCollection = db.collection("lightActivity");
const moderatelyActivityCollection = db.collection("moderatelyActivity");
const intenseActivityCollection = db.collection("intenseActivity");
import AppVue from "@/App.vue";
import { reactive } from "vue";

/**
 * Get the base information of the logged user (uid, email)
 * @returns currentUser
 */
export const getBaseUserInfo = () => {
    return firebase.auth().currentUser;
};

/**
 * Get last weight value loaded
 * @return weight
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
 * Get last weight value loaded
 * @return weight
 */
export const getLastWeight = async () => {
    let datiPeso: any = null;
    const snapshot = await pesoCollection
        .orderBy("dateTime", "desc")
        .limit(1)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((element) => {
        datiPeso = element.data();
    });
    return datiPeso;
};

/**
 * Get weight values
 * @return weight
 */
export const getWeights = async () => {
    interface Peso {
        data: any;
        valore: any;
    }
    const listaPesi: Peso[] = [];

    const snapshot = await pesoCollection
        .orderBy("dateTime", "desc")
        .limit(10)
        .where("uid", "==", getBaseUserInfo()?.uid)
        .get();
    snapshot.forEach((row) => {
        listaPesi.push({
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
            valore: row.get("peso"),
        });
    });

    return listaPesi;
};

/**
 * Get all information of the logged user (nome, cognome, email, cf, pwd, uid, img)
 * @returns currentUser
 */
export const getAllUserInfo = async () => {
    const user = reactive<{
        nome: any;
        cognome: any;
        cf: any;
        email: any;
        imageURL: any;
        altezza: any;
        peso: any;
        uid: any;
    }>({
        nome: null,
        cognome: null,
        cf: null,
        email: null,
        imageURL: null,
        altezza: null,
        peso: null,
        uid: null,
    });

    user.uid = getBaseUserInfo()?.uid;

    const snapshot = await usersCollection.where("uid", "==", user.uid).get();
    if (snapshot.empty) {
        return AppVue.methods?.openToast(
            "Errore: eseguire il logout e riautenticarsi"
        );
    }

    snapshot.forEach((doc) => {
        user.nome = doc.get("nome");
        user.cognome = doc.get("cognome");
        user.cf = doc.get("cf");
        user.email = doc.get("email");
        user.altezza = doc.get("altezza");
    });

    await Promise.resolve(getProfileImage()).then(function (value) {
        if (value) {
            user.imageURL = value;
        }
    });

    await Promise.resolve(getLastWeight()).then(function (value) {
        if (value != null) {
            user.peso = value["peso"];
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
        imagesRef.put(file).then(() => {
            location.reload(true);
        });
    } catch (error) {
        throw AppVue.methods?.openToast(error);
    }
};

/**
 * Get last weight value loaded
 * @return weight
 */
export const addWeight = async (value: number) => {
    // Now add user weight to peso table (trace history)
    const currenteDateTime = firebase.firestore.Timestamp.fromDate(new Date());
    pesoCollection
        .add({
            uid: getBaseUserInfo()?.uid,
            peso: value,
            dateTime: currenteDateTime,
        })
        .then(() => {
            location.reload(true);
        })
        .catch((error) => {
            throw AppVue.methods?.openToast("Errore nel salvataggio: " + error);
        });
};

/**
 * Delete account with all user informations
 * @param file
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
        .catch((error) => {
            return AppVue.methods?.openToast("Errore nella cancellazione dell'immagine di profilo");
        });

    // Delete all data from collections
    const collections = [pesoCollection, usersCollection, sedentaryActivityCollection, lightActivityCollection, moderatelyActivityCollection, intenseActivityCollection];
    collections.forEach(async (collection) => {
        const snapshot = await collection
            .where("uid", "==", getBaseUserInfo()?.uid)
            .get();
        snapshot.forEach((row) => {
            row.ref.delete();
        });
    });

    // Delete real auth user
    const user = firebase.auth().currentUser;
    user?.delete().then(function () {
        console.log(user);
    }).catch(function (error) {
        return AppVue.methods?.openToast("Errore nella cancellazione dell'utente auth");
    });

    return AppVue.methods?.openToast("Utente cancellato correttamente");
};
