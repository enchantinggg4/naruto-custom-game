--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_Sounds = require("Sounds");
local Sound_tsukuyomi = __TSTL_Sounds.Sound_tsukuyomi;
LinkLuaModifier("modifier_tsukuyomi", "abilities/tsukuyomi/modifier/modifier_tsukuyomi.lua", LUA_MODIFIER_MOTION_NONE);
itachi_tsukuyomi = itachi_tsukuyomi or {};
itachi_tsukuyomi.__index = itachi_tsukuyomi;
itachi_tsukuyomi.new = function(construct, ...)
    local self = setmetatable({}, itachi_tsukuyomi);
    if construct and itachi_tsukuyomi.constructor then
        itachi_tsukuyomi.constructor(self, ...);
    end
    return self;
end;
itachi_tsukuyomi.constructor = function(self)
end;
itachi_tsukuyomi.GetBehavior = function(self)
    return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET;
end;
itachi_tsukuyomi.GetCooldown = function(self, iLevel)
    return 10;
end;
itachi_tsukuyomi.GetChannelTime = function(self)
    return 0.5;
end;
itachi_tsukuyomi.OnSpellStart = function(self)
    local target = self:GetCursorTarget();
    EmitSoundOn(Sound_tsukuyomi.Start, target);
end;
itachi_tsukuyomi.OnChannelFinish = function(self, bInterrupted)
    local target = self:GetCursorTarget();
    local caster = self:GetCaster();
    if not bInterrupted then
        target:AddNewModifier(caster, self, "modifier_stunned", {duration = 5});
        target:AddNewModifier(caster, self, "modifier_tsukuyomi", {duration = 5});
    end
end;
