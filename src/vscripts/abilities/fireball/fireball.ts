class fireball extends CDOTA_Ability_Lua {


    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown")
    }

    GetChannelTime(): number {
        return this.GetSpecialValueFor("charge_time")
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost")
    }


    OnChannelFinish(bInterrupted: boolean): void {
        if (!bInterrupted) {

            const vTarget = this.GetCursorPosition();

            const direction = ((vTarget - this.GetCaster().GetAbsOrigin()) as Vector).Normalized();

            const particle = ProjectileManager.CreateLinearProjectile({
                Ability: this,
                EffectName: "particles/units/heroes/hero_dragon_knight/dragon_knight_breathe_fire.vpcf",
                vSpawnOrigin: this.GetCaster().GetAbsOrigin(),
                fDistance: this.GetSpecialValueFor("distance"),
                fStartRadius: 100,
                fEndRadius: 500,
                Source: this.GetCaster(),
                vVelocity: (500 * direction) as Vector,
                iUnitTargetTeam: DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_BOTH,
                iUnitTargetType: DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC,
            });

            Timers.CreateTimer(1.5, () => {
                ParticleManager.DestroyParticle(particle, false);
            })
        }
    }

    OnProjectileHit(hTarget: CDOTA_BaseNPC, vLocation: Vector): boolean {
        if (hTarget && hTarget !== this.GetCaster()) {
            const damage: DamageTable = {
                attacker: this.GetCaster(),
                victim: hTarget,
                damage: this.GetSpecialValueFor("damage"),
                damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
            };
            ApplyDamage(damage);

            hTarget.AddNewModifier(
                this.GetCaster(),
                this,
                "modifier_deafening_blast_knockback_datadriven",
                {
                    duration: 3,
                    center_x: hTarget.GetAbsOrigin().x + 100,
                    center_y: hTarget.GetAbsOrigin().y + 100,
                    center_z: hTarget.GetAbsOrigin().z + 100,
                }
            );
            return false;
        }
        return false;
    }

    OnSpellStart(): void {

    }
}
