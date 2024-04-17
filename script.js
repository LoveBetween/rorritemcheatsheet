// item style
const itemName = document.getElementById('item-name');
const description = document.getElementById('item-description');
const pickup = document.getElementById('item-pickup');
const category = document.getElementById('item-category');
const unlock = document.getElementById('item-unlock');
const item_id = document.getElementById('item-id'); 
itemName.style.color = "white";
itemName.style.textDecoration = "underline";
description.style.color = "#f2ecde";
pickup.style.color = "#9bcd35";
category.style.color = "yellow";
unlock.style.color = "red";
item_id.style.color = "cyan"

// skill style
const skillName =  document.getElementById('skill-name');
const skillCategory = document.getElementById('skill-category');
const skillDescription = document.getElementById('skill-description');
const skillID = document. getElementById('skill-id');
skillName.style.color = "white";
skillName.style.textDecoration = "underline";
skillDescription.style.color  = "#f2ecde";
skillCategory.style.color = "yellow";
skillID.style.color = "#9bcd35";

//regex for style replacement 
var numberRegex = /(\d*\.\d+\%*|\d+)/g
var operatorRegex  = /(\s[\-|\+|x|X]\s|\-|\+|\%)/g
var moneyRegex = /(\$)/g

document.getElementById("survivor-page").style.display='none';

// Items

// helper function/class
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

class itemProperties {
    constructor(type="",item_id="", description="", pickup="", category="", unlock="Unlocked by default.", drop="", aquisition="") {
        this.description = description;
        this.pickup = pickup;
        this.category = category;
        this.unlock = unlock;
        this.item_id = item_id;
        this.drop = drop;
        this.aquisition = aquisition;
        this.type = type;
    }
}

