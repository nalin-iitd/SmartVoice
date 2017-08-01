'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.get('/get-recipes', function(req, res) {

    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.itemName ? req.body.result.parameters.itemName : "Seems like some problem. Speak again."
    var apiId = '0cc5117b';
    var apiKey = '7fd6ee57ca3497bc04bf70a71a714a97';
    var baseURL = 'http://api.yummly.com/v1/api/recipes';

    var queryString = ''; // default query string
    var tempStr = itemName.split(" ");

    for (var i = 0; i < tempStr.length; i++) { 
    queryString = queryString + tempStr[i];

    if(i < tempStr.length-1){
        queryString = queryString + "+";
    }
    }

     if(!queryString){
        queryString = 'pasta';
    }

    var reqObj = {"_app_id": apiId, "_app_key": apiId, "q": queryString};

    // var result = res.json(reqObj);
    // console.log(result);
    // return result;
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
