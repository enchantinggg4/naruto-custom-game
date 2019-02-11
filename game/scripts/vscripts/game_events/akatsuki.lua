require("game_events/bidju_shinobi")
require("game_events/shinobi")



local function CreateDefender(bidju)

    local ent = Entities:FindByName(nil, "akatsuki_preview_npc_dota_custom_bidju_shukaku")
    local unit = CreateUnitByName("npc_dota_custom_cave", ent:GetAbsOrigin(), true, nil, nil, DOTA_TEAM_BADGUYS)
    unit.bidju_name = bidju:GetUnitName()
end

local function CaptureBidju(bidju)
    local entity = Entities:FindByName(nil, "akatsuki_preview_" .. bidju:GetUnitName())


    if entity.bidju_indicator ~= nil then
        ParticleManager:DestroyParticle(entity.bidju_indicator, false)
    end

    entity.bidju_indicator = ParticleManager:CreateParticle(
            "particles/env/bidju_capture_indicator.vpcf",
            PATTACH_ABSORIGIN,
            entity)

    ParticleManager:SetParticleControlEnt(entity.bidju_indicator, 0, entity, PATTACH_ABSORIGIN, "attach_hitloc", entity:GetAbsOrigin(), true) -- target


    CreateDefender(bidju)
end



function UncaptureBidju(name)

    local entity = Entities:FindByName(nil, "akatsuki_preview_" .. name)

    if entity.bidju_indicator ~= nil then
        ParticleManager:DestroyParticle(entity.bidju_indicator, false)
    end

    local unit = CreateUnitByName(name, Entities:FindByName(nil, "spawn_" .. name):GetAbsOrigin(), true, nil, nil, DOTA_TEAM_NEUTRALS)

    unit:StartGesture(ACT_DOTA_DISABLED)

    local duration = 5

    unit:AddNewModifier(owner, nil, "modifier_invulnerable", {
        duration = duration
    })

    Timers:CreateTimer(duration, function()
        unit:StartGesture(ACT_DOTA_IDLE)
    end)

end

function SetBidjuCaptured(bidju)
    CaptureBidju(bidju)
    if bidju.owner ~= nil then
        OnBidjuUncaptured(bidju.owner)
        TurnOffSummon(bidju.owner)
        bidju.owner.bidju = nil
        bidju.owner = nil
    end

end