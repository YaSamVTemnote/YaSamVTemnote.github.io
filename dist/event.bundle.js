/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {




function listCreator (arr, element) {
    for ( let i = 0; i <arr.length; i++) {
        let selectElement = arr[i];
        let createElement = document.createElement('option');
        createElement.textContent = selectElement;
        createElement.value = selectElement;
        createElement.id = selectElement;
        element.appendChild(createElement);
    }
}
module.exports = listCreator;



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hours": () => (/* binding */ hours),
/* harmony export */   "chooseAttender": () => (/* binding */ chooseAttender)
/* harmony export */ });


let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
let hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
let chooseAttender = ['Vlad', 'Ira', 'Sergey'];


const createHourList = document.getElementById('timeSelect'),
      createDayList = document.getElementById('daySelect'),
      createParticipantList = document.getElementById('participantSelect'),
      selectListCreate = __webpack_require__(1);

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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(2);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;