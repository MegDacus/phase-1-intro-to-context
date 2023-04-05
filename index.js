// Your code here

function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}


function createEmployeeRecords (arrayOfArrays) {
    return arrayOfArrays.map((record) => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent (obj, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    
    return obj;
}


function createTimeOutEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    
    return obj;
}

function hoursWorkedOnDate(obj, dateStamp) {
    let timeIn
    let timeOut

    obj.timeInEvents.forEach((time) => {
        if (time.date === dateStamp) {
            timeIn = time.hour/ 100;
        }
    })
  
    obj.timeOutEvents.forEach((time) => {
        if (time.date === dateStamp) {
            timeOut = time.hour/ 100;
        }
    })

    return timeOut - timeIn;
} 

function wagesEarnedOnDate (obj, dateStamp) {
    let payRate = obj.payPerHour
    let hours = hoursWorkedOnDate(obj, dateStamp)

    return payRate * hours;
}


function allWagesFor(obj) {
    let wages = 0;

        obj.timeInEvents.forEach((time) => wages += wagesEarnedOnDate(obj, time.date));
    
    return wages;
}

function calculatePayroll(array) {
   return array.reduce((total, current) => total + allWagesFor(current), 0)
}