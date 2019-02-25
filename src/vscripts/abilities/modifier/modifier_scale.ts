class modifier_scale extends CDOTA_Modifier_Lua {

    targetScale: number;
    time: number;
    initScale: number;

    IsHidden(): boolean {
        return true
    }

    GetModifierModelScale(): number {
        if (this.GetElapsedTime() < this.time) {
            const diff = (this.targetScale - this.initScale) * this.GetElapsedTime() / this.time;
            return (this.initScale + diff) * 100;
        } else {
            return this.targetScale * 100;
        }
    }

    OnCreated(params: table): void {
        this.targetScale = params.targetScale;
        this.time = params.time;
        this.initScale = params.initScale;
    }

    DeclareFunctions(): modifierfunction[] {
        return [
            modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE
        ]
    }

}