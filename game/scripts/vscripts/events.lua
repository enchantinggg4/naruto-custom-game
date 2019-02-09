-- This file contains all barebones-registered events and has already set up the passed-in parameters for you to use.

-- Cleanup a player when they leave
function your_gamemode_name:OnDisconnect(keys)
	DebugPrint("[BAREBONES] A Player has disconnected ".. tostring(keys.userid))
	--PrintTable(keys)

	local name = keys.name
	local networkID = keys.networkid
	local reason = keys.reason
	local userID = keys.userid
end

-- The overall game state has changed
function your_gamemode_name:OnGameRulesStateChange(keys)
	--PrintTable(keys)

	local new_state = GameRules:State_Get()

	if new_state == DOTA_GAMERULES_STATE_INIT then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_INIT")

	elseif new_state == DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD")

	elseif new_state == DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP")
		GameRules:SetCustomGameSetupAutoLaunchDelay(CUSTOM_GAME_SETUP_TIME)

	elseif new_state == DOTA_GAMERULES_STATE_HERO_SELECTION then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_HERO_SELECTION")
		your_gamemode_name:PostLoadPrecache()
		your_gamemode_name:OnAllPlayersLoaded()
		Timers:CreateTimer(HERO_SELECTION_TIME - 1.1, function()
			for playerID = 0, 19 do
				if PlayerResource:IsValidPlayerID(playerID) then
					-- If this player still hasn't picked a hero, random one
					if not PlayerResource:HasSelectedHero(playerID) and PlayerResource:IsConnected(playerID) and (not PlayerResource:IsBroadcaster(playerID)) then
						PlayerResource:GetPlayer(playerID):MakeRandomHeroSelection()
						PlayerResource:SetHasRandomed(playerID)
						PlayerResource:SetCanRepick(playerID, false)
						DebugPrint("[BAREBONES] Randomed a hero for a player number "..playerID)
					end
				end
			end
		end)

	elseif new_state == DOTA_GAMERULES_STATE_STRATEGY_TIME then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_STRATEGY_TIME")

	elseif new_state == DOTA_GAMERULES_STATE_TEAM_SHOWCASE then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_TEAM_SHOWCASE")

	elseif new_state == DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD")

	elseif new_state == DOTA_GAMERULES_STATE_PRE_GAME then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_PRE_GAME")

	elseif new_state == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_GAME_IN_PROGRESS")
		your_gamemode_name:OnGameInProgress()

	elseif new_state == DOTA_GAMERULES_STATE_POST_GAME then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_POST_GAME")

	elseif new_state == DOTA_GAMERULES_STATE_DISCONNECT then
		DebugPrint("[BAREBONES] Game State changed to: DOTA_GAMERULES_STATE_DISCONNECT")

	end
end

-- An NPC has spawned somewhere in game.  This includes heroes
function your_gamemode_name:OnNPCSpawned(keys)
	DebugPrint("[BAREBONES] A unit Spawned")
	--PrintTable(keys)

	local npc = EntIndexToHScript(keys.entindex)
	local unit_owner = npc:GetOwner()

	-- Put things here that will happen for every unit or hero when they spawn

	-- OnHeroInGame
	if npc:IsRealHero() and npc.bFirstSpawned == nil then
		npc.bFirstSpawned = true
		your_gamemode_name:OnHeroInGame(npc)
	end
end

-- An entity somewhere has been hurt. This event fires very often with many units so don't do too many expensive
-- operations here
function your_gamemode_name:OnEntityHurt(keys)
	--PrintTable(keys)

	-- Don't use this unless you know what are you doing. 
	-- If you need to detect when a unit is damaged, use Damage Filter.
	local attacker_entity = EntIndexToHScript(keys.entindex_attacker)
    local victim_entity = EntIndexToHScript(keys.entindex_killed)
end

