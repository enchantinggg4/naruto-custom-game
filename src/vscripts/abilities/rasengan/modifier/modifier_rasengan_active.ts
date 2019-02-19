import {Sound_rasengan} from "../../../Sounds";

class modifier_rasengan_active extends CDOTA_Modifier_Lua {

    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return false
    }

    IsStunDebuff(): boolean {
        return false
    }

    IsPurgable(): boolean {
        return false
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE
        ]
    }

    GetModifierDamageOutgoing_Percentage(event: ModifierAttackEvent): number {
        return 1000;
    }

    OnAttackLanded(event: ModifierAttackEvent): void {
        EmitSoundOn(Sound_rasengan.Hit, event.target);
    }

    OnCreated(params: table): void {
        EmitSoundOn(Sound_rasengan.Loop, this.GetCaster());
    }

    OnDestroy(): void {
        StopSoundOn(Sound_rasengan.Loop, this.GetCaster());
        EmitSoundOn(Sound_rasengan.End, this.GetCaster());
    }

    GetEffectName(): string {
        return "particles/abilities/rasengan/rasengan_active.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}