--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
modifier_rasengan_channel = modifier_rasengan_channel or {};
modifier_rasengan_channel.__index = modifier_rasengan_channel;
modifier_rasengan_channel.new = function(construct, ...)
    local self = setmetatable({}, modifier_rasengan_channel);
    if construct and modifier_rasengan_channel.constructor then
        modifier_rasengan_channel.constructor(self, ...);
    end
    return self;
end;
modifier_rasengan_channel.constructor = function(self)
end;
modifier_rasengan_channel.IsHidden = function(self)
    return true;
end;
modifier_rasengan_channel.IsDebuff = function(self)
    return false;
end;
modifier_rasengan_channel.IsStunDebuff = function(self)
    return false;
end;
modifier_rasengan_channel.IsPurgable = function(self)
    return false;
end;
modifier_rasengan_channel.GetEffectName = function(self)
    return "particles/abilities/rasengan/rasengan_charge.vpcf";
end;
modifier_rasengan_channel.GetEffectAttachType = function(self)
    return PATTACH_POINT_FOLLOW;
end;
