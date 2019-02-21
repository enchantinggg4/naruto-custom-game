class item_kunai extends CDOTA_Item_Lua {


    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT
    }

    GetCastRange(vLocation: Vector, hTarget: CDOTA_BaseNPC): number {
        return 1000
    }

    GetCooldown(iLevel: number): number {
        return 0.3
    }

    RequiresCharges() {
        return true
    }

    GetCastPoint(): number {
        return 0.1
    }

    GetManaCost(iLevel: number): number {
        return 10
    }

    GetCost(): number {
        return 10
    }

    IsStackable(): boolean {
        return true
    }

    IsPermanent(): boolean {
        return true
    }

    GetInitialCharges(): number {
        return 10
    }

    GetShareability(): EShareAbility {
        return EShareAbility.ITEM_FULLY_SHAREABLE
    }

    OnSpellStart(): void {

        // const caster_location = caster:GetAbsOrigin()
        // const target_point = this.target_points[1]
        // const direction = (target_point - caster_location):Normalized()


        const vTarget = this.GetCursorPosition();


        // its ok.
        const direction = ((vTarget - this.GetCaster().GetAbsOrigin()) as Vector).Normalized();


        const data: LinearProjectileTable = {
            Ability: this,
            EffectName: "particles/items/vengeful_wave_of_terror.vpcf",
            vSpawnOrigin: this.GetCaster().GetAbsOrigin(),
            fDistance: 3500,
            fStartRadius: 100,
            fEndRadius: 500,
            Source: this.GetCaster(),
            vVelocity: (1500 * direction) as Vector,
            iUnitTargetTeam: DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_BOTH,
            iUnitTargetType: DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC,
        };

        const particle = ProjectileManager.CreateLinearProjectile(data);

        Timers.CreateTimer(2, () => {
            ParticleManager.DestroyParticle(particle, true);
        });

        this.SpendCharge();
    }

    OnProjectileHit(hTarget: CDOTA_BaseNPC, vLocation: Vector): boolean {
        if (hTarget && hTarget !== this.GetCaster()) {
            const damage: DamageTable = {
                attacker: this.GetCaster(),
                victim: hTarget,
                damage: 100,
                damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
            };
            ApplyDamage(damage);
            return true;
        }
        return false;
    }
}