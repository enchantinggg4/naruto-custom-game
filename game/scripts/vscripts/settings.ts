// In this file you can set up all the properties and settings for your game mode.
declare let USE_DEBUG_GLOBAL: boolean;
USE_DEBUG_GLOBAL = true;

export const USE_DEBUG = true;						// Should we print statements on almost every function/event call? For debugging.

export const ENABLE_HERO_RESPAWN = true;				// Should the heroes automatically respawn on a timer or stay dead until manually respawned
export const UNIVERSAL_SHOP_MODE = false;				// Should the shops contain all items?
export const ALLOW_SAME_HERO_SELECTION = false;		// Should we let people select the same hero as each other

export const CUSTOM_GAME_SETUP_TIME = 25.0;			// How long should custom game setup last - the screen where players pick a team?
export const HERO_SELECTION_TIME = 10000.0;				// How long should we let people select their hero? Should be at least 5 seconds.
export const STRATEGY_TIME = 0.0;					// How long should strategy time last? Bug: You can buy items during strategy time and it will not be spent!
export const SHOWCASE_TIME = 0;					// How long should show case time be?
export const PRE_GAME_TIME = 90.0;					// How long after showcase time should the horn blow and the game start?
export const POST_GAME_TIME = 60.0;					// How long should we let people stay around before closing the server automatically?
export const TREE_REGROW_TIME = 300.0;				// How long should it take individual trees to respawn after being cut down/destroyed?

export const GOLD_PER_TICK = 2;						// How much gold should players get per tick?
export const GOLD_TICK_TIME = 1.0;					// How long should we wait in seconds between gold ticks?
export const NORMAL_START_GOLD = 600;					// Starting Gold if picked normally
export const RANDOM_START_GOLD = 800;					// Starting Gold if randomed

export const RECOMMENDED_BUILDS_DISABLED = false;		// Should we disable the recommended builds for heroes
export const CAMERA_DISTANCE_OVERRIDE = 1134.0;		// How far out should we allow the camera to go? 1134 is the default in Dota

export const MINIMAP_ICON_SIZE = 1;					// What icon size should we use for our heroes?
export const MINIMAP_CREEP_ICON_SIZE = 1;				// What icon size should we use for creeps?
export const MINIMAP_RUNE_ICON_SIZE = 1;				// What icon size should we use for runes?

export const BUYBACK_ENABLED = true;					// Should we allow people to buyback when they die?
export const CUSTOM_BUYBACK_COST_ENABLED = false;		// Should we use a custom buyback cost setting?
export const CUSTOM_BUYBACK_COOLDOWN_ENABLED = false;	// Should we use a custom buyback time?
export const CUSTOM_BUYBACK_COOLDOWN_TIME = 480.0;	// Custom buyback cooldown time (needed if CUSTOM_BUYBACK_COOLDOWN_ENABLED is true).
export const BUYBACK_FIXED_GOLD_COST = 500;			// Fixed custom buyback gold cost (needed if CUSTOM_BUYBACK_COST_ENABLED is true).

export const DISABLE_FOG_OF_WAR_ENTIRELY = false;		// Should we disable fog of war entirely for both teams?
export const USE_UNSEEN_FOG_OF_WAR = false;			// Should we make unseen and fogged areas of the map completely black until uncovered by each team?
// NOTE: DISABLE_FOG_OF_WAR_ENTIRELY must be false for USE_UNSEEN_FOG_OF_WAR to work
export const USE_STANDARD_DOTA_BOT_THINKING = false;	// Should we have bots act like they would in Dota? (This requires 3 lanes, normal items, etc)

