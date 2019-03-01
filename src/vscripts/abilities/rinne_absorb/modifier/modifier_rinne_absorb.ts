class modifier_rinne_absorb extends CDOTA_Modifier_Lua {

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

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE,
        ]
    }

    OnTakeDamage(event: ModifierAttackEvent & { unit: CDOTA_BaseNPC }): void {


        if (IsServer() && event.unit === this.GetParent()) {
            // absorb dmg
            if (event.inflictor) {
                event.unit.SetHealth(event.unit.GetHealth() + event.damage);
            } else {
                // we don't reject physical attacks!
            }

        }
    }

    OnCreated(params: table): void {

    }

    OnDestroy(): void {

    }

    GetEffectName(): string {
        return "particles/units/heroes/hero_medusa/medusa_mana_shield.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}