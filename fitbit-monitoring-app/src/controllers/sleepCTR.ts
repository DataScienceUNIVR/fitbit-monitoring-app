import { firebase, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, intenseActivityCollection, getBaseUserInfo, axios, AppVue } from "../config/export";

/**
 * Get base sleep association rules
 * @returns rule
 */
export const getSleepAssociationRules = async () => {
    let result = null;
    await axios.post('http://localhost/fitbit/api/associationRules?id=3', {
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })
    .then(response => {
        if(!response.data.error) {
            result = response.data;
        } else {
            throw AppVue.methods?.openToast("Error in handling requests. Please try again");
        }
    })
    .catch(e => {
        console.log(e);
    })
    return result;
};


