// DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_TOGGLE | DOTA_ABILITY_BEHAVIOR_IMMEDIATE"


import {ShinobiExtension} from "../../game_events/Shinobi";
import {BidjuManager} from "../../game_events/Bidju";

LinkLuaModifier("modifier_bidju_summoned", "abilities/summon_bidju/modifier/modifier_bidju_summoned.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);


class summon_bidju extends CDOTA_Ability_Lua {

    GetMaxLevel(): number {
        return 1;
    }

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE
    }

    OnToggle(): void {
        const state = this.GetToggleState();
        state ? this.onToggleOn() : this.onToggleOff();
    }

    private onToggleOn() {
        const caster = this.GetCaster() as ShinobiExtension;

        print("On togle on?", caster.bidjuName);
        if (caster.bidjuName != null) {
            const bidju = BidjuManager.SpawnBidju(
                caster.bidjuName,
                caster.GetAbsOrigin(),
                caster.GetTeam(),
                caster
            );

            bidju.SetControllableByPlayer(caster.GetPlayerOwnerID(), true);
            bidju.SetOwner(bidju);
            bidju.summoned = true;
            caster.AddNewModifier(caster, this, "modifier_bidju_summoned", {});
        } else {
            throw "Hero doesn't have bidjuName - and his ability is unlocked. ????"
        }
    }


    private onToggleOff() {
        const caster = this.GetCaster() as ShinobiExtension;
        caster.RemoveModifierByName("modifier_bidju_summoned");
        if (caster.bidju != null) {
            // summon is still alive
            caster.bidju.Kill(this, undefined);
            this.StartCooldown(10);
        } else {
            // his summon was killed.
        }
    }
}