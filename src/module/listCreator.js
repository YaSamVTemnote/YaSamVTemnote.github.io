'use strict';


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

