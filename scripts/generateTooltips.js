const fs = require("fs");
const path = require("path");

const parseKV = require("./kvparser").parseKV;
const jsonToKV = require("./kvparser").jsonToKV;


function insertMissingTooltips(ability, specials, global, all) {
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

    Object.keys(all[ability].Modifiers || {}).forEach(modifier => {
        const keys = [null, "Description"];
        keys.forEach(item => {
            if (!item) {
                const key = `DOTA_Tooltip_${modifier}`;
                if (global[key] === undefined) {
                    global[key] = modifier;
                }
            } else {
                const key = `DOTA_Tooltip_${modifier}_${item}`;
                if (global[key] === undefined) {
                    global[key] = modifier;
                }
            }
        })

    })

    // all.Modifiers.forEach(modifier => {
    //     console.log(modifier);
    // })
}

const languages = [
    "english",
    // "russian"
];


function readRec(root) {
    languages.forEach(language => {
        const tooltipFileJSON = `tooltip/addon_${language}.json`;
        const tooltipFile = `game/resource/addon_${language}.txt`;
        const exists = fs.existsSync(tooltipFileJSON);
        const tooltips = exists ? JSON.parse(fs.readFileSync(tooltipFileJSON, {encoding: "UTF-8"})) : {lang: {Tokens: {}}};

        const files = fs.readdirSync(root);
        files.forEach(it => {
            const json = parseKV(path.join(root, it));
            const abilityName = Object.keys(json.DOTAAbilities)[0];
            const abilitySpecs = json.DOTAAbilities[abilityName].AbilitySpecial && Object.values(json.DOTAAbilities[abilityName].AbilitySpecial).map(it => {
                const sub = {...it};
                delete sub["var_type"];
                return Object.keys(sub)[0];
            }) || [];
            insertMissingTooltips(abilityName, abilitySpecs, tooltips.lang.Tokens, json.DOTAAbilities)
        });

        fs.writeFileSync(tooltipFileJSON, JSON.stringify(tooltips, null, 2));
        fs.writeFileSync(tooltipFile, jsonToKV(tooltips));
    });
}

readRec("game/scripts/npc/abilities");