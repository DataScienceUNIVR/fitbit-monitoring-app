import { firebase, AppVue, db, getBaseUserInfo, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection } from "../config/export";

let activityCollection = db.collection("sedentaryActivity");
let message = "";

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
        case "moderate":
            activityCollection = db.collection("moderateActivity");
            break;
        case "intense":
            activityCollection = db.collection("intenseActivity");
            break;
        default:
            message = "An error has occurred, repeat the procedure";
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
                            message = "Data loaded successfully ";
                        })
                        .catch((error) => {
                            message = "Error loading data: " + error;
                            throw AppVue.methods?.openToast(message);
                        });
                } else {
                    message = "Data not compliant, upload canceled";
                    throw AppVue.methods?.openToast(message);
                }
            });
        });
    return message;
};

/**
 * Get all steps of the logged user
 */
export const getUserActivity = async (type: string) => {
    let result: any = [];    
    activityCollection = sedentaryActivityCollection;
    switch (type) {
        case "sedentary":
            activityCollection = sedentaryActivityCollection;
            break;
        case "light":
            activityCollection = lightActivityCollection;
            break;
        case "moderate":
            activityCollection = moderateActivityCollection;
            break;
        case "intense":
            activityCollection = intenseActivityCollection;
            break;
        default:
            break;
    }
    const snapshot = await activityCollection.where("uid", "==", getBaseUserInfo()?.uid).get();
    snapshot.forEach(doc => {
        result.push(doc.data());
        // return doc;
        // console.log(doc.id, '=>', doc.data());
    });

    result = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));
    
    return result;
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