// dicts
const itemDict = {
    // Placeholder
    //"Name": new itemProperties("type","ID","Description", "PickupText", "Category", "UnlockCondition"), 
    // Common
    "Backup_Magazine": new itemProperties("common",  "87", "Add +1 (+1 per stack) charge of your Secondary skill.", "Add an extra charge of your Secondary skill.", "Utility"),
    "Barbed_Wire": new itemProperties("common", "7","Hurt 1 enemy within 1m (+0.2m per stack) for 50% (+10% per stack) damage every 0.5 seconds.", "Hurts nearby enemies.", "Damage", ),
    "Meat_Nugget": new itemProperties("common", "0", "8% chance on hit to drop 2 meat nuggets that heal for 2x8 (+6 per stack) health.", "Enemies drop chunks of healing meat.", "Health"),
    "Fire_Shield": new itemProperties("common", "1","After taking more than 10% of your health as damage, explode for 400% (+200% per stack) damage, knocking enemies away (+20% force per stack).", "Retaliate on taking heavy damage.", "Damage"),
    "Bustling_Fungus": new itemProperties("common", "2","After standing still for 2 seconds, heal for 4.5% (+4.5% per stack) of your health every second to yourself and nearby allies.", "Heal quickly when standing still for 2 seconds.", "Health"),
    "Lens_Maker's_Glasses": new itemProperties("common", "3", "Your attacks have a 10% (+7% per stack) chance to 'Critically Strike', dealing double damage.", "Chance to deal double damage.", "Damage"),
    "Sprouting_Egg": new itemProperties("common", "4", "After not being hit for 7 seconds, increase health regeneration by 2.4 (+2.4 per stack) hp per second.", "Rapidly heal outside of danger.", "Health"),
    "Headstompers": new itemProperties("common", "5", "Hurt enemies by falling for up to 600% (+300% per stack) damage.", "Hurt enemies by falling.", "Damage"),
    "Life_Savings": new itemProperties("common", "6", "Generate $1 (+$1 per stack) every 3 seconds. Scales with time.", "Gain gold over time.", "Utility"),
    "Rusty_Knife": new itemProperties("common", "8", "15% (+15% per stack) chance to bleed an enemy for 4x35% TOTAL damage.", "Chance to bleed on hit.", "Damage"),
    "Mysterious_Vial": new itemProperties("common", "9", "Increase health regeneration by 0.84 (+0.84 per stack) hp per second.", "Increased health regeneration.", "Health"),
    "Mortar_Tube": new itemProperties("common", "10", "9% chance on hit to fire a mortar for 170% (+170% per stack) TOTAL damage.", "Chance to launch a mortar.", "Damage"),
    "Warbanner": new itemProperties("common", "11", "On level up or activating the Teleporter, drop a banner that strengthens all allies within 4.6m (+1.4m per stack). Raise attack and movement speed by 30% and damage by 4. Also heals for 1% of your health every second.", "Drop a Warbanner on level up or activating the teleporter, giving you great strength.", "Utility"),
    "Monster_Tooth": new itemProperties("common", "12","Killing an enemy heals you for 10 (+5 per stack) health.", "Heal after kills.", "Health"),
    "Soldier's_Syringe": new itemProperties("common", "20", "Increases attack speed by 12% (+12% per stack).", "Increases attack speed.", "Utility"),
    "Crowbar": new itemProperties("common", "13", "Deal +50% (+30% per stack) damage to enemies above 80% health.", "Deal bonus damage to healthy monsters.", "Damage"),
    "Medkit": new itemProperties("common", "14","Heal for 10 (+10 per stack) health 1.5 seconds after getting hurt.", "Receive a delayed heal after taking damage.", "Health"),
    "Bundle_of_Fireworks": new itemProperties("common", "15", "Activating an interactable launches 6 (+3 per stack) fireworks that deal 300% base damage.", "Activating an interactable launches fireworks at nearby enemies.", "Damage"),
    "Topaz_Brooch": new itemProperties("common", "91", "Killing an enemy grants 15 barrier (+15 per stack).", "Kills grant temporary barrier.", "Health"),
    "Taser": new itemProperties("common", "16", "7% chance on hit to snare enemies for 1.5 (+0.5 per stack) seconds.", "Chance to snare on hit.", "Utility", "Loader: Travel 6,500 meters using the Hydraulic Gauntlet."),
    "Paul's_Goat_Hoof": new itemProperties("common", "17", "Increases movement speed by 15% (+15% per stack).", "Move faster.", "Utility", "Fail a shrine 3 times in a row."),
    "Bitter_Root": new itemProperties("common", "18","Increases maximum health by 8% (+8% per stack).", "Increases maximum health by 8%.", "Health", "Reach 650 health."),
    "Sticky_Bomb": new itemProperties("common", "19", "9% chance on hit to attach a bomb to an enemy, detonating for 140% (+140% per stack) TOTAL damage.", "Chance to attach a bomb to enemies.", "Damage", "Engineer: Detonate 15 Bounding Mines within 5 seconds."),
    "Snake_Eyes": new itemProperties("common", "21", "Failing a shrine increases critical chance by 7% (+7% per stack), up to 6 times. Resets at the start of each stage.", "Gain increased critical strike chance on failing a shrine. Resets between stages.", "Damage", "Pass a shrine 4 times in a row."),
    "Hermit's_Scarf": new itemProperties("common", "22", "10% (+10% per stack) chance to evade incoming damage.", "Chance to evade incoming damage.", "Utility", "Huntress: Achieve 200% attack speed."),
    "Gasoline": new itemProperties("common", "23", "Killing enemies burns the ground for 60% (+40% per stack) damage.", "Killing enemies sets the ground on fire.", "Damage", "Defeat 20 Lemurians in one playthrough."), 
    "Spikestrip": new itemProperties("common", "24", "When hit, drop spikestrips that snare enemies for 1 (+0.5 per stack) second.", "Drop spikestrips on being hit, snaring enemies.", "Damage", "Enforcer: Block 2000 damage total with your shield."),
    "Mocha": new itemProperties("common", "89", "Increases movement speed by 7.5% (+7.5% per stack) and attack speed by 6% (+6% per stack).	", "Slightly increase attack speed and movement speed.", "Utility", "Level up to level 20."), 
    "Voltaic_Mitt": new itemProperties("common", "92", "Climbing creates an electric trail that deals 50% damage (+30% per stack).", "Climbed ropes are electrified.", "Damage", "Complete the Providence Trial \"Hot-Rope Hop\"."), 
    "The_Toxin": new itemProperties("common", "99", "Infect enemies on contact for 3 seconds, causing them to receive 30% (+15% per stack) extra damage from all sources.", "Touch enemies to weaken them.", "Damage", "Find the illegal shipment."), 
    "Mu_Construct": new itemProperties("common", "96", "Heal by 2.5% of your maximum health every 5 (-25% per stack) seconds after the Teleporter has been activated.", "Heal periodically after activating the teleporter.", "Health", "Find this item hidden somewhere in the world to unlock it."), 
    "Razor_Penny": new itemProperties("common", "100", "Gain 3% critical chance (+3% per stack). Critical strikes drop $1 (+1$ per stack) gold.", "Slightly increased Critical strike chance. Critical strikes give you gold.", "?", "Kill 12 enemies simultaneously using the Gold-Plated Bomb."), 
    "Arcane_Blades": new itemProperties("common", "97", "Increases movement speed by 30% (+30% per stack) after the Teleporter has been activated.", "Move faster after activating the Teleporter.", "Utility", "Complete the Providence Trial \"Kited Blades\"."),
    // Uncommon
    "Time_Keeper's_Secret": new itemProperties("uncommon", "25", "Falling below 25% health stops time for 3 (+1 per stack) seconds. Recharges after 7 minutes.", "Falling to low health stops time.", "Utility"),
    "Smart_Shopper": new itemProperties("uncommon", "26", "Killed enemies drop 25% (+25% per stack) more gold.", "Enemies drop extra gold.", "Utility"),
    "Infusion": new itemProperties("uncommon", "27", "Killing an enemy increases your health permanently by 1 (+0.5 per stack).", "Killing an enemy permanently increases your health.", "Health"),
    "Will-o'-the-wisp": new itemProperties("uncommon", "28", "33% chance on killing an enemy to create a lava pillar for 300% (+200% per stack) damage, knocking enemies upwards.", "Chance to detonate enemies on kill.", "Damage"),
    "AtG_Missile_Mk._1": new itemProperties("uncommon", "29", "10% (+10% per stack) chance on hit to fire a missile that deals 300% TOTAL damage.", "Chance to fire a missile.", "Damage"),
    "Tough_Times": new itemProperties("uncommon", "30", "Increase armor by 14 (+14 per stack).", "Reduce incoming damage by 14%.", "Utility"),
    "Energy_Cell": new itemProperties("uncommon", "31", "Increases attack speed by up to 40% (+30% per stack) at low health.", "Attack faster at lower health.", "Utility"),
    "Rusty_Jetpack": new itemProperties("uncommon", "32", "Decrease gravity while holding the jump button by 10% (-10% per stack) and increase jump height (increases per stack).", "Increase jump height and reduce gravity.", "Utility"),
    "Leeching_Seed": new itemProperties("uncommon", "33", "Attacking enemies heals you for 2 (+1 per stack) health.", "Attacking enemies heals you.", "Health"),
    "Ukulele": new itemProperties("uncommon", "34", "20% chance on hit to fire chain lightning for 66% (+66% per stack) TOTAL damage on up to 3 targets.", "..and his music was electric.", "Damage"),
    "Boxing_Gloves": new itemProperties("uncommon", "35", "6% (+6% per stack) chance on hitting enemies to knock them back for 100% TOTAL damage.", "Chance to knock enemies backwards for extra damage.", "Utility"),
    "Prison_Shackles": new itemProperties("uncommon", "36", "Slow enemies on hit for -50% movement speed for 1.5 (+0.5 per stack) seconds.", "Slow enemies on attack.", "Utility"),
    "Guardian's_Heart": new itemProperties("uncommon", "37", "Gain a 60 (+60 per stack) health shield. Recharges when outside of danger for 7 seconds.", "Gain a shield. Recharges outside of danger.", "Health"),
    "Hopoo_Feather": new itemProperties("uncommon", "38", "Gain +1 (+1 per stack) maximum jump count.", "Gain an extra jump.", "Utility"),
    "Frost_Relic": new itemProperties("uncommon", "39","Killing an enemy temporarily surrounds you with 3 (+1 per stack) icicles that deal 33% damage each every 0.33 seconds.", "Killing enemies surrounds you with icicles.", "Damage"),
    "Red_Whip": new itemProperties("uncommon", "40","Leaving combat for 2 seconds boosts your movement speed by 60% (+60% per stack).", "Move fast out of combat.", "Utility"),
    "Chargefield_Generator": new itemProperties("uncommon", "41", "Killing an enemy creates a ring of lightning that deals 50% (+20% per stack) damage every 0.5 seconds to 50% of enemies within. The ring starts with a radius of 4.7m and grows by 1.3m each kill up to 40m. Lasts for 6 seconds without killing enemies.", "Create a ring of lightning after killing an enemy. Lasts 6 seconds.", "Damage", "Mercenary: Eviscerate 50 enemies."),
    "Arms_Race": new itemProperties("uncommon", "42", "Drones gain a 5% (+5% per stack) chance on hit to fire a missile for 300% TOTAL damage, and a 9% chance on hit to fire a mortar for 85% (+85% per stack) TOTAL damage. Summons a unique drone which regenerates each stage.", "Drones are equipped with explosive weaponry. Summons a drone helper.", "Damage", "HAN–D: Kill 10 enemies simultaneously with FORCED_REASSEMBLY."),
    "Golden_Gun": new itemProperties("uncommon", "43", "Deal bonus damage based on current gold, up to 40% damage. Caps at 700 (-50% per stack) gold. Scales with time.", "More gold, more damage.", "Damage", "Bank 20,000 gold."),
    "56_Leaf_Clover": new itemProperties("uncommon", "44", "Elite mobs have a 4% (+1.5% per stack) chance to drop items.", "Elite mobs have a chance to drop items.", "Utility", "Kill the Scavenger."),
    "Concussion_Grenade": new itemProperties("uncommon", "45", "6% (+6% per stack) chance on hitting enemies to stun them for 2 seconds.", "Chance to stun enemies.", "Utility", "Engineer: Kill a boss in 15 seconds or less."),
    "Filial_Imprinting": new itemProperties("uncommon", "46", "Hatch 1 (+1 per stack) strange creature who drops buffs every 20 seconds. Buffs temporarily boost either movement speed, attack speed, or health regen.", "Hatch a strange creature who drops buffs periodically.", "Utility", "Drown 20 Whorls."),
    "Dead_Man's_Foot": new itemProperties("uncommon", "47", "Chance when damaged to drop a poison mine that deals 150% damage and poisons for x600% (+450% per stack) damage over time. Chance to drop starts at 15% and increases with low health.", "Drop a poison trap at low health.", "Damage", "Find the bloated survivor."),
    "Toxic_Centipede": new itemProperties("uncommon",  "48", "Infect a nearby enemy on contact for 6 (+2 per stack) seconds, dealing 50% damage every 0.5 seconds. Bounces to other enemies if the target dies. Recharges every 6 (-33% per stack) seconds.	", "Infected!", "Damage", "Acrid: Spread 3,300 feet of caustic sludge."),
    "Harvester's_Scythe": new itemProperties("uncommon", "49", "Gain 5% critical chance. Critical strikes heal for 8 (+2 per stack) health.", "Critical hits heal you.", "Health", "Use a health shrine that drops you below 5% health."),
    "Panic_Mines": new itemProperties("uncommon", "50", "Chance when damaged to drop 1 (+1 per stack) mine that deals 400% damage. Chance to drop starts at 15% and increases with low health.", "Drop a mine at low health.", "Damage", "Miner: Survive the teleporter event without falling below 50% health."),
    "Predatory_Instincts": new itemProperties("uncommon", "51", "Gain 5% critical chance. Critical strikes increase attack speed by 10% (+7% per stack). Maximum cap of 30% (+21% per stack) attack speed.", "Critical strikes increase attack speed. Buff stacks 5 times.", "Damage", "Huntress: Defeat the Ancient Wisp without taking damage."),
    "Royal_Medallion": new itemProperties("uncommon", "94", "10% chance on hitting a boss monster to drop a buffing wisp that improves health regen, attack speed, move speed, and base damage for 10 (+6 per stack) seconds.", "Bosses drop powerful buffing wisps when hit.", "Utility", "Get a gold rank on at least 5 Providence Trials."),
    "Prophet's_Cape": new itemProperties("uncommon", "101", "Briefly blocks all incoming damage upon being struck (Recharging after 15 seconds). Blocking damage heals you for 3 (+1 per stack) health.", "All blocked damage heals you.", "Health", "Commando: Dodge 7 lethal attacks"),
    "Locked_Jewel": new itemProperties("uncommon", "102", "Activating an interactable heals 35% (+15% per stack) of your maximum barrier and grants $8 (scales with time).", "Activating an interactable grants barrier and gold.", "Health", "Reach max barrier."),
    "Hunter's_Harpoon": new itemProperties("uncommon", "104", "Killing an enemy increases movement speed by 125% for 1 (+1 per stack) second. Consecutive kills increase buff duration for up to 25 seconds.", "Killing an enemy grants a temporary burst of speed.", "Utility", "Complete the Providence Trial \"A Toxic Path\"."),
    "Insecticide": new itemProperties("uncommon",  "105", "10% (+5% per stack) chance on hit to spray an enemy dealing 10% damage per second. Spray stacks up to 10 times. Killing enemies heals for 10 (+5 per stack) health per stack of spray.", "Chance to apply damage over time. Heal if the enemy dies.", "Damage", "Complete the Providence Trial \"Get Off My Lawn!\"."),
    "Decaying_Sample": new itemProperties("uncommon", "106", "Gain two orbiting spheres that strike for 100% (+ 50% stack) damage every 0.25 seconds.", "Gain an orbiting follower that damages enemies.", "Damage", "Complete the Providence Trial \"Main Systems Offline\"."),
    // Rare
    "Thallium": new itemProperties("rare", "52", "10% (+10% per stack) chance on hit to damage by up to 2x500% enemy damage per second and slow for up to -150% movement speed over the course of 3 seconds.", "Chance to slow and damage enemies over time.", "Damage"), 
    "Tesla_Coil": new itemProperties("rare", "53", "Passively shock nearby enemies for 120% (+60% per stack) damage.", "Passively shock nearby enemies.", "Damage"), 
    "Old_Box": new itemProperties("rare", "54", "Chance when damaged to drop a jack-in-the-box, fearing enemies for 2 (+1 per stack) seconds. Chance to drop starts at 10% and increases with low health.", "Chance when damaged to drop a jack-in-the-box, fearing enemies.", "Utility"), 
    "Beating_Embryo": new itemProperties("rare", "55", "Equipment has a 30% (+30% per stack) chance to deal double the effect.", "Equipment has a chance to deal double the effect.", "Utility"), 
    "Permafrost": new itemProperties("rare", "56", "13% chance on hit to freeze enemies for 1.5 seconds while slowing by -80% movement speed for 3 (+1.5 per stack) seconds.", "Chance on hit to freeze enemies while also slowing.", "Utility"), 
    "AtG_Missile_Mk._2": new itemProperties("rare", "57", "7% (+7% per stack) chance on hit to fire three missiles that deal 3x300% TOTAL damage.", "Hooah.", "Damage"), 
    "Happiest_Mask": new itemProperties("rare", "58", "Killed enemies spawn ghosts that last 15 seconds with 100% (+20% per stack) health and 70% (+30% per stack) damage.", "Killed enemies spawn friendly ghosts.", "Damage"), 
    "Plasma_Chain": new itemProperties("rare", "59", "Chance on hit to tether onto up to 1 (+1 per stack) enemy dealing 60% damage per 0.5 seconds to any enemies in the path.", "Chance on hit to tether onto up to 1 enemy, dealing damage to any enemies in the path.", "Damage"), 
    "Heaven_Cracker": new itemProperties("rare", "60", "Every 4 (-1 per stack) basic attacks pierce through enemies.", "Every 4 basic attacks pierce through enemies.", "Damage"), 
    "Rapid_Mitosis": new itemProperties("rare", "61", "Reduce the cooldown of equipment by 25% (+25% per stack).", "Reduce the cooldown of equipment.", "Utility"), 
    "Ceremonial_Dagger": new itemProperties("rare", "62", "Killing an enemy fires out 4 (+2 per stack) heat seaking bolts that deal 100% damage.", "Killing an enemy fires spirit bolts.", "Damage"), 
    "Repulsion_Armor": new itemProperties("rare", "63", "After 6 hits reflect incoming attacks for 400% damage and increase armor by 100 for 4 (+1 per stack) seconds.", "After taking damage, reflect all attacks for 4 seconds.", "Health"), 
    "Brilliant_Behemoth": new itemProperties("rare", "64", "All your attacks explode for a bonus 20% (+20% per stack) TOTAL damage to nearby enemies.", "All your attacks explode!", "Damage"), 
    "Hardlight_Afterburner": new itemProperties("rare", "88", "Add +2 (+2 per stack) charges of your Utility skill. Reduces Utility skill cooldown by 33%.", "Add 2 extra charges of your Utility skill. Reduce Utility skill cooldown.", "Utility"), 
    "Interstellar_Desk_Plant": new itemProperties("rare", "65", "	Upon killing an enemy, spawn an alien plant that heals you for 3% of your maximum health and recharges after 4 seconds. Plant lasts 15 (+5 per stack) seconds.", "Sprout a tree on kill, granting healing fruits.", "Healing", "CHEF: SEAR/FLAMBE 20 Sand Crabs."), 
    "Laser_Turbine": new itemProperties("rare", "66", "Using skills charges the generator by 7.8% (+7.8% per stack) per second. At full power, fire a laser for 2000% damage.", "Using skills charges up to a huge laser blast.", "Damage", "CHEF: Have 20 cleavers out at once."), 
    "Wicked_Ring": new itemProperties("rare", "67", "Gain 5% (+10% per stack) critical chance. Critical strikes reduce cooldowns by 1 second.", "Critial strikes reduce all your cooldowns by 1.", "Utility", "Collect 4 keycards."), 
    "Alien_Head": new itemProperties("rare", "68","Decrease your skill cooldowns by 30% (+30% per stack).", "Reduces cooldowns for your skills.", "Utility", "	Obtain 7 Monster Teeth and 1 Guardian's Heart."), 
    "The_Ol'_Lopper": new itemProperties("rare", "69", "Deal bonus damage to enemies with lower health, up to +60% (+60% per stack) damage.", "Enemies take more damage at lower health.", "Damage", "Survive 40 minutes."), 
    "The_Hit_List": new itemProperties("rare", "70", "Randomly marks up to 1 (+1 per stack) enemy. Killing a marked enemy permanently increases damage by 0.5, up to 20 damage.", "Killing marked enemies permanently increases damage.", "Damage", "Bandit: Reset your cooldown 15 times consecutively."), 
    "Photon_Jetpack": new itemProperties("rare", "71", "Hold the jump button to fly for up to 1.6 (+0.8 per stack) seconds. Recharges over 1.6 seconds.", "No hands.", "Utility", "End a teleporter timer with 0 enemies on the map."), 
    "Shattering_Justice": new itemProperties("rare", "72", "Attacks reduce enemy armor by 6 for 2 (+2 per stack) seconds. Reduction stacks up to -30 armor.", "Reduce enemy armor on hit. Reduction stacks 5 times.", "Damage", "Miner: Reach level 10 without getting hurt more than once."), 
    "Telescopic_Sight": new itemProperties("rare", "73", "1% (+0.5% per stack) chance on hit to instantly kill enemies. Does not work against bosses.", "Chance to instantly kill an enemy.", "Damage", "Sniper: 1-shot kill 10 enemies consecutively"), 
    "Fireman's_Boots": new itemProperties("rare", "74", "Walking leaves behind a fire trail that burns for 35% (+20% per stack) damage.", "Fight fire with fire..", "Damage", "Survive in lava for 1 minute straight."), 
    "Hyper-Threader": new itemProperties("rare", "75", "Hitting enemies fires a laser that deals 40% damage and bounces to 2 (+1 per stack) enemies.", "Pew pew.", "Damage", "Complete the Providence Trial \"A Rung Above\"."), 
    "Dio's_Best_Friend": new itemProperties("rare", "76", "Taking fatal damage consumes this item and revives you with 40% health and 2 seconds of invulnerability.", "Cheat death once.", "Health", "Die 50 times."), 
    "Ancient_Scepter": new itemProperties("rare", "77", "Upgrade your special skill. Unique to each character. Reduces special skill cooldown by 30% per stack.", "Upgrade your special skill.", "Utility", "Mercenary: Beat the game on Monsoon difficulty."), 
    "Bottled_Chaos": new itemProperties("rare", "90", "Activating an Equipment triggers a random equipment effect 1 (+1 per stack) time(s).", "Using your Equipment triggers an additional, random Equipment effect.", "Utility", "Use the same Equipment Activator 5 times."), 
    "Aegis": new itemProperties("rare", "92", "Healing past full grants you barrier equal to 50% (+50% per stack) of the amount you healed. Increases maximum barrier by 20% (+20% per stack).", "Healing past full grants you a temporary barrier.Increased maximum barrier.", "Health", "Artificer: Multi-kill 15 enemies."), 
    "Substandard_Duplicator": new itemProperties("rare", "95", "Picking up an item gives you a temporary copy of itself. Temporary items last an additional 10 (+10 per stack) seconds", "Picked up items yield an additional temporary copy.", "Utility", "Complete the providence Trial \"A Duplicator?!\"."), 
    "Classified_Access_Codes": new itemProperties("rare", "103", "The Atlas Cannon appears each stage, activating it deals 40% (+20% per stack) of maximum health as damage to the teleporter boss after it spawns.", "Access a deadly weapon against the Teleporter bosses.", "Damage", "Complete the Providence Trial \"Emergency Ejection\"."), 
    "Umbrella": new itemProperties("rare", "106", "Rain begins for 15 seconds (increases per stack) upon activating the Teleporter. Rain stuns, damages, and weakens enemies. You are invincible while it is raining.", "They fear the rain.", "Utility", "Complete the Providence Trial \"Meteor Showers\"."), 
    // Equipment
    "Rotten_Brain": new itemProperties("equipment", "","Throw a brain that bounces in place, damaging/slowing enemies for 6x200%.", "Throw a bouncing brain.", ""), 
    "Safeguard_Lantern": new itemProperties("equipment", "","Drop a lantern for 10 seconds. Fears and damages enemies for 20% damage.", "Drop a lantern that fears and damages enemies for 10 seconds.", ""), 
    "Snowglobe": new itemProperties("equipment", "","Summon a snowstorm that freezes monsters at a 50% chance/sec over 7 seconds.", "Randomly freeze enemies for 8 seconds.", ""), 
    "Explorer's_Key": new itemProperties("equipment", "","Open all chests within 20 meters.", "Unlocks all chests in within 20 meters.", ""), 
    "Foreign_Fruit": new itemProperties("equipment", "","Heal yourself for 50% of your health.", "Heal on use.", ""), 
    "Instant_Minefield": new itemProperties("equipment", "","Drop 6 mines at your feet, each dealing 400% damage.", "Drop many mines at your feet.", ""), 
    "Jar_of_Souls": new itemProperties("equipment", "","Duplicate every enemy as a ghost to fight on your side. Ghosts last 15 seconds and have 70% damage.", "Summon a ghost for every enemy in the screen.", ""), 
    "Carrara_Marble": new itemProperties("equipment", "","Place a marble gate. Teleport back to the gate by activating again.", "Place a marble gate. Teleport back to the gate by activating again.", ""), 
    "Sawmerang": new itemProperties("equipment", "","Throw out a sawmerang, slicing enemies for 500% damage and making them bleed for 4x100% damage. Boomerangs back.", "Mow them down!", ""), 
    "Shattered_Mirror": new itemProperties("equipment", "","For 15 seconds, double all your abilities' damage and effects.", "Create a shadow partner for 15 seconds.", ""), 
    "Disposable_Missile_Launcher": new itemProperties("equipment", "","Fire a swarm of 12 missiles, dealing 300% damage each.", "Fire a swarm of missiles.", ""), 
    "Gold-Plated_Bomb": new itemProperties("equipment", "","Use 50% of your gold to create a bomb, dealing 1 damage per gold spent. Refund 20% of spent gold on kill.", "Drop and detonate 50% of your money.", ""), 
    "Drone_Repair_Kit": new itemProperties("equipment", "","All drones are repaired to full health and empowered for 8 seconds. Summons a unique drone.", "Repair and empower all active drones. Summons a unique drone to assist.", ""), 
    "Thqwib": new itemProperties("equipment", "","Release a bloom of 30 thqwibs, detonating on impact for 200% damage.", "Releases a bloom of Thqwibs, detonating on impact.", ""), 
    "Dynamite_Plunger": new itemProperties("equipment", "","Hitting an enemy drops dynamite. Use to detonate for 200% damage.", "Hitting enemies drops dynamite. Use to detonate.", ""), 
    "Mace_Replica": new itemProperties("equipment", "","Swing a powerful mace for 300% damage, knocking enemies away. Guaranteed to activate all on-hit item effects.", "Swing a powerful mace, activating your item effects.", "", "Commando: Activate the 3rd teleporter without being hurt once."), 
    "Gigantic_Amethyst": new itemProperties("equipment", "","Reset all your cooldowns.", "Resets all your cooldowns.", "", "Loader: Kill the Overloading Magma Worm."), 
    "Crudely-Drawn_Buddy": new itemProperties("equipment", "","Blow up a decoy, attracting and confusing enemies for 8 seconds. Looks just like you.", "Drop a decoy, attracting nearby enemies.", "", "Sniper: Achieve 15 consecutive perfect reloads."), 
    "Prescriptions": new itemProperties("equipment", "","Increase damage by 30% and attack speed by 40% for 8 seconds.", "Increase damage and attack speed for 8 seconds.", "", "Enforcer: Stay in Shield Mode for 5 minutes straight (in combat)."), 
    "Shield_Generator": new itemProperties("equipment", "","Become invincible for 8 seconds.", "Become invulnerable for 8 seconds.", "", "HAN-D: Beat the third stage without falling below 60% health."), 
    "Unstable_Watch": new itemProperties("equipment", "","Stop time for 7 seconds.", "Pause time for 7 seconds.", "", "Complete the 1st stage in under 5 minutes."), 
    "Lost_Doll": new itemProperties("equipment", "","Sacrifice 25% health to damage an enemy for 500% of your maximum health.", "Harm yourself to deal massive damage to an enemy.", "", "Survive a boss with less than 20% health."), 
    "Pillaged_Gold": new itemProperties("equipment", "","For 14 seconds, every hit drops gold.", "For 14 seconds, hitting enemies causes them to drop gold.", "", "Bandit: Kill a boss with Lights Out."), 
    "Captain's_Brooch": new itemProperties("equipment", "","Call down a chest nearby. Chest cost is doubled.", "One man's wreckage is another man's treasure.", "", "Unlock a golden chest with the Explorer's Key."), 
    "The_Back-Up": new itemProperties("equipment", "","Create 4 drones to fight for you for 10 seconds.", "Call drones for backup. Lasts 10 seconds.", "", "Have 4 drone helpers at once."), 
    "Super_Massive_Leech": new itemProperties("equipment", "","For 10 seconds, every hit heals you for 10 health.", "Grant massive life on hit for 10 seconds.", "", "Acrid: Spread Epidemic to 25 enemies."), 
    "Glowing_Meteorite": new itemProperties("equipment", "","Meteors fall from the sky, damaging enemies and friends for 220% damage. Lasts 8 seconds.", "Rain meteors from the sky, hurting both enemies and allies.", "", "Deal 5000 damage in one shot."), 
    // Boss
    "Legendary_Spark": new itemProperties("boss", "78", "8% chance on hit to create 2 (+1 per stack) sparks that smite enemies for 200% TOTAL damage.", "Smite them. Smite them all.", "Item", "", "Ancient Wisp"),
    "Imp_Overlord's_Tentacle": new itemProperties("boss", "79", "Summon an imp bodyguard. Revives after 60 (-10 per stack) seconds. Increase imp health and damage by 15% per stack.", "Cut off the head of the snake.. and the body lives on.", "Item", "", "Imp Overlord"),
    "Burning_Witness": new itemProperties("boss", "80", "Killing enemies grants a fire trail and 30% movement speed for 6 (+2 per stack) seconds.", "The Worm's eye seems to still see.. watching.. rewarding..", "Item", "", "Magma Worm"),
    "Colossal_Knurl": new itemProperties("boss", "81", "Increase maximum health by 40, health regeneration by 1.2/second, and armor by 6.", "Increase health, health regeneration, and armor.", "Item", "", "Colossus"),
    "Ifrit's_Horn": new itemProperties("boss", "82", "8% chance on hit to fire a flaming wave that incinerates enemies for 300% (+300% per stack) TOTAL damage.", "Chance to fire a flaming wave.", "Item", "", "Ifrit"),
    "Nematocyst_Nozzle": new itemProperties("boss", "","Shoot out 6 nematocysts that deal 400% damage.", "Best served cold.", "Equipment", "", "Wandering Vagrant"),
    "Scorching_Shell_Piece": new itemProperties("boss", "98", "Gain a 20 (+20 per stack) health shield. Fire up to 4 (+2 per stack) projectiles at nearby enemies when it breaks.	", "Gain shield. Fire a barrage of projectiles when it breaks.", "Item", "", "Cremator"),
    // Special
    "White_Undershirt_(M)": new itemProperties("special", "83", "Increases armor by 3", "+2 STR S>2m or best offer @@@@@@@@", "Item", "", "", "Drops from the Armored Boarlit on Boar Beach."),
    "Keycard": new itemProperties("special", "84", "Opens locked security doors.", "Opens locked security doors.", "Item", "", "", "Golden Canisters, enemy drops on Risk of Rain."),
    "Small_Enigma": new itemProperties("special", "85", "Reduce the cooldown of equipment.", "Reduce the cooldown of equipment.", "Item", "", "", "Drops whenever an equipment would have with the Artifact of Enigma enabled."),
    "Strange_Battery": new itemProperties("special", "", "The Strange Battery is an special equipment that doesn't have an entry log, its use is part of a series of steps leading to the unlock of a certain character. The Strange Battery can be found on every variant of Temple of the Elders when playing on Drizzle difficulty. It can be found inside an intractable urn, which drops the item when prompted. The urn is typically located along the edges of the stage. A way to differentiate the urn from similar ones throughout the stage is by its design - bearing a plus-shaped symbol connected to two bracket-like shapes.", "Bzzzt.", "Equipment", "", "", "Hidden in a unique interactable vase on all variants of stage 5, but only on Drizzle."),
    "Big_Bison_Steak": new itemProperties("special", "112", "	Increase health regeneration and movement speed.", "Increase health regeneration and movement speed.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Marinated_Lizard_Loaf": new itemProperties("special", "109", "Increased damage.", "Increased damage.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Golem_Essence_on_the_Rocks": new itemProperties("special", "110", "Gain barrier and increased armor.", "Gain barrier and increased armor.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Jelly_Brain_Salad": new itemProperties("special", "108", "Reduces skill cooldowns by 1 second.", "Reduces skill cooldowns by 1 second.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Fried_Eyeball": new itemProperties("special", "111", "Slow nearby enemies.", "Slow nearby enemies.", "Meal", "", "", "One of the meals CHEF can produce from COOK."), 
}

// actual functions
function showItemDescription(filename) {
    itemName.textContent = replaceAll(filename, '_', ' ');
    if (itemDict.hasOwnProperty(filename)) {
        itemProp = itemDict[filename];

        description.textContent = itemProp.description;
        //Adds spans for color description color coding
        description.innerHTML   = description.innerHTML.replaceAll(numberRegex, ' <span style="color: cyan"> $1 </span> ')
        description.innerHTML = description.innerHTML.replaceAll(operatorRegex, '<span style="color: #FF6633"> $1 </span>')
        description.innerHTML = description.innerHTML.replaceAll(moneyRegex, '<span style="color: yellow">$</span>')

        pickup.textContent = "\"" + itemProp.pickup + "\"";
        category.textContent = itemProp.category;
        
        if (itemProp.drop === "" && itemProp.aquisition === "") {
            unlock.textContent = "Unlock: " + itemProp.unlock;
            console.log(itemProp.drop)
        } else if (itemProp.aquisition === "") {
            unlock.textContent = "Drops from: " + itemProp.drop;
        } else {
            unlock.textContent = "Aquisition method: " + itemProp.aquisition;
        }
        //console.log(itemProp.item_id)
        if (itemProp.item_id === ""){
            item_id.textContent = "Missing item ID";
        }
        else{
            item_id.textContent = "Item ID: " + itemProp.item_id;
        }
    } else {
        description.textContent = "Item Description missing :("
    }
}

function hideItemDescription(filename) {
    description.textContent = "";
    itemName.textContent = "";
    pickup.textContent = "";
    category.textContent = "";
    unlock.textContent = "";
    item_id.textContent = "";
}

function addItemDiv(filename, itemProperty){

    var button = document.createElement("button");
    button.type = 'submit'

    var item_icons = document.getElementById(itemProperty.type+"-item-text")
    item_icons.after(button)
    
    var div = document.createElement("div")
    div.classList.add(filename)
    div.id = filename
    div.onmouseover = function(){showItemDescription(filename)}
    div.onmouseout = function(){hideItemDescription(filename)}
    button.appendChild(div)

    var img = document.createElement("img")
    img.draggable = false
    img.src="pics/items/"+itemProperty.type+"/"+filename+".png"
    img.alt="Item"
    img.style.height = "50px"
    img.style.width = "auto"
    img.onmousedown = function(){preventRightclick(this)}
    div.appendChild(img)
}

// Skills

class skillProperties {
    constructor(survivor="", skill_id="", skill_name="", skill_description="", skill_category=""){
        this.survivor = survivor;
        this.skill_id=skill_id;
        this.skill_name=skill_name;
        this.skill_description=skill_description;
        this.skill_category = skill_category;
    }
}

const skillDict = {
    // Dummy
    //"Locked": new skillProperties("", "0", "dummySkill", "No skill available.", ""),

    // Commando
    "Double_Tap": new skillProperties("Commando", "1", "commandoZ", "Shoot rapidly for 60% damage.", "Primary"),
    "Full_Metal_Jacket": new skillProperties("Commando",  "2", "commandoX", "Shoot through enemies for 230% damage, knocking them back.", "Secondary"),
    "Tactical_Dive": new skillProperties("Commando",  "3", "commandoC", "Roll forward a small distance.\nYou cannot be hit while rolling.", "Utility"),
    "Suppressive_Fire": new skillProperties("Commando",  "4", "commandoV", "Fire rapidly, stunning and hitting nearby enemies for 6x60% damage.", "Special"),
    "Suppressive_Barrage": new skillProperties("Commando",  "5", "commandoVBoosted", "Fires rapidly, stunning and hitting nearby enemies for 10x60% damage.", "Special"),
    "Combat_Knife": new skillProperties("Commando",  "6", "commandoX2", "Slash enemies for 150% damage, wounding them for 4 seconds.\nWounded enemies take an extra 50% damage from all sources.", "Secondary"),
    "Tactical_Slide": new skillProperties("Commando",  "7", "commandoC2", "Slide on the ground a short distance.\nYou can fire in either direction while sliding.", "Utility"),
    "Point-Blank": new skillProperties("Commando",  "8", "commandoV2", "Take out your shotgun and fire, hitting nearby enemies for 6x100% damage.", "Special"),
    "Lead_Shot": new skillProperties("Commando",  "9", "commandoV2Boosted", "Take out your shotgun and fire, hitting nearby enemies for 8x100% piercing damage.", "Special"),
    
    // Huntress
    "Strafe": new skillProperties("Huntress", "30", "huntressZ", "Fire an arrow for 120% damage. \nYou can shoot all skills while moving.", "Primary"),
    "Laser_Glaive": new skillProperties("Huntress", "31", "huntressX", "Throw a glaive that bounces to up to 4 enemies for 300% damage. Increases by 30% per bounce.", "Secondary"),
    "Blink": new skillProperties("Huntress", "32", "huntressC", "Teleport forward a small distance.", "Utility"),
    "Cluster_Bomb": new skillProperties("Huntress", "33", "huntressV", "Fire an explosive arrow for 320% damage. The arrow drops bomblets that detonate for 6x80% damage.", "Special"),
    "Mk7_Rockeye": new skillProperties("Huntress", "34", "huntressVBoosted", "Fire an explosive arrow for 320% damage. The arrow drops bomblets that detonate for 12x80%.", "Special"),
    "Pierce": new skillProperties("Huntress", "35", "huntressZ2", "Hold to charge an arrow shot, firing for up to 1000% damage. \nMove more slowly While casting.", "Primary"),
    "Laser_Cyclone": new skillProperties("Huntress", "36", "huntressX2", "Throw a large, slow-moving glaive, dealing 50% damage over time, before returning.", "Secondary"),
    "Warp_Dart": new skillProperties("Huntress", "37", "huntressC2", "Fire a weighted dart, teleporting you to it when it lands. Explodes for 200% damage upon landing.", "Utility"),
    
    // Enforcer
    "Riot_Shotgun": new skillProperties("Enforcer", "10", "enforcerZ", "Fire a short range blast for 160% damage, hitting all enemies.", "Primary"),
    "Shield_Slam": new skillProperties("Enforcer", "11", "enforcerX", "Smash nearby enemies for 210% damage, knocking them back.", "Secondary"),
    "Protect_and_Serve": new skillProperties("Enforcer", "12", "enforcerC", "Take a defensive stance, blocking all damage from the front. Increases attack speed, but reduces movement.", "Utility"),
    "Crowd_Control": new skillProperties("Enforcer", "13", "enforcerV", "Launch a stun grenade, stunning enemies in a huge radius for 250% damage. Can bounce at shallow angles.", "Special"),
    "Tear_Gas": new skillProperties("Enforcer", "14", "enforcerVBoosted", "Launch a gas grenade, fearing and knocking back enemies in a huge radius for 250% damage. Can bounce at shallow angles.", "Special"),
    "Shrapnel_Grenade": new skillProperties("Enforcer", "15", "enforcerZ2", "Fire a shrapnel grenade, exploding for 3x60% damage. Holds up to 4 grenades, reactivate when empty to reload your weapon.", "Primary"),
    "Reload": new skillProperties("Enforcer", "16", "enforcerZ2Reload", "Reload your grenade launcher.", "Primary"),
    "No_Name": new skillProperties("Enforcer", "17", "enforcerX2", "No description", "Secondary"),
    "Shield_Tackle": new skillProperties("Enforcer", "18", "enforcerX3", "Dash forwards, slamming nearby enemies for up to 5x100% damage, knocking them back and stunning them.", "Secondary"),
    "Disperse": new skillProperties("Enforcer", "19", "enforcerV2", "Fire three shotgun blasts for 3x300% damage. More effective on larger enemies. Fires downwards when used airborne.", "Special"),
    "Evacuate": new skillProperties("Enforcer", "20", "enforcerV2Boosted", "Fire three shotgun blasts, for 3x350% damage, knocking them up and stunning them in a larger radius. More effective on larger enemies. Fires downwards when used airborne.", "Special"),
    
    // Bandit
    "Blast": new skillProperties("Bandit", "21", "banditZ", "Fire a powerful slug for 150% damage.", "Primary"),
    "Dynamite_Toss": new skillProperties("Bandit", "22", "banditX", "Toss an explosive in an arc for 300% damage.", "Secondary"),
    "Smokebomb": new skillProperties("Bandit", "23", "banditC", "Turn invisible. After 3 seconds or after using another ability, surprise and stun enemies for 140% damage. ", "Utility"),
    "Lights_Out": new skillProperties("Bandit", "24", "banditV", "Take aim for a headshot, dealing 500% damage. If this ability kills an enemy, the Bandit's cooldowns are all reset to 0.", "Special"),
    "Assassinate": new skillProperties("Bandit", "25", "banditVBoosted", "Take aim a headshot for 2x500% damage. If this ability kills an enemy, the Bandit's cooldowns are all reset to 0.", "Special"),
    "Whip": new skillProperties("Bandit", "26", "banditZ2", "Crack a whip forward for 200% damage, knocking enemies back.", "Primary"),
    "Flashbang": new skillProperties("Bandit", "27", "banditC2", "Toss a flash grenade, stunning and blinding all enemies. \nBlinded enemies cannot attack, are slowed and take 25% extra damage. ", "Utility"),
    "Standoff": new skillProperties("Bandit", "28", "banditV2", "Take aim for a headshot, dealing 500% damage. If this ability kills an enemy, gain 1 temporary stack of Standoff.\nStandoff stacks increase damage by 50% each and last 15 seconds.", "Special"),
    "Quick_Draw": new skillProperties("Bandit", "29", "banditV2Boosted", "Take aim a headshot for 2x600% damage. If this ability kills an enemy, gain 1 temporary stack of Standoff.Standoff stacks increase damage by 50% each and last 20 seconds.", "Special"),
    
    // Han-D
    "HURT": new skillProperties("Han-D", "38", "handZ", "APPLY FORCE TO ALL COMBATANTS FOR 180% DAMAGE.", "Primary"),
    "DRONE_-_HEAL": new skillProperties("Han-D", "39", "handX", "FIRE A DRONE FOR 190% DAMAGE WHILE ALSO HEALING YOURSELF. GAIN DRONES BY KILLING ENEMIES.", "Secondary"),
    "OVERCLOCK": new skillProperties("Han-D", "40", "handC", "INCREASE ATTACK SPEED AND STUN CHANCE BY 30%.\nINCREASE DURATION BY ATTACKING ENEMIES.", "Utility"),
    "FORCED_REASSEMBLY": new skillProperties("Han-D", "41", "handV", "APPLY GREAT FORCE TO ALL COMBATANTS FOR 500% DAMAGE, KNOCKING THEM IN THE AIR.", "Special"),
    "UNETHICAL_REASSEMBLY": new skillProperties("Han-D", "42", "handVBoosted", "APPLY GREAT FORCE TO ALL COMBATANTS FOR 500% DAMAGE, STUNNING, SHOCKING, AND KNOCKING THEM IN THE AIR", "Special"),
    "DRONE_-_SPEED": new skillProperties("Han-D", "43", "handX2", "FIRE A DRONE FOR 190% DAMAGE WHILE ALSO TEMPORARILY GAINING ATTACK SPEED. GAIN DRONES BY KILLING ENEMIES.", "Secondary"),
    "DRONE_-_VENT": new skillProperties("Han-D", "44", "handX3", "FIRE A DRONE FOR 190% DAMAGE WHILE ALSO LOWERING EQUIPMENT COOLDOWNS AND EXTENDING OVERCLOCK DURATION. GAIN DRONES BY KILLING ENEMIES.", "Secondary"),
    "DRONE_-_BLAST": new skillProperties("Han-D", "45", "handX4", "FIRE A DRONE THAT EXPLODES ON CONTACT FOR 500% DAMAGE, AT BLINDING SPEEDS, EXTENDING OVERCLOCK DURATION. GAIN DRONES BY KILLING ENEMIES.", "Secondary"),
    "DISASSEMBLE": new skillProperties("Han-D", "46", "handV2", "TEAR COMBATANTS APART FOR 5x90% DAMAGE, SCALING WITH ATTACK SPEED.\nCAN MOVE SLOWLY WHILE CASTING.", "Special"),
    "DISMANTLE": new skillProperties("Han-D", "47", "handV2Boosted", "TEAR COMBATANTS APART FOR 5x90% DAMAGE, SCALING WITH ATTACK SPEED, BURNING THEM FOR 20% DAMAGE OVER TIME.\nCAN MOVE SLOWLY WHILE CASTING.", "Special"),
    
    // Engineer
    "Tri-nade": new skillProperties("Engineer", "48", "engineerZ", "Launch three grenades for 3x80% damage.", "Primary"),
    "Bounding_Mine": new skillProperties("Engineer", "49", "engineerX", "Drop a trap that explodes for 300% damage.\nHold up to 10.", "Secondary"),
    "Thermal_Harpoons": new skillProperties("Engineer", "50", "engineerC", "Launch four heat-seeking harpoons for 4x250% damage.", "Utility"),
    "Auto_Turret": new skillProperties("Engineer", "51", "engineerV", "Drop a turret that shoots for 3x100% damage, inheriting all of your items.\nHold up to 2.", "Special"),
    "Auto_Turret_Mk._2": new skillProperties("Engineer", "52", "engineerVBoosted", "Drop a turret that shoots for 3x100% damage for 30 seconds. Hold up to 3.", "Special"),
    "Mortar_Barrage": new skillProperties("Engineer", "53", "engineerZ2", "Launch mortar rounds in an arc for 80% damage. Can move while firing.", "Primary"),
    "Shockwave_Mine": new skillProperties("Engineer", "54", "engineerX2", "Drop a defensive mine that knocks enemies back a significant distance for 120% damage. Can trigger up to 3 times.\nHold up to 3.", "Secondary"),
    "V.0.2_Prototype_Laser_Turret": new skillProperties("Engineer", "55", "engineerV2", "Drop a turret that charges up over 8 seconds and fires for 1200% damage  per hit, inheriting all of your items. \nFragile, rapidly damaging itself while firing.", "Special"),
    "V.0.5_Beta_Laser_Turret": new skillProperties("Engineer", "56", "engineerV2Boosted", "Drop a turret that charges up over 8 seconds and fires for 1200% damage  per hit, inheriting all of your items. \nFragile, rapidly damaging itself while firing. Hold up to 2.", "Special"),
    
    // Miner
    "Crush": new skillProperties("Miner", "57", "minerZ", "Crush nearby enemies for 160% damage. Gain heat on hit. Deals an additional 45% damage while Scorching.", "Primary"),
    "Drill_Charge": new skillProperties("Miner", "58", "minerX", "Hold to dash through enemies for 150% damage, spending heat while in use. You cannot be hit while dashing. Incurs no cooldown while Scorching.", "Secondary"),
    "Backblast": new skillProperties("Miner", "59", "minerC", "Blast backwards for 200% damage, stunning all enemies. You cannot be hit while dashing.  Dash further and for more damage while Scorching.", "Utility"),
    "To_The_Stars": new skillProperties("Miner", "60", "minerV", "Leap into the air, hitting enemies below for 3x180% damage. Costs 20% heat and incurs no cooldown while Scorching.", "Special"),
    "Starbound": new skillProperties("Miner", "61", "minerVBoosted", "Leap into the air, hitting enemies below for 5x180% damage. Costs 15% heat and incurs no cooldown while Scorching.", "Special"),
    "Throwing_Axe": new skillProperties("Miner", "62", "minerZ2", "Toss a pickaxe for 125% damage. Gain heat on hit.\nWhile Scorching, pickaxes pierce, and get thrown more rapidly.", "Primary"),
    "Drill_Dash": new skillProperties("Miner", "63", "minerX2", "Dash through the air in your held direction. When contacting an enemy, rapidly drill in place for 150% damage for as long as you have heat.", "Secondary"),
    "Burnout": new skillProperties("Miner", "64", "minerC2", "Explode in a large area for 500% damage, stunning all enemies. Damages you for 25% max health and gain 25% heat. \nCannot die from self-damage.", "Utility"),
    
    // Sniper
    "Snipe": new skillProperties("Sniper", "65", "sniperZ", "Shoot an enemy for 250% damage. Reactivate the ability to reload your weapon, granting bonus damage if timed correctly.", "Primary"),
    "Steady_Aim": new skillProperties("Sniper", "66", "sniperX", "Carefully take aim, increasing damage the longer the button is held down. On release, fire a bullet for up to 2000% damage.", "Secondary"),
    "Military_Training": new skillProperties("Sniper", "67", "sniperC", "Backflip a large distance.\nYou cannot be hit while rolling.", "Utility"),
    "Spotter_SCAN": new skillProperties("Sniper", "68", "sniperV", "Send your Spotter out to analyze the most dangerous enemy, increasing critical strike chance against it by 100%.", "Special"),
    "Spotter_ISOLATE": new skillProperties("Sniper", "69", "sniperVBoosted", "Send your Spotter out to analyze the most dangerous enemy, slowing and increasing critical strike chance against it by 100%.", "Special"),
    "Spotter_RECALL": new skillProperties("Sniper", "70", "sniperVRecall", "Cancel the current Spotter operation, returning it to you.", "Special"),
    "Reload": new skillProperties("Sniper", "71", "sniperZReload", "Reload your sniper rifle, gaining 30-60% bonus damage if timed in the colored zone.", "Primary"),
    "Improvise": new skillProperties("Sniper", "72", "sniperZ2", "Swing your rifle in front of you, dealing 120% damage and knocking enemies back.", "Primary"),
    "Quickscope": new skillProperties("Sniper", "73", "sniperX2", "Rapidly take aim, dealing damage within a moving reticle.\nOn release, fire a bullet for 600% damage.", "Secondary"),
    "Heavy_Recoil": new skillProperties("Sniper", "74", "sniperC2", "Fire at the ground, launching yourself up and away. Deals 200% damage.", "Utility"),
    
    // Acrid
    "Festering_Wounds": new skillProperties("Acrid", "75", "acridZ", "Maul an enemy for 120% damage. The target is poisoned for 24% damage per second.", "Primary"),
    "Neurotoxin": new skillProperties("Acrid", "76", "acridX", "Spit toxic bile for 220% damage, stunning enemies in a line for 1 second.", "Secondary"),
    "Caustic_Sludge": new skillProperties("Acrid", "77", "acridC", "Secrete poisonous sludge for 2 seconds. Speeds up allies, while slowing and hurting enemies for 90% damage.", "Utility"),
    "Epidemic": new skillProperties("Acrid", "78", "acridV", "Release a deadly disease, poisoning enemies for 100% damage per second. The contagion spreads to two targets after 1 second.", "Special"),
    "Pandemic": new skillProperties("Acrid", "79", "acridVBoosted", "Release a deadly disease, poisoning enemies for 100% damage per second. The contagion spreads to two targets after 1 second. If an enemy is killed by Pandemic, you are healed.", "Special"),
    "Corrosive_Wounds": new skillProperties("Acrid", "80", "acridZ2", "Maul enemies for 80% damage. Targets are corroded, and take 10% extra damage from all sources.", "Primary"),
    "Toxic_Bubble": new skillProperties("Acrid", "81", "acridX2", "Spit out a Toxic Bubble, dealing 60% damage over time, and slowing enemies, exploding for 600% damage after 5 seconds. \nCan be pushed by attacking.", "Secondary"),
    "Dissolving_Ambush": new skillProperties("Acrid", "82", "acridC2", "Spit out a poisonous blob, forming a puddle that slows and hurts enemies for 100% damage. Use a second time to dissolve into acid and warp to the puddle, dealing 400% damage.", "Utility"),
    
    // Mercenary
    "Laser_Sword": new skillProperties("Mercenary", "83", "mercenaryZ", "Slash in front of you, damaging up to 3 enemies for 130% damage.", "Primary"),
    "Whirlwind": new skillProperties("Mercenary", "84", "mercenaryX", "Quickly slice twice, dealing 2x80% damage to all nearby enemies.", "Secondary"),
    "Blinding_Assault": new skillProperties("Mercenary", "85", "mercenaryC", "Dash forwards, stunning enemies for 120% damage. If you hit an enemy, you can dash again, up to 3 times.", "Utility"),
    "Eviscerate": new skillProperties("Mercenary", "86", "mercenaryV", "Target the nearest enemy, attacking them for 6x110% damage.\nYou cannot be hit for the duration.", "Special"),
    "Massacre": new skillProperties("Mercenary", "87", "mercenaryVBoosted", "Target the nearest enemy, attacking them for 6x110% damage. \nYou cannot be hit for the duration. Refreshes duration on kills, jumping to nearby enemies.", "Special"),
    "Focused_Strike": new skillProperties("Mercenary", "88", "mercenaryX2", "Hold to sheathe your weapon. Release before an incoming strike to parry enemy attacks for 500%-1000% damage to all nearby enemies.", "Secondary"),
    "Skyward_Assault": new skillProperties("Mercenary", "89", "mercenaryC2", "Dash upwards damaging enemies for 200% damage. Press again to slam down for 400% damage.", "Utility"),
    "After-Image": new skillProperties("Mercenary", "90", "mercenaryV2", "Focus briefly, channeling energy into an after-image. All attacks are doubled for three seconds. \nStacks twice.", "Special"),
    "Between_Time": new skillProperties("Mercenary", "91", "mercenaryV2Boosted", "Focus briefly, channeling energy into multiple clones. All attacks are quadrupled for five seconds. \nStacks twice.", "Special"),
    
    // Loader
    "Knuckleboom": new skillProperties("Loader", "92", "loaderZ", "Batter nearby enemies for 120% damage. Every third hit deals 240% damage and knocks enemies upwards.", "Primary"),
    "Debris_Shield": new skillProperties("Loader", "93", "loaderX", "Become invincible for 2 seconds while also increasing your movement speed.", "Secondary"),
    "Hydraulic_Gauntlet": new skillProperties("Loader", "94", "loaderC", "Fire your gauntlet and pull yourself forward, stunning and hurting enemies for 210% damage.\nCan be angled upwards.", "Utility"),
    "M440_Conduit": new skillProperties("Loader", "95", "loaderV", "Place a lightning rod. After placing two, lightning surges between them, dealing 80% damage per second for 9 seconds.", "Special"),
    "M700X_Discharge_Conduit": new skillProperties("Loader", "96", "loaderVBoosted", "Place a lightning rod. After placing two, lightning surges between them, dealing 80% damage per second for 9 seconds and stunning initial enemies.", "Special"),
    "Bullet_Punch": new skillProperties("Loader", "97", "loaderZ2", "Charge up and slam enemies forward, for up to 1000% damage.", "Primary"),
    "Short_Circuit": new skillProperties("Loader", "98", "loaderX2", "Crash down and stun enemies in a large radius, for 350% damage.", "Secondary"),
    "S260_Conduit": new skillProperties("Loader", "99", "loaderV2", "Place a lightning beacon. Lightning surges to any nearby allies within a radius, dealing 80% damage per second, and massively increasing attack speed.", "Special"),
    "S260_Overload_Conduit": new skillProperties("Loader", "100", "loaderV2Boosted", "Place a lightning beacon. Lightning surges to any nearby allies within a large radius, dealing 80% damage per second, and massively increasing attack speed.", "Special"),
    
    // Chef
    "DICE": new skillProperties("Chef", "101", "chefZ", "THROW CLEAVER TOWARDS CUSTOMERS FOR 100% DAMAGE. BOOMERANGS BACK.", "Primary"),
    "SEAR": new skillProperties("Chef", "102", "chefX", "COOK CUSTOMERS FOR 260% DAMAGE UNTIL GOLDEN BROWN, KNOCKING THEM AWAY.\nSEARING GLAZED CUSTOMERS DEALS +78% DAMAGE AND STUNS.", "Secondary"),
    "GLAZE": new skillProperties("Chef", "103", "chefC", "RIDE A WAVE OF OIL, SLOWING CUSTOMERS.", "Utility"),
    "SECOND_HELPING": new skillProperties("Chef", "104", "chefV", "PREPARE A MASTER MEAL, BOOSTING THE NEXT ABILITY CAST.", "Special"),
    "FULL_COURSE_MEAL": new skillProperties("Chef", "105", "chefVBoosted", "PREPARE A MASTER MEAL, BOOSTING THE NEXT TWO ABILITY CASTS.", "Special"),
    "SLICE": new skillProperties("Chef", "106", "chefZ2", "STRETCH YOUR ARMS AND SLASH CUSTOMERS FOR 120% DAMAGE.", "Primary"),
    "OIL_JAR": new skillProperties("Chef", "107", "chefC2", "TOSS OUT A FRAGILE JAR OF OIL, SPREADING AND SLOWING CUSTOMERS. SLIDE WHILE IN OIL.", "Utility"),
    "COOK": new skillProperties("Chef", "108", "chefV2", "RAPIDLY PREPARE MEAL OUT OF CUSTOMERS FOR 6x80% DAMAGE. SLAIN CUSTOMERS BECOME TASTY TEMPORARY MEAL ITEMS. CANNOT CRIT.", "Special"),
    "BUFFET": new skillProperties("Chef", "109", "chefV2Boosted", "RAPIDLY PREPARE MEAL OUT OF CUSTOMERS FOR 12x80% DAMAGE. SLAIN CUSTOMERS BECOME TASTY TEMPORARY MEAL ITEMS. CANNOT CRIT.", "Special"),
    
    // Pilot
    "Clusterfire": new skillProperties("Pilot", "110", "pilotZ", "Fire weapon for 95% damage. Every third hit pierces and deals 190% damage.", "Primary"),
    "Target_Acquired!": new skillProperties("Pilot", "111", "pilotX", "Shoot diagonally upward for 3x115% damage. If airborne, shoot downward instead. Hold to fire continuously.", "Secondary"),
    "Rapid_Deployment": new skillProperties("Pilot", "112", "pilotC", "Launch into the air, stunning enemies and activating a parachute. If airborne, launch forwards instead.", "Utility"),
    "Airstrike": new skillProperties("Pilot", "113", "pilotV", "Dash backwards, leaving a bomb that knocks enemies into the air for %150 damage. Can trigger multiple Times. If airborne, dash upwards and drops a bomb directly below instead.", "Special"),
    "Air_Raid": new skillProperties("Pilot", "114", "pilotVBoosted", "Dash backwards, leaving a bomb that knocks enemies up in the air for %185 damage and stunning. Can trigger multiple Times. If airborne, dash upwards and drops a bomb directly below instead.", "Special"),
    "Rapid_Fire": new skillProperties("Pilot", "115", "pilotZ2", "Rapidly fire weapon for 75% damage.", "Primary"),
    "Aerobatics": new skillProperties("Pilot", "116", "pilotC2", "Dash forwards, briefly becoming invincible.\nCan latch onto and climb walls upon dashing onto one.", "Utility"),
    "Aerial_Support": new skillProperties("Pilot", "117", "pilotV2", "Mark an enemy in front of you, launching an airstrike for 10x120% damage over time.", "Special"),
    "Aerial_Barrage": new skillProperties("Pilot", "118", "pilotV2Boosted", "Mark an enemy in front of you, launching airstrike for 20x120% damage over time.", "Special"),
    
    // Artificer
    "Flame_Chakrams": new skillProperties("Artificer", "119", "artiZ", "Toss out a chakram for 45% damage. Hits up to 5 times at its peak and ignites for a stacking 10% damage over time, before returning.", "Primary"),
    "Charged_Nanobomb": new skillProperties("Artificer", "120", "artiX", "Charge up and launch an electric bomb for 180%-600% damage, stunning enemies in range.", "Secondary"),
    "Frost_Barrier": new skillProperties("Artificer", "121", "artiC", "Create a wall of ice that blocks most enemies and distracts them. When broken, explodes and freezes enemies for 100% damage.", "Utility"),
    "Flamethrower": new skillProperties("Artificer", "122", "artiV", "Burn enemies in front of you for 10x80% damage and ignites them for 20% damage over time.", "Special"),
    "Incinerator": new skillProperties("Artificer", "123", "artiVBoosted", "Burn enemies in front of you for 12x100% damage and ignites them for 30% damage over time.", "Special"),
    "Pulse_Spear": new skillProperties("Artificer", "124", "artiX2", "Toss an electric spear for 300% damage. Cast again mid-flight to pulse the spear, allowing it to briefly pierce through enemies. \nSuccessful pierces refresh your ability to pulse.", "Secondary"),
    "Tectonic_Surge": new skillProperties("Artificer", "125", "artiC2", "Shatter the earth below you, launching you into the air. Cast mid-air to create a temporary platform to stand on.\nGravity is reduced briefly afterward.", "Utility"),
    "Localized_Sun": new skillProperties("Artificer", "126", "artiV2", "Summon a miniature, movement tracking star, dealing 120% damage over time. Explodes for 1000% damage after 5 seconds.", "Special"),
    "Binary_Star": new skillProperties("Artificer", "127", "artiV2Boosted", "Summon two miniature,  movement tracking stars, dealing 120% damage over time. Both explode for 2x1000% damage after 5 seconds.", "Special"),
    
    // Drifter
    "Blunt_Force": new skillProperties("Drifter", "128", "drifterZ", "3-hit Combo, hit enemies in a wide range for 120%-240% damage. Each hit in the combo has an added chance to generate scrap.", "Primary"),
    "Cleanup": new skillProperties("Drifter", "129", "drifterX", "Toss out some of your spare scrap, spawning 4 bouncing, piercing projectiles for 55% damage each. Small Chance to spawn special projectiles.", "Secondary"),
    "Suffocate": new skillProperties("Drifter", "130", "drifterC", "Slam enemies with your bag for 200% damage, and stunning them. If the enemy is under 20% health, Consume them; converting them into scrap.", "Utility"),
    "Salvage": new skillProperties("Drifter", "131", "drifterV", "Consume a large amount of scrap to spawn 4 temporary items.", "Special"),
    "Recover": new skillProperties("Drifter", "132", "drifterVBoosted", "Consume a large amount of scrap to spawn 6 temporary items.", "Special"),
    "Scrap_Cube": new skillProperties("Drifter", "133", "drifterX2", "Consume a small amount of scrap and toss out a large scrap cube. \nThe cube can be pushed and shattered, dealing 150% damage while pushed. Fragile!", "Secondary"),
    "Tornado_Slam": new skillProperties("Drifter", "134", "drifterC2", "Spin around wildly, slamming enemies with your bag for 100% damage.\nIncreases your speed and lowers your gravity.", "Utility"),
    "Recycle": new skillProperties("Drifter", "135", "drifterV2", "Consume a large amount of scrap to re-roll a pickup.", "Special"),
    "Rebuild": new skillProperties("Drifter", "136", "drifterV2Boosted", "Consume a large amount of scrap to re-roll a pickup, and an additional temporary copy.", "Special"),
    
    // Robomando
    "SINGLE_FIRE": new skillProperties("Robomando", "138", "robomandoZ", "SHOOT ONCE FOR 60% DAMAGE.", "Primary"),
    "DE-ESCALATE": new skillProperties("Robomando", "139", "robomandoX", "FIRE A SMALL ELECTRICAL CHARGE THAT PIERCES ENEMIES FOR 180% DAMAGE, STUNNING THEM.", "Secondary"),
    "EVASIVE_MANEUVER": new skillProperties("Robomando", "140", "robomandoC", "ATTEMPT TO DIVE FORWARD A SMALL DISTANCE.\nYOU CANNOT BE HIT EARLY IN THE MANEUVER.", "Utility"),
    "RE-WIRE": new skillProperties("Robomando", "141", "robomandoV", "RE-WIRE A MECHANICAL OBJECT, ACTIVATING IT FOR FREE.", "Special"),
    "OVER-WIRE": new skillProperties("Robomando", "142", "robomandoVBoosted", "RE-WIRE A MECHANICAL OBJECT, ACTIVATING IT FOR FREE, WITH A 20% CHANCE TO DOUBLE OUTPUT.", "Special"),

    // Player Drone
    "Fire": new skillProperties("PlayerDrone", "137", "playerDroneZ", "Fire once for 80% damage.", "Primary")
}


function showSkillDescription(filename) {
    skillName.textContent = replaceAll(filename, '_', ' ');
    if (skillDict.hasOwnProperty(filename)) {
        var skillProp = skillDict[filename];

        skillDescription.textContent = skillProp.skill_description;
        //Adds spans for color description color coding
        skillDescription.innerHTML   = skillDescription.innerHTML.replaceAll(numberRegex, ' <span style="color: cyan"> $1 </span> ')
        skillDescription.innerHTML = skillDescription.innerHTML.replaceAll(operatorRegex, '<span style="color: #FF6633">$1</span>')
        skillDescription.innerHTML = skillDescription.innerHTML.replaceAll(moneyRegex, '<span style="color: yellow">$</span>')

        skillCategory.textContent = skillProp.skill_category;
        if (skillProp.skill_id === ""){
            skillID.textContent = "Missing skill ID";
        }
        else{
            skillID.textContent = "Skill ID: " + skillProp.skill_id;
        }
    }
}

function hideSkillDescription(filename) {
    skillName.textContent = ""
    skillCategory.textContent = ""
    skillDescription.textContent = ""
    skillID.textContent = ""
}

function addSkillDiv(filename, skillProperty){
    var button = document.createElement("button");
    button.type = 'submit'

    var skill_icons = document.getElementById(skillProperty.survivor+"-skill-text")
    skill_icons.after(button)
    
    var div = document.createElement("div")
    div.classList.add(filename)
    div.id = filename
    div.onmouseover = function(){showSkillDescription(filename)}
    div.onmouseout = function(){hideSkillDescription(filename)}
    button.appendChild(div)

    var img = document.createElement("img")
    img.draggable = false
    img.src="pics/Skills_Survivor/"+skillProperty.survivor+"/"+filename+".png"
    img.alt="Skill"
    img.style.height = "50px"
    img.style.width = "auto"
    img.onmousedown = function(){preventRightclick(this)}
    div.appendChild(img)
}

// Add display

function showPage(shown, hidden) {
    document.getElementById(hidden).style.display='none';
    document.getElementById(shown).style.display='flex';
    return false;
}

var itemsArray = Object.keys(itemDict).map(function(key) {
    return [key, itemDict[key]];
});
//Sort the array based on field
itemsArray.sort(function(first, second){
    return second[1].item_id - first[1].item_id
});


for (const [filename, itemProperty] of itemsArray) {
    addItemDiv(filename, itemProperty)
}

// Create skills array
var skillsArray = Object.keys(skillDict).map(function(key) {
    return [key, skillDict[key]];
});
//Sort the array based on field
skillsArray.sort(function(first, second){
    return second[1].skill_id - first[1].skill_id
});

for (const [filename, skillProperty] of skillsArray) {
    addSkillDiv(filename, skillProperty)
}
