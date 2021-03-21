import firebase from "firebase";
import "firebase/firestore";
import FIREBASE_CONFIG from "./.env.firebase";
import useFirebaseAuth from "./firebase-auth";
import "./firebase-crud.ts";
const { getLoggedUserInfo } = useFirebaseAuth();

// initialize firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const db = firebase.firestore();
// const usersCollection = db.collection("users");
const stepsCollection = db.collection("steps");
let message = "";

export const sendStepsToFirebase = async (args: any[]) => {
    const uid = getLoggedUserInfo()?.uid;
    // const deleteQuery = stepsCollection.where("uid", "==", uid);
    // deleteQuery.get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         doc.ref.delete();
    //     });
    // });
    stepsCollection.where('uid', '==', uid).get()
        .then(function (querySnapshot) {
            // Once we get the results, begin a batch
            const batch = db.batch();
            querySnapshot.forEach(function (doc) {
                batch.delete(doc.ref);
            });
            // Commit the batch
            batch.commit();

        }).then(function () {
            // Delete completed
            args.forEach((row) => {
                const number = parseInt(row.value);
                const dateTime = firebase.firestore.Timestamp.fromDate(new Date(row.dateTime));

                // Prima controllo la validità dei dati, in caso positivo faccio l'insert
                if (uid != null && number >= 0 && dateTime != null) {
                    stepsCollection
                        .add({
                            uid: uid,
                            dateTime: dateTime,
                            value: number,
                        })
                        .then(() => {
                            message = "Dati caricati correttamente";
                            console.log(message);
                        })
                        .catch((error) => {
                            message = "Errore nel caricamento dei dati: " + error;
                            return message;
                        });
                } else {
                    message = "Dati non conformi, caricamento annullato";
                    return message;
                }
            });
        });
    return message;
};

export const getStepsToFirebase = async () => {
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
