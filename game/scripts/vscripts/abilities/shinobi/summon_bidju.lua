require("game_events/bidju")

local function Summon(hero)

    if hero.bidju_name ~= nil then
        local bidju = SpawnBidju(hero.bidju_name, hero:GetAbsOrigin(), hero:GetTeam(), hero)
        bidju:SetControllableByPlayer(hero:GetPlayerOwnerID(), true)
        bidju:SetOwner(hero)
        bidju.summoned = true
    else
        hero:CastAbilityToggle(hero:FindAbilityByName("shinobi_summon_bidju"), 0)
    end
end

local function Kill(hero, ability)

    if hero.bidju ~= nil then
        hero.bidju:Kill(ability, hero)
        ability:StartCooldown(
                ability:GetSpecialValueFor("cooldown")
        )
    else
        -- unit killed
    end
end

function SummonBidju(event)
    DebugPrint("Summon bidju huh? ")
    Summon(event.caster)
end

function KillBidju(event)
    DebugPrint("Kill bidju huh? ")
    Kill(event.caster, event.ability)
end

function OnManaTick(event)
    if event.caster:GetMana() < event.ability:GetSpecialValueFor("mana_per_second") then
        DebugPrint("Hello there?")
        event.caster:CastAbilityToggle(event.caster:FindAbilityByName("shinobi_summon_bidju"), 0)
    end
end