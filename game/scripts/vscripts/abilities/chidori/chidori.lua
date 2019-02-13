function AddBuff(event)
    local target = event.caster
    local ability = event.ability

    local duration = ability:GetLevelSpecialValueFor("duration", ability:GetLevel() - 1)

    target:EmitSound("Chidori.Active")

    -- Stops the sound after the duration, a bit early to ensure the thinker still exists
    Timers:CreateTimer(duration - 0.1, function()
        target:StopSound("Chidori.Active")
        target:EmitSound("Chidori.End")
    end)
end