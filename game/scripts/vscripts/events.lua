--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_settings = require("settings");
local CUSTOM_GAME_SETUP_TIME = __TSTL_settings.CUSTOM_GAME_SETUP_TIME;
local HERO_SELECTION_TIME = __TSTL_settings.HERO_SELECTION_TIME;
local __TSTL_GameEvents = require("game_events.GameEvents");
local GameEvents = __TSTL_GameEvents.GameEvents;
your_gamemode_name.OnDisconnect = function(self, info)
    DebugPrint("[TS] A Player has disconnected " .. info.userid);
end;
your_gamemode_name.OnGameRulesStateChange = function(self, data)
    local newState = GameRules:State_Get();
    if newState == DOTA_GAMERULES_STATE_INIT then
        DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_INIT");
    elseif newState == DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD then
        DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD");
    elseif newState == DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
        DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP");
        GameRules:SetCustomGameSetupAutoLaunchDelay(CUSTOM_GAME_SETUP_TIME);
    elseif newState == DOTA_GAMERULES_STATE_HERO_SELECTION then
        DebugPrint("[TS] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION");
        your_gamemode_name:PostLoadPrecache();
        your_gamemode_name:OnAllPlayersLoaded();
        Timers:CreateTimer(HERO_SELECTION_TIME - 1.1, function()
            local i = 0;
            while i < 19 do
                do
                    local playerID = i;
                    if PlayerResource:IsValidPlayerID(playerID) then
                        if ((not PlayerResource:HasSelectedHero(playerID)) and (PlayerResource:GetConnectionState(playerID) == DOTA_CONNECTION_STATE_CONNECTED)) and (not PlayerResource:IsBroadcaster(playerID)) then
                            PlayerResource:GetPlayer(playerID):MakeRandomHeroSelection();
                            PlayerResource:SetHasRandomed(playerID);
                            PlayerResource:SetCanRepick(playerID, false);
                            DebugPrint("[TS] Randomed a hero for a player number " .. playerID);
                        end
                    end
                end
                ::__continue3::
                i = i + 1;
            end
        end);
    elseif newState == DOTA_GAMERULES_STATE_STRATEGY_TIME then
        DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_STRATEGY_TIME");
    elseif newState == DOTA_GAMERULES_STATE_TEAM_SHOWCASE then
        DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_TEAM_SHOWCASE");
    elseif newState == DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD then
        DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD");
    elseif newState == DOTA_GAMERULES_STATE_PRE_GAME then
        DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME");
    elseif newState == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
        DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS");
        your_gamemode_name:OnGameInProgress();
    elseif newState == DOTA_GAMERULES_STATE_POST_GAME then
        DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_POST_GAME");
    elseif newState == DOTA_GAMERULES_STATE_DISCONNECT then
        DebugPrint("[BAREBONES] Game State changed to: DOTA_GameState.DOTA_GAMERULES_STATE_DISCONNECT");
    end
end;
your_gamemode_name.OnNPCSpawned = function(self, data)
    local npc = EntIndexToHScript(data.entindex);
    GameEvents:OnNPCSpawned(npc);
    if npc:IsRealHero() and ((npc).bFirstSpawned == nil) then
        (npc).bFirstSpawned = true;
        your_gamemode_name:OnHeroInGame(npc);
        if npc:GetTeam() == DOTA_TEAM_GOODGUYS then
            local shinobi = (npc);
            shinobi:onFirstSpawn();
            shinobi:setBidjuState(false);
        end
    end
end;
your_gamemode_name.OnPlayerPickHero = function(self, data)
end;
your_gamemode_name.OnEntityKilled = function(self, data)
    local killed = EntIndexToHScript(data.entindex_killed);
    local killer = (data.entindex_attacker and EntIndexToHScript(data.entindex_attacker)) or nil;
    local ability = (data.entindex_inflictor and EntIndexToHScript(data.entindex_inflictor)) or nil;
    GameEvents:OnNPCKilled(killed, killer, ability);
end;
