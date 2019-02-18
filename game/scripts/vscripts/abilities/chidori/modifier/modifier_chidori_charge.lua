--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
modifier_chidori_charge = modifier_chidori_charge or {};
modifier_chidori_charge.__index = modifier_chidori_charge;
modifier_chidori_charge.new = function(construct, ...)
    local self = setmetatable({}, modifier_chidori_charge);
    if construct and modifier_chidori_charge.constructor then
        modifier_chidori_charge.constructor(self, ...);
    end
    return self;
end;
modifier_chidori_charge.constructor = function(self)
end;
modifier_chidori_charge.IsHidden = function(self)
    return true;
end;
modifier_chidori_charge.IsDebuff = function(self)
    return false;
end;
modifier_chidori_charge.IsStunDebuff = function(self)
    return false;
end;
modifier_chidori_charge.IsPurgable = function(self)
    return false;
end;
modifier_chidori_charge.GetEffectName = function(self)
    return "particles/abilities/rasengan/rasengan_charge.vpcf";
end;
modifier_chidori_charge.GetEffectAttachType = function(self)
    return PATTACH_POINT_FOLLOW;
end;
