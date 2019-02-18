import {BidjuManager} from "./game_events/Bidju";
import {
    ALLOW_SAME_HERO_SELECTION,
    ENABLE_HERO_RESPAWN,
    HERO_SELECTION_TIME, POST_GAME_TIME,
    PRE_GAME_TIME, SHOWCASE_TIME, STRATEGY_TIME, TREE_REGROW_TIME,
    UNIVERSAL_SHOP_MODE
} from "./settings";

const z = 5;

require('libraries/physics');
// Projectiles library can be used for advanced 3D projectile systems.
require('libraries/projectiles');
// Notifications library can be used for sending panorama notifications to the UIs of players/teams/everyones
require('libraries/notifications');
// Animations library can be used for starting customized animations on units from lua
require('libraries/animations');
// Attachments library can be used for performing "Frankenstein" attachments on units
// require('libraries/attachments');
// PlayerTables library can be used to synchronize client-server data via player/client-specific net tables
require('libraries/playertables');
// Selection library (by Noya) provides player selection inspection and management from server lua
require('libraries/selection');

require('libraries/timers');

// settings.lua is where you can specify many different properties for your game mode and is one of the core barebones files.
require('settings');
// events.lua is where you can specify the actions to be taken when any event occurs and is one of the core barebones files.
require('events');
// filters.lua
require('filters');

declare class your_gamemode_name{}

interface HeroSelectionData {
    PlayerID: PlayerID,
    hero: {
        hero_name: string;
        hero_original_name: string;
    }
}

/** @extension */
export class Lol extends your_gamemode_name {

    static PostLoadPrecache() {
        DebugPrint("[TS] Performing Post-Load precache.")
    }

    static OnFirstPlayerLoaded() {
        DebugPrint("[TS] First Player has loaded.")
    }

    static OnAllPlayersLoaded() {
        DebugPrint("[TS] All Players have loaded into the game.")
    }


    static OnHeroInGame(hero: CDOTA_BaseNPC_Hero) {


        // Player:SetMusicStatus(DOTA_MUSIC_STATUS_NONE, intensity)
        // if(hero && hero.GetPlayerID()) {
        //     const playerID = hero.GetPlayerID();
        //
        //     if (PlayerResource.IsFakeClient(playerID)) {
        //         DebugPrint(`[TS] Bot hero ${hero.GetUnitName()}(re)spawned in the game.`);
        //         hero.SetGold(600, false)
        //     } else {
        //         DebugPrint(`[TS] Real Hero ${hero.GetUnitName()} spawned in the game first time PID: ${playerID}.`);
        //
        //         // Bug avoid
        //         hero.MakeVisibleToTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS, 0.5);
        //         hero.MakeVisibleToTeam(DOTATeam_t.DOTA_TEAM_BADGUYS, 0.5);
        //     }
        // }
    }

    static OnGameInProgress(){
        DebugPrint(`[TS] The game has begun!`);
        BidjuManager.InitialSpawnBidju();
    }


    static OnHeroSelected(data: HeroSelectionData){
        const player = PlayerInstanceFromIndex(data.PlayerID + 1);
        const hero = CreateHeroForPlayer(data.hero.hero_original_name, player);

        // your_gamemode_name removes invisible copy of hero :)
        UTIL_Remove(hero);

        CustomGameEventManager.Send_ServerToAllClients("picking_player_pick", data);
    }

