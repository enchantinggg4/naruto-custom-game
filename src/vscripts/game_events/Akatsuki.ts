import {BidjuExtension, BidjuName} from "./bidju";
import {GameState} from "./GameState";


/** @extension */
export class AkatsukiExtension extends CDOTA_BaseNPC {

}

/** @extension */
class CapturedPreview extends CDOTA_BaseNPC {
    bidjuIndicatorParticle: ParticleID | null;
}

/** @extension */
export class BidjuDefender extends CDOTA_BaseNPC {
    bidjuName: string;
}


export class AkatsukiManager {
    static IsAkatsuki(unit: CDOTA_BaseNPC) {
        return unit.GetTeam() === DOTATeam_t.DOTA_TEAM_BADGUYS;
    }

    static IsCaptured(bidju: string): boolean {
        return GameState.BIDJU_MAP[bidju] === DOTATeam_t.DOTA_TEAM_BADGUYS
    }


    static OnBidjuCaptured(killedBidju: BidjuExtension) {
        AkatsukiManager.createParticleIndicator(killedBidju);
        AkatsukiManager.createDefender(killedBidju);

        // akatsuki own this bidju
        GameState.SetBidjuStatus(killedBidju.GetUnitName(), DOTATeam_t.DOTA_TEAM_BADGUYS);


        // check if all are captured
        const allCaptured = AkatsukiManager.CheckAllCaptured();
        print(allCaptured);
        print(GameState.BIDJU_MAP);
        if (allCaptured) {
            GameState.SetAkatsukiWon();
        }
    }

    static CheckAllCaptured(): boolean {
        for (const key in BidjuName) {
            const bidjuName = BidjuName[key];
            if (!AkatsukiManager.IsCaptured(bidjuName)) {
                return false
            }
        }
        return true
    }


    static createParticleIndicator(killedBidju: BidjuExtension) {
        const targetEntity = Entities.FindByName(undefined, `akatsuki_preview_${killedBidju.GetUnitName()}`) as CapturedPreview;
        if (targetEntity.bidjuIndicatorParticle) {
            ParticleManager.DestroyParticle(targetEntity.bidjuIndicatorParticle, false)
        }

        targetEntity.bidjuIndicatorParticle = ParticleManager.CreateParticle(
            "particles/env/bidju_capture_indicator.vpcf",
            ParticleAttachment_t.PATTACH_ABSORIGIN,
            targetEntity
        );

        ParticleManager.SetParticleControlEnt(
            targetEntity.bidjuIndicatorParticle,
            0,
            targetEntity,
            ParticleAttachment_t.PATTACH_ABSORIGIN,
            "attach_hitloc",
            targetEntity.GetAbsOrigin(),
            true
        )
    }

    static removeParticleIndicator(killedBidjuName: string) {
        const targetEntity = Entities.FindByName(undefined, `akatsuki_preview_${killedBidjuName}`) as CapturedPreview;
        if (targetEntity.bidjuIndicatorParticle) {
            ParticleManager.DestroyParticle(targetEntity.bidjuIndicatorParticle, false)
        }
    }


    private static createDefender(killedBidju: BidjuExtension) {
        const entity = Entities.FindByName(undefined, `akatsuki_preview_${killedBidju.GetUnitName()}`);
        const unit = CreateUnitByName(
            "npc_dota_custom_cave",
            entity.GetAbsOrigin(),
            true,
            null,
            null,
            DOTATeam_t.DOTA_TEAM_BADGUYS
        ) as BidjuDefender;
        unit.bidjuName = killedBidju.GetUnitName();
        if (killedBidju.owner) {
            killedBidju.owner.onLoseBidju();
        }
    }
}