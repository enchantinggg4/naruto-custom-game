--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_Sounds = require("Sounds");
local Sound_chidori = __TSTL_Sounds.Sound_chidori;
modifier_chidori_active = modifier_chidori_active or {};
modifier_chidori_active.__index = modifier_chidori_active;
modifier_chidori_active.new = function(construct, ...)
    local self = setmetatable({}, modifier_chidori_active);
    if construct and modifier_chidori_active.constructor then
        modifier_chidori_active.constructor(self, ...);
    end
    return self;
end;
modifier_chidori_active.constructor = function(self)
end;
modifier_chidori_active.IsHidden = function(self)
    return false;
end;
modifier_chidori_active.IsDebuff = function(self)
    return false;
end;
modifier_chidori_active.IsStunDebuff = function(self)
    return false;
end;
modifier_chidori_active.IsPurgable = function(self)
    return false;
end;
modifier_chidori_active.DeclareFunctions = function(self)
    return {MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE};
end;
modifier_chidori_active.GetModifierDamageOutgoing_Percentage = function(self, event)
    return self:GetAbility():GetSpecialValueFor("damage_ampify");
end;
modifier_chidori_active.OnAttackLanded = function(self, event)
    event.target:ReduceMana(self:GetAbility():GetSpecialValueFor("mana_burn"));
    EmitSoundOn(Sound_chidori.Hit, event.target);
end;
modifier_chidori_active.OnCreated = function(self, params)
    EmitSoundOn(Sound_chidori.Loop, self:GetCaster());
end;
modifier_chidori_active.OnDestroy = function(self)
    StopSoundOn(Sound_chidori.Loop, self:GetCaster());
    EmitSoundOn(Sound_chidori.End, self:GetCaster());
end;
modifier_chidori_active.GetEffectName = function(self)
    return "particles/abilities/chidori/chidori.vpcf";
end;
modifier_chidori_active.GetEffectAttachType = function(self)
    return PATTACH_POINT_FOLLOW;
end;
