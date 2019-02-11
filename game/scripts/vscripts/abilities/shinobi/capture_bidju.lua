require("game_events/bidju_shinobi")

function StartCapture(keys)
    local target = keys.target_points[1]
    local caster = keys.caster

    local radius = keys.ability:GetSpecialValueFor("radius")
    local cast = keys.ability:GetSpecialValueFor("base_cast")

    local units = FindUnitsInRadius(DOTA_TEAM_GOODGUYS, target, nil, radius, DOTA_UNIT_TARGET_TEAM_FRIENDLY, DOTA_UNIT_TARGET_ALL, DOTA_UNIT_TARGET_FLAG_NONE, 0, false)

    for _, unit in ipairs(units) do
        if unit:HasModifier("modifier_bidju_ready_capture") then
            BidjuJoinShinobi(unit, caster, cast, keys.ability)
            break
        end
    end
end