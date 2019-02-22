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
            modifierfunction.MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
            modifierfunction.MODIFIER_EVENT_ON_ATTACK_LANDED,
        ]
    }

    GetModifierDamageOutgoing_Percentage(event: ModifierAttackEvent): number {
        return this.GetAbility().GetSpecialValueFor("damage_amplify");
    }

    OnAttackLanded(event: ModifierAttackEvent): void {
        // event.target.ReduceMana(this.GetAbility().GetSpecialValueFor("mana_burn"));
        event.target.ReduceMana(1000);
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
        return "particles/abilities/chidori/chidori.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment_t {
        return ParticleAttachment_t.PATTACH_POINT_FOLLOW
    }
}