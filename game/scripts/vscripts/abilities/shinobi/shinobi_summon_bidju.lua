--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_Bidju = require("game_events.Bidju");
local BidjuManager = __TSTL_Bidju.BidjuManager;
LinkLuaModifier("modifier_shinobi_summoned", "abilities/shinobi/modifier/modifier_shinobi_summoned.lua", LUA_MODIFIER_MOTION_NONE);
shinobi_summon_bidju = shinobi_summon_bidju or {};
shinobi_summon_bidju.__index = shinobi_summon_bidju;
shinobi_summon_bidju.new = function(construct, ...)
    local self = setmetatable({}, shinobi_summon_bidju);
    if construct and shinobi_summon_bidju.constructor then
        shinobi_summon_bidju.constructor(self, ...);
    end
    return self;
end;
shinobi_summon_bidju.constructor = function(self)
end;
shinobi_summon_bidju.GetMaxLevel = function(self)
    return 1;
end;
shinobi_summon_bidju.GetBehavior = function(self)
    return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_TOGGLE;
end;
shinobi_summon_bidju.OnToggle = function(self)
    local state = self:GetToggleState();
    ((state and (function()
        return self:onToggleOn();
    end)) or (function()
        return self:onToggleOff();
    end))();
end;
shinobi_summon_bidju.onToggleOn = function(self)
    local caster = self:GetCaster();
    print("On togle on?", caster.bidjuName);
    if caster.bidjuName ~= nil then
        local bidju = BidjuManager:SpawnBidju(caster.bidjuName, caster:GetAbsOrigin(), caster:GetTeam(), caster);
        bidju:SetControllableByPlayer(caster:GetPlayerOwnerID(), true);
        bidju:SetOwner(bidju);
        bidju.summoned = true;
        caster:AddNewModifier(caster, self, "modifier_shinobi_summoned", {});
    else
        error("Hero doesn\'t have bidjuName - and his ability is unlocked. ????");
    end
end;
shinobi_summon_bidju.onToggleOff = function(self)
    local caster = self:GetCaster();
    caster:RemoveModifierByName("modifier_shinobi_summoned");
    if caster.bidju ~= nil then
        caster.bidju:Kill(self, nil);
        self:StartCooldown(10);
    else
    end
end;
