declare class your_gamemode_name {
    static lastUsedAbility: string;
}

class kakashi_sharingan extends CDOTA_Ability_Lua {

    currentAbility: CDOTABaseAbility | null;

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET
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

        if (this.currentAbility && this.currentAbility.GetAbilityName() !== your_gamemode_name.lastUsedAbility) {
            // already stolen something
            print(this.currentAbility.GetAbilityName())
            const ability = this.GetCaster().AddAbility(your_gamemode_name.lastUsedAbility);

            ability.SetLevel(this.GetLevel());

            this.GetCaster().SwapAbilities(
                this.currentAbility.GetAbilityName(),
                ability.GetAbilityName(),
                false,
                true
            );

            this.GetCaster().RemoveAbility(
                this.currentAbility.GetAbilityName()
            );

            this.currentAbility = ability;

        } else if (!this.currentAbility) {
            // completely clear, nothing stolen
            const ability = this.GetCaster().AddAbility(your_gamemode_name.lastUsedAbility);

            ability.SetLevel(this.GetLevel());

            this.GetCaster().SwapAbilities(
                "kakashi_sharingan_steal",
                ability.GetAbilityName(),
                false,
                true
            );

            this.GetCaster().RemoveAbility(
                "kakashi_sharingan_steal"
            );

            this.currentAbility = ability;
        }


    }
}
        