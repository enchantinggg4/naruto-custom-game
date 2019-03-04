class modifier_hidan_immortality extends CDOTA_Modifier_Lua {

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

    OnTakeDamage(event: ModifierAttackEvent): void {
        if (IsServer() && event.unit === this.GetParent()) {
            const hero = this.GetParent();
            // he just can't be killed
            if (hero.GetHealth() === 0) {
                hero.SetHealth(1);
                hero.AddNewModifier(
                    hero,
                    this.GetAbility(),
                    "modifier_stunned",
                    {
                        duration: this.GetAbility().GetSpecialValueFor("regenerate_time")
                    }
                )
            }
        }
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE
        ]
    }
}