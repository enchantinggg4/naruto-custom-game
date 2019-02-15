itachi_tsukuyomi = class({})

function itachi_tsukuyomi:GetBehaviour()
    return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
end

function itachi_tsukuyomi:GetCooldown()
    return 10
end

function itachi_tsukuyomi:GetChannelTime()
    return 2
end

function itachi_tsukuyomi:OnSpellStart()
    local target = self:GetCursorTarget()
    EmitSoundOn( "Tsukuyomi.Start", target )
end


function itachi_tsukuyomi:OnChannelFinish(interrupted)
    local target = self:GetCursorTarget()
    local caster = self:GetCaster()
    if not interrupted then
        target:AddNewModifier(caster, self, "modifier_tsukuyomi", {
            duration = 5
        })
    end
end