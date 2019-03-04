
class hidan_double_damage extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return 0
    }


    OnChannelFinish(bInterrupted: boolean): void {
        
    }

    OnSpellStart(): void {
        const target = this.GetCursorTarget();
        ApplyDamage({
            victim: target,
            damage: 100,
            attacker: this.GetCaster(),
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        });

        ApplyDamage({
            victim: this.GetCaster(),
            damage: 100,
            attacker: this.GetCaster(),
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        });
    }
}
        