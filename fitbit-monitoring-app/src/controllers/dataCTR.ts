import firebase from "firebase";
import "firebase/firestore";
import { getBaseUserInfo } from "./userCTR";
import AppVue from "@/App.vue";

const db = firebase.firestore();
let message = "";
let activityCollection = db.collection("steps");

/**
 * Save local steps saved into JSON file on firebase
 * @param args 
 * @returns 
 */
export const saveUserActivity = async (args: any[], type: string) => {
    const uid = getBaseUserInfo()?.uid;
    switch (type) {
        case "sedentary":
            activityCollection = db.collection("sedentaryActivity");
            break;
        case "light":
            activityCollection = db.collection("lightActivity");
            break;
        case "moderately":
            activityCollection = db.collection("moderatelyActivity");
            break;
        case "intense":
            activityCollection = db.collection("intenseActivity");
            break;
        default:
            message = "Si è verificato un errore, ripetere la procedura";
            throw AppVue.methods?.openToast(message);
    }
    activityCollection.where('uid', '==', uid).get()
        .then(function (querySnapshot) {
            // Once we get the results, begin a batch
            const batch = db.batch();
            querySnapshot.forEach(function (doc) {
                batch.delete(doc.ref);
            });
            batch.commit();

        }).then(function () {
            // Delete completed
            args.forEach((row) => {
                const number = parseInt(row.value);
                const dateTime = firebase.firestore.Timestamp.fromDate(new Date(row.dateTime));

                // First check the validity of the data, if so I make the insert
                if (uid != null && number >= 0 && dateTime != null) {
                    activityCollection
                        .add({
                            uid: uid,
                            dateTime: dateTime,
                            minutes: number,
                        })
                        .then(() => {
                            message = "Dati caricati correttamente";
                        })
                        .catch((error) => {
                            message = "Errore nel caricamento dei dati: " + error;
                            throw AppVue.methods?.openToast(message);
                        });
                } else {
                    message = "Dati non conformi, caricamento annullato";
                    throw AppVue.methods?.openToast(message);
                }
            });
        });
    return message;
};

/**
 * Get all steps of the logged user
 */
export const getStepsFirebase = async () => {
    // const doc =  usersCollection.get();
    // const snapshot = await usersCollection.get();
    //     snapshot.forEach(doc => {
    //         return doc;
    //         // console.log(doc.id, '=>', doc.data());
    //     });
    // if (!doc) {
    // console.log('No such document!');
    // } else {
    // console.log('Document data:', doc);
    // }
    // usersCollection
    //     .add({ nome: "dd", email: "d@exit.it" })
    //     .then(() => {
    //         console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });
    // console.log(firebase);
    // return usersCollection.add(user);
};