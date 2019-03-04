class modifier_hidan_contract extends CDOTA_Modifier_Lua {

    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return true
    }

    IsStunDebuff(): boolean {
        return false
    }

    IsPurgable(): boolean {
        return false
    }

    OnTakeDamage(event: ModifierAttackEvent): void {
        if (event.unit === this.GetCaster()) {
            // if damage done to caster(hidan)
            ApplyDamage({
                victim: this.GetParent(),
                attacker: this.GetCaster(),
                damage: event.original_damage,
                damage_type: event.damage_type
            });
        }
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE
        ]
    }

    OnCreated(params: table): void {

    }

    OnDestroy(): void {

    }

    GetEffectName(): string {
        return "particles/econ/items/bloodseeker/bloodseeker_eztzhok_weapon/bloodseeker_bloodrage_eztzhok_ovr_arc.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}