-- An item was picked up off the ground
function your_gamemode_name:OnItemPickedUp(keys)
	DebugPrint("[BAREBONES] OnItemPickedUp")
	--PrintTable(keys)

	local unit_entity
	if keys.UnitEntitIndex then
		unit_entity = EntIndexToHScript(keys.UnitEntitIndex)
	elseif keys.HeroEntityIndex then
		unit_entity = EntIndexToHScript(keys.HeroEntityIndex)
	end

	local item_entity = EntIndexToHScript(keys.ItemEntityIndex)
	local playerID = keys.PlayerID
	local item_name = keys.itemname
end

-- A player has reconnected to the game.  This function can be used to repaint Player-based particles or change
-- state as necessary
function your_gamemode_name:OnPlayerReconnect(keys)
	DebugPrint("[BAREBONES] A Player has reconnected.")
	--PrintTable(keys)

	--local name = keys.name
	--local network_id = keys.networkid
	--local user_id = keys.userid
	--local xu_id = keys.xuid
	--local reason = keys.reason

	local new_state = GameRules:State_Get()
	if new_state > DOTA_GAMERULES_STATE_HERO_SELECTION then
		local playerID = keys.PlayerID

		if PlayerResource:HasSelectedHero(playerID) or PlayerResource:HasRandomed(playerID) then
			-- This playerID already had a hero before disconnect
		else
			if PlayerResource:IsConnected(playerID) and (not PlayerResource:IsBroadcaster(playerID)) then
				PlayerResource:GetPlayer(playerID):MakeRandomHeroSelection()
				PlayerResource:SetHasRandomed(playerID)
				PlayerResource:SetCanRepick(playerID, false)
				DebugPrint("[BAREBONES] Randomed a hero for a player number "..playerID.." that reconnected.")
			end
		end
	end
end

-- An item was purchased by a player
function your_gamemode_name:OnItemPurchased(keys)
	DebugPrint("[BAREBONES] OnItemPurchased")
	--PrintTable(keys)

	-- The playerID of the hero who is buying something
	local playerID = keys.PlayerID
	if not playerID then
		return
	end

	-- The name of the item purchased
	local item_name = keys.itemname

	-- The cost of the item purchased
	local item_cost = keys.itemcost
end

-- An ability was used by a player
function your_gamemode_name:OnAbilityUsed(keys)
	--PrintTable(keys)

	local playerID = keys.PlayerID
	local ability_name = keys.abilityname

	-- If you need to adjust abilities on their cast, use Order Filter, not this
end

-- A non-player entity (necronomicon unit, chen creep, etc) used an ability
function your_gamemode_name:OnNonPlayerUsedAbility(keys)
	--PrintTable(keys)

	local ability_name = keys.abilityname

	-- If you need to adjust abilities on their cast, use Order Filter, not this
end

-- A player changed their name, useless in most cases
function your_gamemode_name:OnPlayerChangedName(keys)
	--PrintTable(keys)

	local new_name = keys.newname
	local old_name = keys.oldName
end

-- A player leveled up an ability; Note: it doesn't trigger when you use SetLevel() on the ability!
function your_gamemode_name:OnPlayerLearnedAbility(keys)
	DebugPrint("[BAREBONES] OnPlayerLearnedAbility")
	--PrintTable(keys)

	local player = EntIndexToHScript(keys.player)
	local ability_name = keys.abilityname

	local playerID
	if player then
		playerID = player:GetPlayerID()
	else
		playerID = keys.PlayerID
	end

	local hero = PlayerResource:GetAssignedHero(playerID)

	-- Handling talents without custom net tables
	local talents = {
		{"special_bonus_unique_chaos_knight", "modifier_reality_rift_talent_1"},
		{"special_bonus_unique_chaos_knight_2", "modifier_reality_rift_talent_2"}
	}

	for i = 1, #talents do
		local talent = talents[i]
		if ability_name == talent[1] then
			local talent_ability = hero:FindAbilityByName(ability_name)
			if talent_ability then
				local talent_modifier = talent[2]
				hero:AddNewModifier(hero, talent_ability, talent_modifier, {})
			end
		end
	end
