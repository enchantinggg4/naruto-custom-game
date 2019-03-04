define("heroes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Radiant = [
        {
            hero_name: "npc_dota_hero_naruto",
            hero_original_name: "npc_dota_hero_bloodseeker",
            hero_title: "Naruto",
            hero_short: "bloodseeker"
        },
        {
            hero_name: "npc_dota_hero_sasuke",
            hero_original_name: "npc_dota_hero_antimage",
            hero_title: "Sasuke",
            hero_short: "antimage"
        },
        {
            hero_name: "npc_dota_hero_kakashi",
            hero_original_name: "npc_dota_hero_bounty_hunter",
            hero_title: "Kakashi",
            hero_short: "bounty_hunter"
        },
    ];
    exports.Dire = [
        {
            hero_name: "npc_dota_hero_itachi",
            hero_original_name: "npc_dota_hero_terrorblade",
            hero_title: "Itachi",
            hero_short: "terrorblade"
        },
        {
            hero_name: "npc_dota_hero_nagato",
            hero_original_name: "npc_dota_hero_dark_seer",
            hero_title: "Nagato",
            hero_short: "dark_seer"
        },
        {
            hero_name: "npc_dota_hero_hidan",
            hero_original_name: "npc_dota_hero_night_stalker",
            hero_title: "Hidan",
            hero_short: "night_stalker"
        },
    ];
});
define("testUI", ["require", "exports", "heroes"], function (require, exports, heroes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function GetHeroName(panel) {
        if ("text" in panel) {
            return undefined;
        }
        var img = panel.GetChild(0).GetChild(0);
        return img.heroname;
    }
    function RemoveHeroes() {
        // get very root panel
        var dotaHud = $.GetContextPanel().GetParent().GetParent().GetParent();
        // RADIANT = 2, DIRE = 3
        var team = Players.GetTeam(Players.GetLocalPlayer()) - 2;
        // get list of enabled heroes
        var heroes = [heroes_1.Radiant, heroes_1.Dire][team];
        // its root of hero picking screen
        var preGame = dotaHud.FindChild("PreGame");
        // its container for all hero cards and some more markup
        var grid = preGame.FindChildTraverse("GridCore");
        // iterate over each children
        grid.Children().forEach(function (panel) {
            // we extract hero name that child panel renders
            var heroName = GetHeroName(panel);
            $.Msg(heroName);
            // if it renders hero then heroName is not null
            if (heroName) {
                // we check if heroName is in our list of enabled heroes
                if (heroes.some(function (it) { return it.hero_short === heroName; })) {
                    // don't remove
                }
                else {
                    // if this hero isn't in enabled list we remove it
                    panel.RemoveAndDeleteChildren();
                }
            }
            else {
                // This is just filter label or smf
            }
        });
    }
    (function () {
        RemoveHeroes();
    })();
});
