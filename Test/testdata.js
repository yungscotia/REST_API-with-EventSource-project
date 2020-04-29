let testData = [
    {studentId: "Ronnie", exam: 65, score: 10},
    {studentId: "Lonnie", exam: 65, score: 10},
    {studentId: "Tonnie", exam: 65, score: 9},
    {studentId: "Monnie", exam: 65, score: 10},
    {studentId: "Jonnie", exam: 65, score: 9},
    {studentId: "Connie", exam: 65, score: 9},
    {studentId: "Ronnie", exam: 66, score: 1},
    {studentId: "Lonnie", exam: 66, score: 1},
    {studentId: "Tonnie", exam: 66, score: 2},
    {studentId: "Monnie", exam: 66, score: 1},
    {studentId: "Jonnie", exam: 66, score: 2},
    {studentId: "Connie", exam: 66, score: 2}

];

let testStudentMap = new Map();
let testExamMap = new Map()

for(x=0; x<testData.length; x++) {
    if(testStudentMap.has(testData[x].studentId)) {
        let scoreMap = testStudentMap.get(testData[x].studentId);
        testStudentMap.set(testData[x].studentId, scoreMap.set(testData[x].exam, testData[x].score));
    } else {
        let scoreMap = new Map();
        testStudentMap.set(testData[x].studentId, scoreMap.set(testData[x].exam, testData[x].score));
    }
}
for(x=0; x<testData.length; x++) {
    if(testExamMap.has(testData[x].exam)) {
        let scoreExamMap = testExamMap.get(testData[x].exam);
        testExamMap.set(testData[x].exam, scoreExamMap.set(testData[x].studentId, testData[x].score));
    } else {
        let scoreExamMap = new Map();
        testExamMap.set(testData[x].exam, scoreExamMap.set(testData[x].studentId, testData[x].score));
    }
}

module.exports = {testStudentMap, testExamMap};