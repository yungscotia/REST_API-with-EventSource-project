/*Functions for Request Handling*/
function getListOf(map) {                                         // this function returns a list of a map's keys, ready for JSON output
    return JSON.stringify(Array.from(map.keys()));                // this function helps with getStudents and getExams
}

function getStudent(map, id) {                                    // this function gets the scores and average score for a specific student
    let examResults = map.get(id);
    if(examResults == undefined) {                                // if student doesn't exist
        return undefined;
    } else {
        let num_tests = examResults.size;                         
        let scores = Array.from(examResults.values());
        let finalData = JSON.stringify(scores);                   // final ouput for student scores

        let sum_scores = 0;                                 
        for(x = 0; x < scores.length; x++) {                      // iterate through scores and add each one to sum_scores
            sum_scores += parseFloat(scores[x]);
        }
        let avgScore = sum_scores / num_tests;                    // find average score for student

        return [finalData, avgScore];
    }
}

function getExam(map, id) {                                       // this function gets the scores and average student score for a specific exam
    id = parseInt(id);                                            
    let studentScores = map.get(id);                              
    
    if(studentScores == undefined) {                              // if exam doesn't exist
        return undefined;
    } else {
        let num_scores = studentScores.size;
        let scores = Array.from(studentScores.values());
        let finalData = JSON.stringify(scores);                   // final ouput for student scores of this exam

        let sum_scores = 0;
        for(x = 0; x < scores.length; x++) {                      // iterate through student scores and add each one to sum_scores
            sum_scores += scores[x];
        }
        let avgScore = sum_scores / num_scores;                   // find average score

        return [finalData, avgScore];
    }
}


module.exports = {
    getListOf,
    getStudent,
    getExam
}