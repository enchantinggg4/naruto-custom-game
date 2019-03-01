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
    function UpdateTimer() {
        var dotaHud = $.GetContextPanel().GetParent().GetParent().GetParent();
        var team = Players.GetTeam(Players.GetLocalPlayer()) - 2;
        var heroes = [heroes_1.Radiant, heroes_1.Dire][team];
        var preGame = dotaHud.FindChild("PreGame");
        var grid = preGame.FindChildTraverse("GridCore");
        grid.Children().forEach(function (panel, index) {
            var heroName = GetHeroName(panel);
            if (heroName) {
                if (heroes.some(function (it) { return it.hero_short === heroName; })) {
                    // don't remove
                }
                else {
                    panel.RemoveAndDeleteChildren();
                }
            }
            else {
                // label
            }
        });
    }
    (function () {
        UpdateTimer();
    })();
});
