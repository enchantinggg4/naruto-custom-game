import {ShinobiExtension} from "./Shinobi";

export enum BidjuName {
    SHUKAKU = "npc_dota_custom_bidju_shukaku",
    MATATABI = "npc_dota_custom_bidju_matatabi",
    KURAMA = "npc_dota_custom_bidju_kurama",
}


/** @extension */
export class BidjuExtension extends CDOTA_BaseNPC {
    owner: ShinobiExtension | null;
    summoned: boolean = false;

    setOwner(shinobi: ShinobiExtension) {
        this.owner = shinobi;
        this.SetTeam(shinobi.GetTeam())
    }

    removeOwner() {
        this.owner = null;
        this.SetTeam(DOTATeam_t.DOTA_TEAM_NEUTRALS);
    }
}

export class BidjuManager {


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
        for(const key in BidjuName){
            if(BidjuName[key] === unitName){
                return true
            }
        }
        return false
    }

    static InitialSpawnBidju() {
        for(const key in BidjuName){
            BidjuManager.SpawnBidju(BidjuName[key])
        }
    }
}