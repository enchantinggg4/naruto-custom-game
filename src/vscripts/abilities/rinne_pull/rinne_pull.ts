LinkLuaModifier("modifier_rinne_pull", "abilities/rinne_pull/modifier/modifier_rinne_pull.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class rinne_pull extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown")
    }

    GetChannelTime(): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost")
    }

    GetCastRange(vLocation: Vector, hTarget: CDOTA_BaseNPC): number {
        return this.GetSpecialValueFor("distance")
    }

    OnChannelFinish(bInterrupted: boolean): void {

    }

    OnSpellStart(): void {
        this.GetCursorTarget().RemoveModifierByName("modifier_rinne_push");
        this.GetCursorTarget().AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_rinne_pull",
            {
                duration: this.GetSpecialValueFor("duration"),
                maxDistance: this.GetSpecialValueFor("distance")
            }
        )
    }
}
        