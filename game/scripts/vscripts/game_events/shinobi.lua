local function SetAbilityLevel1(ability)
    if ability:GetLevel() < 1 then
        ability:UpgradeAbility(false)
    end
end

function SetDefaultAbilities(hero)
    if hero:HasAbility("shinobi_capture_bidju") then
        if hero:FindAbilityByName("shinobi_capture_bidju"):GetLevel() < 1 then
            SetAbilityLevel1(hero:FindAbilityByName("shinobi_capture_bidju"))
        else
            hero:FindAbilityByName("shinobi_capture_bidju"):SetActivated(true)
        end
    end

    if hero:HasAbility("shinobi_summon_bidju") then
        if hero:FindAbilityByName("shinobi_summon_bidju"):GetLevel() < 1 then
            SetAbilityLevel1(hero:FindAbilityByName("shinobi_summon_bidju"))
        end

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
    --ab:Tog
    if ab:GetToggleState() then
        hero:CastAbilityToggle(ab, 0)
    end
    ab:SetActivated(false)

    ab = hero:FindAbilityByName("shinobi_capture_bidju")
    ab:SetActivated(true)
end

function TurnOffSummon(hero)
    local ability = hero:FindAbilityByName("shinobi_summon_bidju")
    if ability:GetToggleState() then
        hero:CastAbilityToggle(ability, 0)
    end
end