if modifier_ability_name_talent_name_3 == nil then
	modifier_ability_name_talent_name_3 = class({})
end

function modifier_ability_name_talent_name_3:IsHidden()
    return true
end

function modifier_ability_name_talent_name_3:IsPurgable()
    return false
end

function modifier_ability_name_talent_name_3:AllowIllusionDuplicate() 
	return false
end

function modifier_ability_name_talent_name_3:RemoveOnDeath()
    return false
end

function modifier_ability_name_talent_name_3:OnCreated()
	-- This code works on client side too
	local parent = self:GetParent()
	local talent = self:GetAbility()
	local talent_value = talent:GetSpecialValueFor("value")
	parent.talent_name_3_value = talent_value
end
