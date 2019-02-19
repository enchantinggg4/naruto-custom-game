import {Sound_rasengan, Sound_shadow_fadeout} from "../../Sounds";

class itachi_fadeout extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL
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

    private CreateIllusion(): CDOTA_BaseNPC {
        const caster = this.GetCaster();

        const illusion = CreateUnitByName(
            "npc_dota_hero_terrorblade",
            caster.GetAbsOrigin(),
            true,
            caster,
            null,
            caster.GetTeamNumber());

        illusion.SetControllableByPlayer(
            caster.GetPlayerOwnerID(),
            true
        );

        illusion.AddNewModifier(
            caster,
            this,
            "modifier_illusion", {
                duration: 10,
                outgoing_damage: 100,
                incoming_damage: 100
            });

        illusion.MakeIllusion();
        illusion.SetHasInventory(false);
        illusion.SetCanSellItems(false);

        return illusion;
    }

    OnSpellStart(): void {

        const caster = this.GetCaster();

        const illusion = this.CreateIllusion();
        illusion.AddNewModifier(
            caster,
            this,
            "modifier_phased",
            {
                duration: 0.5
            }
        );

        FindClearSpaceForUnit(illusion, caster.GetAbsOrigin(), false);


        const particle = ParticleManager.CreateParticle(
            "particles/abilities/itachi_fadeout/itachi_fadeout.vpcf",
            ParticleAttachment_t.PATTACH_ABSORIGIN,
            illusion
        );

        Timers.CreateTimer(2, () => {
            ParticleManager.DestroyParticle(particle, false);
        });

        caster.AddNewModifier(
            caster,
            this,
            "modifier_invisible",
            {
                duration: 5,
                fadetime: 0
            }
        );
        EmitSoundOn(Sound_shadow_fadeout.Start, caster);
    }
}