class modifier_rasengan_channel extends CDOTA_Modifier_Lua {

    IsHidden(): boolean {
        return true
    }

    IsDebuff(): boolean {
        return false
    }

    IsStunDebuff(): boolean {
        return false
    }

    IsPurgable(): boolean {
        return false
    }

    GetEffectName(): string {
        return "particles/abilities/rasengan/rasengan_charge.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}