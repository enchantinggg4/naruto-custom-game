class modifier_genjutsu extends CDOTA_Modifier_Lua {

    previousTeam: any;


    OnCreated(params: table): void {
        if(IsServer()){
            const target = this.GetParent();
            target.SetControllableByPlayer(this.GetCaster().GetPlayerOwnerID(), true);
            this.previousTeam = this.GetParent().GetTeam();
            target.SetTeam(this.GetCaster().GetTeam())
        }
    }

    OnDestroy(): void {
        if(IsServer()){
            this.GetParent().SetControllableByPlayer(this.GetParent().GetPlayerOwnerID(), true);
            this.GetParent().SetTeam(this.previousTeam);
        }
    }
}