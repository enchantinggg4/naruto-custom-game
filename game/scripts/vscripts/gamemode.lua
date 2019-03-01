--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local exports = exports or {};
local __TSTL_Bidju = require("game_events.Bidju");
local BidjuManager = __TSTL_Bidju.BidjuManager;
local __TSTL_settings = require("settings");
local ALLOW_SAME_HERO_SELECTION = __TSTL_settings.ALLOW_SAME_HERO_SELECTION;
local ENABLE_HERO_RESPAWN = __TSTL_settings.ENABLE_HERO_RESPAWN;
local HERO_SELECTION_TIME = __TSTL_settings.HERO_SELECTION_TIME;
local POST_GAME_TIME = __TSTL_settings.POST_GAME_TIME;
local PRE_GAME_TIME = __TSTL_settings.PRE_GAME_TIME;
local SHOWCASE_TIME = __TSTL_settings.SHOWCASE_TIME;
local STRATEGY_TIME = __TSTL_settings.STRATEGY_TIME;
local TREE_REGROW_TIME = __TSTL_settings.TREE_REGROW_TIME;
local UNIVERSAL_SHOP_MODE = __TSTL_settings.UNIVERSAL_SHOP_MODE;
local __TSTL_GameEvents = require("game_events.GameEvents");
local GameEvents = __TSTL_GameEvents.GameEvents;
local z = 5;
require("libraries/physics");
require("libraries/projectiles");
require("libraries/notifications");
require("libraries/animations");
require("libraries/playertables");
require("libraries/selection");
require("libraries/timers");
require("settings");
require("events");
require("filters");
your_gamemode_name.PostLoadPrecache = function(self)
    DebugPrint("[TS] Performing Post-Load precache.");
end;
your_gamemode_name.OnFirstPlayerLoaded = function(self)
    DebugPrint("[TS] First Player has loaded.");
end;
your_gamemode_name.OnAllPlayersLoaded = function(self)
    DebugPrint("[TS] All Players have loaded into the game.");
end;
your_gamemode_name.OnHeroInGame = function(self, hero)
end;
your_gamemode_name.OnGameInProgress = function(self)
    DebugPrint("[TS] The game has begun!");
    BidjuManager:InitialSpawnBidju();
    GameEvents:OnGameStart();
end;
your_gamemode_name.OnHeroSelected = function(self, data)
    local player = PlayerInstanceFromIndex(data.PlayerID + 1);
    local hero = CreateHeroForPlayer(data.hero.hero_original_name, player);
    UTIL_Remove(hero);
    local msg = {PlayerID = data.PlayerID, hero = data.hero, team = player:GetTeam()};
    CustomGameEventManager:Send_ServerToAllClients("picking_player_pick", msg);
end;
your_gamemode_name.InitGameMode = function(self)
    CustomGameEventManager:RegisterListener("hero_selected", Dynamic_Wrap(your_gamemode_name, "OnHeroSelected"));
    DebugPrint("[TS] Starting to load Game Rules.");
    ListenToGameEvent("entity_killed", Dynamic_Wrap(your_gamemode_name, "OnEntityKilled"), self);
    ListenToGameEvent("game_rules_state_change", Dynamic_Wrap(your_gamemode_name, "OnGameRulesStateChange"), self);
    ListenToGameEvent("npc_spawned", Dynamic_Wrap(your_gamemode_name, "OnNPCSpawned"), self);
    ListenToGameEvent("dota_player_pick_hero", Dynamic_Wrap(your_gamemode_name, "OnPlayerPickHero"), self);
    GameRules:SetHeroRespawnEnabled(ENABLE_HERO_RESPAWN);
    GameRules:SetUseUniversalShopMode(UNIVERSAL_SHOP_MODE);
    GameRules:SetSameHeroSelectionEnabled(ALLOW_SAME_HERO_SELECTION);
    GameRules:SetHeroSelectionTime(HERO_SELECTION_TIME);
    GameRules:SetPreGameTime(PRE_GAME_TIME);
    GameRules:SetPostGameTime(POST_GAME_TIME);
    GameRules:SetShowcaseTime(SHOWCASE_TIME);
    GameRules:SetStrategyTime(STRATEGY_TIME);
    GameRules:SetTreeRegrowTime(TREE_REGROW_TIME);
end;
return exports;
