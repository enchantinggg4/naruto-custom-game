modifier_bidju_spirit = class({})
LinkLuaModifier( "modifier_bidju_spirit", LUA_MODIFIER_MOTION_NONE )

function modifier_bidju_spirit:IsBuff()
    return true
end

function modifier_bidju_spirit:IsPurgable()
    return false
end

function modifier_bidju_spirit:IsHidden()
    return false
end