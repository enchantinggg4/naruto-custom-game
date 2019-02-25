class rinneblink extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown");
    }

    GetChannelTime(): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost")
    }

    OnSpellStart(): void {
        const vTarget = this.GetCursorPosition();

        const direction = ((vTarget - this.GetCaster().GetAbsOrigin()) as Vector).Normalized();

        const range = this.GetSpecialValueFor("blink_range");

        const askedDistance = ((vTarget - this.GetCaster().GetAbsOrigin()) as Vector).Length();

        let blinkTarget = vTarget;

        if (askedDistance > range) {
            blinkTarget = (this.GetCaster().GetAbsOrigin() + direction * range) as Vector;
        }

        FindClearSpaceForUnit(this.GetCaster(), blinkTarget, false)
        ProjectileManager.ProjectileDodge(this.GetCaster());

        const blinkIndex = ParticleManager.CreateParticle("particles/units/heroes/hero_antimage/antimage_blink_start.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN, this.GetCaster())
        Timers.CreateTimer(1, () => ParticleManager.DestroyParticle(blinkIndex, false));
    }
}
        