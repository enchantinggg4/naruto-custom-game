import {BidjuExtension, BidjuManager} from "./bidju";
import {ShinobiExtension, ShinobiManager} from "./Shinobi";
import {AkatsukiManager, BidjuDefender} from "./Akatsuki";
import {Spawn} from "./Spawn";

export class GameEvents {



    static OnNPCKilled(killed: CDOTA_BaseNPC, killer: CDOTA_BaseNPC, ability: CDOTABaseAbility | null) {
        const ignoredAbilities = [
            "capture_bidju",
            "summon_bidju",
        ];


        const isBidjuKilled = BidjuManager.IsBidju(killed);
        // if ability == null then ability ignored
        const killedBySpecialAbilities = ability && ignoredAbilities.some(it => it === ability.GetName()) || false;

        const isShinobiKilled = ShinobiManager.IsShinobi(killed);
        const isShinobiKiller = ShinobiManager.IsShinobi(killer);

        const isAkatsukiKilled = AkatsukiManager.IsAkatsuki(killed);
        const isAkatsukiKiller = AkatsukiManager.IsAkatsuki(killer);


        DebugPrint("unit killed");
        DebugPrint(killed.GetUnitName());


        if (isBidjuKilled && !killedBySpecialAbilities) {
            const killedBidju = killed as BidjuExtension;
            if (killedBidju.summoned && !isAkatsukiKiller) {
                // summoned bidju died NOT to akatsuki.
                if (killedBidju.owner) {
                    // delegate logic
                    killedBidju.owner.onBidjuKilled();
                } else {
                    throw "Something wrong. killed bidju has summoned flag but doesnt have owner"
                }
            } else if (isShinobiKiller) {
                // shinobi capture bidju!
                DebugPrint("ShinobiExtension capture!");

                ShinobiManager.CaptureBidju(killedBidju, killer as ShinobiExtension);

            } else if (isAkatsukiKiller) {
                // akatsuki capture
                AkatsukiManager.OnBidjuCaptured(killedBidju);
            }
        } else if (isBidjuKilled && killedBySpecialAbilities) {
            DebugPrint("Killed by special ability!");
        } else if (killed.GetUnitName() === "npc_dota_custom_cave") {
            ShinobiManager.FreeBidju(
                (killed as BidjuDefender).bidjuName
            );
        }


    }

    static OnNPCSpawned(npc: CDOTA_BaseNPC) {
        if (npc.GetTeam() === DOTATeam_t.DOTA_TEAM_GOODGUYS && npc.IsRealHero() && npc.IsHero()) {

        }
    }

    static OnGameStart() {
        // create timers for spawn
        Spawn.CreateSpawn("konoha_spawn");
    }
}