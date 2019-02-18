--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
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
    return 1000;
end;
modifier_chidori_active.OnAttackLanded = function(self, event)
    EmitSoundOn("Rasengan.Hit", event.target);
end;
modifier_chidori_active.OnCreated = function(self, params)
    EmitSoundOn("Rasengan.Active", self:GetCaster());
end;
modifier_chidori_active.OnDestroy = function(self)
    StopSoundOn("Rasengan.Active", self:GetCaster());
    EmitSoundOn("Rasengan.End", self:GetCaster());
end;
modifier_chidori_active.GetEffectName = function(self)
    return "particles/abilities/rasengan/rasengan_active.vpcf";
end;
modifier_chidori_active.GetEffectAttachType = function(self)
    return PATTACH_POINT_FOLLOW;
end;
