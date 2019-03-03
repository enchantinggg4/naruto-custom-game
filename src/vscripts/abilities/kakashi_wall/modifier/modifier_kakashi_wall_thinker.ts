class modifier_kakashi_wall_thinker extends CDOTA_Modifier_Lua {

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

    OnCreated(params: table): void {

    }

    OnDestroy(): void {
        if (IsServer()) {
            UTIL_Remove(this.GetParent())
        }
    }
}