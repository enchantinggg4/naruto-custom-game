if modifier_ability_name_talent_name_1 == nil then
	modifier_ability_name_talent_name_1 = class({})
end

function modifier_ability_name_talent_name_1:IsHidden()
    return true
end

function modifier_ability_name_talent_name_1:IsPurgable()
    return false
end

function modifier_ability_name_talent_name_1:AllowIllusionDuplicate() 
	return false
end

function modifier_ability_name_talent_name_1:RemoveOnDeath()
    return false
end

function modifier_ability_name_talent_name_1:OnCreated()
	-- This code works on client side too
	local parent = self:GetParent()
	local talent = self:GetAbility()
	local talent_value = talent:GetSpecialValueFor("value")
	parent.talent_name_1_value = talent_value
end
