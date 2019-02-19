--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_Sounds = require("Sounds");
local Sound_tsukuyomi = __TSTL_Sounds.Sound_tsukuyomi;
modifier_tsukuyomi = modifier_tsukuyomi or {};
modifier_tsukuyomi.__index = modifier_tsukuyomi;
modifier_tsukuyomi.new = function(construct, ...)
    local self = setmetatable({}, modifier_tsukuyomi);
    if construct and modifier_tsukuyomi.constructor then
        modifier_tsukuyomi.constructor(self, ...);
    end
    return self;
end;
modifier_tsukuyomi.constructor = function(self)
end;
modifier_tsukuyomi.IsHidden = function(self)
    return false;
end;
modifier_tsukuyomi.IsDebuff = function(self)
    return true;
end;
modifier_tsukuyomi.GetEffectName = function(self)
    return "particles/abilities/tsukuyomi/overhead2.vpcf";
end;
modifier_tsukuyomi.GetEffectAttachType = function(self)
    return PATTACH_OVERHEAD_FOLLOW;
end;
modifier_tsukuyomi.OnDestroy = function(self)
    StopSoundOn(Sound_tsukuyomi.Loop, self:GetParent());
    EmitSoundOn(Sound_tsukuyomi.End, self:GetParent());
    self:StartIntervalThink(-1);
end;
modifier_tsukuyomi.OnCreated = function(self, params)
    EmitSoundOn(Sound_tsukuyomi.Loop, self:GetParent());
    if IsServer() then
        self:StartIntervalThink(0.1);
    end
end;
modifier_tsukuyomi.OnIntervalThink = function(self)
    ApplyDamage({victim = self:GetParent(), attacker = self:GetCaster(), damage = 10, damage_type = DAMAGE_TYPE_MAGICAL});
end;
