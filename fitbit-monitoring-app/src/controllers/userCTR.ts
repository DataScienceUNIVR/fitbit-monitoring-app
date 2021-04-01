import firebase from "firebase";
import "firebase/firestore";
import AppVue from "@/App.vue";
import { reactive } from "vue";

const storage = firebase.storage();
const storageRef = storage.ref();
const db = firebase.firestore();
const usersCollection = db.collection("users");
const pesoCollection = db.collection("peso");


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
export const getAllUserInfo = async () => {
    const user = reactive<{ nome: any; cognome: any; cf: any; email: any; imageURL: any; altezza: any; peso: any; uid: any }>({
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

    const snapshot = await usersCollection.where('uid', '==', user.uid).get();
    if (snapshot.empty) {
        return AppVue.methods?.openToast("Errore: eseguire il logout e riautenticarsi");
    }

    snapshot.forEach(doc => {
        user.nome = doc.get("nome");
        user.cognome = doc.get("cognome");
        user.cf = doc.get("cf");
        user.email = doc.get("email");
        user.altezza = doc.get("altezza");
    });

    // image URL of logged user
    const pathReference = storageRef.child("profilePictures/" + user.uid);
    if(pathReference){
        await Promise.resolve(pathReference.getDownloadURL()).then(function (value) {
            if (value) {
                user.imageURL = value;
            }
        }).catch(e => {
            user.imageURL = null;
        });
    }

    await Promise.resolve(getLastWeight()).then(function (value) {
        if (value) {
            user.peso = value["peso"];
        }
    }).catch(e => {
        user.peso = null;
    });

    return user;
};

/**
 * Upload user avatar image
 * @param file 
 */
export const uploadImage = async (file: File) => {
    const imagesRef = storageRef.child('profilePictures/' + getBaseUserInfo()?.uid);
    // There is no need to delete the previous one because it is overwritten 
    try {
        imagesRef.put(file).then(() => {
            location.reload(true)
        })
    } catch (error) {
        throw AppVue.methods?.openToast(error);
    }
};

/**
 * Get last weight value loaded
 * @return weight 
 */
 export const getLastWeight = async () => {
    let datiPeso = null;
    const snapshot = await pesoCollection.orderBy("dateTime", 'desc').limit(1).where('uid', '==', getBaseUserInfo()?.uid).get();
    snapshot.forEach(element => {
        datiPeso =  element.data();
    });
    return datiPeso;
};


/**
 * Get statistics of the logged user
 * @param period 
 * @returns statistiche
 */
export const getStatistics = async (period: any) => {
    const uid = getBaseUserInfo()?.uid;

    return "statistiche di: " + uid;
};


