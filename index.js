// // Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
}

function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, soughtDate) {
    let timeIn = employeeRecord.timeInEvents.find(e => e.date === soughtDate);
    let timeOut = employeeRecord.timeOutEvents.find(e => e.date === soughtDate);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, soughtDate) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, soughtDate);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(e => e.date);

    return datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0);
}

// Exporting functions for testing purposes
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};

