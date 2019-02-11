require("game_events/bidju")

local function Summon(hero)

    if hero.bidju_name ~= nil then
        local bidju = SpawnBidju(hero.bidju_name, hero:GetAbsOrigin(), hero:GetTeam(), hero)
        bidju.summoned = true
        bidju:SetThink("OnBidjuThink", self, "BidjuAIThink", 1)
    else
        hero:CastAbilityToggle(hero:FindAbilityByName("shinobi_summon_bidju"), 0)
    end
end

local function Kill(hero, ability)

    if hero.bidju ~= nil then
        hero.bidju:Kill(ability, hero)
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

function OnBidjuThink(unit)

    local owner = unit.owner

    -- just neutral behaviour for now
    if owner == nil then
        return nil
    end

    PrintTable(unit)

    if unit == nil then
        return nil
    end

    local search = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_CREEP

    local enemies_nearby = false

    enemies_nearby = FindUnitsInRadius(owner:GetTeam(), owner:GetAbsOrigin(), nil, 800, DOTA_UNIT_TARGET_TEAM_ENEMY, search, DOTA_UNIT_TARGET_FLAG_NONE, FIND_CLOSEST, false)

    if owner:GetAttackTarget() ~= nil then
        -- Bidju focuses same unit owner does
        unit:MoveToTargetToAttack(owner:GetAttackTarget())
    elseif next(enemies_nearby) ~= nil then
        -- Bidju protects owner.

        for _, enemy in ipairs(enemies_nearby) do
            if enemy:GetAggroTarget() == owner then
                unit:MoveToTargetToAttack(enemy)
                break
            end
        end
    else
        local angle = math.random() * math.pi * 2;

        local max_radius = 1000
        local min_radius = 300
        local radius = math.random() * (max_radius - min_radius) + min_radius

        local center = owner:GetAbsOrigin()

        local x = center.x + math.cos(angle) * radius;
        local y = center.y + math.sin(angle) * radius;

        local pos = Vector(x, y, center.z)

        unit:MoveToPosition(pos)
    end

    return 3
end