-- This is the entry-point to your game mode and should be used primarily to precache models/particles/sounds/etc
--GameRules:SetCustomGameAllowBattleMusic(false);
--GameRules:SetCustomGameAllowMusicAtGameStart(false);

-- Creating a global gamemode variable;
if your_gamemode_name == nil then
	_G.your_gamemode_name = class({})
else
	DebugPrint("[BAREBONES] your_gamemode_name class name is already in use, change the name if this is the first time you launch the game!")
	DebugPrint("[BAREBONES] If this is not your first time, you probably used script_reload in console.")
end

require('util')
require('custom_illusions')
-- Essential lua libraries: (don't remove!)
require('libraries/timers')
require('libraries/player_resource')
require('gamemode')

function Precache(context)
--[[
  This function is used to precache resources/units/items/abilities that will be needed
  for sure in your game and that will not be precached by hero selection.  When a hero
  is selected from the hero selection screen, the game will precache that hero's assets,
  any equipped cosmetics, and perform the data-driven precaching defined in that hero's
  precache{} block, as well as the precache{} block for any equipped abilities.

  See GameMode:PostLoadPrecache() in gamemode.lua for more information
  ]]

	DebugPrint("[BAREBONES] Performing pre-load precache")

	-- Particles can be precached individually or by folder
	-- It it likely that precaching a single particle system will precache all of its children, but this may not be guaranteed
	PrecacheResource("particle", "particles/econ/generic/generic_aoe_explosion_sphere_1/generic_aoe_explosion_sphere_1.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pugna/pugna_life_drain.vpcf", context)
	PrecacheResource("particle", "particles/abilities/bidju/bidju_spirit2.vpcf", context)
	PrecacheResource("particle_folder", "particles/test_particle", context)

	-- Models can also be precached by folder or individually
	-- PrecacheModel should generally used over PrecacheResource for individual models
	PrecacheResource("model_folder", "particles/heroes/antimage", context)
	PrecacheResource("model", "models/items/sand_king/deserts_deathly_embrace_head/deserts_deathly_embrace_head.vmdl", context)
	PrecacheResource("model", "models/heroes/shadow_demon/shadow_demon.vmdl", context)
	PrecacheResource("model_folder", "models/items/sand_king", context)

	PrecacheResource("soundfile", "soundevents/game_sounds_tsukuyomi.vsndevts", ctx)
	PrecacheResource("soundfile", "soundevents/game_sounds_rasengan.vsndevts", ctx)
	PrecacheResource("soundfile", "soundevents/game_sounds_chidori.vsndevts", ctx)
	PrecacheResource("soundfile", "soundevents/game_sounds_music.vsndevts", ctx)


	--PrecacheResource("model_folder", "models/heroes/sand_king", context)
	--PrecacheResource("model", "particles/heroes/viper/viper.vmdl", context)
	--PrecacheModel("models/heroes/viper/viper.vmdl", context)
	--PrecacheModel("models/props_gameplay/treasure_chest001.vmdl", context)
	--PrecacheModel("models/props_debris/merchant_debris_chest001.vmdl", context)
	--PrecacheModel("models/props_debris/merchant_debris_chest002.vmdl", context)

	-- Sounds can precached here like anything else
	PrecacheResource("soundfile", "soundevents/game_sounds_custom.vsndevts", context)

	-- Entire items can be precached by name
	-- Abilities can also be precached in this way despite the name
	-- PrecacheItemByNameSync("rasengan", context)

	-- Entire heroes (sound effects/voice/models/particles) can be precached with PrecacheUnitByNameSync
	-- Custom units from npc_units_custom.txt can also have all of their abilities and precache{} blocks precached in this way
end

-- Create the game mode when we activate
function Activate()
	DebugPrint("[BAREBONES] Activating ...")
	print("your_gamemode_name activated.")
	your_gamemode_name:InitGameMode()
end
