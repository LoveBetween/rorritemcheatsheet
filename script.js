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
unlock.style.color = "red";

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
    "Name": new itemProperties("Description", "PickupText", "Category", "UnlockCondition"), 
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
    "Mortar_Tube": new itemProperties("9% chance on hit to fire a mortar for 170% (+170% per stack) TOTAL damage.", "Chance to launch a mortar.", "Damage"),
    "Warbanner": new itemProperties("On level up or activating the Teleporter, drop a banner that strengthens all allies within 4.6m (+1.4m per stack). Raise attack and movement speed by 30% and damage by 4. Also heals for 1% of your health every second.", "Drop a Warbanner on level up or activating the teleporter, giving you great strength.", "Utility"),
    "Monster_Tooth": new itemProperties("Killing an enemy heals you for 10 (+5 per stack) health.", "Heal after kills.", "Health"),
    "Soldier's_Syringe": new itemProperties("Increases attack speed by 12% (+12% per stack).", "Increases attack speed.", "Utility"),
    "Crowbar": new itemProperties("Deal +50% (+30% per stack) damage to enemies above 80% health.", "Deal bonus damage to healthy monsters.", "Damage"),
    "Medkit": new itemProperties("Heal for 10 (+10 per stack) health 1.5 seconds after getting hurt.", "Receive a delayed heal after taking damage.", "Health"),
    "Bundle_of_Fireworks": new itemProperties("Activating an interactable launches 6 (+3 per stack) fireworks that deal 300% base damage.", "Activating an interactable launches fireworks at nearby enemies.", "Damage"),
    "Topaz_Brooch": new itemProperties("Killing an enemy grants 15 barrier (+15 per stack).", "Kills grant temporary barrier.", "Health"),
    "Taser": new itemProperties("7% chance on hit to snare enemies for 1.5 (+0.5 per stack) seconds.", "Chance to snare on hit.", "Utility", "Loader: Travel 6,500 meters using the Hydraulic Gauntlet."),
    "Paul's_Goat_Hoof": new itemProperties("Increases movement speed by 15% (+15% per stack).", "Move faster.", "Utility", "Fail a shrine 3 times in a row."),
    "Bitter_Root": new itemProperties("Increases maximum health by 8% (+8% per stack).", "Increases maximum health by 8%.", "Health", "Reach 650 health."),
    "Sticky_Bomb": new itemProperties("9% chance on hit to attach a bomb to an enemy, detonating for 140% (+140% per stack) TOTAL damage.", "Chance to attach a bomb to enemies.", "Damage", "Engineer: Detonate 15 Bounding Mines within 5 seconds."),
    "Snake_Eyes": new itemProperties("Failing a shrine increases critical chance by 7% (+7% per stack), up to 6 times. Resets at the start of each stage.", "Gain increased critical strike chance on failing a shrine. Resets between stages.", "Damage", "Pass a shrine 4 times in a row."),
    "Hermit's_Scarf": new itemProperties("10% (+10% per stack) chance to evade incoming damage.", "Chance to evade incoming damage.", "Utility", "Huntress: Achieve 200% attack speed."),
    "Gasoline": new itemProperties("Killing enemies burns the ground for 60% (+40% per stack) damage.", "Killing enemies sets the ground on fire.", "Damage", "Defeat 20 Lemurians in one playthrough."), 
    "Spikestrip": new itemProperties("When hit, drop spikestrips that snare enemies for 1 (+0.5 per stack) second.", "Drop spikestrips on being hit, snaring enemies.", "Damage", "Enforcer: Block 2000 damage total with your shield."),
    "Mocha": new itemProperties("Increases movement speed by 7.5% (+7.5% per stack) and attack speed by 6% (+6% per stack).	", "Slightly increase attack speed and movement speed.", "Utility", "Level up to level 20."), 
    "Voltaic_Mitt": new itemProperties("Climbing creates an electric trail that deals 50% damage (+30% per stack).", "Climbed ropes are electrified.", "Damage", "Complete the Providence Trial \"Hot-Rope Hop\"."), 
    "The_Toxin": new itemProperties("Infect enemies on contact for 3 seconds, causing them to receive 30% (+15% per stack) extra damage from all sources.", "Touch enemies to weaken them.", "Damage", "Find the illegal shipment."), 
    "Mu_Construct": new itemProperties("Heal by 2.5% of your maximum health every 5 (-25% per stack) seconds after the Teleporter has been activated.", "Heal periodically after activating the teleporter.", "Health", "Find this item hidden somewhere in the world to unlock it."), 
    "Razor_Penny": new itemProperties("Gain 3% critical chance (+3% per stack). Critical strikes drop $1 (+1$ per stack) gold.", "Slightly increased Critical strike chance. Critical strikes give you gold.", "?", "Kill 12 enemies simultaneously using the Gold-Plated Bomb."), 
    "Arcane_Blades": new itemProperties("Increases movement speed by 30% (+30% per stack) after the Teleporter has been activated.", "Move faster after activating the Teleporter.", "Utility", "Complete the Providence Trial \"Kited Blades\"."), 
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