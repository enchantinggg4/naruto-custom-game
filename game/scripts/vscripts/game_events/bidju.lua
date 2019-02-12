require("game_events/bidju_shinobi")
require("game_events/akatsuki")

_G.beasts = {
    "npc_dota_custom_bidju_shukaku",
    "npc_dota_custom_bidju_matatabi",
    "npc_dota_custom_bidju_kurama",
}

local function has_value (tab, val)
    for _, value in ipairs(tab) do
        if value == val then
            return true
        end
    end

    return false
end

function IsShinobi(hero)
    return hero:GetTeam() == DOTA_TEAM_GOODGUYS
end

function IsAkatsuki(hero)
    return hero:GetTeam() == DOTA_TEAM_BADGUYS
end

function IsBidju(entity)
    return has_value(beasts, entity:GetUnitName())
end

function SetBidjuOwner(bidju, owner)
    bidju.owner = owner
    if owner == nil then
        bidju:SetTeam(DOTA_TEAM_NEUTRALS)
    else
        owner.bidju = bidju
        bidju:SetTeam(owner:GetTeam())
    end
end

function ClearBidju(hero)
    hero.bidju = nil
end

function SpawnBidju(name, point, team, owner)
    if team == nil then
        team = DOTA_TEAM_NEUTRALS
    end
    if point == nil then
        point = Entities:FindByName(nil, "spawn_" .. name):GetAbsOrigin()
    end

    local unit = CreateUnitByName(name, point, true, nil, nil, team)


    SetBidjuOwner(unit, owner)

    return unit
end

function InitialSpawnBidju()
    for _, beast in ipairs(beasts) do
        SpawnBidju(beast)
    end
end

function OnNPCKilled(killed, killer, ability)

    local ignored_abilities = {
        "shinobi_capture_bidju",
        "shinobi_summon_bidju"
    }

    if IsBidju(killed) and (ability == nil or not has_value(ignored_abilities, ability:GetName())) then
        if IsShinobi(killer) then
            OnBidjuKilledByShinobi(killed, killer)
        elseif killed.summoned ~= nil and killed.summoned and not IsAkatsuki(killer) then
            -- its summoned bidju so other logic - remove mana and set cooldown. if it killed by akatsuki - capture
            local hero = killed.owner
            hero:SetMana(0)
            hero:CastAbilityToggle(hero:FindAbilityByName("shinobi_summon_bidju"), 0)
        elseif IsAkatsuki(killer) then
            -- Akatsuki killed bidju, it should be placed in the demonic statue
            SetBidjuCaptured(killed)
        end

    elseif killed:GetUnitName() == "npc_dota_custom_cave" then
        --    defender killed
        UncaptureBidju(killed.bidju_name)

    elseif IsShinobi(killed) then
        if killed.bidju ~= nil then
            SetBidjuCaptured(killed.bidju)
        end
    end

end