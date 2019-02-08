-- This is the primary barebones gamemode script and should be used to assist in initializing your game mode
BAREBONES_VERSION = "2.0.1"

-- Physics library can be used for advanced physics/motion/collision of units.  See PhysicsReadme.txt for more information.
require('libraries/physics')
-- Projectiles library can be used for advanced 3D projectile systems.
require('libraries/projectiles')
-- Notifications library can be used for sending panorama notifications to the UIs of players/teams/everyone
require('libraries/notifications')
-- Animations library can be used for starting customized animations on units from lua
require('libraries/animations')
-- Attachments library can be used for performing "Frankenstein" attachments on units
--require('libraries/attachments')
-- PlayerTables library can be used to synchronize client-server data via player/client-specific net tables
require('libraries/playertables')
-- Selection library (by Noya) provides player selection inspection and management from server lua
require('libraries/selection')

-- settings.lua is where you can specify many different properties for your game mode and is one of the core barebones files.
require('settings')
-- events.lua is where you can specify the actions to be taken when any event occurs and is one of the core barebones files.
require('events')
-- filters.lua
require('filters')

--[[
  This function should be used to set up Async precache calls at the beginning of the gameplay.

  In this function, place all of your PrecacheItemByNameAsync and PrecacheUnitByNameAsync.  These calls will be made
  after all players have loaded in, but before they have selected their heroes. PrecacheItemByNameAsync can also
  be used to precache dynamically-added datadriven abilities instead of items.  PrecacheUnitByNameAsync will 
  precache the precache{} block statement of the unit and all precache{} block statements for every Ability# 
  defined on the unit.

  This function should only be called once.  If you want to/need to precache more items/abilities/units at a later
  time, you can call the functions individually (for example if you want to precache units in a new wave of
  holdout).

  This function should generally only be used if the Precache() function in addon_game_mode.lua is not working.
]]
function your_gamemode_name:PostLoadPrecache()
	DebugPrint("[BAREBONES] Performing Post-Load precache.")
	--PrecacheItemByNameAsync("item_example_item", function(...) end)
	--PrecacheItemByNameAsync("example_ability", function(...) end)

	--PrecacheUnitByNameAsync("npc_dota_hero_viper", function(...) end)
	--PrecacheUnitByNameAsync("npc_dota_hero_enigma", function(...) end)
end

--[[
  This function is called once and only once as soon as the first player (almost certain to be the server in local lobbies) loads in.
  It can be used to initialize state that isn't initializeable in InitGameMode() but needs to be done before everyone loads in.
]]
function your_gamemode_name:OnFirstPlayerLoaded()
	DebugPrint("[BAREBONES] First Player has loaded.")

end

--[[
  This function is called once and only once after all players have loaded into the game, right as the hero selection time begins.
  It can be used to initialize non-hero player state or adjust the hero selection (i.e. force random etc)
]]
function your_gamemode_name:OnAllPlayersLoaded()
	DebugPrint("[BAREBONES] All Players have loaded into the game.")

end

