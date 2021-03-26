import firebase from "firebase";
import "firebase/firestore";
import FIREBASE_CONFIG from "./.env.firebase";
import useFirebaseAuth from "./firebase-auth";
import "./firebase-crud.ts";
import AppVue from "@/App.vue";
const { getLoggedUserInfo } = useFirebaseAuth();

// Get a reference to the storage service, which is used to create references in storage bucket
const storage = firebase.storage();
// Create a storage reference from our storage service
const storageRef = storage.ref();
const db = firebase.firestore();
const stepsCollection = db.collection("steps");
let message = "";

// Init firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

export const sendStepsFirebase = async (args: any[]) => {
    const uid = getLoggedUserInfo()?.uid;
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

                // First check the validity of the data, if so I make the insert
                if (uid != null && number >= 0 && dateTime != null) {
                    stepsCollection
                        .add({
                            uid: uid,
                            dateTime: dateTime,
                            value: number,
                        })
                        .then(() => {
                            message = "Dati caricati correttamente";
                        })
                        .catch((error) => {
                            message = "Errore nel caricamento dei dati: " + error;
                            throw AppVue.methods?.openToast("ERRORE: " + message);
                        });
                } else {
                    message = "Dati non conformi, caricamento annullato";
                    throw AppVue.methods?.openToast("ERRORE: " + message);
                }
            });
        });
    return message;
};

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



export const uploadImage = async (file: File) => {
    const imagesRef = storageRef.child('profilePictures/' + getLoggedUserInfo()?.uid);
    // There is no need to delete the previous one because it is overwritten 
    try {
        imagesRef.put(file).then(() => {
            return AppVue.methods?.openToast("Aggiornare la pagina");
        })
    } catch (error) {
        throw AppVue.methods?.openToast("ERRORE: " + error);
    }
};


export const getStatistics = async (period: any) => {
    const uid = getLoggedUserInfo()?.uid;

    return "testo" + period;
};
