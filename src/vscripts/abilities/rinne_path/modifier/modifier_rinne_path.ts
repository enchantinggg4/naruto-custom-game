LinkLuaModifier("modifier_rinne_path_dead", "abilities/rinne_resurrect/modifier/modifier_rinne_path_dead.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class modifier_rinne_path extends CDOTA_Modifier_Lua {

    do_save: boolean;

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

    FindMain(): CDOTA_BaseNPC_Hero {
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
            return item.HasModifier("modifier_rinne_path"); // all paths die
        })[0] as CDOTA_BaseNPC_Hero;
    }

    OnCreated(params: table): void {
        if (IsServer()) {
            this.do_save = true;
            this.GetParent().FindAbilityByName(
                "rinne_path"
            ).SetLevel(this.GetCaster().FindAbilityByName("rinne_path").GetLevel());
        }
    }

    OnTakeDamage(event: ModifierAttackEvent): void {
        if (IsServer()) {
            const hero = this.GetParent() as CDOTA_BaseNPC_Hero;
            if (hero.HasModifier("modifier_rinne_path_dead")) {
                this.CheckDeath(event);
            } else if (hero.GetHealth() === 0 && this.do_save) {
                print("WHY SAVE???");
                hero.SetHealth(1);
                this.do_save = false;
                hero.AddNewModifier(
                    this.GetCaster(),
                    this.GetAbility(),
                    "modifier_rinne_path_dead",
                    {}
                );
            }

            this.CheckDeath(event);
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

    CheckDeath(event: ModifierAttackEvent) {
        if (this.FindAllPaths().length === this.FindAllPathsDead().length) {
            this.FindAllPaths().forEach(it => {
                it.RemoveModifierByName("modifier_rinne_path_dead");
                it.RemoveModifierByName("modifier_stunned");
                it.RemoveModifierByName("modifier_invulnerable");
                it.Kill(
                    this.GetAbility(),
                    event.attacker
                );
                (it.FindModifierByName("modifier_rinne_path") as modifier_rinne_path).do_save = true;
            });
        }
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE
        ]
    }

    OnIntervalThink(): void {
        // const units = this.FindUnits();

    }

    OnDestroy(): void {

    }
}