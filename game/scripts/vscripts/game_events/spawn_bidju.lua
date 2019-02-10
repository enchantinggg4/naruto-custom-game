_G.beasts = {
    "npc_dota_custom_bidju_shukaku"
}

local function GetBidjuByOwner(owner)
    PrintTable(owner.bidju)
    local bidjus = {}
    for _, bidju in ipairs(owner.bidju) do
        DebugPrint("MOTHERFUCKER")
        if bidju.owner == owner then
            DebugPrint("Found bidju for hero!!")
            table.insert(bidjus, bidju)
        end
    end
    return bidjus
end

local function has_value (tab, val)
    for _, value in ipairs(tab) do
        if value == val then
            return true
        end
    end

    return false
end

local function SetBidjuOwner(bidju, owner)
    bidju.owner = owner
    if owner == nil then
        bidju:SetTeam(DOTA_TEAM_NEUTRALS)
    else
        if owner.bidju == nil then
            owner.bidju = { bidju }
        else
            table.insert(owner.bidju, bidju)
        end
        bidju:SetTeam(owner:GetTeam())
    end
end

local function ClearBidju(hero)
    hero.bidju = {}
end

-- -createhero npc_dota_custom_bidju_shukaku enemy
local function SpawnBidju(name, point, team, owner)
    if team == nil then
        team = DOTA_TEAM_NEUTRALS
    end
    if point == nil then
        point = Entities:FindByName(nil, "spawn_" .. name):GetAbsOrigin()
    end

    local unit = CreateUnitByName(name, point, true, nil, nil, team)

    unit:SetThink("OnBidjuThink", self, "BidjuAIThink", 1)

    SetBidjuOwner(unit, owner)

    return unit
end


-- Bidju owner killed

function ChangeTeamOnDeathIfBidjuOwner(killed, killer)

    if not killed:IsRealHero() then
        return
    end

    local owned_bidju = GetBidjuByOwner(killed)
    PrintTable(owned_bidju)
    PrintTable(owned_bidju)
    -- if killer = hero
    if killer:IsRealHero() then
        for _, bidju in ipairs(owned_bidju) do
            SetBidjuOwner(bidju, killer)
        end
    else
        -- if hero - neutral, release to neutrals

        for _, bidju in ipairs(owned_bidju) do
            SetBidjuOwner(bidju, nil)
        end
    end

    ClearBidju(killed)

end
-- -createhero npc_dota_custom_bidju_shukaku enemy


function AddBidjuContainer(hero)
    hero.bidju = {}
end

function ChangeTeamOnDeathIfBidju(killed, killer)
    local name = killed:GetUnitName()
    if has_value(beasts, name) then
        if killer:GetTeam() ~= killed:GetTeam() then
            SpawnBidju(name, killed:GetAbsOrigin(), killer:GetTeam(), killer)
        end
        if killer:GetTeam() == killed:GetTeam() then
            SpawnBidju(name, killed:GetAbsOrigin(), DOTA_TEAM_NEUTRALS, nil)
        end
    end
end

function InitialSpawnBidju()


    for _, beast in ipairs(beasts) do
        SpawnBidju(beast)
    end

end

--FindUnitsInRadius( DOTATeam_t team
--, vector location,
--CBaseEntity cacheUnit,
--float radius,
--DOTA_UNIT_TARGET_TEAM teamFilter,
--DOTA_UNIT_TARGET_TYPE typeFilter,
--DOTA_UNIT_TARGET_FLAGS flagFilter,
--int order,
--bool canGrowCache )

function OnBidjuThink(unit)

    local owner = unit.owner

    -- just neutral behaviour for now
    if owner == nil then
        return 1
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
        local radius = math.random() * 500

        local center = owner:GetAbsOrigin()

        local x = center.x + math.cos(angle) * radius;
        local y = center.y + math.sin(angle) * radius;

        local pos = Vector(x, y, center.z)

        unit:MoveToPosition(pos)
    end

    return 1
end