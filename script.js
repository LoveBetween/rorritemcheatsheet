// style
const itemName = document.getElementById('item-name');
const description = document.getElementById('item-description');
itemName.style.color = "white";
itemName.style.textDecoration = "underline";
description.style.color = "white";

// dicts
const itemDescriptionDict = {
    "Arcane_Blades": "Increases movement speed by 30% (+30% per stack) after the Teleporter has been activated.",
    "Backup_Magazine": "Add +1 (+1 per stack) charge of your Secondary skill.",
    "Barbed_Wire": "Hurt 1 enemy within 1m (+0.2m per stack) for 50% (+10% per stack) damage every 0.5 seconds."
}

// helper functions
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

// actual functions
function showDescription(filename) {
    itemName.textContent = replaceAll(filename, '_', ' ');
    description.textContent = itemDescriptionDict.hasOwnProperty(filename) ? itemDescriptionDict[filename] : "Item Description missing :(";
}

function hideDescription(filename) {
    description.textContent = "";
    itemName.textContent = "";
}