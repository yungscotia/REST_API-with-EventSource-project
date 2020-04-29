/*Imports*/
const dataHandler = require("./functions_for_req_handling");

/*Handle is just a function that holds all the possible requests that can be called on app*/
function handle(app, studentMap, examMap) {
    app.get('/students/', (req, res, next) => {
        let finalData = dataHandler.getListOf(studentMap);                                  // call helper function that returns a list of students from server data
        
        if(finalData.length) {                                                              // if the server has received data
            res.status(200).json({                                                          // show the final data requested in a response
                overview: "I've fetched all the student IDs as you requested!",
                students: finalData
            });
        } else {                                                                            // if there's no data, show a message indicating that
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/students/:id', (req, res, next) => {
        if(studentMap.size < 1) {                                                            // if empty Map, send a response indicating the server has not received data from EventSource yet
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        } else {
            let finalData = dataHandler.getStudent(studentMap, req.params.id);               // call helper function that finds specific student with server data
            if(finalData == undefined) {                                                     // send back error if student inputted does not exist
                const error = new Error('Student was not found! Check your requested student ID!!');
                error.status = 400;
                next(error);
            } else {
                res.status(200).json({                                                       // respond with scores data and average student score
                    overview: "Here are all the scores and the average of the student you gave me!",
                    scores: finalData[0],
                    average_score: finalData[1]
                });
            }
        }
    });


    app.get('/exams', (req, res, next) => {
        let finalData = dataHandler.getListOf(examMap);                                      // call helper function that returns a list of exams
        if(finalData.length) {                                                               
            res.status(200).json({
                overview: "All the exams! As you requested!",
                exams: finalData
            });
        } else {                                                                             // if finalData is empty, indicate that server has not received data yet
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        }
    });

    app.get('/exams/:number', (req, res, next) => {
        if(examMap.size < 1) {                                                               // if Map is empty, send a response indicating that server hasn't received any data yet
            res.status(200).json({
                overview: "Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please."
            });
        } else {
            let finalData = dataHandler.getExam(examMap, req.params.number);                 // call helper function that finds a specific exam
            if(finalData == undefined) {                                                     // send back error if student inputted does not exist
                const error = new Error("The exam you requested was not found! Please check your requested exam ID");
                error.status = 400;
                next(error);
            } else {
                res.status(200).json({                                                       // respond with scores data and average student score
                    overview: "I got all the exam scores for the exam you requested and I calculated the average score across all students!",
                    exam_scores: finalData[0],
                    average_score: finalData[1]
                });
            }
        }
    });

    app.get('/', (req, res, next) => {                                                       // response if user sends a request to localhost:3000 or the server URL
        res.status(200).json({
            overview: "Welcome to this REST API! Please see the README to begin getting specific data and sending requests!"
        });
    })

    /*Error Handling*/     
    app.use((req, res, next) => {                                                            // This handles if the user sends a request to an unrecognized URL
        if(typeof(error) !== 'undefined') {                                                  // if an error already exists
            next(error);                                                                     // move to the next app.use() function
        } else {                                                                             // else, create an error that indicates the requested URL doesn't exist and move to the next app.use() function
            let error = new Error("Whoops! It looks like you sent a request to a URL the server doesn't support!! Check your request and make it sure follows the format of serverURL/students or serverURL/students/id or serverURL/exams or serverURL/exams/examID. For further information please see the README.md file!");
            error.status = 404;
            next(error);
        }
    });

    app.use((error, req, res, next) => {                                                     // This handles all errors, sending its status code and displaying its message
        res.status(error.status || 500).json({
            error: {
                message: error.message
            }
        });
    });
}

module.exports = {handle};