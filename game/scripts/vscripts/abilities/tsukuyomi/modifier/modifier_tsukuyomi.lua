modifier_tsukuyomi = class({})

function modifier_tsukuyomi:IsPassive()
    return false
end

function modifier_tsukuyomi:IsHidden()
    return false
end

function modifier_tsukuyomi:IsDebuff()
    --DebugPrint("IsDebuff")
    return true
end

function modifier_tsukuyomi:GetEffectName()
    --DebugPrint("GetEffectName")
    return "particles/abilities/tsukuyomi/overhead2.vpcf"
    --return "particles/generic_gameplay/generic_stunned.vpcf"
end

function modifier_tsukuyomi:GetEffectAttachType()
    --DebugPrint("GetEffectAttachType?")
    return PATTACH_OVERHEAD_FOLLOW
end

function modifier_tsukuyomi:OnDestroy()
    StopSoundOn("Tsukuyomi.Process", self:GetParent())
    EmitSoundOn( "Tsukuyomi.End",   self:GetParent())
end

function modifier_tsukuyomi:OnCreated()
    EmitSoundOn( "Tsukuyomi.Process", self:GetParent() )
end


function modifier_tsukuyomi:OnIntervalThink()
    ApplyDamage({
        victim = self:GetParent(),
        attacker = self:GetCaster(),
        damage = 0,
        damage_type = DAMAGE_TYPE_MAGICAL
    })
end