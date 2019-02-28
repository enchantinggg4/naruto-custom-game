LinkLuaModifier("modifier_scale", "abilities/modifier/modifier_scale.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

const think = 0.01;

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
        const manaPercentPerSecond = this.GetAbility().GetSpecialValueFor("mana_cost_second");


        const manaToSpend = this.GetParent().GetMaxMana() * think * (manaPercentPerSecond / 100);
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

    OnTakeDamage(event: ModifierAttackEvent & { unit: CDOTA_BaseNPC }): void {
        if (event.unit === this.GetParent()) {
            const dmg = event.damage;
            const mana = this.GetParent().GetMana();

            const manaPerDamage = this.GetAbility().GetSpecialValueFor("absorb_mana_per_dmg");

            const fullAbsorbMana = manaPerDamage * dmg;


            if (dmg > fullAbsorbMana) {
                // spend all mana
                this.GetParent().SpendMana(mana, this.GetAbility());
                const reflectedDamage = mana / manaPerDamage;
                const unreflectedDamage = dmg - reflectedDamage;
                this.GetParent().SetHealth(this.oldHealth - unreflectedDamage);
            } else {
                this.GetParent().SpendMana(fullAbsorbMana, this.GetAbility());
                this.GetParent().SetHealth(this.oldHealth);
            }
        }
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE
        ]
    }

    OnCreated(params: table): void {
        if (IsServer()) {
            this.StartIntervalThink(think);
        }
    }
}