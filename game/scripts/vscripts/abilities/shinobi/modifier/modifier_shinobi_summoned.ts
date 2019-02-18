class modifier_shinobi_summoned extends CDOTA_Modifier_Lua {

    GetTexture(): string {
        return "medusa_mana_shield"
    }


    OnCreated(params: table): void {
        this.StartIntervalThink(0.3);
    }

    OnIntervalThink(): void {

        // some issues for sure
        if (this.GetParent()) {
            const manaPool = this.GetParent().GetMaxMana();
            const manaToRemove = manaPool * 0.01;
            if (this.GetParent().GetMana() < manaToRemove) {
                this.GetAbility().GetToggleState() ? this.GetAbility().ToggleAbility() : false;
            } //else {
            //     try{
            //         this.GetParent().SpendMana(manaToRemove, this.GetAbility());
            //     }catch(e){
            //         print("Error at SpendMana?");
            //         print(this.GetParent());
            //         print(this.GetParent().SpendMana);
            //     }
            // }
        }
    }


}