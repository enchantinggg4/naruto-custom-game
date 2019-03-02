import {Dire, Radiant} from "./heroes";


function GetHeroName(panel: Panel) {
    if ("text" in panel) {
        return undefined;
    }
    const img = panel.GetChild(0).GetChild(0) as HeroImage;

    return img.heroname;
}

function RemoveHeroes() {

    // get very root panel
    var dotaHud = $.GetContextPanel().GetParent().GetParent().GetParent();

    // RADIANT = 2, DIRE = 3
    const team = Players.GetTeam(Players.GetLocalPlayer()) - 2;
    // get list of enabled heroes
    const heroes = [Radiant, Dire][team];


    // its root of hero picking screen
    const preGame = dotaHud.FindChild("PreGame");

    // its container for all hero cards and some more markup
    const grid = preGame.FindChildTraverse("GridCore");

    // iterate over each children
    grid.Children().forEach((panel) => {
        // we extract hero name that child panel renders
        const heroName = GetHeroName(panel);
        // if it renders hero then heroName is not null
        if (heroName) {
            // we check if heroName is in our list of enabled heroes
            if (heroes.some(it => it.hero_short === heroName)) {
                // don't remove
            } else {
                // if this hero isn't in enabled list we remove it
                panel.RemoveAndDeleteChildren();
            }
        } else {
            // This is just filter label or smf
        }
    });
}


(function () {
    RemoveHeroes();
})();