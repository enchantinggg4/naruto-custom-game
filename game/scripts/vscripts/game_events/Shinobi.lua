--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local exports = exports or {};
local __TSTL_Bidju = require("game_events.Bidju");
local BidjuManager = __TSTL_Bidju.BidjuManager;
local BidjuName = __TSTL_Bidju.BidjuName;
local __TSTL_Akatsuki = require("game_events.Akatsuki");
local AkatsukiManager = __TSTL_Akatsuki.AkatsukiManager;
local __TSTL_GameState = require("game_events.GameState");
local GameState = __TSTL_GameState.GameState;
require("client-server");
CDOTA_BaseNPC.setBidju = function(self, bidju)
    self.bidju = bidju;
    self.bidjuName = bidju:GetUnitName();
end;
CDOTA_BaseNPC.removeBidju = function(self)
    self.bidju = nil;
    self.bidjuName = nil;
end;
CDOTA_BaseNPC.onBidjuKilled = function(self)
    self:SetMana(0);
    self:setSummonToggle(false);
end;
CDOTA_BaseNPC.setBidjuState = function(self, hasBidju)
    if hasBidju then
        self:FindAbilityByName("summon_bidju"):SetActivated(true);
        self:FindAbilityByName("capture_bidju"):SetActivated(false);
    else
        self:FindAbilityByName("summon_bidju"):SetActivated(false);
        self:FindAbilityByName("capture_bidju"):SetActivated(true);
    end
end;
CDOTA_BaseNPC.onLoseBidju = function(self)
    self:setSummonToggle(false);
    self:onBidjuKilled();
    self:setBidjuState(false);
end;
CDOTA_BaseNPC.onFirstSpawn = function(self)
    self:FindAbilityByName("summon_bidju"):UpgradeAbility(false);
    self:FindAbilityByName("capture_bidju"):UpgradeAbility(false);
end;
CDOTA_BaseNPC.setSummonToggle = function(self, enabled)
    local ability = self:FindAbilityByName("summon_bidju");
    local toggled = ability:GetToggleState();
    if toggled and (not enabled) then
        ability:ToggleAbility();
    elseif (not toggled) and enabled then
        ability:ToggleAbility();
    end
end;
exports.ShinobiManager = exports.ShinobiManager or {};
exports.ShinobiManager.__index = exports.ShinobiManager;
exports.ShinobiManager.new = function(construct, ...)
    local self = setmetatable({}, exports.ShinobiManager);
    if construct and exports.ShinobiManager.constructor then
        exports.ShinobiManager.constructor(self, ...);
    end
    return self;
end;
exports.ShinobiManager.constructor = function(self)
end;
exports.ShinobiManager.IsShinobi = function(self, unit)
    return unit:GetTeam() == DOTA_TEAM_GOODGUYS;
end;
exports.ShinobiManager.FreeBidju = function(self, bidjuName)
    AkatsukiManager:removeParticleIndicator(bidjuName);
    BidjuManager:SpawnBidju(bidjuName);
    GameState:SetBidjuStatus(bidjuName, DOTA_TEAM_NEUTRALS);
end;
exports.ShinobiManager.CaptureBidju = function(self, killedBidju, owner)
    local bidju = BidjuManager:SpawnBidju(killedBidju:GetUnitName(), killedBidju:GetAbsOrigin(), DOTA_TEAM_GOODGUYS, nil);
    bidju:captureReadyRespawn();
    self:OnBidjuOwned(bidju:GetUnitName());
end;
exports.ShinobiManager.IsCaptured = function(self, bidju)
    return GameState.BIDJU_MAP[bidju] == DOTA_TEAM_GOODGUYS;
end;
exports.ShinobiManager.CheckAllCaptured = function(self)
    for key in pairs(BidjuName) do
        do
            local bidjuName = BidjuName[key];
            if not exports.ShinobiManager:IsCaptured(bidjuName) then
                return false;
            end
        end
        ::__continue13::
    end
    return true;
end;
exports.ShinobiManager.OnBidjuCaptured = function(self, bidju, hero)
    bidju:Kill(hero:FindAbilityByName("capture_bidju"), hero);
    hero:setBidjuState(true);
    hero:setBidju(bidju);
end;
exports.ShinobiManager.OnBidjuOwned = function(self, bidjuName)
    GameState:SetBidjuStatus(bidjuName, DOTA_TEAM_GOODGUYS);
    if exports.ShinobiManager:CheckAllCaptured() then
        GameState:SetShinobiWon();
    end
end;
return exports;
