import {Dire, IHero, Radiant} from "./heroes";

interface IOnTimeUpdate {
    time: string;
}

interface IOnPlayerPicked {
    PlayerID: string;
    hero: IHero
}

const canEnter = false;

GameEvents.Subscribe("picking_done", OnPickingDone);
GameEvents.Subscribe("picking_player_pick", OnPlayerPicked);

function OnPickingDone(){
    // todo
}

function EnterGame() {
    if (canEnter) {
        $('#HeroSelectOverlayRoot').DeleteAsync(0.0);
    }
}

function OnPlayerPicked(data: IOnPlayerPicked) {

    $.Msg(data.PlayerID);
    $.Msg(data.hero.hero_name);

    const panel = $("#" + data.hero.hero_original_name);
    panel.AddClass("Picked");
    panel.enabled = false;

    const playerPanel = $("#player_" + data.PlayerID);
    (playerPanel.FindChildTraverse("PlayerHeroImage") as ImagePanel).SetImage("file://{images}/custom_game/selection/" + data.hero.hero_name + ".jpg");

}

function OnHeroSelected(hero: IHero) {
    GameEvents.SendCustomGameEventToServer("hero_selected", {hero: hero});
    ShowPreview(hero)
}


function ShowPreview(item: IHero) {
    $.Msg("Show preview " + item);
    $.Msg("Show preview " + "file://{images}/custom_game/selection/" + item.hero_name + ".jpg");

    $("#Spacer").style.visibility = 'collapse';
    $("#SelectedHero").style.visibility = 'visible';
    ($("#SelectedHeroImage") as ImagePanel).SetImage("file://{images}/custom_game/selection/" + item.hero_name + ".jpg");
}

function FillPlayers() {
    $("#RadiantPlayers").RemoveAndDeleteChildren();
    $("#DirePlayers").RemoveAndDeleteChildren();

    for (let i = 0; i < 10; i++) {
        const team = i < 5 ? 2 : 3;

        const teamName = team - 2 === 0 ? "#RadiantPlayers" : "#DirePlayers";


        const panel = $.CreatePanel("Panel", $(teamName), "player_" + i.toString());
        panel.BLoadLayoutSnippet("PlayerHeroTab");
        panel.FindChildTraverse("PlayerHeroName").SetAttributeString("text", "Hero #" + i);
    }

}

function FillHeroes() {

    const team = Players.GetTeam(Players.GetLocalPlayer()) - 2;


    $("#HeroesList").RemoveAndDeleteChildren();

    [Radiant, Dire][team].forEach((item: IHero, index: number) => {
        const panel = $.CreatePanel("Panel", $("#HeroesList"), item.hero_original_name);
        panel.BLoadLayoutSnippet("Quest");
        panel.SetPanelEvent(PanelEvent.ON_LEFT_CLICK, function () {
            OnHeroSelected(item)
        });
        (panel.FindChildTraverse("HeroImage") as ImagePanel).SetImage("file://{images}/custom_game/selection/" + item.hero_name + ".jpg");
        if (index % 2 === 1) {
            panel.AddClass("Even");
        }
        panel.FindChildTraverse("HeroName").SetAttributeString("text", item.hero_title);
    })
}

function UpdateTimer() {
    const gameTime = Game.GetGameTime();
    const transitionTime = Game.GetStateTransitionTime();

    let timerValue = Math.max(0, Math.floor(transitionTime - gameTime));

    if (Game.GameStateIsAfter(DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION)) {
        timerValue = 0;
    }
    ($("#TimerValue") as LabelPanel).text = timerValue.toString();

    $.Schedule(0.1, UpdateTimer);

}

(function(){
    $("#EnterGameButton").SetPanelEvent(PanelEvent.ON_LEFT_CLICK, function(){
        EnterGame();
    });
    FillHeroes();
    FillPlayers();
    UpdateTimer();
})();