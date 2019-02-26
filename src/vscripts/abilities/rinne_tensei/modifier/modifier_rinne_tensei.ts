class modifier_rinne_tensei extends CDOTA_Modifier_Lua {


    thinkInterval: number;
    epicenter: Vector;
    mass: number;

    // base unit mass = 1


    IsDebuff(): boolean {
        return false
    }

    IsStunDebuff(): boolean {
        return false
    }


    FindAllUnits(): CDOTA_BaseNPC[] {
        return FindUnitsInRadius(
            this.GetCaster().GetTeam(),
            this.epicenter,
            null,
            1000000, //hope enough
            DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO,
            DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE,
            FindType_t.FIND_ANY_ORDER,
            false
        )
    }

    OnIntervalThink(): void {

        if (IsServer()) {

            this.mass += this.GetAbility().GetSpecialValueFor("mass_per_second");

            const units = this.FindAllUnits();

            units.forEach((unit) => {

                this.mass += this.thinkInterval;

                const unitMass = 1;

                const vTarget = this.epicenter;

                const distance = Math.min(
                    ((vTarget - unit.GetAbsOrigin()) as Vector).Length(),
                    3000
                );

                if (distance < 50) {
                    return;
                }

                const force = (this.mass * unitMass) / (distance * distance);

                const pullVector = ((vTarget - unit.GetAbsOrigin()) as Vector).Normalized();

                unit.SetAbsOrigin(
                    unit.GetAbsOrigin() + (pullVector * force as Vector) as Vector
                )
            });
        }
    }


    DropUnits() {
        this.FindAllUnits().forEach(unit => {
            const pos = unit.GetAbsOrigin();
            pos.z = 0;
            FindClearSpaceForUnit(unit, pos, false);
        })
    }

    FinalizeExplosion() {

    }

    OnCreated(params: table): void {
        this.thinkInterval = 0.01;
        if (IsServer()) {
            this.StartIntervalThink(this.thinkInterval);
            this.epicenter = Vector(params.x, params.y, params.z);
            this.mass = this.GetAbility().GetSpecialValueFor("initial_mass");
        }
    }

    OnDestroy(): void {
        if (IsServer()) {
            const particle = ParticleManager.CreateParticle(
                "particles/abilities/tensei/tensei_explosion.vpcf",
                ParticleAttachment_t.PATTACH_ABSORIGIN,
                this.GetCaster()
            );
            this.DropUnits();
            ParticleManager.SetParticleControl(
                particle,
                0,
                this.epicenter
            );
            ParticleManager.SetParticleControl(
                particle,
                1,
                Vector(
                    1000, 0, 0
                )
            );
            const affectedUnits = this.FindAllUnits();
            const attacker = this.GetParent();
            const dmg = this.GetElapsedTime() * this.GetAbility().GetSpecialValueFor("damage_per_time");
            Timers.CreateTimer(4, () => {
                this.FinalizeExplosion();
                affectedUnits.forEach(unit => {
                    ApplyDamage({
                        victim: unit,
                        attacker: attacker,
                        damage: dmg,
                        damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
                    })
                });
                ParticleManager.DestroyParticle(particle, false);
            });
        }
    }

}