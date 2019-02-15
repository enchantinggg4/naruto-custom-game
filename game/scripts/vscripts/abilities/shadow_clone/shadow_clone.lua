function CreateIllusion(keys)

    local caster = keys.caster
    local ability = keys.ability
    local duration = 10
    local damage_dealt = 100
    local damage_taken = 1000

    keys.caster:CreateIllusion(caster, ability, duration, nil, damage_dealt, damage_taken, true, nil)
end