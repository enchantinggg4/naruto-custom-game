import {Sound_tsukuyomi} from "../../Sounds";

LinkLuaModifier("modifier_tsukuyomi", "abilities/tsukuyomi/modifier/modifier_tsukuyomi.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class itachi_tsukuyomi extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return 10
    }

    GetChannelTime(): number {
        return 0.5
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
                duration: 5
            });
            target.AddNewModifier(caster, this, "modifier_tsukuyomi", {
                duration: 5
            })
        }

    }
}