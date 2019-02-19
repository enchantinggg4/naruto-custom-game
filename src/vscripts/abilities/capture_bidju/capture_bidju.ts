import {ShinobiExtension, ShinobiManager} from "../../game_events/Shinobi";
import {BidjuExtension} from "../../game_events/Bidju";

class capture_bidju extends CDOTA_Ability_Lua {

    private particleID: ParticleID;

    private Particles(hero: ShinobiExtension, bidju: BidjuExtension) {

        // hero - caster
        //- bidju - target
        const caster: ShinobiExtension & { captureParticle: any } = hero as any;
        const target = bidju;


        const particleName = "particles/abilities/bidju/bidju_spirit2.vpcf";
        this.particleID = ParticleManager.CreateParticle(particleName, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, caster)
        ParticleManager.SetParticleControlEnt(
            this.particleID,
            0,
            caster,
            ParticleAttachment_t.PATTACH_POINT_FOLLOW,
            "attach_hitloc",
            target.GetAbsOrigin(),
            true
        );  //  caster
        ParticleManager.SetParticleControlEnt(
            this.particleID,
            1,
            target,
            ParticleAttachment_t.PATTACH_POINT_FOLLOW,
            "attach_hitloc",
            target.GetAbsOrigin(),
            true
        ); // target
        ParticleManager.SetParticleControlEnt(
            this.particleID,
            2,
            target,
            ParticleAttachment_t.PATTACH_POINT_FOLLOW,
            "attach_hitloc",
            Vector(255, 0, 0),
            true
        );
    }

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetAbilityTargetTeam(): DOTA_UNIT_TARGET_TEAM {
        return DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY;
    }

    GetMaxLevel(): number {
        return 1;
    }

    GetChannelTime(): number {
        return 1
    }

    CastFilterResultTarget(hTarget: CDOTA_BaseNPC): UnitFilterResult {
        if (hTarget.HasModifier("modifier_bidju_ready_capture")) {
            return UnitFilterResult.UF_SUCCESS
        }

        return UnitFilterResult.UF_FAIL_CUSTOM;
    }


    OnSpellStart(): void {
        this.Particles(
            this.GetCaster() as ShinobiExtension,
            this.GetCursorTarget() as BidjuExtension
        )
    }

    OnChannelFinish(bInterrupted: boolean): void {
        ParticleManager.DestroyParticle(
            this.particleID,
            false
        );

        if (!bInterrupted) {
            ShinobiManager.OnBidjuCaptured(
                this.GetCursorTarget() as BidjuExtension,
                this.GetCaster() as ShinobiExtension
            )
        }
    }

}