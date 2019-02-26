const channelTime = 5;
LinkLuaModifier("modifier_rinne_tensei", "abilities/rinne_tensei/modifier/modifier_rinne_tensei.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class rinne_tensei extends CDOTA_Ability_Lua {

    particle: ParticleID;
    target: Vector;

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED;
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown")
    }

    GetChannelTime(): number {
        return 1000;
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("mana_per_second")
    }

    OnChannelFinish(bInterrupted: boolean): void {
        ParticleManager.DestroyParticle(this.particle, false);
        this.GetCaster().RemoveModifierByName("modifier_rinne_tensei");
    }

    OnSpellStart(): void {
        const target = this.GetCursorPosition();
        target.z += 300;

        this.target = target;
        const particle = ParticleManager.CreateParticle(
            "particles/abilities/tensei/tensei.vpcf",
            ParticleAttachment_t.PATTACH_ABSORIGIN,
            this.GetCaster()
        );
        ParticleManager.SetParticleControl(
            particle,
            0,
            target
        );
        this.particle = particle;
        this.GetCaster().AddNewModifier(
            this.GetCaster(),
            this,
            "modifier_rinne_tensei",
            {
                x: target.x,
                y: target.y,
                z: target.z
            }
        )
    }
}
        