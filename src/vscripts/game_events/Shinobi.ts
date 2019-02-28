import {BidjuExtension, BidjuManager, BidjuName} from "./Bidju";
import {AkatsukiManager} from "./Akatsuki";
import {GameState} from "./GameState";

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
            this.FindAbilityByName("summon_bidju").SetActivated(true);
            this.FindAbilityByName("capture_bidju").SetActivated(false);
        } else {
            // can capture, cant summon
            this.FindAbilityByName("summon_bidju").SetActivated(false);
            this.FindAbilityByName("capture_bidju").SetActivated(true);
        }
    }


    onLoseBidju() {
        this.setSummonToggle(false);
        this.onBidjuKilled();
        this.setBidjuState(false);
    }


    onFirstSpawn() {
        this.FindAbilityByName("summon_bidju").UpgradeAbility(false);
        this.FindAbilityByName("capture_bidju").UpgradeAbility(false);
    }

    private setSummonToggle(enabled: boolean) {
        const ability = this.FindAbilityByName("summon_bidju");
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
        AkatsukiManager.removeParticleIndicator(bidjuName);
        BidjuManager.SpawnBidju(bidjuName);
        GameState.SetBidjuStatus(bidjuName, DOTATeam_t.DOTA_TEAM_NEUTRALS);
    }

    static CaptureBidju(killedBidju: BidjuExtension, owner: ShinobiExtension) {
        const bidju = BidjuManager.SpawnBidju(
            killedBidju.GetUnitName(),
            killedBidju.GetAbsOrigin(),
            DOTATeam_t.DOTA_TEAM_GOODGUYS,
            null
        ) as BidjuExtension;


        bidju.captureReadyRespawn();
        this.OnBidjuOwned(bidju.GetUnitName());
    }

    static IsCaptured(bidju: string): boolean {
        return GameState.BIDJU_MAP[bidju] === DOTATeam_t.DOTA_TEAM_GOODGUYS
    }

    static CheckAllCaptured(): boolean {
        for (const key in BidjuName) {
            const bidjuName = BidjuName[key];
            if (!ShinobiManager.IsCaptured(bidjuName)) {
                return false
            }
        }
        return true
    }

    static OnBidjuCaptured(bidju: BidjuExtension, hero: ShinobiExtension) {
        bidju.Kill(hero.FindAbilityByName("capture_bidju"), hero);
        hero.setBidjuState(true);
        hero.setBidju(bidju);
    }

    static OnBidjuOwned(bidjuName: string) {
        GameState.SetBidjuStatus(bidjuName, DOTATeam_t.DOTA_TEAM_GOODGUYS);

        if (ShinobiManager.CheckAllCaptured()) {
            GameState.SetShinobiWon()
        }
    }


}