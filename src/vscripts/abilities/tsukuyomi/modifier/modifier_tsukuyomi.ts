import {Sound_tsukuyomi} from "../../../Sounds";

class modifier_tsukuyomi extends CDOTA_Modifier_Lua {

    private particle: ParticleID;

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
        StopSoundOn(Sound_tsukuyomi.Loop, this.GetParent());
        EmitSoundOn(Sound_tsukuyomi.End, this.GetParent());
        this.StartIntervalThink(-1);
        ParticleManager.DestroyParticle(this.particle, false);
    }

    OnCreated(params: table): void {
        EmitSoundOn(Sound_tsukuyomi.Loop, this.GetParent());
        if (IsServer()) {
            this.StartIntervalThink(0.1);
        }

        const target = this.GetParent();

        this.particle = ParticleManager.CreateParticle(
            "particles/abilities/tsukuyomi/tsukuyomi_damage.vpcf",
            ParticleAttachment_t.PATTACH_CENTER_FOLLOW,
            target,
        );
    }

    OnIntervalThink(): void {
        ApplyDamage({
            victim: this.GetParent(),
            attacker: this.GetCaster(),
            damage: 10,
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        })
    }
}