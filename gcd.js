const { google } = require('googleapis');
const discoveryDoc = './discovery.json';
const key = require('./keys.json');
const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ["https://www.googleapis.com/auth/jobs"], null);

// const jwtClient = new google.auth.JWT(process.env.client_email, null, process.env.private_key, ["https://www.googleapis.com/auth/jobs"], null);

async function jobSearch() {
    const jobService = await google.discoverAPI(discoveryDoc);
    jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log(err);
            return;
        }

        var searchJobsRequest = {
            "requestMetadata": {
                "domain": "UNKNOWN",
                "sessionId": "UNKNOWN",
                "userId": "UNKNOWN"
            },
            "query": {
                "query": "Python",
            },
            "offset": 5,
            "pageSize": 5,
            "mode": 'JOB_SEARCH'
        }

        jobService.jobs.search({ auth: jwtClient, resource: searchJobsRequest }, function (err, result) {
          if (err) {
            console.error('Failed to search jobs! ' + err);
            throw err;
          }
          console.log("############# POST sample #############");
          console.log('result:', result.data);
        });
    });
    // jwtClient.authorize(function(err, tokens) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }

    //     jobService.companies.list({ auth: jwtClient }, function (err, result) {
    //         if (err) {
    //             console.error('Failed to retrieve companies! ' + err);
    //             throw err;
    //         }
    //         console.log("############# GET sample #############");
    //         console.log('Companies:', result);
    //     });
    // });
    return true;
}

jobSearch();