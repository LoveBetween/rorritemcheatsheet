// style
const itemName = document.getElementById('item-name');
const description = document.getElementById('item-description');
const pickup = document.getElementById('item-pickup');
const category = document.getElementById('item-category');
const unlock = document.getElementById('item-unlock');
itemName.style.color = "white";
itemName.style.textDecoration = "underline";
description.style.color = "white";
pickup.style.color = "lightgreen";
category.style.color = "yellow";
unlock.style.color = "darkred";

// helper function/class
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

class itemProperties {
    constructor(description="", pickup="", category="", unlock="") {
        this.description = description;
        this.pickup = pickup;
        this.category = category;
        this.unlock = unlock;
    }
}

// dicts
const itemDict = {
    "Arcane_Blades": new itemProperties("Increases movement speed by 30% (+30% per stack) after the Teleporter has been activated.", "Move faster after activating the Teleporter.", "Utility", "Complete the Providence Trial \"Kited Blades\"."),
    "Backup_Magazine": new itemProperties("Add +1 (+1 per stack) charge of your Secondary skill.", "Add an extra charge of your Secondary skill.", "Utility", "Unlocked by default."),
    "Barbed_Wire": new itemProperties("Hurt 1 enemy within 1m (+0.2m per stack) for 50% (+10% per stack) damage every 0.5 seconds.", "Hurts nearby enemies.", "Damage", "Unlocked by default.")
}

// actual functions
function showDescription(filename) {
    itemName.textContent = replaceAll(filename, '_', ' ');
    if (itemDict.hasOwnProperty(filename)) {
        itemProp = itemDict[filename];
        description.textContent = itemProp.description;
        pickup.textContent = "\"" + itemProp.pickup + "\"";
        category.textContent = itemProp.category;
        unlock.textContent = "Unlock: " + itemProp.unlock;
    } else {
        description.textContent = "Item Description missing :("
    }
}

function hideDescription(filename) {
    description.textContent = "";
    itemName.textContent = "";
    pickup.textContent = "";
    category.textContent = "";
    unlock.textContent = "";
}