export const USE_CUSTOM_HERO_GOLD_BOUNTY = false;			// Should the gold for hero kills be modified (true) or same as in default Dota (false)?
export const HERO_KILL_GOLD_BASE = 110;					// Hero gold bounty base value
export const HERO_KILL_GOLD_PER_LEVEL = 10;				// Hero gold bounty increase per level
export const HERO_KILL_GOLD_PER_STREAK = 60;				// Hero gold bounty per his streak (Killing Spree: +HERO_KILL_GOLD_PER_STREAK gold; Ultrakill: +2xHERO_KILL_GOLD_PER_STREAK gold ...)
export const DISABLE_ALL_GOLD_FROM_HERO_KILLS = false;	// Should we remove gold gain from hero kills? USE_CUSTOM_HERO_GOLD_BOUNTY needs to be true.
// NOTE: DISABLE_ALL_GOLD_FROM_HERO_KILLS requires GoldFilter. Use DISABLE_GOLD_SOUNDS too.
export const USE_CUSTOM_HERO_LEVELS = false;			// Should the heroes give a custom amount of XP when killed? Can malfunction for levels above 25.

export const USE_CUSTOM_TOP_BAR_VALUES = true;		// Should we do customized top bar values or use the default kill count per team?
export const TOP_BAR_VISIBLE = true;					// Should we display the top bar score/count at all?
export const SHOW_KILLS_ON_TOPBAR = true;				// Should we display kills only on the top bar? (No denies, suicides, kills by neutrals)  Requires USE_CUSTOM_TOP_BAR_VALUES

export const ENABLE_TOWER_BACKDOOR_PROTECTION = true;	// Should we enable backdoor protection for our towers?
export const REMOVE_ILLUSIONS_ON_DEATH = false;		// Should we remove all illusions if the main hero dies?
export const DISABLE_GOLD_SOUNDS = false;				// Should we disable the gold sound when players get gold?

export const END_GAME_ON_KILLS = false;				// Should the game end after a certain number of kills?
export const KILLS_TO_END_GAME_FOR_TEAM = 50;			// How many kills for a team should signify an end of game?

export const USE_CUSTOM_XP_VALUES = false;			// Should we use custom XP values to level up heroes, or the default Dota numbers?
export const MAX_LEVEL = 50;							// What level should we let heroes get to? (USE_CUSTOM_XP_VALUES must be true).
// NOTE: MAX_LEVEL and XP_PER_LEVEL_TABLE will not work if USE_CUSTOM_XP_VALUES is false or nil.

// Fill this table up with the required XP per level if you want to change it
// export const XP_PER_LEVEL_TABLE = {}
// export const XP_PER_LEVEL_TABLE[1] = 0
// for i=2, MAX_LEVEL do
//     XP_PER_LEVEL_TABLE[i] = XP_PER_LEVEL_TABLE[i-1] + i*100
//     end

export const ENABLE_FIRST_BLOOD = true;				// Should we enable first blood for the first kill in this game?
export const HIDE_KILL_BANNERS = false;               // Should we hide the kill banners that show when a player is killed?
export const LOSE_GOLD_ON_DEATH = false;              // Should we have players lose the normal amount of dota gold on death?
export const SHOW_ONLY_PLAYER_INVENTORY = false;      // Should we only allow players to see their own inventory even when selecting other units?
export const DISABLE_STASH_PURCHASING = false;        // Should we prevent players from being able to buy items into their stash when not at a shop?
export const DISABLE_ANNOUNCER = false;               // Should we disable the announcer from working in the game?
export const FORCE_PICKED_HERO = null;                 // What hero should we force all players to spawn as? (e.g. "npc_dota_hero_axe").  Use nil to allow players to pick their own hero.
export const TELEPORT_SCROLL_ON_START = false;			// Should the heroes have a teleport scroll in their inventory right at the start of the game?
export const ADD_ITEM_TO_HERO_ON_SPAWN = false;		// Add an example item to the picked hero when he spawns?
export const SKILL_POINTS_AT_EVERY_LEVEL = false;		// Should we allow heroes to gain skill points even at levels 17, 19, 21, 22, 23 and 24?
// NOTE: If SKILL_POINTS_AT_EVERY_LEVEL is true, there will be strange interactions with heroes like Invoker and Meepo.

