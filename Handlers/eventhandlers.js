/*Functions that handle events from EventSource and put into proper Map*/
function studentMapDataHandler(eventData, studentMap) {
    if(studentMap.has(eventData.studentId)) {
        let scoreMap = studentMap.get(eventData.studentId);
        studentMap.set(eventData.studentId, scoreMap.set(eventData.exam, eventData.score));       // Each studentMap has another Map nested inside for each studentId to hold {exam: score}
    } else {
        let scoreMap = new Map();
        studentMap.set(eventData.studentId, scoreMap.set(eventData.exam, eventData.score));
    }
}

function examMapDataHandler(eventData, examMap) {
    if(examMap.has(eventData.exam)) {
        let scoreMap = examMap.get(eventData.exam);
        examMap.set(eventData.exam, scoreMap.set(eventData.studentId, eventData.score));          // Each examMap has another Map nested inside for each examId to hold {studentId: score}
    } else {
        let scoreMap = new Map();
        examMap.set(eventData.exam, scoreMap.set(eventData.studentId, eventData.score));
    }
}

function eventHandler(event) {                                                                    // This function handles the raw JSON data from EventSource
    let eventData = JSON.parse(event.data);
    studentMapDataHandler(eventData, studentMap);
    examMapDataHandler(eventData, studentMap);
}

module.exports = {studentMapDataHandler, examMapDataHandler, eventHandler}