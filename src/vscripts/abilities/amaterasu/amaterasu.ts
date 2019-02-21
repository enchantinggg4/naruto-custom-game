// import {Sound_tsukuyomi} from "../../Sounds";

import {Sound_amaterasu, Sound_tsukuyomi} from "../../Sounds";

LinkLuaModifier("modifier_amaterasu", "abilities/amaterasu/modifier/modifier_amaterasu.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class amaterasu extends CDOTA_Ability_Lua {
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


    OnChannelFinish(bInterrupted: boolean): void {
        if (!bInterrupted) {
            const target = this.GetCursorTarget();
            const caster = this.GetCaster();

            target.AddNewModifier(caster, this, "modifier_amaterasu", {
                duration: this.GetSpecialValueFor("duration")
            })
        }
    }

    OnSpellStart(): void {
        EmitSoundOn(Sound_amaterasu.Start, this.GetCursorTarget());
    }
}