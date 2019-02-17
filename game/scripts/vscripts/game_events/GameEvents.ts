import {BidjuExtension, BidjuManager} from "./bidju";
import {ShinobiManager} from "./Shinobi";
import {AkatsukiManager, BidjuDefender} from "./Akatsuki";

export class GameEvents {


    static OnNPCKilled(killed: CDOTA_BaseNPC, killer: CDOTA_BaseNPC, ability: CDOTABaseAbility | null) {
        const ignoredAbilities = [
            "shinobi_capture_bidju",
            "shinobi_summon_bidju"
        ];


        const isBidjuKilled = BidjuManager.IsBidju(killed);
        // if ability == null then ability ignored
        const abilityIgnored = ability && ignoredAbilities.some(it => it === ability.GetName()) || true;
        const isShinobiKilled = ShinobiManager.IsShinobi(killed);
        const isShinobiKiller = ShinobiManager.IsShinobi(killer);

        const isAkatsukiKilled = AkatsukiManager.IsAkatsuki(killed);
        const isAkatsukiKiller = AkatsukiManager.IsAkatsuki(killer);


        if (isBidjuKilled && abilityIgnored) {
            const killedBidju = killed as BidjuExtension;
            if (isShinobiKiller) {
                // shinobi capture bidju!

            } else if (killedBidju.summoned && !isAkatsukiKiller) {
                // summoned bidju died NOT to akatsuki.
                if (killedBidju.owner) {
                    // delegate logic
                    killedBidju.owner.onBidjuKilled();
                } else {
                    throw "Something wrong. killed bidju has summoned flag but doesnt have owner"
                }
            } else if (isAkatsukiKiller) {
                AkatsukiManager.onBidjuCaptured(killedBidju);
            }
        }else if(killed.GetUnitName() === "npc_dota_custom_cave"){
            ShinobiManager.FreeBidju(
                (killed as BidjuDefender).bidjuName
            );
        }


    }

}