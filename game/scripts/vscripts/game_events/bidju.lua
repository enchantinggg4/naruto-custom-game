--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
-- Lua Library inline imports
__TS__ArrayPush = function(arr, ...)
    local items = ({...});
    for ____TS_index = 1, #items do
        local item = items[____TS_index];
        arr[(#arr) + 1] = item;
    end
    return #arr;
end;

local exports = exports or {};
local __TSTL_GameState = require("game_events.GameState");
local GameState = __TSTL_GameState.GameState;
require("client-server");
LinkLuaModifier("modifier_bidju_ready_capture", "abilities/bidju/modifier/modifier_bidju_ready_capture.lua", LUA_MODIFIER_MOTION_NONE);
exports.BidjuName = {};
exports.BidjuName.SHUKAKU = "npc_dota_custom_bidju_shukaku";
exports.BidjuName.MATATABI = "npc_dota_custom_bidju_matatabi";
exports.BidjuName.KURAMA = "npc_dota_custom_bidju_kurama";
CDOTA_BaseNPC.setOwner = function(self, shinobi)
    self.owner = shinobi;
    self:SetTeam(shinobi:GetTeam());
end;
CDOTA_BaseNPC.removeOwner = function(self)
    self.owner = nil;
    self:SetTeam(DOTA_TEAM_NEUTRALS);
end;
CDOTA_BaseNPC.captureReadyRespawn = function(self)
    self:SetTeam(DOTA_TEAM_GOODGUYS);
    self:StartGesture(ACT_DOTA_DISABLED);
    self:AddNewModifier(self, nil, "modifier_invulnerable", {duration = 5});
    self:AddNewModifier(self, nil, "modifier_bidju_ready_capture", {});
end;
exports.BidjuManager = exports.BidjuManager or {};
exports.BidjuManager.__index = exports.BidjuManager;
exports.BidjuManager.new = function(construct, ...)
    local self = setmetatable({}, exports.BidjuManager);
    if construct and exports.BidjuManager.constructor then
        exports.BidjuManager.constructor(self, ...);
    end
    return self;
end;
exports.BidjuManager.constructor = function(self)
end;
exports.BidjuManager.SpawnBidju = function(self, bidju, point, team, owner)
    if point == nil then
        point = nil;
    end
    if team == nil then
        team = DOTA_TEAM_NEUTRALS;
    end
    if owner == nil then
        owner = nil;
    end
    local v = point or Entities:FindByName(nil, "spawn_" .. (tostring(bidju) .. "")):GetAbsOrigin();
    DebugPrint(team);
    local unit = CreateUnitByName(bidju, v, true, nil, nil, team);
    if owner then
        unit:setOwner(owner);
        owner:setBidju(unit);
    else
        unit:removeOwner();
    end
    return unit;
end;
exports.BidjuManager.IsBidju = function(self, unit)
    local unitName = unit:GetUnitName();
    for key in pairs(exports.BidjuName) do
        do
            if exports.BidjuName[key] == unitName then
                return true;
            end
        end
        ::__continue6::
    end
    return false;
end;
exports.BidjuManager.InitialSpawnBidju = function(self)
    local keys = {};
    for key in pairs(exports.BidjuName) do
        do
            __TS__ArrayPush(keys, key);
            GameState:SetBidjuStatus(exports.BidjuName[key], DOTA_TEAM_NEUTRALS);
        end
        ::__continue8::
    end
    local delayBetweenBidju = 5;
    local context = {lastBidjuIndex = 0, keys = keys};
    Timers:CreateTimer(0, function(context)
        local currentBidju = context.keys[context.lastBidjuIndex + 1];
        local bidjuName = exports.BidjuName[currentBidju];
        if bidjuName then
            local bidju = exports.BidjuManager:SpawnBidju(bidjuName);
            context.lastBidjuIndex = context.lastBidjuIndex + 1;
            exports.BidjuManager.nextBidju = exports.BidjuName[context.keys[context.lastBidjuIndex + 1]];
            AddFOWViewer(DOTA_TEAM_GOODGUYS, bidju:GetAbsOrigin(), 500, 5, false);
            AddFOWViewer(DOTA_TEAM_BADGUYS, bidju:GetAbsOrigin(), 500, 5, false);
            GameState:AlertNextBidju(delayBetweenBidju, currentBidju, context.keys[context.lastBidjuIndex + 1]);
            return delayBetweenBidju;
        end
    end, context);
end;
return exports;
