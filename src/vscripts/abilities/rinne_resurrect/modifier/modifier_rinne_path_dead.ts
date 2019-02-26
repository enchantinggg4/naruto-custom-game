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

    OnCreated(params: table): void {
        if (IsServer()) {
            this.GetParent().AddNewModifier(
                this.GetParent(),
                this.GetAbility(),
                "modifier_stunned",
                {}
            );
            this.GetParent().AddNewModifier(
                this.GetParent(),
                this.GetAbility(),
                "modifier_invulnerable",
                {}
            );
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

    OnTakeDamage(event: ModifierAttackEvent): void {
        if(IsServer()){
            const hero = this.GetParent() as CDOTA_BaseNPC_Hero;
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
            this.GetParent().RemoveModifierByNameAndCaster(
                "modifier_invulnerable",
                this.GetParent()
            );
        }
    }
}