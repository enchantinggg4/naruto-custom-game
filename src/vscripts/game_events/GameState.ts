export class GameState {
    static BIDJU_MAP: {
        [key: string]: DOTATeam_t
    } = {};

    static SetAkatsukiWon() {
        GameRules.SetGameWinner(DOTATeam_t.DOTA_TEAM_BADGUYS);
    }

    static SetShinobiWon() {
        GameRules.SetGameWinner(DOTATeam_t.DOTA_TEAM_GOODGUYS);
    }

    static SetBidjuStatus(name: string, team: DOTATeam_t) {
        this.BIDJU_MAP[name] = team;
    }

    static AlertNextBidju(delayBetweenBidju: number, currentBidju: string, nextBidju: string | undefined) {
        if (IsServer()) {
            if (nextBidju !== undefined) {
                Say(
                    GameRules.GetGameModeEntity(),
                    `${currentBidju} spawned! ${delayBetweenBidju} seconds until ${nextBidju}`,
                    false
                )
            } else {
                Say(
                    GameRules.GetGameModeEntity(),
                    `${currentBidju} spawned!`,
                    false
                )
            }
        }
    }
}