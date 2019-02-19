class modifier_bidju_ready_capture extends CDOTA_Modifier_Lua {
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