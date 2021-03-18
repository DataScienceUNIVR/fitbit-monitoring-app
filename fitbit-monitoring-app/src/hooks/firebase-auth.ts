import { toRefs, reactive } from "vue";
import firebase from "firebase";
import "firebase/firestore";
import FIREBASE_CONFIG from "./.env.firebase";

// initialize firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const state = reactive<{ user: any; initialized: boolean; error: any }>({
    user: null,
    initialized: false,
    error: null,
});

export default function () {

    // Login function with firebase auth
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
                    throw error;
                }
            );
    };

    // Register function with firebase auth
    const register = (nome: string, email: string, password: string) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(
                (user) => {
                    state.user = user;
                    state.error = null;
                    return user;
                },
                (error) => {
                    state.error = error;
                    throw error;
                }
            );
    };

    // Logout function with firebase auth
    const logout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                state.user = null;
            });
    };

    // Run during startup
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

    // Return user id of authentication
    const getLoggedUserInfo = () => {
        return firebase
            .auth()
            .currentUser
    }; 

    return {
        ...toRefs(state),
        
        // functions
        login,
        register,
        logout,
        authCheck,
        getLoggedUserInfo
    };
}
