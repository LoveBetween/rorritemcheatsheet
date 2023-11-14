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
    constructor(description="", pickup="", category="?", unlock="Unlocked by default.") {
        this.description = description;
        this.pickup = pickup;
        this.category = category;
        this.unlock = unlock;
    }
}

// dicts
const itemDict = {
    "Arcane_Blades": new itemProperties("Increases movement speed by 30% (+30% per stack) after the Teleporter has been activated.", "Move faster after activating the Teleporter.", "Utility", "Complete the Providence Trial \"Kited Blades\"."),
    "Backup_Magazine": new itemProperties("Add +1 (+1 per stack) charge of your Secondary skill.", "Add an extra charge of your Secondary skill.", "Utility"),
    "Barbed_Wire": new itemProperties("Hurt 1 enemy within 1m (+0.2m per stack) for 50% (+10% per stack) damage every 0.5 seconds.", "Hurts nearby enemies.", "Damage"),
    "Meat_Nugget": new itemProperties("8% chance on hit to drop 2 meat nuggets that heal for 2x8 (+6 per stack) health.", "Enemies drop chunks of healing meat.", "Health"),
    "Fire_Shield": new itemProperties("After taking more than 10% of your health as damage, explode for 400% (+200% per stack) damage, knocking enemies away (+20% force per stack).", "Retaliate on taking heavy damage.", "Damage"),
    "Bustling_Fungus": new itemProperties("After standing still for 2 seconds, heal for 4.5% (+4.5% per stack) of your health every second to yourself and nearby allies.", "Heal quickly when standing still for 2 seconds.", "Health"),
    "Lens_Maker's_Glasses": new itemProperties("Your attacks have a 10% (+7% per stack) chance to 'Critically Strike', dealing double damage.", "Chance to deal double damage.", "Damage"),
    "Sprouting_Egg": new itemProperties("After not being hit for 7 seconds, increase health regeneration by 2.4 (+2.4 per stack) hp per second.", "Rapidly heal outside of danger.", "Health"),
    "Headstompers": new itemProperties("Hurt enemies by falling for up to 600% (+300% per stack) damage.", "Hurt enemies by falling.", "Damage"),
    "Life_Savings": new itemProperties("Generate $1 (+$1 per stack) every 3 seconds. Scales with time.", "Gain gold over time.", "Utility"),
    "Rusty_Knife": new itemProperties("15% (+15% per stack) chance to bleed an enemy for 4x35% TOTAL damage.", "Chance to bleed on hit.", "Damage"),
    "Mysterious_Vial": new itemProperties("Increase health regeneration by 0.84 (+0.84 per stack) hp per second.", "Increased health regeneration.", "Health"),
    
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