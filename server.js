/*Imports*/
const http = require('http');
const express = require('express');
const listener = require("./Handlers/serverListener");
const appHandlers = require('./Handlers/appHandlers');


/*Server and SSE Setup!*/
const start = function(students, exams) {

    const app = express();                                                  // start up express middleware

    const port = process.env.PORT || 3000;                                  // create server port

    const data_url = 'http://live-test-scores.herokuapp.com/scores';        // url of data stream

    /*Set up Data Structures - 2 Maps in memory*/ 
    var studentMap;
    var examMap;
    if(students && exams) {
        studentMap = students;
        examMap = exams;
    } else {
        studentMap = new Map();
        examMap = new Map();
    }

    /*Construct server and set up listener*/
    const server = http.createServer(app);                              
    listener.serverListen(server, port, studentMap, examMap, data_url);

    /*AppHandlers handles all requests to the server*/
    appHandlers.handle(app, studentMap, examMap);

    return app;                                                              
}

module.exports = start;


