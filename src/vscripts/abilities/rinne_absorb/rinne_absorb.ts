LinkLuaModifier("modifier_rinne_absorb", "abilities/rinne_absorb/modifier/modifier_rinne_absorb.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class rinne_absorb extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetAbilityTargetTeam(): DOTA_UNIT_TARGET_TEAM {
        return DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY
    }

    GetAbilityTargetFlags(): DOTA_UNIT_TARGET_FLAGS {
        return DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE
    }

    GetCooldown(iLevel: number): number {
        return 0
    }

    GetChannelTime(): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return 0
    }

    OnSpellStart(): void {
        print("HA?");
        this.GetCursorTarget().AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_rinne_absorb",
            {
                duration: 3
            }
        )
    }
}
        