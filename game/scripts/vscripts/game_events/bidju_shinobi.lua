require("game_events/shinobi")


local bidju_respawn_time = 5
-- todo mappings
local bidju_spirit_color = {
    npc_dota_custom_bidju_shukaku = Vector(219 / 255, 83 / 255, 41 / 255),
    npc_dota_custom_bidju_matatabi = Vector(55 / 255, 88 / 255, 232 / 255)
}

local function LifeDrainParticle(hero, bidju)

    -- hero - caster
    -- bidju - target
    local caster = hero
    local target = bidju

    local particleName = "particles/abilities/bidju/bidju_spirit2.vpcf"
    caster.LifeDrainParticle = ParticleManager:CreateParticle(particleName, PATTACH_ABSORIGIN_FOLLOW, caster)
    ParticleManager:SetParticleControlEnt(caster.LifeDrainParticle, 0, caster, PATTACH_POINT_FOLLOW, "attach_hitloc", target:GetAbsOrigin(), true) -- caster
    ParticleManager:SetParticleControlEnt(caster.LifeDrainParticle, 1, target, PATTACH_POINT_FOLLOW, "attach_hitloc", target:GetAbsOrigin(), true) -- target
    ParticleManager:SetParticleControlEnt(caster.LifeDrainParticle, 2, target, PATTACH_POINT_FOLLOW, "attach_hitloc", bidju_spirit_color[bidju:GetUnitName()], true) -- target

end

local function LifeDrainParticleEnd(hero)
    local caster = hero
    ParticleManager:DestroyParticle(caster.LifeDrainParticle, false)
end

-- -createhero npc_dota_custom_bidju_shukaku enemy

local function RespawnBidju(name, team, owner)
    --local point = Entities:FindByName(nil, "respawn_" .. name):GetAbsOrigin()
    -- tmp
    local point = owner:GetAbsOrigin()

    local unit = CreateUnitByName(name, point, true, nil, nil, team)
    unit:StartGesture(ACT_DOTA_DISABLED)

    unit:AddNewModifier(owner, nil, "modifier_invulnerable", {
        duration = bidju_respawn_time
    })

    unit:AddNewModifier(owner, nil, "modifier_bidju_ready_capture", {})

    return unit
end

function BidjuJoinShinobi(bidju, hero, duration, ability)
    LifeDrainParticle(hero, bidju)

    Timers:CreateTimer(duration, function()
        OnBidjuCaptured(hero)
        LifeDrainParticleEnd(hero)
    end)

    DebugPrint("Hey shinobi " .. hero:GetUnitName())

    bidju:Kill(ability, hero)
    hero.bidju_name = bidju:GetUnitName()
end

function OnBidjuKilledByShinobi(bidju, killer)
    bidju.respawn = true
    bidju.respawn_time = bidju_respawn_time
    bidju.respawn_time_left = bidju.respawn_time
    bidju.owner = killer
    bidju:SetHealth(0)

    RespawnBidju(bidju:GetUnitName(), killer:GetTeam(), killer)
end
