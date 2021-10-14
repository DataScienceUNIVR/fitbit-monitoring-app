/**
 * Get user access token from Fitbit
 * @return accessToken
 */
 export const getFitbitDailyActivities = async () => {
    const sedentaryActivityWeight = -2;
    const lightActivityWeight = -1;
    const moderateActivityWeight = 1;
    const intenseActivityWeight = 2;
    // let totalSedentaryActivity = 0;
    // let totalLightActivity = 0;
    // let totalModerateActivity = 0;
    // let totalIntenseActivity = 0;
    // let total = 0;
    // const frozensetActivity = "";
    const request = await require('request');

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    };

    const activities = [
        'minutesSedentary',
        'minutesLightlyActive',
        'minutesFairlyActive',
        'minutesVeryActive',
    ];

    activities.forEach(activity => {
        const options = {
            //url: 'https://api.fitbit.com/1/user/-/activities/'+activity+'/date/today/today.json',
            headers: headers
        };
        
        function callback(error: any, response: any, body: any) {
            // if (!error && response.statusCode == 200) {
                // response = JSON.parse(response['body']);
                if(activity == "minutesSedentary") {
                    // totalSedentaryActivity += 1812 * sedentaryActivityWeight;
                    // total += (response['activities-'+activity][0]['value'] * sedentaryActivityWeight);
                } else if(activity == "minutesLightlyActive") {
                    // totalLightActivity += 20 * lightActivityWeight;
                    // total += (response['activities-'+activity][0]['value'] * lightActivityWeight);
                } else if(activity == "minutesFairlyActive") {
                    // totalModerateActivity += 2 * moderateActivityWeight;
                    // total += (response['activities-'+activity][0]['value'] * moderateActivityWeight);
                } else if(activity == "minutesVeryActive") {
                    // totalIntenseActivity += 50 * intenseActivityWeight;
                    // total += (response['activities-'+activity][0]['value'] * intenseActivityWeight);
                }
                // console.log(response['activities-'+activity][0]['value']);
            // }
        }
        request(options, callback);
    });    
    // if (windowLenght == 2) {
    // } else {
    // }
};




