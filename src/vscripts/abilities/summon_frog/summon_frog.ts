class summon_frog extends CDOTA_Ability_Lua {

    summon: CDOTA_BaseNPC | undefined;

    static frogs = [
        "npc_dota_custom_gamabunta",
        "npc_dota_custom_gamatatsu",
    ];

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET;
    }

    GetCooldown(iLevel: number): number {
        return 10
    }

    GetCastAnimation(): GameActivity_t {
        return GameActivity_t.ACT_DOTA_ATTACK2;
    }

    GetManaCost(iLevel: number): number {
        return 100;
    }

    ProcsMagicStick(): boolean {
        return true;
    }

    OnSpellStart(): void {
        this.KillSummon();
        this.Summon();
    }

    private Summon() {

        const chanceGood = 0.2;
        // const chanceBad = 0.8;

        const summonName = summon_frog.frogs[Math.random() > chanceGood ? 1 : 0];

        this.summon = CreateUnitByName(
            summonName,
            this.GetCaster().GetAbsOrigin(),
            true,
            this.GetCaster(),
            this.GetCaster().GetPlayerOwner(),
            this.GetCaster().GetTeam()
        );
        this.summon.SetControllableByPlayer(
            this.GetCaster().GetPlayerOwnerID(),
            true
        );

        this.summon.AddNewModifier(this.summon, null, "modifier_kill", {duration: 30})
    }

    private KillSummon() {
        if (this.summon && this.summon.IsAlive() && IsServer()) {
            this.summon.Kill(undefined, this.GetCaster());
        }

    }

}