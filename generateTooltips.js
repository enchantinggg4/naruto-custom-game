const fs = require("fs");
const path = require("path");

const parseKV = require("./kvparser").parseKV;
const jsonToKV = require("./kvparser").jsonToKV;


function insertMissingTooltips(ability, specials, global) {
    const allItems = [null].concat(specials.concat(["Lore", "Description"]));
    allItems.forEach(item => {
        if (!item) {
            const key = `DOTA_Tooltip_ability_${ability}`;
            if (global[key] === undefined) {
                global[key] = "AbilityName";
            }
        } else {
            const key = `DOTA_Tooltip_ability_${ability}_${item}`;
            if (global[key] === undefined) {
                global[key] = "AbilityName";
            }
        }
    });
}

function readRec(root) {

    // const tooltips = parseKV("game/resource/addon_english.txt");
    const tooltips = JSON.parse(fs.readFileSync("tooltip/tooltip.json", { encoding: "UTF-8"}));

    const files = fs.readdirSync(root);
    files.forEach(it => {
        const json = parseKV(path.join(root, it));
        const abilityName = Object.keys(json.DOTAAbilities)[0];
        // tooltipAbility(abilityName, )
        const abilitySpecs = json.DOTAAbilities[abilityName].AbilitySpecial && Object.values(json.DOTAAbilities[abilityName].AbilitySpecial).map(it => {
            const sub = {...it};
            delete sub["var_type"];
            return Object.keys(sub)[0];
        }) || [];
        insertMissingTooltips(abilityName, abilitySpecs, tooltips.lang.Tokens, json.DOTAAbilities)
    });

    fs.writeFileSync("tooltip/tooltip.json", JSON.stringify(tooltips, null, 2));
    fs.writeFileSync("game/resource/addon_english.txt", jsonToKV(tooltips));
}

readRec("game/scripts/npc/abilities");