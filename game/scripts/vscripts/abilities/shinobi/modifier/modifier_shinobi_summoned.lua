--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
modifier_shinobi_summoned = modifier_shinobi_summoned or {};
modifier_shinobi_summoned.__index = modifier_shinobi_summoned;
modifier_shinobi_summoned.new = function(construct, ...)
    local self = setmetatable({}, modifier_shinobi_summoned);
    if construct and modifier_shinobi_summoned.constructor then
        modifier_shinobi_summoned.constructor(self, ...);
    end
    return self;
end;
modifier_shinobi_summoned.constructor = function(self)
end;
modifier_shinobi_summoned.GetTexture = function(self)
    return "medusa_mana_shield";
end;
modifier_shinobi_summoned.OnCreated = function(self, params)
    if IsServer() then
        self:StartIntervalThink(0.3);
    end
end;
modifier_shinobi_summoned.OnDestroy = function(self)
    self:StartIntervalThink(-1);
end;
modifier_shinobi_summoned.OnIntervalThink = function(self)
    local manaPool = self:GetParent():GetMaxMana();
    local manaToRemove = manaPool * 0.01;
    if self:GetParent():GetMana() < manaToRemove then
        ((self:GetAbility():GetToggleState() and (function()
            return self:GetAbility():ToggleAbility();
        end)) or (function()
            return false;
        end))();
    else
        self:GetParent():SpendMana(manaToRemove, self:GetAbility());
    end
end;