--[[
  This function is called once and only once for every player when they spawn into the game for the first time.  It is also called
  if the player's hero is replaced with a new hero for any reason.  This function is useful for initializing heroes, such as adding
  levels, changing the starting gold, removing/adding abilities, adding physics, etc.

  The hero parameter is the hero entity that just spawned in
]]
function your_gamemode_name:OnHeroInGame(hero)

	-- Innate abilities (this is applied to bots and custom created heroes/illusions too)
	InitializeInnateAbilities(hero)

	Timers:CreateTimer(0.5, function()
		local playerID = hero:GetPlayerID()	-- never nil (-1 by default), needs delay 1 or more frames

		if PlayerResource:IsFakeClient(playerID) then
			-- This is happening only for bots
			DebugPrint("[BAREBONES] Bot hero "..hero:GetUnitName().." (re)spawned in the game.")
			-- Set starting gold for bots
			hero:SetGold(NORMAL_START_GOLD, false)
		else
			-- Set some hero stuff on first spawn or on every spawn (custom or not)
			if PlayerResource.PlayerData[playerID].already_set_hero == true then
				-- This is happening only when players create new heroes with custom hero-create spells:
				-- Custom Illusion spells
			else
				-- This is happening for players when their primary hero spawns for the first time
				DebugPrint("[BAREBONES] Hero "..hero:GetUnitName().." spawned in the game for the first time for the player with ID "..playerID)

				-- Make heroes briefly visible on spawn (to prevent bad fog interactions)
				hero:MakeVisibleToTeam(DOTA_TEAM_GOODGUYS, 0.5)
				hero:MakeVisibleToTeam(DOTA_TEAM_BADGUYS, 0.5)

				-- Set the starting gold for the player's hero
				if PlayerResource:HasRandomed(playerID) then
					PlayerResource:ModifyGold(playerID, RANDOM_START_GOLD-600, false, 0)
				else
					-- If the NORMAL_START_GOLD is smaller then 600, don't use this line:
					PlayerResource:ModifyGold(playerID, NORMAL_START_GOLD-600, false, 0)
				end

				-- Remove a teleport scroll from the player when they spawn
				--if not TELEPORT_SCROLL_ON_START then
					--for i=DOTA_ITEM_SLOT_1, DOTA_ITEM_SLOT_9 do
						--local item = hero:GetItemInSlot(i)
						--if item then
							--if item:GetName() == "item_tpscroll" then
								--hero:RemoveItem(item)
							--end
						--end
					--end
				--end

				-- Create an item and add it to the player, effectively ensuring they start with the item
				if ADD_ITEM_TO_HERO_ON_SPAWN then
					local item = CreateItem("item_example_item", hero, hero)
					hero:AddItem(item)
				end

				-- Make sure that stuff above will not happen again for the player if some other hero spawns
				-- for him for the first time during the game 
				PlayerResource.PlayerData[playerID].already_set_hero = true
				DebugPrint("[BAREBONES] Hero "..hero:GetUnitName().." set for the player with ID "..playerID)
			end
		end
	end)
end

--[[
  This function is called once and only once when the game completely begins (about 0:00 on the clock).  At this point,
  gold will begin to go up in ticks if configured, creeps will spawn, towers will become damageable etc.  This function
  is useful for starting any game logic timers/thinkers, beginning the first round, etc.
]]
function your_gamemode_name:OnGameInProgress()
	DebugPrint("[BAREBONES] The game has officially begun.")

end

