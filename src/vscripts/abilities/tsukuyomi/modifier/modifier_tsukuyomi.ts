class modifier_tsukuyomi extends CDOTA_Modifier_Lua {
    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return true
    }

    GetEffectName(): string {
        return "particles/abilities/tsukuyomi/overhead2.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW
    }

    OnDestroy(): void {
        StopSoundOn("Tsukuyomi.Process", this.GetParent());
        EmitSoundOn("Tsukuyomi.End", this.GetParent());
        this.StartIntervalThink(-1);
    }

    OnCreated(params: table): void {
        EmitSoundOn("Tsukuyomi.Process", this.GetParent());
        if (IsServer()) {
            this.StartIntervalThink(0.3);
        }
    }

    OnIntervalThink(): void {
        ApplyDamage({
            victim: this.GetParent(),
            attacker: this.GetCaster(),
            damage: 1,
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        })
    }
}