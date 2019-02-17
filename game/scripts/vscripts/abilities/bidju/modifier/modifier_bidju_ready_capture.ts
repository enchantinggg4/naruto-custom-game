class Modifier_Bidju_Ready_Capture extends CDOTA_Modifier_Lua {
    IsStunDebuff(): boolean {
        return false
    }

    IsHidden(): boolean {
        return false
    }

    GetDuration(): number {
        return 10000000
    }

    IsPurgable(): boolean {
        return false
    }
}