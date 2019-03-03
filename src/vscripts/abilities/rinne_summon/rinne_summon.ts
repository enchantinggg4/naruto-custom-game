class rinne_summon extends CDOTA_Ability_Lua {

    summon: CDOTA_BaseNPC | undefined;

    static beasts = [
        "npc_dota_custom_rinne_dog",
        "npc_dota_custom_rinne_centipede",
    ];

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET;
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown");
    }

    GetCastAnimation(): GameActivity_t {
        return GameActivity_t.ACT_DOTA_ATTACK2;
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost");
    }

    ProcsMagicStick(): boolean {
        return true;
    }

    OnSpellStart(): void {
        this.KillSummon();
        this.Summon();
    }

    private Summon() {

        const unitIndex = Math.floor(Math.random() * rinne_summon.beasts.length);
        
        const summonName = rinne_summon.beasts[unitIndex];
        print(summonName, unitIndex);

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

        this.summon.AddNewModifier(this.summon, null, "modifier_kill", {
            duration: this.GetSpecialValueFor("duration")
        })
    }

    private KillSummon() {

        if (this.summon && !(this.summon!! as any).IsNull() && this.summon.IsAlive() && IsServer()) {
            this.summon.Kill(undefined, this.GetCaster());
        }
        this.summon = undefined;

    }

}