LinkLuaModifier("modifier_hidan_immortality", "abilities/hidan_immortality/modifier/modifier_hidan_immortality.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class hidan_immortality extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE
    }

    GetIntrinsicModifierName(): string {
        return "modifier_hidan_immortality";
    }

    OnChannelFinish(bInterrupted: boolean): void {
        
    }

    OnSpellStart(): void {
       
    }
}
        