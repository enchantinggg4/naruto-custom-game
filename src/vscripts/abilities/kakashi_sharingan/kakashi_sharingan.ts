declare class your_gamemode_name {
    static lastUsedAbility: string;
    static lastUsedAbilityLevel: number;
}

class kakashi_sharingan extends CDOTA_Ability_Lua {

    currentAbility: CDOTABaseAbility | null;

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown");
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost");
    }

    OnSpellStart(): void {

        if (your_gamemode_name.lastUsedAbility) {

            if (this.currentAbility && this.currentAbility.GetAbilityName() !== your_gamemode_name.lastUsedAbility) {
                // already stolen something
                const ability = this.GetCaster().AddAbility(your_gamemode_name.lastUsedAbility);

                ability.SetLevel(your_gamemode_name.lastUsedAbilityLevel);
                ability.SetStolen(true);

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

                ability.SetLevel(your_gamemode_name.lastUsedAbilityLevel);
                ability.SetStolen(true);

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
}
        