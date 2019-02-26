
class rinne_resurrect extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return 15
    }

    GetChannelTime(): number {
        return 3
    }


    GetAbilityTargetFlags(): DOTA_UNIT_TARGET_FLAGS {
        return DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_INVULNERABLE;
    }


    CastFilterResultTarget(hTarget: CDOTA_BaseNPC): UnitFilterResult {
        if (hTarget.HasModifier("modifier_rinne_path_dead")) {
            return UnitFilterResult.UF_SUCCESS
        }
        return UnitFilterResult.UF_FAIL_CUSTOM;
    }

    GetManaCost(iLevel: number): number {
        return 0
    }


    OnChannelFinish(bInterrupted: boolean): void {
        if(!bInterrupted){
            (this.GetCursorTarget().FindModifierByName("modifier_rinne_path_dead") as modifier_rinne_path_dead).Resurrect();
        }
    }

    OnSpellStart(): void {

    }
}
        