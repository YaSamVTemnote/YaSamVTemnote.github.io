/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hours": () => (/* binding */ hours),
/* harmony export */   "chooseAttender": () => (/* binding */ chooseAttender)
/* harmony export */ });


let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
let hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
let chooseAttender = ['Vlad', 'Ira', 'Sergey'];

let schedule = {};

function initData() {
    for (let i = 0; i < hours.length; i++) {
        let daySchedule = {};
        for (let j = 0; j < days.length; j++) {
            daySchedule[days[j]] = {
                day: days[j],
                time: hours[i],
                isBooked: false,
                meetingName: "",
                attenders: []
            };
        }
        schedule[hours[i]] = daySchedule;
    }
    localStorage.setItem('schedule', JSON.stringify(schedule));
}


function createTableHeader(tbl) {
    let headerRow = document.createElement("tr");
    addTableCell("Name", "table-head", headerRow);
    days.forEach(day => {
        addTableCell(day, "table-head", headerRow);
    });
    tbl.appendChild(headerRow);
}

function addTableCell(cellContent, classList, row) {
    let cell = document.createElement("td");
    cell.classList = classList;
    cell.innerHTML = cellContent;
    row.appendChild(cell);
}
// Filter meetings by attender name.
const userFilter = document.getElementById('selectAttender');
let value = userFilter.addEventListener('change', (event) => {
    event.preventDefault();
     let value = userFilter.value;
     renderTable(value);
});

function refreshTableBody(tbl, filter) {
    Object.keys(schedule).forEach(hour => {
        let currentRow = document.createElement("tr");
        addTableCell(hour, "table-body-cell", currentRow);
        Object.keys(schedule[hour]).forEach(dayOfWeek => {
            let curBookInfo = schedule[hour][dayOfWeek];
            if (curBookInfo.isBooked && (!filter || curBookInfo.attenders.indexOf(filter) !== -1)) {
                const cellContent = `<div class="flexible">
                                        <div class ="meeting-name">${curBookInfo.meetingName}</div>
                                        <div id='${curBookInfo.day + '-' + curBookInfo.time}' class="close"></div>    
                                   </div>`;
                addTableCell(cellContent, "booked" , currentRow);                
                } else {
                addTableCell(curBookInfo.meetingName, "available", currentRow);
            }
            tbl.appendChild(currentRow);
        });
    });
    addDeleteListeners();
}
function popUpOpen() {
    let classRemove = document.getElementById('confirm');
    classRemove.classList.remove('hidden');
}

function popUpClose() {
    let classAdd = document.getElementById('confirm');
    classAdd.classList = 'popup hidden';
}


let declainBtn = document.getElementById('declainBtn');
let acceptBtn = document.getElementById('acceptBtn');
let confirmContent = document.getElementById('confirmContent');
let cellToRemoveId;

acceptBtn.addEventListener('click', () => {
    popUpClose();
    let idData = cellToRemoveId.split('-'),
    dayOfWeek = idData[0],
    hour = idData[1];
    schedule[hour][dayOfWeek].isBooked = false;
    schedule[hour][dayOfWeek].meetingName = ''; 
    schedule[hour][dayOfWeek].attenders = [];
    localStorage.setItem('schedule', JSON.stringify(schedule));
    renderTable();
    confirmContent.innerHTML = '';
    cellToRemoveId = undefined;
});

declainBtn.addEventListener('click', () => {
    popUpClose();
    confirmContent.innerHTML = '';
    cellToRemoveId = undefined;
});

function addDeleteListeners() {
    const trashBtn = document.querySelectorAll('.close');
    trashBtn.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            popUpOpen();
            let parentEl = event.target.parentElement;
            let text = `Are you sure you want to delete '${parentEl.firstElementChild.textContent}'  event;`;
            confirmContent.textContent = text;
            cellToRemoveId = event.target.id;
        });

    });
}


function renderTable(filter) {
        let tbl = document.getElementById("schedule-table");
        tbl.innerHTML = "";
        createTableHeader(tbl);
        refreshTableBody(tbl, filter);
    }

let scheduleStr = localStorage.getItem('schedule');
if (!JSON.parse(scheduleStr)) {
    initData();
} else {
    schedule = JSON.parse(scheduleStr);
}
renderTable();



const selectListCreate = __webpack_require__(1);

const createParticipants = document.getElementById('selectAttender');

selectListCreate(chooseAttender, createParticipants);
document.getElementById('newEventButton').addEventListener('click', () => {
    window.location.href = 'eventData.html';
});

/***/ }),
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
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;