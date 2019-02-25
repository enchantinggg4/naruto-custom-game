LinkLuaModifier("modifier_scale", "abilities/modifier/modifier_scale.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class modifier_susano extends CDOTA_Modifier_Lua {

    oldHealth: number;


    IsHidden(): boolean {
        return false
    }

    GetEffectName(): string {
        return "particles/base_attacks/ranged_tower_good_glow_c.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }

    GetStatusEffectName(): string {
        return "particles/abilities/susano/susano_chakra.vpcf"
    }

    StatusEffectPriority(): modifierpriority {
        return 15
    }

    OnIntervalThink(): void {
        const manaToSpend = this.GetParent().GetMaxMana() * 0.01 * 0.01;
        if (this.GetParent().GetMana() < manaToSpend) {
            this.GetAbility().ToggleAbility();
            return;
        }
        this.GetParent().SpendMana(
            manaToSpend,
            this.GetAbility()
        );
        this.oldHealth = this.GetParent().GetHealth();
    }

    OnTakeDamage(event: ModifierAttackEvent): void {
        const dmg = event.damage;
        const mana = this.GetParent().GetMana();

        if (dmg > mana) {
            this.GetParent().SpendMana(mana, this.GetAbility());
            this.GetParent().SetHealth(this.oldHealth - (dmg - mana));
        } else {
            this.GetParent().SpendMana(dmg, this.GetAbility());
            this.GetParent().SetHealth(this.oldHealth);
        }

    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE
        ]
    }

    OnCreated(params: table): void {
        if (IsServer()) {
            this.StartIntervalThink(0.01);
        }
    }
}