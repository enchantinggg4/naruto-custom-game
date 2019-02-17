--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
bidju_bidjudama = bidju_bidjudama or {};
bidju_bidjudama.__index = bidju_bidjudama;
bidju_bidjudama.new = function(construct, ...)
    local self = setmetatable({}, bidju_bidjudama);
    self.charge_start = 0;
    self.particle = 0;
    self.projectiles = {};
    if construct and bidju_bidjudama.constructor then
        bidju_bidjudama.constructor(self, ...);
    end
    return self;
end;
bidju_bidjudama.constructor = function(self)
end;
bidju_bidjudama.ThrowProjectile = function(self)
    local info = {Target = self:GetCursorTarget(), Source = self:GetCaster(), Ability = self, EffectName = "particles/abilities/bidju/kurama/bidjudama_projectile2.vpcf", iMoveSpeed = 1500};
    ProjectileManager:CreateTrackingProjectile(info);
end;
bidju_bidjudama.OnProjectileHitHandle = function(self, hTarget, vLocation, pid)
    ApplyDamage({victim = hTarget, attacker = self:GetCaster(), damage = 100, damage_type = DAMAGE_TYPE_MAGICAL});
    return true;
end;
bidju_bidjudama.GetAbilityTargetTeam = function(self)
    return DOTA_UNIT_TARGET_TEAM_ENEMY;
end;
bidju_bidjudama.GetAbilityTargetType = function(self)
    return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC;
end;
bidju_bidjudama.GetChannelTime = function(self)
    return 1;
end;
bidju_bidjudama.GetCastAnimation = function(self)
    return ACT_DOTA_DISABLED;
end;
bidju_bidjudama.GetManaCost = function(self, iLevel)
    return 10;
end;
bidju_bidjudama.GetBehavior = function(self)
    return DOTA_ABILITY_BEHAVIOR_CHANNELLED + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET;
end;
bidju_bidjudama.OnChannelFinish = function(self, bInterrupted)
    ParticleManager:DestroyParticle(self.particle, false);
    self:ThrowProjectile();
end;
bidju_bidjudama.OnSpellStart = function(self)
    local caster = self:GetCaster();
    self.charge_start = GameRules:GetGameTime();
    self.particle = ParticleManager:CreateParticle("particles/abilities/bidju/kurama/bidjudama.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster);
    ParticleManager:SetParticleControlEnt(self.particle, 0, caster, PATTACH_POINT_FOLLOW, "attach_mouth", caster:GetAbsOrigin(), true);
end;
