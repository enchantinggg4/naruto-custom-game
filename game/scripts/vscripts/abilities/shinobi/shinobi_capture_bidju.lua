--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local __TSTL_Shinobi = require("game_events.Shinobi");
local ShinobiManager = __TSTL_Shinobi.ShinobiManager;
shinobi_capture_bidju = shinobi_capture_bidju or {};
shinobi_capture_bidju.__index = shinobi_capture_bidju;
shinobi_capture_bidju.new = function(construct, ...)
    local self = setmetatable({}, shinobi_capture_bidju);
    if construct and shinobi_capture_bidju.constructor then
        shinobi_capture_bidju.constructor(self, ...);
    end
    return self;
end;
shinobi_capture_bidju.constructor = function(self)
end;
shinobi_capture_bidju.Particles = function(self, hero, bidju)
    local caster = hero;
    local target = bidju;
    local particleName = "particles/abilities/bidju/bidju_spirit2.vpcf";
    self.particleID = ParticleManager:CreateParticle(particleName, PATTACH_ABSORIGIN_FOLLOW, caster);
    ParticleManager:SetParticleControlEnt(self.particleID, 0, caster, PATTACH_POINT_FOLLOW, "attach_hitloc", target:GetAbsOrigin(), true);
    ParticleManager:SetParticleControlEnt(self.particleID, 1, target, PATTACH_POINT_FOLLOW, "attach_hitloc", target:GetAbsOrigin(), true);
    ParticleManager:SetParticleControlEnt(self.particleID, 2, target, PATTACH_POINT_FOLLOW, "attach_hitloc", Vector(255, 0, 0), true);
end;
shinobi_capture_bidju.GetBehavior = function(self)
    return DOTA_ABILITY_BEHAVIOR_CHANNELLED + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET;
end;
shinobi_capture_bidju.GetAbilityTargetTeam = function(self)
    return DOTA_UNIT_TARGET_TEAM_FRIENDLY;
end;
shinobi_capture_bidju.GetMaxLevel = function(self)
    return 1;
end;
shinobi_capture_bidju.GetChannelTime = function(self)
    return 1;
end;
shinobi_capture_bidju.CastFilterResultTarget = function(self, hTarget)
    if hTarget:HasModifier("modifier_bidju_ready_capture") then
        return UF_SUCCESS;
    end
    return UF_FAIL_CUSTOM;
end;
shinobi_capture_bidju.OnSpellStart = function(self)
    self:Particles(self:GetCaster(), self:GetCursorTarget());
end;
shinobi_capture_bidju.OnChannelFinish = function(self, bInterrupted)
    ParticleManager:DestroyParticle(self.particleID, false);
    if not bInterrupted then
        ShinobiManager:OnBidjuCaptured(self:GetCursorTarget(), self:GetCaster());
    end
end;