    static InitGameMode(){
        CustomGameEventManager.RegisterListener( "hero_selected", Dynamic_Wrap(your_gamemode_name, "OnHeroSelected"));
        DebugPrint("[TS] Starting to load Game Rules.");

        // ListenToGameEvent('dota_player_gained_level', Dynamic_Wrap(your_gamemode_name, 'OnPlayerLevelUp'), self);
        // ListenToGameEvent('dota_ability_channel_finished', Dynamic_Wrap(your_gamemode_name, 'OnAbilityChannelFinished'), self);
        // ListenToGameEvent('dota_player_learned_ability', Dynamic_Wrap(your_gamemode_name, 'OnPlayerLearnedAbility'), self);
        ListenToGameEvent('entity_killed', Dynamic_Wrap(your_gamemode_name, 'OnEntityKilled'), self);
        // ListenToGameEvent('player_connect_full', Dynamic_Wrap(your_gamemode_name, 'OnConnectFull'), self);
        // ListenToGameEvent('player_disconnect', Dynamic_Wrap(your_gamemode_name, 'OnDisconnect'), self);
        // ListenToGameEvent('dota_item_purchased', Dynamic_Wrap(your_gamemode_name, 'OnItemPurchased'), self);
        // ListenToGameEvent('dota_item_picked_up', Dynamic_Wrap(your_gamemode_name, 'OnItemPickedUp'), self);
        // ListenToGameEvent('last_hit', Dynamic_Wrap(your_gamemode_name, 'OnLastHit'), self);
        // ListenToGameEvent('dota_non_player_used_ability', Dynamic_Wrap(your_gamemode_name, 'OnNonPlayerUsedAbility'), self);
        // ListenToGameEvent('player_changename', Dynamic_Wrap(your_gamemode_name, 'OnPlayerChangedName'), self);
        // ListenToGameEvent('dota_rune_activated_server', Dynamic_Wrap(your_gamemode_name, 'OnRuneActivated'), self);
        // ListenToGameEvent('dota_player_take_tower_damage', Dynamic_Wrap(your_gamemode_name, 'OnPlayerTakeTowerDamage'), self);
        // ListenToGameEvent('tree_cut', Dynamic_Wrap(your_gamemode_name, 'OnTreeCut'), self);
        // ListenToGameEvent('entity_hurt', Dynamic_Wrap(your_gamemode_name, 'OnEntityHurt'), self);
        // ListenToGameEvent('player_connect', Dynamic_Wrap(your_gamemode_name, 'PlayerConnect'), self);
        // ListenToGameEvent('dota_player_used_ability', Dynamic_Wrap(your_gamemode_name, 'OnAbilityUsed'), self);
        ListenToGameEvent('game_rules_state_change', Dynamic_Wrap(your_gamemode_name, 'OnGameRulesStateChange'), self);
        ListenToGameEvent('npc_spawned', Dynamic_Wrap(your_gamemode_name, 'OnNPCSpawned'), self);
        ListenToGameEvent('dota_player_pick_hero', Dynamic_Wrap(your_gamemode_name, 'OnPlayerPickHero'), self);
        // ListenToGameEvent('dota_team_kill_credit', Dynamic_Wrap(your_gamemode_name, 'OnTeamKillCredit'), self);
        // ListenToGameEvent("player_reconnected", Dynamic_Wrap(your_gamemode_name, 'OnPlayerReconnect'), self);
        // ListenToGameEvent("player_chat", Dynamic_Wrap(your_gamemode_name, 'OnPlayerChat'), self);
        //
        // ListenToGameEvent("dota_illusions_created", Dynamic_Wrap(your_gamemode_name, 'OnIllusionsCreated'), self);
        // ListenToGameEvent("dota_item_combined", Dynamic_Wrap(your_gamemode_name, 'OnItemCombined'), self);
        // ListenToGameEvent("dota_player_begin_cast", Dynamic_Wrap(your_gamemode_name, 'OnAbilityCastBegins'), self);
        // ListenToGameEvent("dota_tower_kill", Dynamic_Wrap(your_gamemode_name, 'OnTowerKill'), self);
        // ListenToGameEvent("dota_player_selected_custom_team", Dynamic_Wrap(your_gamemode_name, 'OnPlayerSelectedCustomTeam'), self);
        // ListenToGameEvent("dota_npc_goal_reached", Dynamic_Wrap(your_gamemode_name, 'OnNPCGoalReached'), self)


        GameRules.SetHeroRespawnEnabled(ENABLE_HERO_RESPAWN);
        GameRules.SetUseUniversalShopMode(UNIVERSAL_SHOP_MODE);
        GameRules.SetSameHeroSelectionEnabled(ALLOW_SAME_HERO_SELECTION);
        GameRules.SetHeroSelectionTime(HERO_SELECTION_TIME);
        GameRules.SetPreGameTime(PRE_GAME_TIME);
        GameRules.SetPostGameTime(POST_GAME_TIME);
        GameRules.SetShowcaseTime(SHOWCASE_TIME);
        GameRules.SetStrategyTime(STRATEGY_TIME);
        GameRules.SetTreeRegrowTime(TREE_REGROW_TIME);
    }

}
