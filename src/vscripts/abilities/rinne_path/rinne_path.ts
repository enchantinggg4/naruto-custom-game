LinkLuaModifier("modifier_rinne_path", "abilities/rinne_path/modifier/modifier_rinne_path.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);
LinkLuaModifier("modifier_rinne_path_main", "abilities/rinne_path/modifier/modifier_rinne_path_main.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);
LinkLuaModifier("modifier_rinne_path_dead", "abilities/rinne_path/modifier/modifier_rinne_path_dead.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class rinne_path extends CDOTA_Ability_Lua {

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE
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

    OnUpgrade(): void {
        const isNotFirstLevelUp = this.GetCaster().HasModifier("modifier_rinne_path") && this.GetCaster().HasModifier("modifier_rinne_path_main");
        const isFirstLevelUp = !this.GetCaster().HasModifier("modifier_rinne_path") && !this.GetCaster().HasModifier("modifier_rinne_path_main");
        if (isNotFirstLevelUp || isFirstLevelUp) {
            this.CreateSecondPain()
        }
    }


    CreateSecondPain() {
        const unit = CreateUnitByName(
            // "npc_dota_hero_dark_seer",
            "npc_dota_hero_beastmaster", // healer
            this.GetCaster().GetAbsOrigin(),
            true,
            this.GetCaster(),
            this.GetCaster().GetPlayerOwner(),
            this.GetCaster().GetTeam()
        );
        unit.SetControllableByPlayer(this.GetCaster().GetPlayerOwnerID(), true);
        unit.AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_rinne_path",
            {}
        );
        this.GetCaster().AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_rinne_path",
            {}
        );
        this.GetCaster().AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_rinne_path_main",
            {}
        );
    }

    OnSpellStart(): void {

    }
}
        