--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
modifier_rasengan_active = modifier_rasengan_active or {};
modifier_rasengan_active.__index = modifier_rasengan_active;
modifier_rasengan_active.new = function(construct, ...)
    local self = setmetatable({}, modifier_rasengan_active);
    if construct and modifier_rasengan_active.constructor then
        modifier_rasengan_active.constructor(self, ...);
    end
    return self;
end;
modifier_rasengan_active.constructor = function(self)
end;
modifier_rasengan_active.IsHidden = function(self)
    return false;
end;
modifier_rasengan_active.IsDebuff = function(self)
    return false;
end;
modifier_rasengan_active.IsStunDebuff = function(self)
    return false;
end;
modifier_rasengan_active.IsPurgable = function(self)
    return false;
end;
modifier_rasengan_active.DeclareFunctions = function(self)
    return {MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE};
end;
modifier_rasengan_active.GetModifierDamageOutgoing_Percentage = function(self, event)
    return 1000;
end;
modifier_rasengan_active.OnAttackLanded = function(self, event)
    EmitSoundOn("Rasengan.Hit", event.target);
end;
modifier_rasengan_active.OnCreated = function(self, params)
    EmitSoundOn("Rasengan.Active", self:GetCaster());
end;
modifier_rasengan_active.OnDestroy = function(self)
    StopSoundOn("Rasengan.Active", self:GetCaster());
    EmitSoundOn("Rasengan.End", self:GetCaster());
end;
modifier_rasengan_active.GetEffectName = function(self)
    return "particles/abilities/rasengan/rasengan_active.vpcf";
end;
modifier_rasengan_active.GetEffectAttachType = function(self)
    return PATTACH_POINT_FOLLOW;
end;