-- This function initializes the game mode and is called before anyone loads into the game
-- It can be used to pre-initialize any values/tables that will be needed later
function your_gamemode_name:InitGameMode()
	DebugPrint("[BAREBONES] Starting to load Game Rules.")
	-- Setup rules
	GameRules:SetHeroRespawnEnabled(ENABLE_HERO_RESPAWN)
	GameRules:SetUseUniversalShopMode(UNIVERSAL_SHOP_MODE)
	GameRules:SetSameHeroSelectionEnabled(ALLOW_SAME_HERO_SELECTION)
	GameRules:SetHeroSelectionTime(HERO_SELECTION_TIME)
	GameRules:SetPreGameTime(PRE_GAME_TIME)
	GameRules:SetPostGameTime(POST_GAME_TIME)
	GameRules:SetShowcaseTime(SHOWCASE_TIME)
	GameRules:SetStrategyTime(STRATEGY_TIME)
	GameRules:SetTreeRegrowTime(TREE_REGROW_TIME)
	if USE_CUSTOM_HERO_LEVELS then
		GameRules:SetUseCustomHeroXPValues(true)
	end
	GameRules:SetGoldPerTick(GOLD_PER_TICK)
	GameRules:SetGoldTickTime(GOLD_TICK_TIME)
	if USE_CUSTOM_HERO_GOLD_BOUNTY then
		GameRules:SetUseBaseGoldBountyOnHeroes(false)
	end
	GameRules:SetHeroMinimapIconScale(MINIMAP_ICON_SIZE)
	GameRules:SetCreepMinimapIconScale(MINIMAP_CREEP_ICON_SIZE)
	GameRules:SetRuneMinimapIconScale(MINIMAP_RUNE_ICON_SIZE)
	GameRules:SetFirstBloodActive(ENABLE_FIRST_BLOOD)
	GameRules:SetHideKillMessageHeaders(HIDE_KILL_BANNERS)

	-- This is multi-team configuration stuff
	if USE_AUTOMATIC_PLAYERS_PER_TEAM then
		local num = math.floor(10/MAX_NUMBER_OF_TEAMS)
		local count = 0
		for team,number in pairs(TEAM_COLORS) do
			if count >= MAX_NUMBER_OF_TEAMS then
				GameRules:SetCustomGameTeamMaxPlayers(team, 0)
			else
				GameRules:SetCustomGameTeamMaxPlayers(team, num)
			end
			count = count + 1
		end
	else
		local count = 0
		for team,number in pairs(CUSTOM_TEAM_PLAYER_COUNT) do
			if count >= MAX_NUMBER_OF_TEAMS then
				GameRules:SetCustomGameTeamMaxPlayers(team, 0)
			else
				GameRules:SetCustomGameTeamMaxPlayers(team, number)
			end
			count = count + 1
		end
	end

	if USE_CUSTOM_TEAM_COLORS then
		for team,color in pairs(TEAM_COLORS) do
			SetTeamCustomHealthbarColor(team, color[1], color[2], color[3])
		end
	end

	DebugPrint("[BAREBONES] Done with setting Game Rules.")

	-- Event Hooks / Listeners
	ListenToGameEvent('dota_player_gained_level', Dynamic_Wrap(your_gamemode_name, 'OnPlayerLevelUp'), self)
	ListenToGameEvent('dota_ability_channel_finished', Dynamic_Wrap(your_gamemode_name, 'OnAbilityChannelFinished'), self)
	ListenToGameEvent('dota_player_learned_ability', Dynamic_Wrap(your_gamemode_name, 'OnPlayerLearnedAbility'), self)
	ListenToGameEvent('entity_killed', Dynamic_Wrap(your_gamemode_name, 'OnEntityKilled'), self)
	ListenToGameEvent('player_connect_full', Dynamic_Wrap(your_gamemode_name, 'OnConnectFull'), self)
	ListenToGameEvent('player_disconnect', Dynamic_Wrap(your_gamemode_name, 'OnDisconnect'), self)
	ListenToGameEvent('dota_item_purchased', Dynamic_Wrap(your_gamemode_name, 'OnItemPurchased'), self)
	ListenToGameEvent('dota_item_picked_up', Dynamic_Wrap(your_gamemode_name, 'OnItemPickedUp'), self)
	ListenToGameEvent('last_hit', Dynamic_Wrap(your_gamemode_name, 'OnLastHit'), self)
	ListenToGameEvent('dota_non_player_used_ability', Dynamic_Wrap(your_gamemode_name, 'OnNonPlayerUsedAbility'), self)
	ListenToGameEvent('player_changename', Dynamic_Wrap(your_gamemode_name, 'OnPlayerChangedName'), self)
	ListenToGameEvent('dota_rune_activated_server', Dynamic_Wrap(your_gamemode_name, 'OnRuneActivated'), self)
	ListenToGameEvent('dota_player_take_tower_damage', Dynamic_Wrap(your_gamemode_name, 'OnPlayerTakeTowerDamage'), self)
	ListenToGameEvent('tree_cut', Dynamic_Wrap(your_gamemode_name, 'OnTreeCut'), self)
	ListenToGameEvent('entity_hurt', Dynamic_Wrap(your_gamemode_name, 'OnEntityHurt'), self)
	ListenToGameEvent('player_connect', Dynamic_Wrap(your_gamemode_name, 'PlayerConnect'), self)
	ListenToGameEvent('dota_player_used_ability', Dynamic_Wrap(your_gamemode_name, 'OnAbilityUsed'), self)
	ListenToGameEvent('game_rules_state_change', Dynamic_Wrap(your_gamemode_name, 'OnGameRulesStateChange'), self)
	ListenToGameEvent('npc_spawned', Dynamic_Wrap(your_gamemode_name, 'OnNPCSpawned'), self)
	ListenToGameEvent('dota_player_pick_hero', Dynamic_Wrap(your_gamemode_name, 'OnPlayerPickHero'), self)
	ListenToGameEvent('dota_team_kill_credit', Dynamic_Wrap(your_gamemode_name, 'OnTeamKillCredit'), self)
	ListenToGameEvent("player_reconnected", Dynamic_Wrap(your_gamemode_name, 'OnPlayerReconnect'), self)
	ListenToGameEvent("player_chat", Dynamic_Wrap(your_gamemode_name, 'OnPlayerChat'), self)

	ListenToGameEvent("dota_illusions_created", Dynamic_Wrap(your_gamemode_name, 'OnIllusionsCreated'), self)
	ListenToGameEvent("dota_item_combined", Dynamic_Wrap(your_gamemode_name, 'OnItemCombined'), self)
	ListenToGameEvent("dota_player_begin_cast", Dynamic_Wrap(your_gamemode_name, 'OnAbilityCastBegins'), self)
	ListenToGameEvent("dota_tower_kill", Dynamic_Wrap(your_gamemode_name, 'OnTowerKill'), self)
	ListenToGameEvent("dota_player_selected_custom_team", Dynamic_Wrap(your_gamemode_name, 'OnPlayerSelectedCustomTeam'), self)
	ListenToGameEvent("dota_npc_goal_reached", Dynamic_Wrap(your_gamemode_name, 'OnNPCGoalReached'), self)

	-- Change random seed for math.random function
	local timeTxt = string.gsub(string.gsub(GetSystemTime(), ':', ''), '0','')
	math.randomseed(tonumber(timeTxt))

	DebugPrint("[BAREBONES] Setting filters.")

	local gamemode = GameRules:GetGameModeEntity()

	-- Setting the Order filter 
	gamemode:SetExecuteOrderFilter(Dynamic_Wrap(your_gamemode_name, "OrderFilter"), self)

	-- Setting the Damage filter
	gamemode:SetDamageFilter(Dynamic_Wrap(your_gamemode_name, "DamageFilter"), self)

	-- Setting the Modifier filter
	gamemode:SetModifierGainedFilter(Dynamic_Wrap(your_gamemode_name, "ModifierFilter"), self)

	-- Setting the Experience filter
	gamemode:SetModifyExperienceFilter(Dynamic_Wrap(your_gamemode_name, "ExperienceFilter"), self)

	-- Setting the Tracking Projectile filter
	gamemode:SetTrackingProjectileFilter(Dynamic_Wrap(your_gamemode_name, "ProjectileFilter"), self)

	-- Setting the rune spawn filter
	gamemode:SetRuneSpawnFilter(Dynamic_Wrap(your_gamemode_name, "RuneSpawnFilter"), self)

	-- Setting the bounty rune pickup filter
	gamemode:SetBountyRunePickupFilter(Dynamic_Wrap(your_gamemode_name, "BountyRuneFilter"), self)

	-- Setting the Healing filter
	gamemode:SetHealingFilter(Dynamic_Wrap(your_gamemode_name, "HealingFilter"), self)

	-- Setting the Gold Filter
	gamemode:SetModifyGoldFilter(Dynamic_Wrap(your_gamemode_name, "GoldFilter"), self)

	-- Setting the Inventory filter
	gamemode:SetItemAddedToInventoryFilter(Dynamic_Wrap(your_gamemode_name, "InventoryFilter"), self)

	DebugPrint("[BAREBONES] Done with setting Filters.")

	-- Global Lua Modifiers
	LinkLuaModifier("modifier_custom_invulnerable", "modifiers/modifier_custom_invulnerable", LUA_MODIFIER_MOTION_NONE)

	-- Talent modifiers (this can be done in ability scripts, but it can be done here as well)
	LinkLuaModifier("modifier_ability_name_talent_name_1", "modifiers/talents/modifier_ability_name_talent_name_1", LUA_MODIFIER_MOTION_NONE)
	LinkLuaModifier("modifier_ability_name_talent_name_2", "modifiers/talents/modifier_ability_name_talent_name_2", LUA_MODIFIER_MOTION_NONE)
	LinkLuaModifier("modifier_ability_name_talent_name_3", "modifiers/talents/modifier_ability_name_talent_name_3", LUA_MODIFIER_MOTION_NONE)

	print("your_gamemode_name initialized.")
	DebugPrint("[BAREBONES] Done loading the game mode!\n\n")
