// style
const itemName = document.getElementById('item-name');
const description = document.getElementById('item-description');
const pickup = document.getElementById('item-pickup');
const category = document.getElementById('item-category');
const unlock = document.getElementById('item-unlock');
itemName.style.color = "white";
itemName.style.textDecoration = "underline";
description.style.color = "white";
pickup.style.color = "#9bcd35";
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
    // Placeholder
    "Name": new itemProperties("Description", "PickupText", "Category", "UnlockCondition"), 
    // Common
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
    // Uncommon
    "Time_Keeper's_Secret": new itemProperties("Falling below 25% health stops time for 3 (+1 per stack) seconds. Recharges after 7 minutes.", "Falling to low health stops time.", "Utility"),
    "Smart_Shopper": new itemProperties("Killed enemies drop 25% (+25% per stack) more gold.", "Enemies drop extra gold.", "Utility"),
    "Infusion": new itemProperties("Killing an enemy increases your health permanently by 1 (+0.5 per stack).", "Killing an enemy permanently increases your health.", "Health"),
    "Will-o'-the-wisp": new itemProperties("33% chance on killing an enemy to create a lava pillar for 300% (+200% per stack) damage, knocking enemies upwards.", "Chance to detonate enemies on kill.", "Damage"),
    "AtG_Missile_Mk._1": new itemProperties("10% (+10% per stack) chance on hit to fire a missile that deals 300% TOTAL damage.", "Chance to fire a missile.", "Damage"),
    "Tough_Times": new itemProperties("Increase armor by 14 (+14 per stack).", "Reduce incoming damage by 14%.", "Utility"),
    "Energy_Cell": new itemProperties("Increases attack speed by up to 40% (+30% per stack) at low health.", "Attack faster at lower health.", "Utility"),
    "Rusty_Jetpack": new itemProperties("Decrease gravity while holding the jump button by 10% (-10% per stack) and increase jump height (increases per stack).", "Increase jump height and reduce gravity.", "Utility"),
    "Leeching_Seed": new itemProperties("Attacking enemies heals you for 2 (+1 per stack) health.", "Attacking enemies heals you.", "Health"),
    "Ukulele": new itemProperties("20% chance on hit to fire chain lightning for 66% (+66% per stack) TOTAL damage on up to 3 targets.", "..and his music was electric.", "Damage"),
    "Boxing_Gloves": new itemProperties("6% (+6% per stack) chance on hitting enemies to knock them back for 100% TOTAL damage.", "Chance to knock enemies backwards for extra damage.", "Utility"),
    "Prison_Shackles": new itemProperties("Slow enemies on hit for -50% movement speed for 1.5 (+0.5 per stack) seconds.", "Slow enemies on attack.", "Utility"),
    "Guardian's_Heart": new itemProperties("Gain a 60 (+60 per stack) health shield. Recharges when outside of danger for 7 seconds.", "Gain a shield. Recharges outside of danger.", "Health"),
    "Hopoo_Feather": new itemProperties("Gain +1 (+1 per stack) maximum jump count.", "Gain an extra jump.", "Utility"),
    "Frost_Relic": new itemProperties("Killing an enemy temporarily surrounds you with 3 (+1 per stack) icicles that deal 33% damage each every 0.33 seconds.", "Killing enemies surrounds you with icicles.", "Damage"),
    "Red_Whip": new itemProperties("Leaving combat for 2 seconds boosts your movement speed by 60% (+60% per stack).", "Move fast out of combat.", "Utility"),
    "Chargefield_Generator": new itemProperties("Killing an enemy creates a ring of lightning that deals 50% (+20% per stack) damage every 0.5 seconds to 50% of enemies within. The ring starts with a radius of 4.7m and grows by 1.3m each kill up to 40m. Lasts for 6 seconds without killing enemies.", "Create a ring of lightning after killing an enemy. Lasts 6 seconds.", "Damage", "Mercenary: Eviscerate 50 enemies."),
    "Arms_Race": new itemProperties("Drones gain a 5% (+5% per stack) chance on hit to fire a missile for 300% TOTAL damage, and a 9% chance on hit to fire a mortar for 85% (+85% per stack) TOTAL damage. Summons a unique drone which regenerates each stage.", "Drones are equipped with explosive weaponry. Summons a drone helper.", "Damage", "HAN–D: Kill 10 enemies simultaneously with FORCED_REASSEMBLY."),
    "Golden_Gun": new itemProperties("Deal bonus damage based on current gold, up to 40% damage. Caps at 700 (-50% per stack) gold. Scales with time.", "More gold, more damage.", "Damage", "Bank 20,000 gold."),
    "56_Leaf_Clover": new itemProperties("Elite mobs have a 4% (+1.5% per stack) chance to drop items.", "Elite mobs have a chance to drop items.", "Utility", "Kill the Scavenger."),
    "Concussion_Grenade": new itemProperties("6% (+6% per stack) chance on hitting enemies to stun them for 2 seconds.", "Chance to stun enemies.", "Utility", "Engineer: Kill a boss in 15 seconds or less."),
    "Filial_Imprinting": new itemProperties("Hatch 1 (+1 per stack) strange creature who drops buffs every 20 seconds. Buffs temporarily boost either movement speed, attack speed, or health regen.", "Hatch a strange creature who drops buffs periodically.", "Utility", "Drown 20 Whorls."),
    "Dead_Man's_Foot": new itemProperties("Chance when damaged to drop a poison mine that deals 150% damage and poisons for x600% (+450% per stack) damage over time. Chance to drop starts at 15% and increases with low health.", "Drop a poison trap at low health.", "Damage", "Find the bloated survivor."),
    "Toxic_Centipede": new itemProperties("Infect a nearby enemy on contact for 6 (+2 per stack) seconds, dealing 50% damage every 0.5 seconds. Bounces to other enemies if the target dies. Recharges every 6 (-33% per stack) seconds.	", "Infected!", "Damage", "Acrid: Spread 3,300 feet of caustic sludge."),
    "Harvester's_Scythe": new itemProperties("	Gain 5% critical chance. Critical strikes heal for 8 (+2 per stack) health.", "Critical hits heal you.", "Health", "Use a health shrine that drops you below 5% health."),
    "Panic_Mines": new itemProperties("Chance when damaged to drop 1 (+1 per stack) mine that deals 400% damage. Chance to drop starts at 15% and increases with low health.", "Drop a mine at low health.", "Damage", "Miner: Survive the teleporter event without falling below 50% health."),
    "Predatory_Instincts": new itemProperties("Gain 5% critical chance. Critical strikes increase attack speed by 10% (+7% per stack). Maximum cap of 30% (+21% per stack) attack speed.", "Critical strikes increase attack speed. Buff stacks 5 times.", "Damage", "Huntress: Defeat the Ancient Wisp without taking damage."),
    "Royal_Medallion": new itemProperties("10% chance on hitting a boss monster to drop a buffing wisp that improves health regen, attack speed, move speed, and base damage for 10 (+6 per stack) seconds.", "Bosses drop powerful buffing wisps when hit.", "Utility", "Get a gold rank on at least 5 Providence Trials."),
    "Prophet's_Cape": new itemProperties("Briefly blocks all incoming damage upon being struck (Recharging after 15 seconds). Blocking damage heals you for 3 (+1 per stack) health.", "All blocked damage heals you.", "Health", "Commando: Dodge 7 lethal attacks"),
    "Locked_Jewel": new itemProperties("Activating an interactable heals 35% (+15% per stack) of your maximum barrier and grants $8 (scales with time).", "Activating an interactable grants barrier and gold.", "Health", "Reach max barrier."),
    "Hunter's_Harpoon": new itemProperties("Killing an enemy increases movement speed by 125% for 1 (+1 per stack) second. Consecutive kills increase buff duration for up to 25 seconds.", "Killing an enemy grants a temporary burst of speed.", "Utility", "Complete the Providence Trial \"A Toxic Path\"."),
    "Insecticide": new itemProperties("10% (+5% per stack) chance on hit to spray an enemy dealing 10% damage per second. Spray stacks up to 10 times. Killing enemies heals for 10 (+5 per stack) health per stack of spray.", "Chance to apply damage over time. Heal if the enemy dies.", "Damage", "Complete the Providence Trial \"Get Off My Lawn!\"."),
    "Decaying_Sample": new itemProperties("Gain two orbiting spheres that strike for 100% (+ 50% stack) damage every 0.25 seconds.", "Gain an orbiting follower that damages enemies.", "Damage", "Complete the Providence Trial \"Main Systems Offline\"."),
    // Rare
    "Thallium": new itemProperties("10% (+10% per stack) chance on hit to damage by up to 2x500% enemy damage per second and slow for up to -150% movement speed over the course of 3 seconds.", "Chance to slow and damage enemies over time.", "Damage"), 
    "Tesla_Coil": new itemProperties("Passively shock nearby enemies for 120% (+60% per stack) damage.", "Passively shock nearby enemies.", "Damage"), 
    "Old_Box": new itemProperties("Chance when damaged to drop a jack-in-the-box, fearing enemies for 2 (+1 per stack) seconds. Chance to drop starts at 10% and increases with low health.", "Chance when damaged to drop a jack-in-the-box, fearing enemies.", "Utility"), 
    "Beating_Embryo": new itemProperties("Equipment has a 30% (+30% per stack) chance to deal double the effect.", "Equipment has a chance to deal double the effect.", "Utility"), 
    "Permafrost": new itemProperties("13% chance on hit to freeze enemies for 1.5 seconds while slowing by -80% movement speed for 3 (+1.5 per stack) seconds.", "Chance on hit to freeze enemies while also slowing.", "Utility"), 
    "AtG_Missile_Mk._2": new itemProperties("7% (+7% per stack) chance on hit to fire three missiles that deal 3x300% TOTAL damage.", "Hooah.", "Damage"), 
    "Happiest_Mask": new itemProperties("Killed enemies spawn ghosts that last 15 seconds with 100% (+20% per stack) health and 70% (+30% per stack) damage.", "Killed enemies spawn friendly ghosts.", "Damage"), 
    "Plasma_Chain": new itemProperties("Chance on hit to tether onto up to 1 (+1 per stack) enemy dealing 60% damage per 0.5 seconds to any enemies in the path.", "Chance on hit to tether onto up to 1 enemy, dealing damage to any enemies in the path.", "Damage"), 
    "Heaven_Cracker": new itemProperties("Every 4 (-1 per stack) basic attacks pierce through enemies.", "Every 4 basic attacks pierce through enemies.", "Damage"), 
    "Rapid_Mitosis": new itemProperties("Reduce the cooldown of equipment by 25% (+25% per stack).", "Reduce the cooldown of equipment.", "Utility"), 
    "Ceremonial_Dagger": new itemProperties("Killing an enemy fires out 4 (+2 per stack) heat seaking bolts that deal 100% damage.", "Killing an enemy fires spirit bolts.", "Damage"), 
    "Repulsion_Armor": new itemProperties("After 6 hits reflect incoming attacks for 400% damage and increase armor by 100 for 4 (+1 per stack) seconds.", "After taking damage, reflect all attacks for 4 seconds.", "Health"), 
    "Brilliant_Behemoth": new itemProperties("All your attacks explode for a bonus 20% (+20% per stack) TOTAL damage to nearby enemies.", "All your attacks explode!", "Damage"), 
    "Hardlight_Afterburner": new itemProperties("Add +2 (+2 per stack) charges of your Utility skill. Reduces Utility skill cooldown by 33%.", "Add 2 extra charges of your Utility skill. Reduce Utility skill cooldown.", "Utility"), 
    "Interstellar_Desk_Plant": new itemProperties("	Upon killing an enemy, spawn an alien plant that heals you for 3% of your maximum health and recharges after 4 seconds. Plant lasts 15 (+5 per stack) seconds.", "Sprout a tree on kill, granting healing fruits.", "Healing", "CHEF: SEAR/FLAMBE 20 Sand Crabs."), 
    "Laser_Turbine": new itemProperties("Using skills charges the generator by 7.8% (+7.8% per stack) per second. At full power, fire a laser for 2000% damage.", "Using skills charges up to a huge laser blast.", "Damage", "CHEF: Have 20 cleavers out at once."), 
    "Wicked_Ring": new itemProperties("Gain 5% (+10% per stack) critical chance. Critical strikes reduce cooldowns by 1 second.", "Critial strikes reduce all your cooldowns by 1.", "Utility", "Collect 4 keycards."), 
    "Alien_Head": new itemProperties("Decrease your skill cooldowns by 30% (+30% per stack).", "Reduces cooldowns for your skills.", "Utility", "	Obtain 7 Monster Teeth and 1 Guardian's Heart."), 
    "The_Ol'_Lopper": new itemProperties("Deal bonus damage to enemies with lower health, up to +60% (+60% per stack) damage.", "Enemies take more damage at lower health.", "Damage", "Survive 40 minutes."), 
    "The_Hit_List": new itemProperties("Randomly marks up to 1 (+1 per stack) enemy. Killing a marked enemy permanently increases damage by 0.5, up to 20 damage.", "Killing marked enemies permanently increases damage.", "Damage", "Bandit: Reset your cooldown 15 times consecutively."), 
    "Photon_Jetpack": new itemProperties("Hold the jump button to fly for up to 1.6 (+0.8 per stack) seconds. Recharges over 1.6 seconds.", "No hands.", "Utility", "End a teleporter timer with 0 enemies on the map."), 
    "Shattering_Justice": new itemProperties("Attacks reduce enemy armor by 6 for 2 (+2 per stack) seconds. Reduction stacks up to -30 armor.", "Reduce enemy armor on hit. Reduction stacks 5 times.", "Damage", "Miner: Reach level 10 without getting hurt more than once."), 
    "Telescopic_Sight": new itemProperties("1% (+0.5% per stack) chance on hit to instantly kill enemies. Does not work against bosses.", "Chance to instantly kill an enemy.", "Damage", "Sniper: 1-shot kill 10 enemies consecutively"), 
    "Fireman's_Boots": new itemProperties("Walking leaves behind a fire trail that burns for 35% (+20% per stack) damage.", "Fight fire with fire..", "Damage", "Survive in lava for 1 minute straight."), 
    "Hyper-Threader": new itemProperties("Hitting enemies fires a laser that deals 40% damage and bounces to 2 (+1 per stack) enemies.", "Pew pew.", "Damage", "Complete the Providence Trial \"A Rung Above\"."), 
    "Dio's_Best_Friend": new itemProperties("Taking fatal damage consumes this item and revives you with 40% health and 2 seconds of invulnerability.", "Cheat death once.", "Health", "Die 50 times."), 
    "Ancient_Scepter": new itemProperties("Upgrade your special skill. Unique to each character. Reduces special skill cooldown by 30% per stack.", "Upgrade your special skill.", "Utility", "Mercenary: Beat the game on Monsoon difficulty."), 
    "Bottled_Chaos": new itemProperties("Activating an Equipment triggers a random equipment effect 1 (+1 per stack) time(s).", "Using your Equipment triggers an additional, random Equipment effect.", "Utility", "Use the same Equipment Activator 5 times."), 
    "Aegis": new itemProperties("Healing past full grants you barrier equal to 50% (+50% per stack) of the amount you healed. Increases maximum barrier by 20% (+20% per stack).", "Healing past full grants you a temporary barrier.Increased maximum barrier.", "Health", "Artificer: Multi-kill 15 enemies."), 
    "Substandard_Duplicator": new itemProperties("Picking up an item gives you a temporary copy of itself. Temporary items last an additional 10 (+10 per stack) seconds", "Picked up items yield an additional temporary copy.", "Utility", "Complete the providence Trial \"A Duplicator?!\"."), 
    "Classified_Access_Codes": new itemProperties("The Atlas Cannon appears each stage, activating it deals 40% (+20% per stack) of maximum health as damage to the teleporter boss after it spawns.", "Access a deadly weapon against the Teleporter bosses.", "Damage", "Complete the Providence Trial \"Emergency Ejection\"."), 
    "Umbrella": new itemProperties("Rain begins for 15 seconds (increases per stack) upon activating the Teleporter. Rain stuns, damages, and weakens enemies. You are invincible while it is raining.", "They fear the rain.", "Utility", "Complete the Providence Trial \"Meteor Showers\"."), 
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