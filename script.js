// style
const itemName = document.getElementById('item-name');
const description = document.getElementById('item-description');
const pickup = document.getElementById('item-pickup');
const category = document.getElementById('item-category');
const unlock = document.getElementById('item-unlock');
const item_id = document.getElementById('item-id');
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
    constructor(item_id="", description="", pickup="", category="", unlock="Unlocked by default.", drop="", aquisition="") {
        this.description = description;
        this.pickup = pickup;
        this.category = category;
        this.unlock = unlock;
        this.item_id = item_id;
        this.drop = drop;
        this.aquisition = aquisition;     
    }
}

// dicts
const itemDict = {
    // Placeholder
    //"Name": new itemProperties("Description", "PickupText", "Category", "UnlockCondition", "ID"), 
    // Common
    "Backup_Magazine": new itemProperties( "87", "Add +1 (+1 per stack) charge of your Secondary skill.", "Add an extra charge of your Secondary skill.", "Utility"),
    "Barbed_Wire": new itemProperties("7","Hurt 1 enemy within 1m (+0.2m per stack) for 50% (+10% per stack) damage every 0.5 seconds.", "Hurts nearby enemies.", "Damage", ),
    "Meat_Nugget": new itemProperties("0", "8% chance on hit to drop 2 meat nuggets that heal for 2x8 (+6 per stack) health.", "Enemies drop chunks of healing meat.", "Health"),
    "Fire_Shield": new itemProperties("1","After taking more than 10% of your health as damage, explode for 400% (+200% per stack) damage, knocking enemies away (+20% force per stack).", "Retaliate on taking heavy damage.", "Damage"),
    "Bustling_Fungus": new itemProperties("2","After standing still for 2 seconds, heal for 4.5% (+4.5% per stack) of your health every second to yourself and nearby allies.", "Heal quickly when standing still for 2 seconds.", "Health"),
    "Lens_Maker's_Glasses": new itemProperties("3", "Your attacks have a 10% (+7% per stack) chance to 'Critically Strike', dealing double damage.", "Chance to deal double damage.", "Damage"),
    "Sprouting_Egg": new itemProperties("4", "After not being hit for 7 seconds, increase health regeneration by 2.4 (+2.4 per stack) hp per second.", "Rapidly heal outside of danger.", "Health"),
    "Headstompers": new itemProperties("5", "Hurt enemies by falling for up to 600% (+300% per stack) damage.", "Hurt enemies by falling.", "Damage"),
    "Life_Savings": new itemProperties("6", "Generate $1 (+$1 per stack) every 3 seconds. Scales with time.", "Gain gold over time.", "Utility"),
    "Rusty_Knife": new itemProperties("8", "15% (+15% per stack) chance to bleed an enemy for 4x35% TOTAL damage.", "Chance to bleed on hit.", "Damage"),
    "Mysterious_Vial": new itemProperties("9", "Increase health regeneration by 0.84 (+0.84 per stack) hp per second.", "Increased health regeneration.", "Health"),
    "Mortar_Tube": new itemProperties("10", "9% chance on hit to fire a mortar for 170% (+170% per stack) TOTAL damage.", "Chance to launch a mortar.", "Damage"),
    "Warbanner": new itemProperties("11", "On level up or activating the Teleporter, drop a banner that strengthens all allies within 4.6m (+1.4m per stack). Raise attack and movement speed by 30% and damage by 4. Also heals for 1% of your health every second.", "Drop a Warbanner on level up or activating the teleporter, giving you great strength.", "Utility"),
    "Monster_Tooth": new itemProperties("12","Killing an enemy heals you for 10 (+5 per stack) health.", "Heal after kills.", "Health"),
    "Soldier's_Syringe": new itemProperties("20", "Increases attack speed by 12% (+12% per stack).", "Increases attack speed.", "Utility"),
    "Crowbar": new itemProperties("13", "Deal +50% (+30% per stack) damage to enemies above 80% health.", "Deal bonus damage to healthy monsters.", "Damage"),
    "Medkit": new itemProperties("14","Heal for 10 (+10 per stack) health 1.5 seconds after getting hurt.", "Receive a delayed heal after taking damage.", "Health"),
    "Bundle_of_Fireworks": new itemProperties("15", "Activating an interactable launches 6 (+3 per stack) fireworks that deal 300% base damage.", "Activating an interactable launches fireworks at nearby enemies.", "Damage"),
    "Topaz_Brooch": new itemProperties("91", "Killing an enemy grants 15 barrier (+15 per stack).", "Kills grant temporary barrier.", "Health"),
    "Taser": new itemProperties("16", "7% chance on hit to snare enemies for 1.5 (+0.5 per stack) seconds.", "Chance to snare on hit.", "Utility", "Loader: Travel 6,500 meters using the Hydraulic Gauntlet."),
    "Paul's_Goat_Hoof": new itemProperties("17", "Increases movement speed by 15% (+15% per stack).", "Move faster.", "Utility", "Fail a shrine 3 times in a row."),
    "Bitter_Root": new itemProperties("18","Increases maximum health by 8% (+8% per stack).", "Increases maximum health by 8%.", "Health", "Reach 650 health."),
    "Sticky_Bomb": new itemProperties("19", "9% chance on hit to attach a bomb to an enemy, detonating for 140% (+140% per stack) TOTAL damage.", "Chance to attach a bomb to enemies.", "Damage", "Engineer: Detonate 15 Bounding Mines within 5 seconds."),
    "Snake_Eyes": new itemProperties("21", "Failing a shrine increases critical chance by 7% (+7% per stack), up to 6 times. Resets at the start of each stage.", "Gain increased critical strike chance on failing a shrine. Resets between stages.", "Damage", "Pass a shrine 4 times in a row."),
    "Hermit's_Scarf": new itemProperties("22", "10% (+10% per stack) chance to evade incoming damage.", "Chance to evade incoming damage.", "Utility", "Huntress: Achieve 200% attack speed."),
    "Gasoline": new itemProperties("23", "Killing enemies burns the ground for 60% (+40% per stack) damage.", "Killing enemies sets the ground on fire.", "Damage", "Defeat 20 Lemurians in one playthrough."), 
    "Spikestrip": new itemProperties("24", "When hit, drop spikestrips that snare enemies for 1 (+0.5 per stack) second.", "Drop spikestrips on being hit, snaring enemies.", "Damage", "Enforcer: Block 2000 damage total with your shield."),
    "Mocha": new itemProperties("89", "Increases movement speed by 7.5% (+7.5% per stack) and attack speed by 6% (+6% per stack).	", "Slightly increase attack speed and movement speed.", "Utility", "Level up to level 20."), 
    "Voltaic_Mitt": new itemProperties("92", "Climbing creates an electric trail that deals 50% damage (+30% per stack).", "Climbed ropes are electrified.", "Damage", "Complete the Providence Trial \"Hot-Rope Hop\"."), 
    "The_Toxin": new itemProperties("99", "Infect enemies on contact for 3 seconds, causing them to receive 30% (+15% per stack) extra damage from all sources.", "Touch enemies to weaken them.", "Damage", "Find the illegal shipment."), 
    "Mu_Construct": new itemProperties("96", "Heal by 2.5% of your maximum health every 5 (-25% per stack) seconds after the Teleporter has been activated.", "Heal periodically after activating the teleporter.", "Health", "Find this item hidden somewhere in the world to unlock it."), 
    "Razor_Penny": new itemProperties("100", "Gain 3% critical chance (+3% per stack). Critical strikes drop $1 (+1$ per stack) gold.", "Slightly increased Critical strike chance. Critical strikes give you gold.", "?", "Kill 12 enemies simultaneously using the Gold-Plated Bomb."), 
    "Arcane_Blades": new itemProperties("97", "Increases movement speed by 30% (+30% per stack) after the Teleporter has been activated.", "Move faster after activating the Teleporter.", "Utility", "Complete the Providence Trial \"Kited Blades\"."),
    // Uncommon
    "Time_Keeper's_Secret": new itemProperties("25", "Falling below 25% health stops time for 3 (+1 per stack) seconds. Recharges after 7 minutes.", "Falling to low health stops time.", "Utility"),
    "Smart_Shopper": new itemProperties("26", "Killed enemies drop 25% (+25% per stack) more gold.", "Enemies drop extra gold.", "Utility"),
    "Infusion": new itemProperties("27", "Killing an enemy increases your health permanently by 1 (+0.5 per stack).", "Killing an enemy permanently increases your health.", "Health"),
    "Will-o'-the-wisp": new itemProperties("28", "33% chance on killing an enemy to create a lava pillar for 300% (+200% per stack) damage, knocking enemies upwards.", "Chance to detonate enemies on kill.", "Damage"),
    "AtG_Missile_Mk._1": new itemProperties("29", "10% (+10% per stack) chance on hit to fire a missile that deals 300% TOTAL damage.", "Chance to fire a missile.", "Damage"),
    "Tough_Times": new itemProperties("30", "Increase armor by 14 (+14 per stack).", "Reduce incoming damage by 14%.", "Utility"),
    "Energy_Cell": new itemProperties("31", "Increases attack speed by up to 40% (+30% per stack) at low health.", "Attack faster at lower health.", "Utility"),
    "Rusty_Jetpack": new itemProperties("32", "Decrease gravity while holding the jump button by 10% (-10% per stack) and increase jump height (increases per stack).", "Increase jump height and reduce gravity.", "Utility"),
    "Leeching_Seed": new itemProperties("33", "Attacking enemies heals you for 2 (+1 per stack) health.", "Attacking enemies heals you.", "Health"),
    "Ukulele": new itemProperties("34", "20% chance on hit to fire chain lightning for 66% (+66% per stack) TOTAL damage on up to 3 targets.", "..and his music was electric.", "Damage"),
    "Boxing_Gloves": new itemProperties("35", "6% (+6% per stack) chance on hitting enemies to knock them back for 100% TOTAL damage.", "Chance to knock enemies backwards for extra damage.", "Utility"),
    "Prison_Shackles": new itemProperties("36", "Slow enemies on hit for -50% movement speed for 1.5 (+0.5 per stack) seconds.", "Slow enemies on attack.", "Utility"),
    "Guardian's_Heart": new itemProperties("37", "Gain a 60 (+60 per stack) health shield. Recharges when outside of danger for 7 seconds.", "Gain a shield. Recharges outside of danger.", "Health"),
    "Hopoo_Feather": new itemProperties("38", "Gain +1 (+1 per stack) maximum jump count.", "Gain an extra jump.", "Utility"),
    "Frost_Relic": new itemProperties("39","Killing an enemy temporarily surrounds you with 3 (+1 per stack) icicles that deal 33% damage each every 0.33 seconds.", "Killing enemies surrounds you with icicles.", "Damage"),
    "Red_Whip": new itemProperties("40","Leaving combat for 2 seconds boosts your movement speed by 60% (+60% per stack).", "Move fast out of combat.", "Utility"),
    "Chargefield_Generator": new itemProperties("41", "Killing an enemy creates a ring of lightning that deals 50% (+20% per stack) damage every 0.5 seconds to 50% of enemies within. The ring starts with a radius of 4.7m and grows by 1.3m each kill up to 40m. Lasts for 6 seconds without killing enemies.", "Create a ring of lightning after killing an enemy. Lasts 6 seconds.", "Damage", "Mercenary: Eviscerate 50 enemies."),
    "Arms_Race": new itemProperties("42", "Drones gain a 5% (+5% per stack) chance on hit to fire a missile for 300% TOTAL damage, and a 9% chance on hit to fire a mortar for 85% (+85% per stack) TOTAL damage. Summons a unique drone which regenerates each stage.", "Drones are equipped with explosive weaponry. Summons a drone helper.", "Damage", "HAN–D: Kill 10 enemies simultaneously with FORCED_REASSEMBLY."),
    "Golden_Gun": new itemProperties("43", "Deal bonus damage based on current gold, up to 40% damage. Caps at 700 (-50% per stack) gold. Scales with time.", "More gold, more damage.", "Damage", "Bank 20,000 gold."),
    "56_Leaf_Clover": new itemProperties("44", "Elite mobs have a 4% (+1.5% per stack) chance to drop items.", "Elite mobs have a chance to drop items.", "Utility", "Kill the Scavenger."),
    "Concussion_Grenade": new itemProperties("45", "6% (+6% per stack) chance on hitting enemies to stun them for 2 seconds.", "Chance to stun enemies.", "Utility", "Engineer: Kill a boss in 15 seconds or less."),
    "Filial_Imprinting": new itemProperties("46", "Hatch 1 (+1 per stack) strange creature who drops buffs every 20 seconds. Buffs temporarily boost either movement speed, attack speed, or health regen.", "Hatch a strange creature who drops buffs periodically.", "Utility", "Drown 20 Whorls."),
    "Dead_Man's_Foot": new itemProperties("47", "Chance when damaged to drop a poison mine that deals 150% damage and poisons for x600% (+450% per stack) damage over time. Chance to drop starts at 15% and increases with low health.", "Drop a poison trap at low health.", "Damage", "Find the bloated survivor."),
    "Toxic_Centipede": new itemProperties( "48", "Infect a nearby enemy on contact for 6 (+2 per stack) seconds, dealing 50% damage every 0.5 seconds. Bounces to other enemies if the target dies. Recharges every 6 (-33% per stack) seconds.	", "Infected!", "Damage", "Acrid: Spread 3,300 feet of caustic sludge."),
    "Harvester's_Scythe": new itemProperties("49", "Gain 5% critical chance. Critical strikes heal for 8 (+2 per stack) health.", "Critical hits heal you.", "Health", "Use a health shrine that drops you below 5% health."),
    "Panic_Mines": new itemProperties("50", "Chance when damaged to drop 1 (+1 per stack) mine that deals 400% damage. Chance to drop starts at 15% and increases with low health.", "Drop a mine at low health.", "Damage", "Miner: Survive the teleporter event without falling below 50% health."),
    "Predatory_Instincts": new itemProperties("51", "Gain 5% critical chance. Critical strikes increase attack speed by 10% (+7% per stack). Maximum cap of 30% (+21% per stack) attack speed.", "Critical strikes increase attack speed. Buff stacks 5 times.", "Damage", "Huntress: Defeat the Ancient Wisp without taking damage."),
    "Royal_Medallion": new itemProperties("94", "10% chance on hitting a boss monster to drop a buffing wisp that improves health regen, attack speed, move speed, and base damage for 10 (+6 per stack) seconds.", "Bosses drop powerful buffing wisps when hit.", "Utility", "Get a gold rank on at least 5 Providence Trials."),
    "Prophet's_Cape": new itemProperties("101", "Briefly blocks all incoming damage upon being struck (Recharging after 15 seconds). Blocking damage heals you for 3 (+1 per stack) health.", "All blocked damage heals you.", "Health", "Commando: Dodge 7 lethal attacks"),
    "Locked_Jewel": new itemProperties("102", "Activating an interactable heals 35% (+15% per stack) of your maximum barrier and grants $8 (scales with time).", "Activating an interactable grants barrier and gold.", "Health", "Reach max barrier."),
    "Hunter's_Harpoon": new itemProperties("104", "Killing an enemy increases movement speed by 125% for 1 (+1 per stack) second. Consecutive kills increase buff duration for up to 25 seconds.", "Killing an enemy grants a temporary burst of speed.", "Utility", "Complete the Providence Trial \"A Toxic Path\"."),
    "Insecticide": new itemProperties( "105", "10% (+5% per stack) chance on hit to spray an enemy dealing 10% damage per second. Spray stacks up to 10 times. Killing enemies heals for 10 (+5 per stack) health per stack of spray.", "Chance to apply damage over time. Heal if the enemy dies.", "Damage", "Complete the Providence Trial \"Get Off My Lawn!\"."),
    "Decaying_Sample": new itemProperties("106", "Gain two orbiting spheres that strike for 100% (+ 50% stack) damage every 0.25 seconds.", "Gain an orbiting follower that damages enemies.", "Damage", "Complete the Providence Trial \"Main Systems Offline\"."),
    // Rare
    "Thallium": new itemProperties("52", "10% (+10% per stack) chance on hit to damage by up to 2x500% enemy damage per second and slow for up to -150% movement speed over the course of 3 seconds.", "Chance to slow and damage enemies over time.", "Damage"), 
    "Tesla_Coil": new itemProperties("53", "Passively shock nearby enemies for 120% (+60% per stack) damage.", "Passively shock nearby enemies.", "Damage"), 
    "Old_Box": new itemProperties("54", "Chance when damaged to drop a jack-in-the-box, fearing enemies for 2 (+1 per stack) seconds. Chance to drop starts at 10% and increases with low health.", "Chance when damaged to drop a jack-in-the-box, fearing enemies.", "Utility"), 
    "Beating_Embryo": new itemProperties("55", "Equipment has a 30% (+30% per stack) chance to deal double the effect.", "Equipment has a chance to deal double the effect.", "Utility"), 
    "Permafrost": new itemProperties("56", "13% chance on hit to freeze enemies for 1.5 seconds while slowing by -80% movement speed for 3 (+1.5 per stack) seconds.", "Chance on hit to freeze enemies while also slowing.", "Utility"), 
    "AtG_Missile_Mk._2": new itemProperties("57", "7% (+7% per stack) chance on hit to fire three missiles that deal 3x300% TOTAL damage.", "Hooah.", "Damage"), 
    "Happiest_Mask": new itemProperties("58", "Killed enemies spawn ghosts that last 15 seconds with 100% (+20% per stack) health and 70% (+30% per stack) damage.", "Killed enemies spawn friendly ghosts.", "Damage"), 
    "Plasma_Chain": new itemProperties("59", "Chance on hit to tether onto up to 1 (+1 per stack) enemy dealing 60% damage per 0.5 seconds to any enemies in the path.", "Chance on hit to tether onto up to 1 enemy, dealing damage to any enemies in the path.", "Damage"), 
    "Heaven_Cracker": new itemProperties("60", "Every 4 (-1 per stack) basic attacks pierce through enemies.", "Every 4 basic attacks pierce through enemies.", "Damage"), 
    "Rapid_Mitosis": new itemProperties("61", "Reduce the cooldown of equipment by 25% (+25% per stack).", "Reduce the cooldown of equipment.", "Utility"), 
    "Ceremonial_Dagger": new itemProperties("62", "Killing an enemy fires out 4 (+2 per stack) heat seaking bolts that deal 100% damage.", "Killing an enemy fires spirit bolts.", "Damage"), 
    "Repulsion_Armor": new itemProperties("63", "After 6 hits reflect incoming attacks for 400% damage and increase armor by 100 for 4 (+1 per stack) seconds.", "After taking damage, reflect all attacks for 4 seconds.", "Health"), 
    "Brilliant_Behemoth": new itemProperties("64", "All your attacks explode for a bonus 20% (+20% per stack) TOTAL damage to nearby enemies.", "All your attacks explode!", "Damage"), 
    "Hardlight_Afterburner": new itemProperties("88", "Add +2 (+2 per stack) charges of your Utility skill. Reduces Utility skill cooldown by 33%.", "Add 2 extra charges of your Utility skill. Reduce Utility skill cooldown.", "Utility"), 
    "Interstellar_Desk_Plant": new itemProperties("65", "	Upon killing an enemy, spawn an alien plant that heals you for 3% of your maximum health and recharges after 4 seconds. Plant lasts 15 (+5 per stack) seconds.", "Sprout a tree on kill, granting healing fruits.", "Healing", "CHEF: SEAR/FLAMBE 20 Sand Crabs."), 
    "Laser_Turbine": new itemProperties("66", "Using skills charges the generator by 7.8% (+7.8% per stack) per second. At full power, fire a laser for 2000% damage.", "Using skills charges up to a huge laser blast.", "Damage", "CHEF: Have 20 cleavers out at once."), 
    "Wicked_Ring": new itemProperties("67", "Gain 5% (+10% per stack) critical chance. Critical strikes reduce cooldowns by 1 second.", "Critial strikes reduce all your cooldowns by 1.", "Utility", "Collect 4 keycards."), 
    "Alien_Head": new itemProperties("68","Decrease your skill cooldowns by 30% (+30% per stack).", "Reduces cooldowns for your skills.", "Utility", "	Obtain 7 Monster Teeth and 1 Guardian's Heart."), 
    "The_Ol'_Lopper": new itemProperties("69", "Deal bonus damage to enemies with lower health, up to +60% (+60% per stack) damage.", "Enemies take more damage at lower health.", "Damage", "Survive 40 minutes."), 
    "The_Hit_List": new itemProperties("70", "Randomly marks up to 1 (+1 per stack) enemy. Killing a marked enemy permanently increases damage by 0.5, up to 20 damage.", "Killing marked enemies permanently increases damage.", "Damage", "Bandit: Reset your cooldown 15 times consecutively."), 
    "Photon_Jetpack": new itemProperties("71", "Hold the jump button to fly for up to 1.6 (+0.8 per stack) seconds. Recharges over 1.6 seconds.", "No hands.", "Utility", "End a teleporter timer with 0 enemies on the map."), 
    "Shattering_Justice": new itemProperties("72", "Attacks reduce enemy armor by 6 for 2 (+2 per stack) seconds. Reduction stacks up to -30 armor.", "Reduce enemy armor on hit. Reduction stacks 5 times.", "Damage", "Miner: Reach level 10 without getting hurt more than once."), 
    "Telescopic_Sight": new itemProperties("73", "1% (+0.5% per stack) chance on hit to instantly kill enemies. Does not work against bosses.", "Chance to instantly kill an enemy.", "Damage", "Sniper: 1-shot kill 10 enemies consecutively"), 
    "Fireman's_Boots": new itemProperties("74", "Walking leaves behind a fire trail that burns for 35% (+20% per stack) damage.", "Fight fire with fire..", "Damage", "Survive in lava for 1 minute straight."), 
    "Hyper-Threader": new itemProperties("75", "Hitting enemies fires a laser that deals 40% damage and bounces to 2 (+1 per stack) enemies.", "Pew pew.", "Damage", "Complete the Providence Trial \"A Rung Above\"."), 
    "Dio's_Best_Friend": new itemProperties("76", "Taking fatal damage consumes this item and revives you with 40% health and 2 seconds of invulnerability.", "Cheat death once.", "Health", "Die 50 times."), 
    "Ancient_Scepter": new itemProperties("77", "Upgrade your special skill. Unique to each character. Reduces special skill cooldown by 30% per stack.", "Upgrade your special skill.", "Utility", "Mercenary: Beat the game on Monsoon difficulty."), 
    "Bottled_Chaos": new itemProperties("90", "Activating an Equipment triggers a random equipment effect 1 (+1 per stack) time(s).", "Using your Equipment triggers an additional, random Equipment effect.", "Utility", "Use the same Equipment Activator 5 times."), 
    "Aegis": new itemProperties("92", "Healing past full grants you barrier equal to 50% (+50% per stack) of the amount you healed. Increases maximum barrier by 20% (+20% per stack).", "Healing past full grants you a temporary barrier.Increased maximum barrier.", "Health", "Artificer: Multi-kill 15 enemies."), 
    "Substandard_Duplicator": new itemProperties("95", "Picking up an item gives you a temporary copy of itself. Temporary items last an additional 10 (+10 per stack) seconds", "Picked up items yield an additional temporary copy.", "Utility", "Complete the providence Trial \"A Duplicator?!\"."), 
    "Classified_Access_Codes": new itemProperties("103", "The Atlas Cannon appears each stage, activating it deals 40% (+20% per stack) of maximum health as damage to the teleporter boss after it spawns.", "Access a deadly weapon against the Teleporter bosses.", "Damage", "Complete the Providence Trial \"Emergency Ejection\"."), 
    "Umbrella": new itemProperties("106", "Rain begins for 15 seconds (increases per stack) upon activating the Teleporter. Rain stuns, damages, and weakens enemies. You are invincible while it is raining.", "They fear the rain.", "Utility", "Complete the Providence Trial \"Meteor Showers\"."), 
    // Equipment
    "Rotten_Brain": new itemProperties("","Throw a brain that bounces in place, damaging/slowing enemies for 6x200%.", "Throw a bouncing brain.", ""), 
    "Safeguard_Lantern": new itemProperties("","Drop a lantern for 10 seconds. Fears and damages enemies for 20% damage.", "Drop a lantern that fears and damages enemies for 10 seconds.", ""), 
    "Snowglobe": new itemProperties("","Summon a snowstorm that freezes monsters at a 50% chance/sec over 7 seconds.", "Randomly freeze enemies for 8 seconds.", ""), 
    "Explorer's_Key": new itemProperties("","Open all chests within 20 meters.", "Unlocks all chests in within 20 meters.", ""), 
    "Foreign_Fruit": new itemProperties("","Heal yourself for 50% of your health.", "Heal on use.", ""), 
    "Instant_Minefield": new itemProperties("","Drop 6 mines at your feet, each dealing 400% damage.", "Drop many mines at your feet.", ""), 
    "Jar_of_Souls": new itemProperties("","Duplicate every enemy as a ghost to fight on your side. Ghosts last 15 seconds and have 70% damage.", "Summon a ghost for every enemy in the screen.", ""), 
    "Carrara_Marble": new itemProperties("","Place a marble gate. Teleport back to the gate by activating again.", "Place a marble gate. Teleport back to the gate by activating again.", ""), 
    "Sawmerang": new itemProperties("","Throw out a sawmerang, slicing enemies for 500% damage and making them bleed for 4x100% damage. Boomerangs back.", "Mow them down!", ""), 
    "Shattered_Mirror": new itemProperties("","For 15 seconds, double all your abilities' damage and effects.", "Create a shadow partner for 15 seconds.", ""), 
    "Disposable_Missile_Launcher": new itemProperties("","Fire a swarm of 12 missiles, dealing 300% damage each.", "Fire a swarm of missiles.", ""), 
    "Gold-Plated_Bomb": new itemProperties("","Use 50% of your gold to create a bomb, dealing 1 damage per gold spent. Refund 20% of spent gold on kill.", "Drop and detonate 50% of your money.", ""), 
    "Drone_Repair_Kit": new itemProperties("","All drones are repaired to full health and empowered for 8 seconds. Summons a unique drone.", "Repair and empower all active drones. Summons a unique drone to assist.", ""), 
    "Thqwib": new itemProperties("","Release a bloom of 30 thqwibs, detonating on impact for 200% damage.", "Releases a bloom of Thqwibs, detonating on impact.", ""), 
    "Dynamite_Plunger": new itemProperties("","Hitting an enemy drops dynamite. Use to detonate for 200% damage.", "Hitting enemies drops dynamite. Use to detonate.", ""), 
    "Mace_Replica": new itemProperties("","Swing a powerful mace for 300% damage, knocking enemies away. Guaranteed to activate all on-hit item effects.", "Swing a powerful mace, activating your item effects.", "", "Commando: Activate the 3rd teleporter without being hurt once."), 
    "Gigantic_Amethyst": new itemProperties("","Reset all your cooldowns.", "Resets all your cooldowns.", "", "Loader: Kill the Overloading Magma Worm."), 
    "Crudely-Drawn_Buddy": new itemProperties("","Blow up a decoy, attracting and confusing enemies for 8 seconds. Looks just like you.", "Drop a decoy, attracting nearby enemies.", "", "Sniper: Achieve 15 consecutive perfect reloads."), 
    "Prescriptions": new itemProperties("","Increase damage by 30% and attack speed by 40% for 8 seconds.", "Increase damage and attack speed for 8 seconds.", "", "Enforcer: Stay in Shield Mode for 5 minutes straight (in combat)."), 
    "Shield_Generator": new itemProperties("","Become invincible for 8 seconds.", "Become invulnerable for 8 seconds.", "", "HAN-D: Beat the third stage without falling below 60% health."), 
    "Unstable_Watch": new itemProperties("","Stop time for 7 seconds.", "Pause time for 7 seconds.", "", "Complete the 1st stage in under 5 minutes."), 
    "Lost_Doll": new itemProperties("","Sacrifice 25% health to damage an enemy for 500% of your maximum health.", "Harm yourself to deal massive damage to an enemy.", "", "Survive a boss with less than 20% health."), 
    "Pillaged_Gold": new itemProperties("","For 14 seconds, every hit drops gold.", "For 14 seconds, hitting enemies causes them to drop gold.", "", "Bandit: Kill a boss with Lights Out."), 
    "Captain's_Brooch": new itemProperties("","Call down a chest nearby. Chest cost is doubled.", "One man's wreckage is another man's treasure.", "", "Unlock a golden chest with the Explorer's Key."), 
    "The_Back-Up": new itemProperties("","Create 4 drones to fight for you for 10 seconds.", "Call drones for backup. Lasts 10 seconds.", "", "Have 4 drone helpers at once."), 
    "Super_Massive_Leech": new itemProperties("","For 10 seconds, every hit heals you for 10 health.", "Grant massive life on hit for 10 seconds.", "", "Acrid: Spread Epidemic to 25 enemies."), 
    "Glowing_Meteorite": new itemProperties("","Meteors fall from the sky, damaging enemies and friends for 220% damage. Lasts 8 seconds.", "Rain meteors from the sky, hurting both enemies and allies.", "", "Deal 5000 damage in one shot."), 
    // Boss
    "Legendary_Spark": new itemProperties("78", "8% chance on hit to create 2 (+1 per stack) sparks that smite enemies for 200% TOTAL damage.", "Smite them. Smite them all.", "Item", "", "Ancient Wisp"),
    "Imp_Overlord's_Tentacle": new itemProperties("79", "Summon an imp bodyguard. Revives after 60 (-10 per stack) seconds. Increase imp health and damage by 15% per stack.", "Cut off the head of the snake.. and the body lives on.", "Item", "", "Imp Overlord"),
    "Burning_Witness": new itemProperties("80", "Killing enemies grants a fire trail and 30% movement speed for 6 (+2 per stack) seconds.", "The Worm's eye seems to still see.. watching.. rewarding..", "Item", "", "Magma Worm"),
    "Colossal_Knurl": new itemProperties("81", "Increase maximum health by 40, health regeneration by 1.2/second, and armor by 6.", "Increase health, health regeneration, and armor.", "Item", "", "Colossus"),
    "Ifrit's_Horn": new itemProperties("82", "8% chance on hit to fire a flaming wave that incinerates enemies for 300% (+300% per stack) TOTAL damage.", "Chance to fire a flaming wave.", "Item", "", "Ifrit"),
    "Nematocyst_Nozzle": new itemProperties("","Shoot out 6 nematocysts that deal 400% damage.", "Best served cold.", "Equipment", "", "Wandering Vagrant"),
    "Scorching_Shell_Piece": new itemProperties("98", "Gain a 20 (+20 per stack) health shield. Fire up to 4 (+2 per stack) projectiles at nearby enemies when it breaks.	", "Gain shield. Fire a barrage of projectiles when it breaks.", "Item", "", "Cremator"),
    // Special
    "White_Undershirt_(M)": new itemProperties("83", "Increases armor by 3", "+2 STR S>2m or best offer @@@@@@@@", "Item", "", "", "Drops from the Armored Boarlit on Boar Beach."),
    "Keycard": new itemProperties("84", "Opens locked security doors.", "Opens locked security doors.", "Item", "", "", "Golden Canisters, enemy drops on Risk of Rain."),
    "Small_Enigma": new itemProperties("85", "Reduce the cooldown of equipment.", "Reduce the cooldown of equipment.", "Item", "", "", "Drops whenever an equipment would have with the Artifact of Enigma enabled."),
    "Strange_Battery": new itemProperties("", "The Strange Battery is an special equipment that doesn't have an entry log, its use is part of a series of steps leading to the unlock of a certain character. The Strange Battery can be found on every variant of Temple of the Elders when playing on Drizzle difficulty. It can be found inside an intractable urn, which drops the item when prompted. The urn is typically located along the edges of the stage. A way to differentiate the urn from similar ones throughout the stage is by its design - bearing a plus-shaped symbol connected to two bracket-like shapes.", "Bzzzt.", "Equipment", "", "", "Hidden in a unique interactable vase on all variants of stage 5, but only on Drizzle."),
    "Big_Bison_Steak": new itemProperties("112", "	Increase health regeneration and movement speed.", "Increase health regeneration and movement speed.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Marinated_Lizard_Loaf": new itemProperties("109", "Increased damage.", "Increased damage.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Golem_Essence_on_the_Rocks": new itemProperties("110", "Gain barrier and increased armor.", "Gain barrier and increased armor.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Jelly_Brain_Salad": new itemProperties("108", "Reduces skill cooldowns by 1 second.", "Reduces skill cooldowns by 1 second.", "Meal", "", "", "One of the meals CHEF can produce from COOK."),
    "Fried_Eyeball": new itemProperties("111", "Slow nearby enemies.", "Slow nearby enemies.", "Meal", "", "", "One of the meals CHEF can produce from COOK."), 
}

console.log(itemDict["Name"])

// actual functions
function showDescription(filename) {
    itemName.textContent = replaceAll(filename, '_', ' ');
    if (itemDict.hasOwnProperty(filename)) {
        itemProp = itemDict[filename];
        description.textContent = itemProp.description;
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

function hideDescription(filename) {
    description.textContent = "";
    itemName.textContent = "";
    pickup.textContent = "";
    category.textContent = "";
    unlock.textContent = "";
    item_id.textContent = "";
}



function addDiv(category, filename){
    var button = document.createElement("button");
    button.type = 'submit'

    var item_icons = document.getElementById(category)
    console.log(item_icons)
    item_icons.appendChild(button)
    
    var div = document.createElement("div")
    div.classList.add(filename)
    div.id = filename
    div.onmouseover = function(){showDescription(filename)}
    div.onmouseout = function(){hideDescription(filename)}
    button.appendChild(div)

    var img = document.createElement("img")
    img.draggable = false
    img.src="pics/common/"+filename+".png"
    img.alt="Item"
    img.style.height = "50px"
    img.style.width = "auto"
    img.onmousedown = function(){preventRightclick(this)}
    div.appendChild(img)
}

for (const [filename, itemProperty] of Object.entries(itemDict)) {
    addDiv("item-icons",filename)

}
