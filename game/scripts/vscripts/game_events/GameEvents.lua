--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
-- Lua Library inline imports
__TS__ArraySome = function(arr, callbackfn)
    local i = 0;
    while i < (#arr) do
        if callbackfn(arr[i + 1], i, arr) then
            return true;
        end
        i = i + 1;
    end
    return false;
end;

local exports = exports or {};
local __TSTL_bidju = require("game_events.bidju");
local BidjuManager = __TSTL_bidju.BidjuManager;
local __TSTL_Shinobi = require("game_events.Shinobi");
local ShinobiManager = __TSTL_Shinobi.ShinobiManager;
local __TSTL_Akatsuki = require("game_events.Akatsuki");
local AkatsukiManager = __TSTL_Akatsuki.AkatsukiManager;
exports.GameEvents = exports.GameEvents or {};
exports.GameEvents.__index = exports.GameEvents;
exports.GameEvents.new = function(construct, ...)
    local self = setmetatable({}, exports.GameEvents);
    if construct and exports.GameEvents.constructor then
        exports.GameEvents.constructor(self, ...);
    end
    return self;
end;
exports.GameEvents.constructor = function(self)
end;
exports.GameEvents.OnNPCKilled = function(self, killed, killer, ability)
    local ignoredAbilities = {"capture_bidju", "summon_bidju"};
    local isBidjuKilled = BidjuManager:IsBidju(killed);
    local killedBySpecialAbilities = (ability and __TS__ArraySome(ignoredAbilities, function(it)
        return it == ability:GetName();
    end)) or false;
    local isShinobiKilled = ShinobiManager:IsShinobi(killed);
    local isShinobiKiller = ShinobiManager:IsShinobi(killer);
    local isAkatsukiKilled = AkatsukiManager:IsAkatsuki(killed);
    local isAkatsukiKiller = AkatsukiManager:IsAkatsuki(killer);
    DebugPrint("unit killed");
    DebugPrint(killed:GetUnitName());
    if isBidjuKilled and (not killedBySpecialAbilities) then
        local killedBidju = killed;
        if killedBidju.summoned and (not isAkatsukiKiller) then
            if killedBidju.owner then
                killedBidju.owner:onBidjuKilled();
            else
                error("Something wrong. killed bidju has summoned flag but doesnt have owner");
            end
        elseif isShinobiKiller then
            DebugPrint("ShinobiExtension capture!");
            ShinobiManager:CaptureBidju(killedBidju, killer);
        elseif isAkatsukiKiller then
            AkatsukiManager:OnBidjuCaptured(killedBidju);
        end
    elseif isBidjuKilled and killedBySpecialAbilities then
        DebugPrint("Killed by special ability!");
    elseif killed:GetUnitName() == "npc_dota_custom_cave" then
        ShinobiManager:FreeBidju((killed).bidjuName);
    end
end;
exports.GameEvents.OnNPCSpawned = function(self, npc)
    if ((npc:GetTeam() == DOTA_TEAM_GOODGUYS) and npc:IsRealHero()) and npc:IsHero() then
    end
end;
return exports;
