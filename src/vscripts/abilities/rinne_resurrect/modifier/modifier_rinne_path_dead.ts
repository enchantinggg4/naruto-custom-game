class modifier_rinne_path_dead extends CDOTA_Modifier_Lua {

    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return true
    }

    IsStunDebuff(): boolean {
        return true
    }

    IsPurgable(): boolean {
        return false
    }

    RemoveOnDeath(): boolean {
        return true;
    }

    Resurrect(parent: CDOTA_BaseNPC = this.GetParent()) {
        if (parent.IsNull()) {
            return;
        }
        parent.SetHealth(
            this.GetParent().GetMaxHealth() * 0.3
        );
        (parent.FindModifierByName("modifier_rinne_path") as modifier_rinne_path).do_save = true;
        this.Destroy();
    }

    OnCreated(params: table): void {
        if (IsServer()) {
            this.GetParent().AddNewModifier(
                this.GetParent(),
                this.GetAbility(),
                "modifier_stunned",
                {}
            );
            const parent = this.GetParent();
            const respTime = 10;
            Timers.CreateTimer(respTime, () => {
                this.Resurrect(parent);
            });
        }
    }

    FindAllPaths(): CDOTA_BaseNPC_Hero[] {
        return FindUnitsInRadius(
            this.GetCaster().GetTeam(),
            this.GetCaster().GetAbsOrigin(),
            null,
            100000,
            DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_ALL,
            DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
            FindType_t.FIND_ANY_ORDER,
            false
        ).filter(item => {
            return item.HasModifier("modifier_rinne_path"); // all paths die
        }) as CDOTA_BaseNPC_Hero[];
    }

    FindAllPathsDead(): CDOTA_BaseNPC_Hero[] {
        return FindUnitsInRadius(
            this.GetCaster().GetTeam(),
            this.GetCaster().GetAbsOrigin(),
            null,
            100000,
            DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_ALL,
            DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
            FindType_t.FIND_ANY_ORDER,
            false
        ).filter(item => {
            return item.HasModifier("modifier_rinne_path") && item.HasModifier("modifier_rinne_path_dead"); // all paths die
        }) as CDOTA_BaseNPC_Hero[];
    }

    OnTakeDamage(event: ModifierAttackEvent & { unit: CDOTA_BaseNPC}): void {
        if (IsServer() && event.unit === this.GetParent()) {
            const hero = this.GetParent() as CDOTA_BaseNPC_Hero;
            if (hero.GetHealth() === 0) {
                hero.SetHealth(1);
            }
        }
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE
        ]
    }

    OnDestroy(): void {
        if (IsServer()) {
            this.GetParent().RemoveModifierByNameAndCaster(
                "modifier_stunned",
                this.GetParent()
            );
        }
    }
}