end

-- A channelled ability finished by either completing or being interrupted
function your_gamemode_name:OnAbilityChannelFinished(keys)
	DebugPrint("[BAREBONES] OnAbilityChannelFinished")
	--PrintTable(keys)

	local ability_name = keys.abilityname
	local interrupted = keys.interrupted == 1
end

-- A player leveled up
function your_gamemode_name:OnPlayerLevelUp(keys)
	DebugPrint("[BAREBONES] OnPlayerLevelUp")
	--PrintTable(keys)

	local player = EntIndexToHScript(keys.player)
	local level = keys.level

	local playerID
	local hero
	if player then
		playerID = player:GetPlayerID()
		hero = PlayerResource:GetAssignedHero(playerID)
	end

	if hero then
		-- Update hero gold bounty when a hero gains a level
		if USE_CUSTOM_HERO_GOLD_BOUNTY then
			local hero_level = hero:GetLevel() or level
			local hero_streak = hero:GetStreak()

			local gold_bounty
			if hero_streak > 2 then
				gold_bounty = HERO_KILL_GOLD_BASE + hero_level*HERO_KILL_GOLD_PER_LEVEL + (hero_streak-2)*HERO_KILL_GOLD_PER_STREAK
			else
				gold_bounty = HERO_KILL_GOLD_BASE + hero_level*HERO_KILL_GOLD_PER_LEVEL
			end

			hero:SetMinimumGoldBounty(gold_bounty)
			hero:SetMaximumGoldBounty(gold_bounty)
		end

		-- Add a skill point when a hero levels up
		if SKILL_POINTS_AT_EVERY_LEVEL then
			local levels_without_ability_point = {17, 19, 21, 22, 23, 24}	-- on this levels you should get a skill point
			for i = 1, #levels_without_ability_point do
				if level == levels_without_ability_point[i] then
					local unspent_ability_points = hero:GetAbilityPoints()
					hero:SetAbilityPoints(unspent_ability_points+1)
				end
			end
		end

		-- If you want to remove skill points when a hero levels up then uncomment the following line:
		--hero:SetAbilityPoints(0)
	end
end

-- A player last hit a creep, a tower, or a hero
function your_gamemode_name:OnLastHit(keys)
	DebugPrint("[BAREBONES] OnLastHit")
	--PrintTable(keys)

	local IsFirstBlood = keys.FirstBlood == 1
	local IsHeroKill = keys.HeroKill == 1
	local IsTowerKill = keys.TowerKill == 1

	-- Player ID that got a last hit
	local playerID = keys.PlayerID

	-- Killed unit (creep, hero, tower etc.)
	local killed_entity = EntIndexToHScript(keys.EntKilled)
end

-- A tree was cut down by tango, quelling blade, etc
function your_gamemode_name:OnTreeCut(keys)
	DebugPrint("[BAREBONES] OnTreeCut")
	--PrintTable(keys)

	-- Tree coordinates on the map
	local treeX = keys.tree_x
	local treeY = keys.tree_y
end

-- A rune was activated by a player
function your_gamemode_name:OnRuneActivated(keys)
	DebugPrint("[BAREBONES] OnRuneActivated")
	--PrintTable(keys)

  local playerID = keys.PlayerID
  local rune = keys.rune

  -- For Bounty Runes use BountyRuneFilter
  -- For modifying which runes spawn use RuneSpawnFilter
  -- This event can be used for adding more effects to existing runes.
end

-- A player took damage from a tower
function your_gamemode_name:OnPlayerTakeTowerDamage(keys)
	DebugPrint("[BAREBONES] OnPlayerTakeTowerDamage")
	--PrintTable(keys)

	local playerID = keys.PlayerID
	local damage = keys.damage
end

