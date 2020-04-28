//              Functions for Request Handling             //

function getListOf(map) {
    if(map.size > 0) {
        let finalData = JSON.stringify(Array.from(map.keys()));
        return finalData;
    } else {
        return [];
    }
}

function getStudent(studentMap, studentId) {
    if(studentMap.size > 0) {
        if(studentMap.has(studentId)) {
            let num_tests = studentMap.get(studentId).size;
            let scores = Array.from(studentMap.get(studentId).values());
            let finalData = JSON.stringify(scores);
            let sum_scores = 0;
            for(x = 0; x < scores.length; x++) {
                sum_scores += parseFloat(scores[x]);
            }
            let avgScore = sum_scores / num_tests;
            return [finalData, avgScore, true];
        } else {
            return [[studentId], 0, false]
        }
        
    } else {
        return [[], 0, false];
    }
    
}

function getExam(map, id) {
    id = parseInt(id);
    if(map.size > 0) {
        if(map.has(id)) {
            let totalNum = map.get(id).size;
            let scores = Array.from(map.get(id).values());
            let finalData = JSON.stringify(scores);
            let sum_scores = 0;
            for(x=0; x < scores.length; x++) {
                sum_scores += parseFloat(scores[x]);
            }
            let avgScore = sum_scores / totalNum;
            return [finalData, avgScore, true];
        } else {
            return [[id], 0, false];
        }
    } else {
        return [[], 0, false]
    }
}






/*
//this function lists all students in the database (/students)
function getStudents(data) {                    
    if(data.length) {
        let studentLog = new Set();                         //want a set here to filter unique entries only
        for(x=0; x<data.length; x++) {                      //iterate through data, adding students to array
            studentLog.add(data[x].studentId);
        }              
        let finalData = JSON.stringify(Array.from(studentLog)); //get an Array from the Set studentIds and stringify for JSON output
        return finalData;
    } else {                                                //if no data received yet, return empty data array
        return data;
    }
}



//this function finds scores and the average score for a specific student (/students/{id})
function getStudent(data, req) {                      
    if(data.length) {                                       //First, check if any data has been received by EventSource listener
        let studentExists = false;
        let req_Student = req;                    //store the requested studentID
        let scoresLog = [];
        let sumScore = 0;
        for(x=0; x < data.length; x++) {                    //iterate through the data array
            if(data[x].studentId === req_Student) {         //check if the studentID of each event is equal to the requested ID
                scoresLog.push(data[x].score);              //if so, add it to scoresLog array
                sumScore += parseFloat(data[x].score);      //if so, add it to sum of student scores
                studentExists = true; 
            }
        }
        let avgScore = sumScore / scoresLog.length;
        let finalData = JSON.stringify(scoresLog);          //stringify scoresLog array for JSON output
        if(studentExists) {
            return [finalData, avgScore, true];
        } else {
            return [finalData, avgScore, false];
        }
    } else {                                                //if no data received yet, show message indicating that
        return [data, 0, false];
    }
} 



//this function lists all exams (/exams)
function getExams(data) {
    if(data.length) {                                       //First, check if any data has been received by EventSource listener
        let examsLog = new Set();                           //filter for unique entries only
        for(x=0; x < data.length; x++) {                    //iterate through data array
            examsLog.add(data[x].exam);                     //add exams to examsLog
        }                                                    
        let finalData = JSON.stringify(Array.from(examsLog));  //get an Array from the Set exams and stringify for JSON output
        return finalData;
    } else {                                                //if no data received yet, show message indicating that
       return data;
    }
}



//this function finds all scores and the average score for a specific exam (/exams/{number})
function getExam(data, req) {
    if(data.length) {                                       //First, check if any data has been received by EventSource listener
        let examID  = req;                    //get the exam ID requested
        let examsLog = [];
        let sumScore = 0;
        let examExists = false;
        for(x=0; x < data.length; x++) {                    //iterate through data array
            if(data[x].exam == examID) {                    //check if examID of event is same as exam ID requested
                examsLog.push(data[x].score);               //if so, add score to examsLog
                sumScore += parseFloat(data[x].score);      //if so, add score to sum of scores
                examExists = true;
            }
        }
        let avgScore = sumScore / examsLog.length;          //calculate average score
        let finalData = JSON.stringify(examsLog);           //stringify examsLog for JSON output
        if(examExists) {                                    //check if exam actually exists
            return [finalData, avgScore, true];
        } else {                                            //if exam does not exist, display an error
            return [finalData, avgScore, false];
        }
        
    } else {                                                //if no data received yet, show a message indicating that
        return [data, 0, false];
    }
}
*/
module.exports = {
    getListOf,
    getStudent,
    getExam
}