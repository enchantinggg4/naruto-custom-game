require("game_events/bidju_shinobi")
require("game_events/shinobi")

local function CaptureBidju(bidju, hero)
    local entity = Entities:FindByName(nil, "akatsuki_preview_" .. bidju:GetUnitName())

    if entity.bidju_indicator == nil then
        entity.bidju_indicator = ParticleManager:CreateParticle(
                "particles/env/bidju_capture_indicator.vpcf",
                PATTACH_ABSORIGIN,
                bidju)

        ParticleManager:SetParticleControlEnt(entity.bidju_indicator, 1, bidju, PATTACH_ABSORIGIN, "attach_hitloc", bidju:GetAbsOrigin(), true) -- target

    end

end

--local function UncaptureBidju(name)
--
--    local entity = Entities:FindByName(nil, "akatsuki_preview_" .. name)
--
--    if entity.bidju_indicator ~= nil then
--        ParticleManager:DestroyParticle(entity.bidju_indicator, false)
--    end
--
--end

function SetBidjuCaptured(bidju_name, bidju)
    CaptureBidju(bidju_name, bidju)
    if bidju.owner ~= nil then
        OnBidjuUncaptured(bidju.owner)
        bidju.owner.bidju = nil
        bidju.owner = nil
    end

end