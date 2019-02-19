import {Sound_chidori} from "../../../Sounds";

class modifier_chidori_active extends CDOTA_Modifier_Lua {

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
        EmitSoundOn(Sound_chidori.Hit, event.target);
    }

    OnCreated(params: table): void {
        EmitSoundOn(Sound_chidori.Loop, this.GetCaster());
    }

    OnDestroy(): void {
        StopSoundOn(Sound_chidori.Loop, this.GetCaster());
        EmitSoundOn(Sound_chidori.End, this.GetCaster());
    }

    GetEffectName(): string {
        return "particles/abilities/rasengan/rasengan_active.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}