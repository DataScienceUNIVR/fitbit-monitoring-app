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

// interface User {
//     uid: string;
//     nome: string;
//     email: string;
//     password: string;
// }

const db = firebase.firestore();
const usersCollection = db.collection("users");

export const sendStepsToFirebase = (nome: string, email: string) => {
    usersCollection
        .add({ nome: "dd", email: "d@exit.it" })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    return getLoggedUserInfo();
}

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
}
