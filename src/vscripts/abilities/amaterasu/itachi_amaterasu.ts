// import {Sound_tsukuyomi} from "../../Sounds";

LinkLuaModifier("modifier_amaterasu", "abilities/amaterasu/modifier/modifier_amaterasu.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class itachi_amaterasu extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return 10
    }

    GetChannelTime(): number {
        return 0
    }

    OnSpellStart(): void {

        const target = this.GetCursorTarget();
        const caster = this.GetCaster();

        target.AddNewModifier(caster, this, "modifier_amaterasu", {})
    }
}