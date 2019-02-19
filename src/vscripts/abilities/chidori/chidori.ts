import {ShinobiExtension} from "../../game_events/Shinobi";
import {Sound_chidori} from "../../Sounds";

LinkLuaModifier("modifier_chidori_charge", "abilities/chidori/modifier/modifier_chidori_charge.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);
LinkLuaModifier("modifier_chidori_active", "abilities/chidori/modifier/modifier_chidori_active.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class chidori extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED;
    }

    GetChannelTime(): number {
        return 1; // 2sec
    }

    GetCooldown(iLevel: number): number {
        return 10
    }

    GetCastAnimation(): GameActivity_t {
        return GameActivity_t.ACT_DOTA_TELEPORT;
    }

    GetManaCost(iLevel: number): number {
        return 100;
    }

    ProcsMagicStick(): boolean {
        return true;
    }

    OnChannelFinish(bInterrupted: boolean): void {
        this.GetCaster().RemoveModifierByName("modifier_chidori_charge");

        if(!bInterrupted){
            // channel succeed
            this.GetCaster().AddNewModifier(
                this.GetCaster(),
                this,
                "modifier_chidori_active",
                {
                    duration: 3
                }
            )
        }
    }

    OnSpellStart(): void {
        EmitSoundOn(Sound_chidori.Start, this.GetCaster());
        this.GetCaster().AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_chidori_charge",
            {}
        )
    }
}