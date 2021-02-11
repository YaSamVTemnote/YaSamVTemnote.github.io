'use strict';

let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export let hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
export let chooseAttender = ['Vlad', 'Ira', 'Sergey'];


const createHourList = document.getElementById('timeSelect'),
      createDayList = document.getElementById('daySelect'),
      createParticipantList = document.getElementById('participantSelect'),
      selectListCreate = require('./module/listCreator.js');

selectListCreate(hours, createHourList);
selectListCreate(days, createDayList);
selectListCreate(chooseAttender, createParticipantList);

document.getElementById('cancelButton').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'index.html';
});
const selectedTime = document.getElementById('timeSelect'),
      selectedDay = document.getElementById('daySelect'),
      selectedName = document.getElementById('eventName'),
      attendersList = document.getElementById('participantSelect'),
      createBtn = document.getElementById('createButton');

function addListeners (element) {
    element.addEventListener('change', (event) => {
        event.preventDefault();
        checkValues();
    });
}
addListeners(selectedTime);
addListeners(selectedDay);
addListeners(selectedName);
addListeners(attendersList);

function checkValues () {
    if (selectedTime.selectedIndex !== 0 && selectedDay.selectedIndex !== 0 && selectedName.value !== '' &&attendersList.selectedIndex !== 0) {
        createBtn.removeAttribute('disabled');
    }
}

createBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedTime = document.getElementById('timeSelect').value,
          selectedDay = document.getElementById('daySelect').value,
          selectedName = document.getElementById('eventName').value,
          selectedAttenders = [],
    attendersList = document.getElementById('participantSelect').options;
    for(let i = 0; i < attendersList.length; i++) {
        if(attendersList[i].selected) {
            let value = attendersList[i].value;
            selectedAttenders.push(value);
        }
      }
        let scheduleStr = localStorage.getItem('schedule'),
            schedule = JSON.parse(scheduleStr);
            try {
                schedule = bookTheRoom(selectedTime, selectedDay, selectedName, selectedAttenders, schedule); 
            } catch(error) {
                document.getElementById("error").classList.toggle('hidden');
                document.getElementById("error").classList.toggle('error');
                return;
            }
            localStorage.setItem('schedule', JSON.stringify(schedule));

    document.getElementById('eventName').value = '';
    document.getElementById('timeSelect').selectedIndex = 0;
    document.getElementById('daySelect').selectedIndex = 0;
    document.getElementById('participantSelect').selectedIndex = 0;
    window.location.href = 'index.html';
});



function bookTheRoom(time, dayOfWeek, meetingName, attenders, schedule) {
    if (time && dayOfWeek && meetingName && attenders && Array.isArray(attenders) && attenders.length > 0 
        && !hasEmptyElements(attenders) && schedule.hasOwnProperty(time) 
        && schedule[time].hasOwnProperty(dayOfWeek)) {
        if(!schedule[time][dayOfWeek].isBooked) {
            schedule[time][dayOfWeek].meetingName = meetingName;
            schedule[time][dayOfWeek].attenders = attenders;
            schedule[time][dayOfWeek].isBooked = true;
        } else {
            throw new Error("Failed! The room has been already booked for another meetimg.");
    }
        }  
    return schedule;
}

function hasEmptyElements (arr) {
    let hasEmptyElmnts = false;
    arr.forEach(item => {
        hasEmptyElmnts = hasEmptyElmnts || !item;
    });
    return hasEmptyElmnts;
}