import { firebase, sedentaryActivityCollection, lightActivityCollection, moderateActivityCollection, 
    intenseActivityCollection, getBaseUserInfo } from "../config/export";

/**
 * Get activity values
 * @return statistic for each activity
 */
export const getActivityTimeWithRange = async () => {
    interface Activity {
        data: any;
        minutes: string;
    }
    const collections = [
        sedentaryActivityCollection,
        lightActivityCollection,
        moderateActivityCollection,
        intenseActivityCollection,
    ];
    const result: any = [];

    const date = new Date();
    date.setMonth(date.getMonth() - 100);

    // const startDate = firebase.firestore.Timestamp.fromDate(date);

    // const date2 = new Date();
    // const endDate = firebase.firestore.Timestamp.fromDate(date2);
    const request = await require('request');

    let tmp: Activity[] = [];

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    };

    const activities = [
        'sedentary',
        'lightly',
        'fairly',
        'very',
    ];

        const options = {
            url: 'https://api.fitbit.com/1/user/-/activities/list.json?afterDate='+date.toISOString().split('T')[0]+'&limit=100&sort=asc&offset=0',
            headers: headers
        };
        
        function callback(error: any, response: any, body: any) {
            if (!error && response.statusCode == 200) {
                response = JSON.parse(response['body']);
                for (const activity of activities) {
                    tmp = [];
                    for(const row of response['activities']){
                        tmp.push(row)
                }
            }
        }   
    }   

    request(options, callback);

    // for (const activity of activities) {
    //     const snapshot = await collection
    //         .orderBy("dateTime")
    //         .startAfter(startDate)
    //         .endAt(endDate)
    //         .where("uid", "==", getBaseUserInfo()?.uid)
    //         .get();
    //     tmp = [];
    //     snapshot.forEach((row) => {
    //         tmp.push({
    //             data:
    //                 row
    //                     .get("dateTime")
    //                     .toDate()
    //                     .getDate() +
    //                 "/" +
    //                 (row
    //                     .get("dateTime")
    //                     .toDate()
    //                     .getMonth() +
    //                     1) +
    //                 "/" +
    //                 row
    //                     .get("dateTime")
    //                     .toDate()
    //                     .getFullYear(),
    //             minutes: row.get("minutes") + '',
    //         });
    //     });
    //     result.push(tmp);
    // }
    return result;
};
