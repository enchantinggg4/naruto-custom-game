LinkLuaModifier("modifier_hidan_contract", "abilities/hidan_contract/modifier/modifier_hidan_contract.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class hidan_contract extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetAbilityTargetTeam(): DOTA_UNIT_TARGET_TEAM {
        return DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY
    }

    GetAbilityTargetType(): DOTA_UNIT_TARGET_TYPE {
        return DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO
    }

    GetCooldown(iLevel: number): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return 0
    }

    OnSpellStart(): void {
        const target = this.GetCursorTarget();
        ApplyDamage({
            victim: target,
            damage: 100,
            attacker: this.GetCaster(),
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        });
        target.AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_hidan_contract",
            {duration: 15}
        )
    }
}
        