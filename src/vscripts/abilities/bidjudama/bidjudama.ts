interface IBudjudamaState {
    charge_start: number;
    particle: number;
    projectiles: { [key: number]: ProjectileID };
}

declare function PrintTable(t: table): void


class bidjudama extends CDOTA_Ability_Lua implements IBudjudamaState {

    private ThrowProjectile() {
        const info: TrackingProjectileTable = {
            Target: this.GetCursorTarget(),
            Source: this.GetCaster(),
            Ability: this,
            EffectName: "particles/abilities/bidju/kurama/bidjudama_projectile2.vpcf",
            iMoveSpeed: 1500
        };
        ProjectileManager.CreateTrackingProjectile(info);
    }

    OnProjectileHitHandle(hTarget: CDOTA_BaseNPC, vLocation: Vector, pid: ProjectileID): boolean {
        ApplyDamage({
            victim: hTarget,
            attacker: this.GetCaster(),
            damage: 100, // fixme
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        });

        return true
    }

    GetAbilityTargetTeam(): DOTA_UNIT_TARGET_TEAM {
        return DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY
    }

    GetAbilityTargetType(): DOTA_UNIT_TARGET_TYPE {
        return DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC
    }

    GetChannelTime(): number {
        return 1
    }

    GetCastAnimation(): GameActivity_t {
        return GameActivity_t.ACT_DOTA_DISABLED
    }

    GetManaCost(iLevel: number): number {
        return 10
    }

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    OnChannelFinish(bInterrupted: boolean): void {
        ParticleManager.DestroyParticle(this.particle, false);

        // const chargeTime = GameRules.GetGameTime() - this.charge_start;
        // const chargeDamage = 10 * chargeTime;

        this.ThrowProjectile();

    }

    OnSpellStart(): void {
        const caster = this.GetCaster();
        this.charge_start = GameRules.GetGameTime();
        this.particle = ParticleManager.CreateParticle("particles/abilities/bidju/kurama/bidjudama.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, caster);
        ParticleManager.SetParticleControlEnt(this.particle, 0, caster, ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_mouth", caster.GetAbsOrigin(), true);
    }

    charge_start: number = 0;
    particle: number = 0;
    projectiles: { [key: number]: ProjectileID } = {};
}