end

-- This function is called as the first player loads and sets up the game mode parameters
function your_gamemode_name:CaptureGameMode()
	local gamemode = GameRules:GetGameModeEntity()
	
	-- Set GameMode parameters
	gamemode:SetRecommendedItemsDisabled(RECOMMENDED_BUILDS_DISABLED)
	gamemode:SetCameraDistanceOverride(CAMERA_DISTANCE_OVERRIDE)
	gamemode:SetBuybackEnabled(BUYBACK_ENABLED)
	gamemode:SetCustomBuybackCostEnabled(CUSTOM_BUYBACK_COST_ENABLED)
	gamemode:SetCustomBuybackCooldownEnabled(CUSTOM_BUYBACK_COOLDOWN_ENABLED)
	gamemode:SetTopBarTeamValuesOverride(USE_CUSTOM_TOP_BAR_VALUES)
	gamemode:SetTopBarTeamValuesVisible(TOP_BAR_VISIBLE)

	if USE_CUSTOM_XP_VALUES then
		gamemode:SetUseCustomHeroLevels(USE_CUSTOM_XP_VALUES)
		gamemode:SetCustomXPRequiredToReachNextLevel(XP_PER_LEVEL_TABLE)
	end

	gamemode:SetBotThinkingEnabled(USE_STANDARD_DOTA_BOT_THINKING)
	gamemode:SetTowerBackdoorProtectionEnabled(ENABLE_TOWER_BACKDOOR_PROTECTION)

	gamemode:SetFogOfWarDisabled(DISABLE_FOG_OF_WAR_ENTIRELY)
	gamemode:SetGoldSoundDisabled(DISABLE_GOLD_SOUNDS)
	gamemode:SetRemoveIllusionsOnDeath(REMOVE_ILLUSIONS_ON_DEATH)

	gamemode:SetAlwaysShowPlayerInventory(SHOW_ONLY_PLAYER_INVENTORY)
	gamemode:SetAnnouncerDisabled(DISABLE_ANNOUNCER)
	if FORCE_PICKED_HERO ~= nil then
		gamemode:SetCustomGameForceHero(FORCE_PICKED_HERO)
	end
	gamemode:SetFixedRespawnTime(FIXED_RESPAWN_TIME)
	gamemode:SetFountainConstantManaRegen(FOUNTAIN_CONSTANT_MANA_REGEN)
	gamemode:SetFountainPercentageHealthRegen(FOUNTAIN_PERCENTAGE_HEALTH_REGEN)
	gamemode:SetFountainPercentageManaRegen(FOUNTAIN_PERCENTAGE_MANA_REGEN)
	gamemode:SetLoseGoldOnDeath(LOSE_GOLD_ON_DEATH)
	gamemode:SetMaximumAttackSpeed(MAXIMUM_ATTACK_SPEED)
	gamemode:SetMinimumAttackSpeed(MINIMUM_ATTACK_SPEED)
	gamemode:SetStashPurchasingDisabled(DISABLE_STASH_PURCHASING)

	if USE_DEFAULT_RUNE_SYSTEM then
		gamemode:SetUseDefaultDOTARuneSpawnLogic(USE_DEFAULT_RUNE_SYSTEM)
	else
		-- Most runes are broken by Valve, if they don't fix them: use RuneSpawnFilter
		for rune, spawn in pairs(ENABLED_RUNES) do
			gamemode:SetRuneEnabled(rune, spawn)
		end
		gamemode:SetBountyRuneSpawnInterval(BOUNTY_RUNE_SPAWN_INTERVAL)
		gamemode:SetPowerRuneSpawnInterval(POWER_RUNE_SPAWN_INTERVAL)
	end

	gamemode:SetUnseenFogOfWarEnabled(USE_UNSEEN_FOG_OF_WAR)
	gamemode:SetDaynightCycleDisabled(DISABLE_DAY_NIGHT_CYCLE)
	gamemode:SetKillingSpreeAnnouncerDisabled(DISABLE_KILLING_SPREE_ANNOUNCER)
	gamemode:SetStickyItemDisabled(DISABLE_STICKY_ITEM)

	self:OnFirstPlayerLoaded()
end

-- Initializes heroes' innate abilities (abilities that a hero has auto-leveled up at the start of the game)
function InitializeInnateAbilities(hero)

	-- List of all innate abilities
	local innate_abilities = {
		"detonator_conjure_image",
		"innate_ability2"
	}

	-- Cycle through any innate abilities found, then set their level to 1
	for i = 1, #innate_abilities do
		local current_ability = hero:FindAbilityByName(innate_abilities[i])
		if current_ability then
			current_ability:SetLevel(1)
		end
	end
end
