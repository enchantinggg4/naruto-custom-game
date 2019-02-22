LinkLuaModifier("modifier_genjutsu", "abilities/genjutsu/modifier/modifier_genjutsu.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class genjutsu extends CDOTA_Ability_Lua {

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown")
    }

    GetChannelTime(): number {
        return this.GetSpecialValueFor("charge_time")
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("mana_cost")
    }

    OnSpellStart(): void {

    }

    OnChannelFinish(bInterrupted: boolean): void {
        if(!bInterrupted){
            this.GetCursorTarget().AddNewModifier(
                this.GetCaster(),
                this,
                "modifier_genjutsu",
                {
                    duration: this.GetSpecialValueFor("duration")
                }
            )
        }
    }
}