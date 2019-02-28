// LinkLuaModifier("modifier_creep_home_active", "abilities/modifier/modifier_creep_home_active.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);


class modifier_creep_home extends CDOTA_Modifier_Lua {

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

    OnIntervalThink(): void {
        const distance = (this.origin - this.GetParent().GetAbsOrigin() as Vector).Length();
        this.active = distance < 300;

        print("ADding modifier?S?");
        if (this.active) {
            this.GetParent().AddNewModifier(
                null,
                null,
                "modifier_creep_home_active",
                {}
            );
        } else {
            // this.GetParent().RemoveModifierByName("modifier_creep_home_active")
        }
    }

    OnCreated(params: table): void {
        this.origin = Vector(
            params.x,
            params.y,
            params.z
        );
        this.StartIntervalThink(1);
    }

}