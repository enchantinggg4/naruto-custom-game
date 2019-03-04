class hidan_blood extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown");
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost");
    }

    GetCastRange(vLocation: Vector, hTarget: CDOTA_BaseNPC): number {
        return this.GetSpecialValueFor("range");
    }

    OnSpellStart(): void {
        const allies = FindUnitsInRadius(
            this.GetCaster().GetTeam(),
            this.GetCaster().GetAbsOrigin(),
            null,
            this.GetSpecialValueFor("range"),
            DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_ALL,
            DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE,
            FindType_t.FIND_ANY_ORDER,
            false
        ).filter(it => it !== this.GetCaster()); // get all allies

        const convertRate = this.GetSpecialValueFor("health_rate");

        const hpPool = this.GetCaster().GetHealth() * convertRate;
        const hpPerUnit = hpPool / allies.length;

        const context = {
            allies,
            hpPerUnit,
            index: 0,
            caster: this.GetCaster()
        };

        Timers.CreateTimer(0.5, (ctx) => {
            const ally = ctx.allies[ctx.index++];
            if (ally) {
                ally.Heal(ctx.hpPerUnit, ctx.caster);
                ApplyDamage({
                    attacker: ctx.caster,
                    damage: ctx.hpPerUnit,
                    victim: ctx.caster,
                    damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
                });
                const p = ParticleManager.CreateParticle(
                    "particles/econ/items/bloodseeker/bloodseeker_eztzhok_weapon/bloodseeker_bloodbath_eztzhok_ribbon.vpcf",
                    ParticleAttachment_t.PATTACH_POINT_FOLLOW,
                    ally
                );

                return 0.5;
            }

        }, context);
    }
}
        