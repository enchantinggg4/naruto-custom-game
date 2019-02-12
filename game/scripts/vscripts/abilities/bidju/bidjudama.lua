local function Projectile(keys)
    local projectile_info =
    {
        EffectName = "particles/abilities/bidju/kurama/bidjudama_projectile2.vpcf",
        Ability = keys.ability,
        vSpawnOrigin = keys.caster:GetAbsOrigin(),
        Target = keys.target,
        Source = keys.caster,
        bHasFrontalCone = false,
        iMoveSpeed = 500,
        bReplaceExisting = false,
        bProvidesVision = true,
        iVisionRadius = 100,
        iVisionTeamNumber = keys.caster:GetTeamNumber()
    }

    ProjectileManager:CreateTrackingProjectile(projectile_info)
end


function OnSpellStart(keys)
    local caster = keys.caster
    local ability = keys.ability
    local target = keys.target
    ability.illuminate_start_time = GameRules:GetGameTime()

    local particleName = "particles/abilities/bidju/kurama/bidjudama.vpcf"
    ability.LifeDrainParticle = ParticleManager:CreateParticle(particleName, PATTACH_ABSORIGIN_FOLLOW, caster)
    ParticleManager:SetParticleControlEnt(ability.LifeDrainParticle, 0, caster, PATTACH_POINT_FOLLOW, "attach_mouth", caster:GetAbsOrigin(), true) -- caster
end

function OnChannelFinish(keys)
    local caster = keys.caster
    local ability = keys.ability
    local charge_time = GameRules:GetGameTime() - ability.illuminate_start_time

    local charge_damage = 10 * charge_time

    ParticleManager:DestroyParticle(ability.LifeDrainParticle, false)

    Projectile(keys)

    ApplyDamage({
        victim = keys.target,
        attacker = caster,
        damage = charge_damage,
        damage_type = DAMAGE_TYPE_MAGICAL
    })

end