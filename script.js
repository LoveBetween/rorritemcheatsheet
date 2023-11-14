// script.js
const itemName = document.getElementById('item-name');
const description = document.getElementById('item-description');
itemName.style.color = "white";
itemName.style.textDecoration = "underline"
description.style.color = "white";

function showDescription(filename) {
    itemName.textContent = "Item Name";
    description.textContent = "description blablabla";
}

function hideDescription(filename) {
    description.textContent = "";
    itemName.textContent = "";
}