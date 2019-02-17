import {BidjuExtension, BidjuManager} from "./Bidju";
require("client-server");

/** @extension */
export class ShinobiExtension extends CDOTA_BaseNPC {
    bidju: BidjuExtension | null;
    bidjuName: string | null;


    setBidju(bidju: BidjuExtension) {
        this.bidju = bidju;
        this.bidjuName = bidju.GetUnitName();
    }

    removeBidju() {
        this.bidju = null;
        this.bidjuName = null;
    }


    onBidjuKilled() {
        this.SetMana(0);
        this.setSummonToggle(false);
    }

    setBidjuState(hasBidju: boolean) {
        if (hasBidju) {
            // can summon, cant capture
            this.FindAbilityByName("shinobi_summon_bidju").SetActivated(true);
            this.FindAbilityByName("shinobi_capture_bidju").SetActivated(false);
        } else {
            // can capture, cant summon
            this.FindAbilityByName("shinobi_summon_bidju").SetActivated(false);
            this.FindAbilityByName("shinobi_capture_bidju").SetActivated(true);
        }
    }


    onLoseBidju() {
        this.setSummonToggle(false);
        this.onBidjuKilled();
        this.setBidjuState(false);
    }


    onFirstSpawn() {
        this.FindAbilityByName("shinobi_summon_bidju").UpgradeAbility(false);
        this.FindAbilityByName("shinobi_capture_bidju").UpgradeAbility(false);
    }

    private setSummonToggle(enabled: boolean) {
        const ability = this.FindAbilityByName("shinobi_summon_bidju");
        const toggled = ability.GetToggleState();
        if (toggled && !enabled) { // true -> false
            ability.ToggleAbility()
        } else if (!toggled && enabled) { // false -> true
            ability.ToggleAbility()
        }
    }
}


export class ShinobiManager {
    static IsShinobi(unit: CDOTA_BaseNPC) {
        return unit.GetTeam() === DOTATeam_t.DOTA_TEAM_GOODGUYS;
    }

    static FreeBidju(bidjuName: string) {
        // ha ha.

    }

    static CaptureBidju(killedBidju: BidjuExtension, owner: ShinobiExtension) {
        const bidju = BidjuManager.SpawnBidju(
            killedBidju.GetUnitName(),
            killedBidju.GetAbsOrigin(),
            DOTATeam_t.DOTA_TEAM_GOODGUYS,
            null
        ) as BidjuExtension;

        bidju.captureReadyRespawn();
    }

    static OnBidjuCaptured(bidju: BidjuExtension, hero: ShinobiExtension) {
        bidju.Kill(hero.FindAbilityByName("shinobi_capture_bidju"), hero);
        hero.setBidjuState(true);
        hero.setBidju(bidju);
    }
}