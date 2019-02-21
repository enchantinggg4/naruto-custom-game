// import {Sound_tsukuyomi} from "../../../Sounds";

class modifier_amaterasu extends CDOTA_Modifier_Lua {
    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return true
    }

    GetEffectName(): string {
        return "particles/abilities/amaterasu/amaterasu_fire2.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW
    }

    OnDestroy(): void {
        // StopSoundOn(Sound_tsukuyomi.Loop, this.GetParent());
        // EmitSoundOn(Sound_tsukuyomi.End, this.GetParent());
        this.StartIntervalThink(-1);
    }

    OnCreated(params: table): void {
        // EmitSoundOn(Sound_tsukuyomi.Loop, this.GetParent());
        if (IsServer()) {
            this.StartIntervalThink(1);
        }
    }

    OnIntervalThink(): void {
        ApplyDamage({
            victim: this.GetParent(),
            attacker: this.GetCaster(),
            damage: this.GetAbility().GetSpecialValueFor("damage") * this.GetParent().GetMaxHealth(),
            damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL
        })
    }
}