-- A player picked a hero (this is happening before OnNPCSpawned)
function your_gamemode_name:OnPlayerPickHero(keys)
	DebugPrint("[BAREBONES] OnPlayerPickHero")
	--PrintTable(keys)

	local hero_name = keys.hero
	local hero_entity = EntIndexToHScript(keys.heroindex)
	local player = EntIndexToHScript(keys.player)

	Timers:CreateTimer(0.5, function()
		local playerID = hero_entity:GetPlayerID() -- or player:GetPlayerID() if player is not disconnected
		if PlayerResource:IsFakeClient(playerID) then
			-- This is happening only for bots when they spawn for the first time or if they use custom hero-create spells (Custom Illusion spells)
		else
			if PlayerResource.PlayerData[playerID].already_assigned_hero == true then
				-- This is happening only when players create new heroes with spells (Custom Illusion spells)
			else
				PlayerResource:AssignHero(playerID, hero_entity)
				PlayerResource.PlayerData[playerID].already_assigned_hero = true
			end
		end
	end)
end

-- A player killed another player in a multi-team context
function your_gamemode_name:OnTeamKillCredit(keys)
	DebugPrint("[BAREBONES] OnTeamKillCredit")
	--PrintTable(keys)

	--local killer_player = PlayerResource:GetPlayer(keys.killer_userid)
	--local victim_player = PlayerResource:GetPlayer(keys.victim_userid)
	local streak = keys.herokills
	local killer_team = keys.teamnumber

	-- If you want to change assist gold or assist experience on hero death use OnEntityKilled or Damage Filter, not this
end

