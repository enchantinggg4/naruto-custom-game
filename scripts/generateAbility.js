const fs = require("fs");

function addKVAbility(abilityName) {
    const KV = `
"DOTAAbilities"
{
    "Version"   "1"
    "${abilityName}"
    {
        "BaseClass"						"ability_lua"
        "ScriptFile"					"abilities/${abilityName}/${abilityName}.lua"

        "AbilityBehavior"				"DOTA_ABILITY_BEHAVIOR_CHANNELLED | DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"
        "AbilityUnitTargetTeam"         "DOTA_UNIT_TARGET_TEAM_ENEMY"
        "AbilityUnitTargetType"         "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
        "AbilityTextureName"			"naruto_rasengan_active"


         "precache"
        {
            "particle"          "particles/abilities/amaterasu/amaterasu_fire2.vpcf"
            "soundfile"         "soundevents/game_sounds_amaterasu.vsndevts"
        }


        "AbilitySpecial"
        {
            "00"
            {
                "var_type"						"FIELD_FLOAT"
                "charge_time"   				"1 2 3 4"
            }
        }
    }
}
`;

    fs.writeFileSync(`game/scripts/npc/abilities/${abilityName}.txt`, KV);

    const customAbilities = fs.readdirSync("game/scripts/npc/abilities").map(it => `#base "abilities/${it}"`).join("\n");

    fs.writeFileSync(
        "game/scripts/npc/npc_abilities_custom.txt",
        customAbilities
    );
}

function generateTypescript(abilityName){
    fs.mkdirSync(`src/vscripts/abilities/${abilityName}`);
    fs.writeFileSync(
        `src/vscripts/abilities/${abilityName}/${abilityName}.ts`,
        `
class ${abilityName} extends CDOTA_Ability_Lua {
    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    }

    GetCooldown(iLevel: number): number {
        return 0
    }

    GetChannelTime(): number {
        return 0
    }

    GetManaCost(iLevel: number): number {
        return 0
    }


    OnChannelFinish(bInterrupted: boolean): void {
        
    }

    OnSpellStart(): void {
       
    }
}
        `
    )
}

function generateAbility(abilityName){
    addKVAbility(abilityName);
    generateTypescript(abilityName);
}

const abilityName = process.argv[2];

generateAbility(abilityName);