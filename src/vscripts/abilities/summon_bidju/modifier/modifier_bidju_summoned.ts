class modifier_bidju_summoned extends CDOTA_Modifier_Lua {

    GetTexture(): string {
        return "medusa_mana_shield"
    }


    OnCreated(params: table): void {
        if (IsServer()) {
            this.StartIntervalThink(0.3);
        }
    }

    OnDestroy(): void {
        this.StartIntervalThink(-1);
    }

    OnIntervalThink(): void {
        const manaPool = this.GetParent().GetMaxMana();
        const manaToRemove = manaPool * 0.01;
        if (this.GetParent().GetMana() < manaToRemove) {
            this.GetAbility().GetToggleState() ? this.GetAbility().ToggleAbility() : false;
        } else {
            this.GetParent().SpendMana(manaToRemove, this.GetAbility());
        }
    }
}