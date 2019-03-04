LinkLuaModifier("modifier_hidan_contract_complete", "abilities/hidan_contract/modifier/modifier_hidan_contract_complete.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

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

    OnDeath(event: ModifierAttackEvent): void {
        if (event.unit === this.GetParent()) {
            this.GetCaster().AddNewModifier(
                this.GetCaster(),
                this.GetAbility(),
                "modifier_hidan_contract_complete",
                {
                    duration: this.GetAbility().GetSpecialValueFor("complete_regen_duration")
                }
            );
            this.Destroy();
        }
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE,
            modifierfunction.MODIFIER_EVENT_ON_DEATH
        ]
    }

    OnCreated(params: table): void {

    }

    OnDestroy(): void {

    }

    GetEffectName(): string {
        // return "particles/econ/items/bloodseeker/bloodseeker_eztzhok_weapon/bloodseeker_bloodbath_eztzhok_ribbon.vpcf"
        return "particles/units/heroes/hero_doom_bringer/doom_bringer_doom.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}