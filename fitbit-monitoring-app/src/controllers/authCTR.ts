// import { storageRef, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
//     intenseActivityCollection, activityGoalsCollection} from "../config/export";
import FIREBASE_CONFIG from "../config/.env.firebase";    

import { toRefs, reactive } from "vue";
import firebase from "firebase";
import "firebase/firestore";
import { Md5 } from "md5-typescript";
import AppVue from "@/App.vue";

// initialize firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const db = firebase.firestore();
const usersCollection = db.collection("users");
const weightCollection = db.collection("weight");
const state = reactive<{ user: any; initialized: boolean; error: any }>({
    user: null,
    initialized: false,
    error: null,
});

export default function () {
    /**
     * Login with firebase auth
     * @param email 
     * @param password 
     * @returns user
     */
    const login = (email: string, password: string) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
                (user) => {
                    state.user = user;
                    state.error = null;
                    return user;
                },
                (error) => {
                    state.error = error;
                    throw AppVue.methods?.openToast(error);
                }
            );
    };

    /**
     * Register with firebase auth and after delete from users if already exist a doc with same uid
     * @param name 
     * @param surname 
     * @param fiscalCode 
     * @param weight
     * @param height
     * @param email 
     * @param password 
     * @returns user
     */
    const register = (name: string, surname: string, fiscalCode: string, weight: number, height: number, email: string, password: string) => {
       
        if (name != null && surname != null && email != null && password != null) {
            return firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(
                    (user) => {
                        state.user = user;
                        // If user is added firebase auth su successfully, add this one to users table too 
                        const uid = user.user?.uid;
                        if (uid != null) {
                            // First add data to users table
                            usersCollection
                                .add({
                                    uid: uid,
                                    name: name,
                                    surname: surname,
                                    fiscalCode: fiscalCode,
                                    height: parseInt(height.toString()),
                                    email: email,
                                    password: Md5.init(password),
                                })
                                .then(() => {
                                    state.error = null;
                                })
                                .catch((error) => {
                                    state.error = "Registration error: " + error;
                                    throw AppVue.methods?.openToast("Registration error: " + error);
                                });

                                // Now add user weight to weight table (trace history)
                                const currenteDateTime = firebase.firestore.Timestamp.fromDate(new Date());
                                weightCollection
                                .add({
                                    uid: uid,
                                    weight: parseFloat(weight.toString()),
                                    dateTime: currenteDateTime
                                })
                                .then(() => {
                                    state.error = null;
                                    return user;
                                })
                                .catch((error) => {
                                    state.error = "Registration error: " + error;
                                    throw AppVue.methods?.openToast("Registration error: " + error);
                                });
                        } else {
                            state.error = "Dati non conformi, registrazione annullata";
                            return;
                        }
                    },
                    (error) => {
                        state.error = error;
                        throw AppVue.methods?.openToast(error);
                    }
                );
        }
    };

    /**
     * Logout with firebase auth
     */
    const logout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                state.user = null;
            });
    };

    /**
     * Run during startup: initialize user
     */
    const authCheck = () => {
        return new Promise((resolve, reject) => {
            !state.initialized &&
                firebase.auth().onAuthStateChanged(async (_user) => {
                    if (_user) {
                        state.user = _user;
                    } else {
                        state.user = null;
                    }
                    state.initialized = true;
                    console.log(_user);
                    resolve(true);
                });
        });
    };

    return {
        ...toRefs(state),
        login,
        register,
        logout,
        authCheck,
    };
}
