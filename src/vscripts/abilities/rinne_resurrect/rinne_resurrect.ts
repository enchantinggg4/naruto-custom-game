
class rinne_resurrect extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return 0
    }

    GetChannelTime(): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return 0
    }


    OnChannelFinish(bInterrupted: boolean): void {
        
    }

    OnSpellStart(): void {
       
    }
}
        