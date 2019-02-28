import {ShinobiExtension} from "./Shinobi";
import {GameState} from "./GameState";
require("client-server");


LinkLuaModifier("modifier_bidju_ready_capture", "abilities/bidju/modifier/modifier_bidju_ready_capture.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

export enum BidjuName {
    SHUKAKU = "npc_dota_custom_bidju_shukaku",
    MATATABI = "npc_dota_custom_bidju_matatabi",
    KURAMA = "npc_dota_custom_bidju_kurama",
}

/** @extension */
export class BidjuExtension extends CDOTA_BaseNPC {
    owner: ShinobiExtension | null;
    summoned: boolean;

    setOwner(shinobi: ShinobiExtension) {
        this.owner = shinobi;
        this.SetTeam(shinobi.GetTeam())
    }

    removeOwner() {
        this.owner = null;
        this.SetTeam(DOTATeam_t.DOTA_TEAM_NEUTRALS);
    }


    captureReadyRespawn() {
        this.SetTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS);

        this.StartGesture(GameActivity_t.ACT_DOTA_DISABLED);

        this.AddNewModifier(this, null, "modifier_invulnerable", {
            duration: 5
        });

        this.AddNewModifier(this, null, "modifier_bidju_ready_capture", {})
    }
}

export class BidjuManager {

    static nextBidju: string;


    static SpawnBidju(
        bidju: string,
        point: Vector | null = null,
        team: DOTATeam_t = DOTATeam_t.DOTA_TEAM_NEUTRALS,
        owner: ShinobiExtension | null = null): BidjuExtension {

        const v = point || Entities.FindByName(undefined, `spawn_${bidju}`).GetAbsOrigin();


        DebugPrint(team);

        const unit = CreateUnitByName(bidju, v, true, null, null, team) as BidjuExtension;

        if (owner) {
            unit.setOwner(owner);
            owner.setBidju(unit);
        } else {
            unit.removeOwner();
        }

        return unit;
    }


    static IsBidju(unit: CDOTA_BaseNPC): boolean {
        const unitName = unit.GetUnitName();
        for (const key in BidjuName) {
            if (BidjuName[key] === unitName) {
                return true
            }
        }
        return false
    }

    static InitialSpawnBidju() {

        const keys = [];

        for (const key in BidjuName) {
            keys.push(key);
            // BidjuManager.SpawnBidju(BidjuName[key]);
            GameState.SetBidjuStatus(BidjuName[key], DOTATeam_t.DOTA_TEAM_NEUTRALS);
            // set all neutral so game doesn't end instantly
        }

        const delayBetweenBidju = 5;
        const context = {
            lastBidjuIndex: 0,
            keys
        };

        // create one bidju instantly
        Timers.CreateTimer(0, (context) => {
            const currentBidju = context.keys[context.lastBidjuIndex] as any;
            const bidjuName = BidjuName[currentBidju];
            if(bidjuName){
                const bidju = BidjuManager.SpawnBidju(bidjuName);
                context.lastBidjuIndex++;
                BidjuManager.nextBidju = BidjuName[context.keys[context.lastBidjuIndex] as any];
                AddFOWViewer(
                    DOTATeam_t.DOTA_TEAM_GOODGUYS,
                    bidju.GetAbsOrigin(),
                    500,
                    5,
                    false
                );
                AddFOWViewer(
                    DOTATeam_t.DOTA_TEAM_BADGUYS,
                    bidju.GetAbsOrigin(),
                    500,
                    5,
                    false
                );

                GameState.AlertNextBidju(delayBetweenBidju, currentBidju, context.keys[context.lastBidjuIndex] as string);
                return delayBetweenBidju;
            }
        }, context)
    }
}