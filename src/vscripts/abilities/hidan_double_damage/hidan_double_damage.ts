
class hidan_double_damage extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown");
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost");
    }

    GetCastRange(vLocation: Vector, hTarget: CDOTA_BaseNPC): number {
        return this.GetSpecialValueFor("range");
    }

    OnSpellStart(): void {
        const target = this.GetCursorTarget();
        ApplyDamage({
            victim: target,
            damage: this.GetSpecialValueFor("damage"),
            attacker: this.GetCaster(),
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        });

        ApplyDamage({
            victim: this.GetCaster(),
            damage: this.GetSpecialValueFor("damage"),
            attacker: this.GetCaster(),
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        });
    }
}
        