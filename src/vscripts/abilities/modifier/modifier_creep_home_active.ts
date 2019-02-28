class modifier_creep_home_active extends CDOTA_Modifier_Lua {

    origin: Vector;
    active: boolean;

    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return false;
    }

    RemoveOnDeath(): boolean {
        return true;
    }

    GetModifierHealthBonus(): number {
        return 200;
    }

    GetModifierDamageOutgoing_Percentage(event: ModifierAttackEvent): number {
        return 30;
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
            modifierfunction.MODIFIER_PROPERTY_HEALTH_BONUS,
        ]
    }

}