export const FIXED_RESPAWN_TIME = -1;                 // What time should we use for a fixed respawn timer?  Use -1 to keep the default dota behavior.
// NOTE: use FIXED_RESPAWN_TIME if you want the same respawn time on every level.
export const MAX_RESPAWN_TIME = 125;					// Default Dota doesn't have a limit (it can go above 125). Fast game modes should have 20 seconds.
export const USE_CUSTOM_RESPAWN_TIMES = false;		// Should we use custom respawn times or dota default?

// Fill this table with respawn times on each level if USE_CUSTOM_RESPAWN_TIMES is true.
export const CUSTOM_RESPAWN_TIME: {
    [key: number]: number
} = {};
CUSTOM_RESPAWN_TIME[1] = 5;
CUSTOM_RESPAWN_TIME[2] = 7;
CUSTOM_RESPAWN_TIME[3] = 9;
CUSTOM_RESPAWN_TIME[4] = 13;
CUSTOM_RESPAWN_TIME[5] = 16;
CUSTOM_RESPAWN_TIME[6] = 26;
CUSTOM_RESPAWN_TIME[7] = 28;
CUSTOM_RESPAWN_TIME[8] = 30;
CUSTOM_RESPAWN_TIME[9] = 32;
CUSTOM_RESPAWN_TIME[10] = 34;
CUSTOM_RESPAWN_TIME[11] = 36;
CUSTOM_RESPAWN_TIME[12] = 44;
CUSTOM_RESPAWN_TIME[13] = 46;
CUSTOM_RESPAWN_TIME[14] = 48;
CUSTOM_RESPAWN_TIME[15] = 50;
CUSTOM_RESPAWN_TIME[16] = 52;
CUSTOM_RESPAWN_TIME[17] = 54;
CUSTOM_RESPAWN_TIME[18] = 65;
CUSTOM_RESPAWN_TIME[19] = 70;
CUSTOM_RESPAWN_TIME[20] = 75;
CUSTOM_RESPAWN_TIME[21] = 80;
CUSTOM_RESPAWN_TIME[22] = 85;
CUSTOM_RESPAWN_TIME[23] = 90;
CUSTOM_RESPAWN_TIME[24] = 95;
CUSTOM_RESPAWN_TIME[25] = 100;


export const FOUNTAIN_CONSTANT_MANA_REGEN = -1;       // What should we use for the constant fountain mana regen?  Use -1 to keep the default dota behavior.
export const FOUNTAIN_PERCENTAGE_MANA_REGEN = -1;     // What should we use for the percentage fountain mana regen?  Use -1 to keep the default dota behavior.
export const FOUNTAIN_PERCENTAGE_HEALTH_REGEN = -1;   // What should we use for the percentage fountain health regen?  Use -1 to keep the default dota behavior.
export const MAXIMUM_ATTACK_SPEED = 700;              // What should we use for the maximum attack speed?
export const MINIMUM_ATTACK_SPEED = 10;               // What should we use for the minimum attack speed?

export const DISABLE_DAY_NIGHT_CYCLE = false;         // Should we disable the day night cycle from naturally occurring? (Manual adjustment still possible)
export const DISABLE_KILLING_SPREE_ANNOUNCER = false; // Shuold we disable the killing spree announcer?
export const DISABLE_STICKY_ITEM = false;             // Should we disable the sticky item button in the quick buy area?

export const USE_DEFAULT_RUNE_SYSTEM = true;			// Should we use the default dota rune spawn timings and the same runes as dota have?
export const BOUNTY_RUNE_SPAWN_INTERVAL = 300;		// How long in seconds should we wait between bounty rune spawns? BUGGED! WORKS FOR POWERUPS TOO!
export const POWER_RUNE_SPAWN_INTERVAL = 120;			// How long in seconds should we wait between power-up runes spawns? BUGGED! WORKS FOR BOUNTIES TOO!


export const MAX_NUMBER_OF_TEAMS = 2;                				// How many potential teams can be in this game mode?
export const USE_CUSTOM_TEAM_COLORS = false;           			// Should we use custom team colors?
export const USE_CUSTOM_TEAM_COLORS_FOR_PLAYERS = false;          // Should we use custom team colors to color the players/minimap?
