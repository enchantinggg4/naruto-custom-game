if modifier_ability_name_talent_name_2 == nil then
	modifier_ability_name_talent_name_2 = class({})
end

function modifier_ability_name_talent_name_2:IsHidden()
    return true
end

function modifier_ability_name_talent_name_2:IsPurgable()
    return false
end

function modifier_ability_name_talent_name_2:AllowIllusionDuplicate() 
	return false
end

function modifier_ability_name_talent_name_2:RemoveOnDeath()
    return false
end

function modifier_ability_name_talent_name_2:OnCreated()
	-- This code works on client side too
	local parent = self:GetParent()
	local talent = self:GetAbility()
	local talent_value = talent:GetSpecialValueFor("value")
	parent.talent_name_2_value = talent_value
end
