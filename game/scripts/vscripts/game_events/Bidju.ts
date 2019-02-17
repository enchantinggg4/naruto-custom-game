import {Shinobi} from "./Shinobi";

export enum BidjuName {
    SHUKAKU = "npc_dota_custom_bidju_shukaku",
    MATATABI = "npc_dota_custom_bidju_matatabi",
    KURAMA = "npc_dota_custom_bidju_kurama",
}


/** @extension */
export class BidjuExtension extends CDOTA_BaseNPC {
    owner: Shinobi | null;
    summoned: boolean = false;

    setOwner(shinobi: Shinobi) {
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
        bidju: BidjuName,
        point: Vector | null = null,
        team: DOTATeam_t = DOTATeam_t.DOTA_TEAM_NEUTRALS,
        owner: Shinobi | null = null): BidjuExtension {

        const v = point || Entities.FindByName(undefined, `spawn_${bidju}`).GetAbsOrigin();


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
        const keys = Object.keys(BidjuName).filter(k => typeof BidjuName[k as any] === "number"); // ["A", "B"]
        const values = keys.map(k => BidjuName[k as any]);
        return values.some(it => it === unit.GetUnitName());
    }

    static InitialSpawnBidju() {
        const keys = Object.keys(BidjuName).filter(k => typeof BidjuName[k as any] === "number"); // ["A", "B"]
        keys.forEach(key => {
            BidjuManager.SpawnBidju(key as BidjuName)
        });
    }
}