import {Sound_tsukuyomi} from "../../Sounds";

LinkLuaModifier("modifier_tsukuyomi", "abilities/tsukuyomi/modifier/modifier_tsukuyomi.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class tsukuyomi extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCastAnimation(): GameActivity_t {
        return GameActivity_t.ACT_DOTA_CAST_ABILITY_4
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown");
    }

    GetChannelTime(): number {
        return this.GetSpecialValueFor("charge_time");
    }

    OnSpellStart(): void {
        const target = this.GetCursorTarget();
        EmitSoundOn(Sound_tsukuyomi.Start, target);
    }

    OnChannelFinish(bInterrupted: boolean): void {
        const target = this.GetCursorTarget();
        const caster = this.GetCaster();

        if(!bInterrupted){
            target.AddNewModifier(caster, this, "modifier_stunned", {
                duration: this.GetSpecialValueFor("duration")
            });
            target.AddNewModifier(caster, this, "modifier_tsukuyomi", {
                duration: this.GetSpecialValueFor("duration")
            })
        }

    }
}