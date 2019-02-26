class modifier_rinne_path_main extends CDOTA_Modifier_Lua {

    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return false
    }

    IsStunDebuff(): boolean {
        return false
    }

    IsPurgable(): boolean {
        return false
    }

    RemoveOnDeath(): boolean {
        return false;
    }

    OnCreated(params: table): void {
        this.StartIntervalThink(0.1)
    }

    FindUnits(): CDOTA_BaseNPC_Hero[] {
        return FindUnitsInRadius(
            this.GetCaster().GetTeam(),
            this.GetCaster().GetAbsOrigin(),
            null,
            100000,
            DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_ALL,
            DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE,
            FindType_t.FIND_ANY_ORDER,
            false
        ).filter(item => {
            return item.HasModifier("modifier_rinne_path") && !item.HasModifier("modifier_rinne_path_main") // find all sub pains
        }) as CDOTA_BaseNPC_Hero[];
    }

    OnIntervalThink(): void {
        if(IsServer()){
            const main = this.GetParent();
            const units = this.FindUnits();
            units.forEach(unit => {
                if(unit.GetLevel() < main.GetLevel()){
                    for(let i = unit.GetLevel(); i < main.GetLevel(); i++){
                        unit.HeroLevelUp(false);
                    }
                }
                unit.SetAbilityPoints(0);
                unit.GetAbilityByIndex(0).SetLevel(main.GetAbilityByIndex(0).GetLevel());
                unit.GetAbilityByIndex(1).SetLevel(main.GetAbilityByIndex(1).GetLevel());
                unit.GetAbilityByIndex(2).SetLevel(main.GetAbilityByIndex(2).GetLevel());
                unit.GetAbilityByIndex(3).SetLevel(main.GetAbilityByIndex(3).GetLevel());
            });
        }
    }

    OnDestroy(): void {

    }
}