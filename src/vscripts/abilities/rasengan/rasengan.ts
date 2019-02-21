import {Sound_rasengan} from "../../Sounds";

LinkLuaModifier("modifier_rasengan_channel", "abilities/rasengan/modifier/modifier_rasengan_channel.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);
LinkLuaModifier("modifier_rasengan_active", "abilities/rasengan/modifier/modifier_rasengan_active.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class rasengan extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED;
    }

    GetChannelTime(): number {
        return this.GetSpecialValueFor("charge_time");
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown");
    }

    GetCastAnimation(): GameActivity_t {
        return GameActivity_t.ACT_DOTA_TELEPORT;
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost");
    }

    ProcsMagicStick(): boolean {
        return true;
    }

    OnChannelFinish(bInterrupted: boolean): void {
        this.GetCaster().RemoveModifierByName("modifier_rasengan_channel");

        if(!bInterrupted){
            // channel succeed
            this.GetCaster().AddNewModifier(
                this.GetCaster(),
                this,
                "modifier_rasengan_active",
                {
                    duration: this.GetSpecialValueFor("manacost")
                }
            )
        }
    }

    OnSpellStart(): void {
        EmitSoundOn(Sound_rasengan.Start, this.GetCaster());
        this.GetCaster().AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_rasengan_channel",
            {}
        )
    }
}