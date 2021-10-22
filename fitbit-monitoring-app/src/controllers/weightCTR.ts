import { AppVue, axios, notifyAPIError, getOauth2Code } from "../config/export";

/**
 * Get weight values registered of the last month
 * @return weight
 */
export const getWeights = async () => {
    await getOauth2Code();
    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    };
    
    const date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    interface Weight {
        date: any;
        value: any;
    }
    const weightsList: Weight[] = [];

    // Without set hour the user can save one per day weigth
    await axios.get(
        'https://api.fitbit.com/1/user/-/body/log/weight/date/'+currentDate+'/30d.json', 
        { 
            headers: headers
        }
    ).then(function (response) {
        const result = response.data.weight;
        result.forEach((weight: any) => {
            weightsList.push({
                date: weight.date,
                value: weight.weight,
            });
        });
    }).catch(function (error) {
        notifyAPIError(error);
    });

    // Order by date ASC
    weightsList.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    return weightsList;
};

/**
 * Add a new weight value
 */
export const addWeight = async (value: number) => {
    const request = await require('request');

    await getOauth2Code();
    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    };

    const date = new Date();
    const currentDate = date.toISOString().split('T')[0];
    
    // Without set hour the user can save one per day weigth
    const options = {
        url: 'https://api.fitbit.com/1/user/-/body/log/weight.json',
        headers: headers,
        form: {
            weight: value,
            date: currentDate
        },
        method: 'POST',
    };
    
    function callback(error: any, response: any, body: any) {
        if (!error && response.statusCode == 201) {
            response = JSON.parse(body);
            location.reload();
        } else {
            throw AppVue.methods?.openToast("Error in saving: " + error);
        }
    }
    request(options, callback);
};

/**
 * Sedentary Activity:  ~ 2 Km/h    ->  ~  3 kcal / min
 * Light Activity:      ~ 4 Km/h    ->  ~  5 kcal / min
 * Moderate Activity:   ~ 8 Km/h    ->  ~  11 kcal / min
 * Intense Activity:    ~ 13 Km/h   ->  ~  19 kcal / min
 */
