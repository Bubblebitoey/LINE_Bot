const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
    'Content-Type': 'application/json',
    //chanel token 
    'Authorization': 'utYXOi++E0LbeBUtbTGnxRdYqZn0qFMwUTfOD8D/H2lKvTRrDISFBL2kJMn5IqqHx22zMk0pr+6gGdHeQWODTo4vDVEvlTGh4MagAul4pALL8XgYHPR226H2LK3Y8k0yOWwceLvHtsDgnqrHMHC3ZgdB04t89/1O/w1cDnyilFU='
};

exports.LineBot = functions.https.onRequest((req, res) => {
    //check the input type is text ?
    if (req.body.events[0].message.type !== 'text') {
        //no anser
        return;
    }
    //reply same as user message

    reply(req.body);
});

const reply = (bodyResponse) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            messages: [
                {
                    type: `text`,
                    text: bodyResponse.events[0].message.text
                }
            ]
        })
    });
};
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 //exports.helloWorld = functions.https.onRequest((request, response) => {
 // response.send("Hello from Firebase!");
 //});
