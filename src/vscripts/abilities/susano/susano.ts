LinkLuaModifier("modifier_susano", "abilities/susano/modifier/modifier_susano.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class susano extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE
    }


    GetCooldown(iLevel: number): number {
        return 0
    }

    GetChannelTime(): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return 0
    }

    OnToggle(): void {
        const state = this.GetToggleState();
        if (state) {
            this.GetCaster().RemoveModifierByName("modifier_scale");
            this.GetCaster().AddNewModifier(
                this.GetCaster(),
                this,
                "modifier_scale",
                {
                    targetScale: 2,
                    time: this.GetSpecialValueFor("charge_time"),
                    initScale: this.GetCaster().GetModelScale()
                }
            );
            this.GetCaster().AddNewModifier(
                this.GetCaster(),
                this,
                "modifier_susano",
                {}
            )

        } else {
            this.GetCaster().RemoveModifierByName("modifier_scale");

            this.GetCaster().AddNewModifier(
                this.GetCaster(),
                this,
                "modifier_scale",
                {
                    targetScale: 1,
                    time: this.GetSpecialValueFor("charge_time"),
                    initScale: this.GetCaster().GetModelScale()
                }
            );
            this.GetCaster().RemoveModifierByName("modifier_susano")
        }

    }
}
        