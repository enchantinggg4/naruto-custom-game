--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_Sounds = require("Sounds");
local Sound_chidori = __TSTL_Sounds.Sound_chidori;
LinkLuaModifier("modifier_chidori_charge", "abilities/chidori/modifier/modifier_chidori_charge.lua", LUA_MODIFIER_MOTION_NONE);
LinkLuaModifier("modifier_chidori_active", "abilities/chidori/modifier/modifier_chidori_active.lua", LUA_MODIFIER_MOTION_NONE);
chidori = chidori or {};
chidori.__index = chidori;
chidori.new = function(construct, ...)
    local self = setmetatable({}, chidori);
    if construct and chidori.constructor then
        chidori.constructor(self, ...);
    end
    return self;
end;
chidori.constructor = function(self)
end;
chidori.GetBehavior = function(self)
    return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_CHANNELLED;
end;
chidori.GetChannelTime = function(self)
    return self:GetSpecialValueFor("charge_time");
end;
chidori.GetCooldown = function(self, iLevel)
    return self:GetSpecialValueFor("cooldown");
end;
chidori.GetCastAnimation = function(self)
    return ACT_DOTA_TELEPORT;
end;
chidori.GetManaCost = function(self, iLevel)
    return self:GetSpecialValueFor("manacost");
end;
chidori.ProcsMagicStick = function(self)
    return true;
end;
chidori.OnChannelFinish = function(self, bInterrupted)
    self:GetCaster():RemoveModifierByName("modifier_chidori_charge");
    if not bInterrupted then
        self:GetCaster():AddNewModifier(self:GetCaster(), self, "modifier_chidori_active", {duration = self:GetSpecialValueFor("duration")});
    end
end;
chidori.OnSpellStart = function(self)
    EmitSoundOn(Sound_chidori.Start, self:GetCaster());
    self:GetCaster():AddNewModifier(self:GetCaster(), self, "modifier_chidori_charge", {});
end;
