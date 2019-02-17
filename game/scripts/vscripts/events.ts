import {CUSTOM_GAME_SETUP_TIME, HERO_SELECTION_TIME} from "./settings";
import {Lol} from "./gamemode";
import {GameEvents} from "./game_events/GameEvents";


declare function DebugPrint(some: any): void;

declare function Dynamic_Wrap(some: any, some2: any): any;

declare class your_gamemode_name extends Lol {
}

interface OnDisconnectData {
    name: string;
    networkid: number;
    reason: any;
    userid: number;
}

interface OnNPCSpawnedData {
    entindex: number;
}

/** @extension */
class GameModeEvents extends your_gamemode_name {

    static OnDisconnect(info: OnDisconnectData) {
        DebugPrint("[TS] A Player has disconnected " + info.userid)
    }

    static OnGameRulesStateChange(data: any) {
        const newState = GameRules.State_Get();
        if (newState === DOTA_GameState.DOTA_GAMERULES_STATE_INIT) {
            DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_INIT");

        } else if (newState === DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD) {
            DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD");

        } else if (newState === DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP) {
            DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP");
            GameRules.SetCustomGameSetupAutoLaunchDelay(CUSTOM_GAME_SETUP_TIME)

        } else if (newState === DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION) {
            DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION");
            your_gamemode_name.PostLoadPrecache();
            your_gamemode_name.OnAllPlayersLoaded();

            Timers.CreateTimer(HERO_SELECTION_TIME - 1.1, () => {
                for (let i: PlayerID = 0; i < 19; i++) {
                    const playerID = i as PlayerID;
                    if (PlayerResource.IsValidPlayerID(playerID)) {
                        if (!PlayerResource.HasSelectedHero(playerID) && PlayerResource.GetConnectionState(playerID) == DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED && (!PlayerResource.IsBroadcaster(playerID))) {
                            // if valid player and connected
                            PlayerResource.GetPlayer(playerID).MakeRandomHeroSelection();
                            PlayerResource.SetHasRandomed(playerID);
                            PlayerResource.SetCanRepick(playerID, false);
                            DebugPrint("[TS] Randomed a hero for a player number " + playerID);
                        }

                    }
                }
            });
        } else if (newState == DOTA_GameState.DOTA_GAMERULES_STATE_STRATEGY_TIME) {
            DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_STRATEGY_TIME")

        } else if (newState == DOTA_GameState.DOTA_GAMERULES_STATE_TEAM_SHOWCASE) {
            DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_TEAM_SHOWCASE")

        } else if (newState == DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD) {
            DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD")

        } else if (newState == DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME) {
            DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME")

        } else if (newState == DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) {
            DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS");
            your_gamemode_name.OnGameInProgress()

        } else if (newState == DOTA_GameState.DOTA_GAMERULES_STATE_POST_GAME) {
            DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_POST_GAME")

        } else if (newState == DOTA_GameState.DOTA_GAMERULES_STATE_DISCONNECT) {
            DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_DISCONNECT")
        }
    }

    static OnNPCSpawned(data: OnNPCSpawnedData){
        DebugPrint("[TS] a unit spawned");

        const npc = EntIndexToHScript(data.entindex) as CDOTA_BaseNPC;
        // const owner = npc.GetOwner();

        if(npc.IsRealHero() && (npc as any).bFirstSpawned === null){
            (npc as any).bFirstSpawned = true;
            your_gamemode_name.OnHeroInGame(npc);
        }
    }


    static OnPlayerPickHero(data: any){
        DebugPrint("[TS] OnPlayerPickHero");
        // const heroName = data.hero;
        // const heroEntity = EntIndexToHScript(data.heroindex) as CDOTA_BaseNPC_Hero;
        // const player = EntIndexToHScript(data.player);
        //
        // Timers.CreateTimer(0.5, () => {
        //    const playerID = heroEntity.GetPlayerID();
        //    if(PlayerResource.IsFakeClient(playerID)){
        //        // bot
        //    }else{
        //        // ?
        //    }
        // });
    }


    static OnEntityKilled(data: any){
        DebugPrint("[TS] An entity was killed.");

        const killed = EntIndexToHScript(data.entindex_killed);
        const killer = data.entindex_attacker && EntIndexToHScript(data.entindex_attacker) || null;
        const ability = data.entindex_inflictor && EntIndexToHScript(data.entindex_inflictor) || null;
        
        GameEvents.OnNPCKilled(killed as CDOTA_BaseNPC, killer as CDOTA_BaseNPC, ability as CDOTABaseAbility);
    }
}
