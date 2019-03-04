class modifier_hidan_contract_complete extends CDOTA_Modifier_Lua {

    IsHidden(): boolean {
        return false
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

    GetModifierHealthRegenPercentage(): number {
        return this.GetAbility().GetSpecialValueFor("complete_regen_percent")
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE
        ]
    }

    GetEffectName(): string {
        // return "particles/econ/items/bloodseeker/bloodseeker_eztzhok_weapon/bloodseeker_bloodbath_eztzhok_ribbon.vpcf"
        return "particles/units/heroes/hero_doom_bringer/doom_bringer_doom.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}