-- An entity died (an entity killed an entity)
function your_gamemode_name:OnEntityKilled(keys)
	DebugPrint("[BAREBONES] An entity was killed.")
	--PrintTable(keys)

	-- The Unit that was Killed
	local killed_unit = EntIndexToHScript(keys.entindex_killed)

	-- The Killing entity
	local killer_unit = nil

	if keys.entindex_attacker ~= nil then
		killer_unit = EntIndexToHScript(keys.entindex_attacker)
	end

	-- The ability/item used to kill, or nil if not killed by an item/ability
	local killing_ability = nil

	if keys.entindex_inflictor ~= nil then
		killing_ability = EntIndexToHScript(keys.entindex_inflictor)
	end

	-- For Meepo clones, find the original
	if killed_unit:IsClone() then
		if killed_unit:GetCloneSource() then
			killed_unit = killed_unit:GetCloneSource()
		end
	end

	-- Killed Unit is a hero (not an illusion) and he is not reincarnating
	if killed_unit:IsRealHero() and (not killed_unit:IsReincarnating()) then
		-- Hero gold bounty update for the killer
		if USE_CUSTOM_HERO_GOLD_BOUNTY then
			if killer_unit:IsRealHero() then
				-- Get his killing streak
				local hero_streak = killer_unit:GetStreak()
				-- Get his level
				local hero_level = killer_unit:GetLevel()
				-- Adjust Gold bounty
				local gold_bounty
				if hero_streak > 2 then
					gold_bounty = HERO_KILL_GOLD_BASE + hero_level*HERO_KILL_GOLD_PER_LEVEL + (hero_streak-2)*HERO_KILL_GOLD_PER_STREAK
				else
					gold_bounty = HERO_KILL_GOLD_BASE + hero_level*HERO_KILL_GOLD_PER_LEVEL
				end

				killer_unit:SetMinimumGoldBounty(gold_bounty)
				killer_unit:SetMaximumGoldBounty(gold_bounty)
			end
		end

		-- Hero Respawn time configuration
		if ENABLE_HERO_RESPAWN then
			local killed_unit_level = killed_unit:GetLevel()

			-- Respawn time without buyback penalty (+25 sec)
			local respawn_time = 1
			if USE_CUSTOM_RESPAWN_TIMES then
				-- Get respawn time from the table that we defined
				respawn_time = CUSTOM_RESPAWN_TIME[killed_unit_level]
			else
				-- Get dota default respawn time
				respawn_time = killed_unit:GetRespawnTime()
			end

			-- Fixing respawn time after level 25
			local respawn_time_after_25 = 100 + (killed_unit_level-25)*5
			if killed_unit_level > 25 and respawn_time < respawn_time_after_25	then
				respawn_time = respawn_time_after_25
			end

			-- Bloodstone reduction (bloodstone can't be in backpack)
			-- for i=DOTA_ITEM_SLOT_1, DOTA_ITEM_SLOT_6 do
				-- local item = killed_unit:GetItemInSlot(i)
				-- if item then
					-- if item:GetName() == "item_bloodstone" then
						-- local current_charges = item:GetCurrentCharges()
						-- local charges_before_death = math.ceil(current_charges*1.5)
						-- local reduction_per_charge = item:GetLevelSpecialValueFor("respawn_time_reduction", item:GetLevel() - 1)
						-- local respawn_reduction = charges_before_death*reduction_per_charge
						-- respawn_time = math.max(1, respawn_time-respawn_reduction)
						-- break -- to prevent multiple bloodstones granting respawn reduction
					-- end
				-- end
			-- end

			-- Reaper's Scythe respawn time increase
			if killing_ability then
				if killing_ability:GetAbilityName() == "necrolyte_reapers_scythe" then
					DebugPrint("[BAREBONES] A hero was killed by a Necro Ultimate.")
					local respawn_extra_time = killing_ability:GetLevelSpecialValueFor("respawn_constant", killing_ability:GetLevel() - 1)
					respawn_time = respawn_time + respawn_extra_time
				end
			end

			-- Killer is a neutral creep
			if killer_unit:IsNeutralUnitType() then
				-- If a hero is killed by a neutral creep, respawn time can be modified here
			end

			-- Maximum Respawn Time
			if respawn_time > MAX_RESPAWN_TIME then
				DebugPrint("Reducing respawn time of "..killed_unit:GetUnitName().." because it was too long.")
				respawn_time = MAX_RESPAWN_TIME
			end

			if not killed_unit:IsReincarnating() then
				killed_unit:SetTimeUntilRespawn(respawn_time)
			end
		end

		-- Buyback Cooldown
		if CUSTOM_BUYBACK_COOLDOWN_ENABLED then
			PlayerResource:SetCustomBuybackCooldown(killed_unit:GetPlayerID(), CUSTOM_BUYBACK_COOLDOWN_TIME)
		end

		-- Buyback Fixed Gold Cost
		if CUSTOM_BUYBACK_COST_ENABLED then
			PlayerResource:SetCustomBuybackCost(killed_unit:GetPlayerID(), BUYBACK_FIXED_GOLD_COST)
		end

		-- Killer is not a real hero but it killed a hero
		if killer_unit:IsTower() or killer_unit:IsCreep() or killer_unit:IsFountain() then
			-- Put stuff here that you want to happen if a hero is killed by a creep, tower or fountain.
		end

		-- When team hero kill limit is reached declare the winner
		if END_GAME_ON_KILLS and GetTeamHeroKills(killer_unit:GetTeam()) >= KILLS_TO_END_GAME_FOR_TEAM then
			GameRules:SetGameWinner(killer_unit:GetTeam())
		end

		-- Setting top bar values
		if SHOW_KILLS_ON_TOPBAR then
			GameRules:GetGameModeEntity():SetTopBarTeamValue(DOTA_TEAM_BADGUYS, GetTeamHeroKills(DOTA_TEAM_BADGUYS))
			GameRules:GetGameModeEntity():SetTopBarTeamValue(DOTA_TEAM_GOODGUYS, GetTeamHeroKills(DOTA_TEAM_GOODGUYS))
		end
	end

	-- Ancient destruction detection (if the map doesn't have ancients with these names, this will never happen)
	if killed_unit:GetUnitName() == "npc_dota_badguys_fort" then
		GameRules:SetGameWinner(DOTA_TEAM_GOODGUYS)
	elseif killed_unit:GetUnitName() == "npc_dota_goodguys_fort" then
		GameRules:SetGameWinner(DOTA_TEAM_BADGUYS)
	end

	-- Remove dead non-hero units from selection -> bugged ability/cast bar
	if killed_unit:IsIllusion() or (killed_unit:IsControllableByAnyPlayer() and (not killed_unit:IsRealHero()) and (not killed_unit:IsCourier()) and (not killed_unit:IsClone())) and (not killed_unit:IsTempestDouble()) then
		local player = killed_unit:GetPlayerOwner()
		local playerID
		if player == nil then
			playerID = killed_unit:GetPlayerOwnerID()
		else
			playerID = player:GetPlayerID()
		end
		-- Without Selection library this will return an error
		PlayerResource:RemoveFromSelection(playerID, killed_unit)
	end
end

-- This function is called 1 to 2 times as the player connects initially but before they have completely connected
function your_gamemode_name:PlayerConnect(keys)
	--PrintTable(keys)
end

-- This function is called once when the player fully connects and becomes "Ready" during Loading
function your_gamemode_name:OnConnectFull(keys)
	DebugPrint("[BAREBONES] A Player fully connected.")
	--PrintTable(keys)

	your_gamemode_name:CaptureGameMode()

	local index = keys.index
	local playerID = keys.PlayerID
	local userID = keys.userid

	PlayerResource:OnPlayerConnect(keys)
end

-- This function is called whenever illusions are created and tells you which was/is the original entity
function your_gamemode_name:OnIllusionsCreated(keys)
	DebugPrint("[BAREBONES] OnIllusionsCreated")
	--PrintTable(keys)

	local original_entity = EntIndexToHScript(keys.original_entindex)
end

-- This function is called whenever an item is combined to create a new item
function your_gamemode_name:OnItemCombined(keys)
	DebugPrint("[BAREBONES] OnItemCombined")
	--PrintTable(keys)

	-- The playerID of the hero that combined an item
	local playerID = keys.PlayerID
	if not playerID then
		return 
	end

	-- The name of the item that was combined
	local item_name = keys.itemname

	-- The cost of the item combined
	local item_cost = keys.itemcost
end

-- This function is called whenever an ability begins its PhaseStart phase (but before it is actually cast)
function your_gamemode_name:OnAbilityCastBegins(keys)
	DebugPrint("[BAREBONES] OnAbilityCastBegins")
	--PrintTable(keys)

	local playerID = keys.PlayerID
	local ability_name = keys.abilityname

	-- If you need to adjust abilities on their cast, use Order Filter, not this
end

-- This function is called whenever a tower is destroyed
function your_gamemode_name:OnTowerKill(keys)
	DebugPrint("[BAREBONES] OnTowerKill")
	--PrintTable(keys)

	local gold = keys.gold
	local killer_userID = keys.killer_userid
	local team = keys.teamnumber
end

-- This function is called whenever a player changes their custom team selection during Custom Game Setup 
function your_gamemode_name:OnPlayerSelectedCustomTeam(keys)
	DebugPrint("[BAREBONES] OnPlayerSelectedCustomTeam")
	--PrintTable(keys)

	local playerID = keys.player_id
	local success = (keys.success == 1)
	local team = keys.team_id
end

-- This function is called whenever an NPC reaches its goal position/target (npc can be a lane creep)
function your_gamemode_name:OnNPCGoalReached(keys)
	DebugPrint("[BAREBONES] OnNPCGoalReached")
	--PrintTable(keys)

	local goal_entity = EntIndexToHScript(keys.goal_entindex)
	local next_goal_entity = EntIndexToHScript(keys.next_goal_entindex)
	local npc = EntIndexToHScript(keys.npc_entindex)
end

-- This function is called whenever any player sends a chat message to team or to All
function your_gamemode_name:OnPlayerChat(keys)
	DebugPrint("[BAREBONES] Player used the chat")
	--PrintTable(keys)

	local team_only = keys.teamonly
	local userID = keys.userid
	local text = keys.text
end
