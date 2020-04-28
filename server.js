//                    Imports                       //

const http = require('http');
const express = require('express');
const EventSource = require('eventsource');                         // to construct EventSource object
const dataHandler = require("./functions_for_req_handling");         // import functions needed for GET request handlers
const eventHandlers = require("./eventhandlers");
const testData = require("./Test/testdata");

//              Server and SSE Setup!               //

const start = function(initData) {

    const app = express();

    const port = process.env.PORT || 3000;                              // create server port

    const server = http.createServer(app);                              // create server running on express

    const data_url = 'http://live-test-scores.herokuapp.com/scores';    // url of EventSource data stream

    let studentMap = new Map();
    let examMap = new Map();

    const eventHandler = function(event) {
        let eventData = JSON.parse(event.data);
        eventHandlers.studentMapDataHandler(eventData, studentMap);
        eventHandlers.examMapDataHandler(eventData, examMap);
    }

    server.listen(port, function() {
        console.log("Server starting up! Whoo!");
        var source = new EventSource(data_url);                         // create EventSource object at url given
        console.log("Initializing EventSource Subscription");
        source.onerror = function(err) {                                // set up a simple error message in case the EventSource procs an eror
            if (err) {
                if (err.status === 401 || err.status === 403) {
                console.log('Oh noes! not authorized');
                } else {
                    console.log("Wowzers! Something went wrong!");
                    console.log(err);
                }
            }
        }
        source.addEventListener('score', eventHandler, false);
        console.log("You're all ready to begin using the server!");
    });





    //                       GET Request Handlers!                    //

    app.get('/students/', (req, res, next) => {
        let finalData = [];
        finalData = dataHandler.getListOf(studentMap);                     // call helper function that returns a list of students from server data
        
        if(finalData.length) {                                          //if the server has received data
            res.status(200).json({                                      //show the final data requested in a response
                overview: "I've fetched all the student IDs as you requested!",
                students: finalData
            });
        } else {                                                        //if there's no data, show a message indicating that
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/students/:id', (req, res, next) => {
        let finalData = [];
        
        finalData = dataHandler.getStudent(studentMap, req.params.id);       // call function that finds specific student with server data
        
        if(finalData[0].length) {
            if(finalData[2]) {
                res.status(200).json({                                   //respond with scores data and average student score
                    overview: "Here are all the scores and the average of the student you gave me!",
                    scores: finalData[0],
                    average_score: finalData[1]
                });
            } else {                                                     //if student doesn't exist, send back an error
                const error = new Error('Student was not found! Check your requested student ID!!');
                error.status = 400;
                next(error);
            }
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }

    });


    app.get('/exams', (req, res, next) => {
        let finalData = dataHandler.getListOf(examMap);                     // call function that returns a list of exams
        if(finalData.length) {
            res.status(200).json({
                overview: "All the exams! As you requested!",
                exams: finalData
            });
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/exams/:number', (req, res, next) => {
        let finalData = dataHandler.getExam(examMap, req.params.number);                      // call function that finds a specific exam
        if(finalData[0].length) {
            if(finalData[2]) {
                res.status(200).json({                          //if so, send array of exam scores and average score
                    overview: "I got all the exam scores for the exam you requested and I calculated the average score across all students!",
                    exam_scores: finalData[0],
                    average_score: finalData[1]
                });
            } else {
                const error = new Error("The exam you requested was not found! Please check your requested exam ID");
                error.status = 400;
                next(error);
            }  
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/', (req, res, next) => {                                  // response if user sends a request to localhost:3000 or the server URL
        res.status(200).json({
            overview: "Welcome to this REST API! Please see the README to begin getting specific data and sending requests!"
        });
    })





    //                  Requests for Testing                 //

    app.get('/test/students/', (req, res, next) => {
        let finalData = [];
        finalData = dataHandler.getListOf(testData.testStudentMap);                     // call helper function that returns a list of students from server data
        
        if(finalData.length) {                                          //if the server has received data
            res.status(200).json({                                      //show the final data requested in a response
                overview: "I've fetched all the student IDs as you requested!",
                students: finalData
            });
        } else {                                                        //if there's no data, show a message indicating that
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/test/students/:id', (req, res, next) => {
        let finalData = [];
        
        finalData = dataHandler.getStudent(testData.testStudentMap, req.params.id);       // call function that finds specific student with server data
        
        if(finalData[0].length) {
            if(finalData[2]) {
                res.status(200).json({                                   //respond with scores data and average student score
                    overview: "Here are all the scores and the average of the student you gave me!",
                    scores: finalData[0],
                    average_score: finalData[1]
                });
            } else {                                                     //if student doesn't exist, send back an error
                const error = new Error('Student was not found! Check your requested student ID!!');
                error.status = 400;
                next(error);
            }
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }

    });


    app.get('/test/exams', (req, res, next) => {
        let finalData = dataHandler.getListOf(testData.testExamMap);                     // call function that returns a list of exams
        if(finalData.length) {
            res.status(200).json({
                overview: "All the exams! As you requested!",
                exams: finalData
            });
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/test/exams/:number', (req, res, next) => {
        let finalData = dataHandler.getExam(testData.testExamMap, req.params.number);                      // call function that finds a specific exam
        if(finalData[0].length) {
            if(finalData[2]) {
                res.status(200).json({                          //if so, send array of exam scores and average score
                    overview: "I got all the exam scores for the exam you requested and I calculated the average score across all students!",
                    exam_scores: finalData[0],
                    average_score: finalData[1]
                });
            } else {
                const error = new Error("The exam you requested was not found! Please check your requested exam ID");
                error.status = 400;
                next(error);
            }  
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/test/', (req, res, next) => {                                  // response if user sends a request to localhost:3000 or the server URL
        let finalData = JSON.stringify(testData.testStudentMap);
        res.status(200).json({
            overview: "Welcome to this REST API! I've posted the raw data from the EventSource stream here. Please see the README to begin getting specific data and sending requests!",
        });
    })



    /*
    app.get('/test/students/', (req, res, next) => {
        let finalData = [];
        finalData = dataHandler.getStudents(testData);                     // call helper function that returns a list of students from server data
        
        if(finalData.length) {                                          //if the server has received data
            res.status(200).json({                                      //show the final data requested in a response
                overview: "I've fetched all the student IDs as you requested!",
                students: finalData
            });
        } else {                                                        //if there's no data, show a message indicating that
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/test/students/:id', (req, res, next) => {
        let finalData = [];
        
        finalData = dataHandler.getStudent(testData, req.params.id);       // call function that finds specific student with server data
        
        if(finalData[0].length) {
            if(finalData[2]) {
                res.status(200).json({                                   //respond with scores data and average student score
                    overview: "Here are all the scores and the average of the student you gave me!",
                    scores: finalData[0],
                    average_score: finalData[1]
                });
            } else {                                                     //if student doesn't exist, send back an error
                const error = new Error('Student was not found! Check your requested student ID!!');
                error.status = 400;
                next(error);
            }
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }

    });


    app.get('/test/exams', (req, res, next) => {
        let finalData = dataHandler.getExams(testData);                     // call function that returns a list of exams
        if(finalData.length) {
            res.status(200).json({
                overview: "All the exams! As you requested!",
                exams: finalData
            });
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/test/exams/:number', (req, res, next) => {
        let finalData = dataHandler.getExam(testData, req.params.number);                      // call function that finds a specific exam
        if(finalData[0].length) {
            if(finalData[2]) {
                res.status(200).json({                          //if so, send array of exam scores and average score
                    overview: "I got all the exam scores for the exam you requested and I calculated the average score across all students!",
                    exam_scores: finalData[0],
                    average_score: finalData[1]
                });
            } else {
                const error = new Error("The exam you requested was not found! Please check your requested exam ID");
                error.status = 400;
                next(error);
            }  
        } else {
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/test', (req, res, next) => {
        let finalData = JSON.stringify(testdata);
        res.status(200).json({
            overview: "Welcome to this REST API! I've posted the raw data from the EventSource stream here. Please see the README to begin getting specific data and sending requests!",
            data: finalData
        });
    });

    */



    //                   Error Handling                //         

    //This handles if the user sends a request to an unrecognized URL
    app.use((req, res, next) => {                               
        if(typeof(error) !== 'undefined') {                             // if an error already exists
            next(error);                                                // move to the next app.use() function
        } else {                                                        // else, create an error that indicates the requested URL doesn't exist and move to the next app.use() function
            let error = new Error("Whoops! It looks like you sent a request to a URL the server doesn't support!! Check your request and make it sure follows the format of serverURL/students or serverURL/students/id or serverURL/exams or serverURL/exams/examID. For further information please see the README.md file!");
            error.status = 404;
            next(error);
        }
    });


    //This handles all errors, sending its status code and displaying its message
    app.use((error, req, res, next) => {
        res.status(error.status || 500).json({
            error: {
                message: error.message
            }
        });
    });

}

module.exports = start;


