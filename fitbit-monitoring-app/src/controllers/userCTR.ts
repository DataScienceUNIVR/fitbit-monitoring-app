import firebase from "firebase";
import "firebase/firestore";
import AppVue from "@/App.vue";

const storage = firebase.storage();
const storageRef = storage.ref();

/**
     * Get the base information of the logged user (uid, email)
     * @returns currentUser
     */
 export const getBaseUserInfo = () => {
    return firebase
        .auth()
        .currentUser
};

/**
 * Get all information of the logged user (nome, cognome, email, cf, pwd, uid, img)
 * @returns currentUser
 */
export const getAllUserInfo = () => {
    return firebase
        .auth()
        .currentUser
};

export const uploadImage = async (file: File) => {
    const imagesRef = storageRef.child('profilePictures/' + getBaseUserInfo()?.uid);
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
    const uid = getBaseUserInfo()?.uid;

    return "statistiche di: " + uid;
};


