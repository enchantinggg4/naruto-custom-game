--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_Sounds = require("Sounds");
local Sound_rasengan = __TSTL_Sounds.Sound_rasengan;
LinkLuaModifier("modifier_rasengan_channel", "abilities/rasengan/modifier/modifier_rasengan_channel.lua", LUA_MODIFIER_MOTION_NONE);
LinkLuaModifier("modifier_rasengan_active", "abilities/rasengan/modifier/modifier_rasengan_active.lua", LUA_MODIFIER_MOTION_NONE);
rasengan = rasengan or {};
rasengan.__index = rasengan;
rasengan.new = function(construct, ...)
    local self = setmetatable({}, rasengan);
    if construct and rasengan.constructor then
        rasengan.constructor(self, ...);
    end
    return self;
end;
rasengan.constructor = function(self)
end;
rasengan.GetBehavior = function(self)
    return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_CHANNELLED;
end;
rasengan.GetChannelTime = function(self)
    return self:GetSpecialValueFor("charge_time");
end;
rasengan.GetCooldown = function(self, iLevel)
    return self:GetSpecialValueFor("cooldown");
end;
rasengan.GetCastAnimation = function(self)
    return ACT_DOTA_TELEPORT;
end;
rasengan.GetManaCost = function(self, iLevel)
    return self:GetSpecialValueFor("manacost");
end;
rasengan.ProcsMagicStick = function(self)
    return true;
end;
rasengan.OnChannelFinish = function(self, bInterrupted)
    self:GetCaster():RemoveModifierByName("modifier_rasengan_channel");
    if not bInterrupted then
        self:GetCaster():AddNewModifier(self:GetCaster(), self, "modifier_rasengan_active", {duration = self:GetSpecialValueFor("manacost")});
    end
end;
rasengan.OnSpellStart = function(self)
    EmitSoundOn(Sound_rasengan.Start, self:GetCaster());
    self:GetCaster():AddNewModifier(self:GetCaster(), self, "modifier_rasengan_channel", {});
end;
