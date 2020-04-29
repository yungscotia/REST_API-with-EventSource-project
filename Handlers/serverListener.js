/*Imports*/
const EventSource = require('eventsource');                                 // to construct EventSource object
const eventHandlers = require("./eventhandlers");

/*Server Listener Function*/
function serverListen(server, port, studentMap, examMap, data_url) {
    const eventHandler = function(event) {                                  // this handles each event from the EventSource object
        let eventData = JSON.parse(event.data);
        eventHandlers.studentMapDataHandler(eventData, studentMap);
        eventHandlers.examMapDataHandler(eventData, examMap);
    }

    server.listen(port, function() {
        console.log("Server starting up! Whoo!");
        var source = new EventSource(data_url);                             // create EventSource object at url passed into serverListen
        console.log("Initializing EventSource Subscription");
        source.onerror = function(err) {                                    // set up a simple error message in case the EventSource procs an error
            if (err) {
                if (err.status === 401 || err.status === 403) {
                console.log('Oh noes! not authorized');
                } else {
                    console.log("Wowzers! Something went wrong!");
                    console.log(err);
                }
            }
        }
        source.addEventListener('score', eventHandler, false);              // add a listener to the EventSource object looking for event type: 'score'
        console.log("You're all ready to begin using the server!");
    });
}

module.exports = {serverListen};