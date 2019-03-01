import {Dire, Radiant} from "./heroes";


function GetHeroName(panel: Panel) {
    if ("text" in panel) {
        return undefined;
    }
    const img = panel.GetChild(0).GetChild(0) as HeroImage;

    return img.heroname;
}

function UpdateTimer() {
    var dotaHud = $.GetContextPanel().GetParent().GetParent().GetParent();


    const team = Players.GetTeam(Players.GetLocalPlayer()) - 2;
    const heroes = [Radiant, Dire][team];


    const preGame = dotaHud.FindChild("PreGame");
    const grid = preGame.FindChildTraverse("GridCore");
    grid.Children().forEach((panel, index) => {
        const heroName = GetHeroName(panel);
        if (heroName) {
            if (heroes.some(it => it.hero_short === heroName)) {
                // don't remove
            } else {
                panel.RemoveAndDeleteChildren();
            }
        } else {
            // label
        }
    });
}


(function () {
    UpdateTimer();
})();