local function SetAbilityLevel1(ability)
    if ability:GetLevel() < 1 then
        ability:UpgradeAbility(false)
    end
end

function SetDefaultAbilities(hero)
    if hero:HasAbility("shinobi_capture_bidju") then
        SetAbilityLevel1(hero:FindAbilityByName("shinobi_capture_bidju"))
    end

    if hero:HasAbility("shinobi_summon_bidju") then
        SetAbilityLevel1(hero:FindAbilityByName("shinobi_summon_bidju"))
        local ab = hero:FindAbilityByName("shinobi_summon_bidju")
        ab:SetActivated(false)
    end
end


function OnBidjuCaptured(hero)
    local ab = hero:FindAbilityByName("shinobi_summon_bidju")
    ab:SetActivated(true)
end

function OnBidjuUncaptured(hero)
    local ab = hero:FindAbilityByName("shinobi_summon_bidju")
    ab:SetActivated(false)
end