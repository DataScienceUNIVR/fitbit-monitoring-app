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

export const sendData = (nome: string, email: string) => {
    usersCollection
        .add({ nome: "test", email: "test@exit.it" })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    return getLoggedUserInfo();
    // console.log(firebase);
    // return usersCollection.add(user);
}
