"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heroes_1 = require("./generated/heroes");
var canEnter = false;
GameEvents.Subscribe("picking_done", OnPickingDone);
GameEvents.Subscribe("picking_player_pick", OnPlayerPicked);
function OnPickingDone() {
    // todo
}
function EnterGame() {
    if (canEnter) {
        $('#HeroSelectOverlayRoot').DeleteAsync(0.0);
    }
}
function OnPlayerPicked(data) {
    $.Msg(data.PlayerID);
    $.Msg(data.hero.hero_name);
    var panel = $("#" + data.hero.hero_original_name);
    panel.AddClass("Picked");
    panel.enabled = false;
    var playerPanel = $("#player_" + data.PlayerID);
    playerPanel.FindChildTraverse("PlayerHeroImage").SetImage("file://{images}/custom_game/selection/" + data.hero.hero_name + ".jpg");
}
function OnHeroSelected(hero) {
    GameEvents.SendCustomGameEventToServer("hero_selected", { hero: hero });
    ShowPreview(hero);
}
function ShowPreview(item) {
    $.Msg("Show preview " + item);
    $.Msg("Show preview " + "file://{images}/custom_game/selection/" + item.hero_name + ".jpg");
    $("#Spacer").style.visibility = 'collapse';
    $("#SelectedHero").style.visibility = 'visible';
    $("#SelectedHero").style.visibility = 'visible';
    $("#SelectedHeroImage").SetImage("file://{images}/custom_game/selection/" + item.hero_name + ".jpg");
}
function FillPlayers() {
    $("#RadiantPlayers").RemoveAndDeleteChildren();
    $("#DirePlayers").RemoveAndDeleteChildren();
    for (var i = 0; i < 10; i++) {
        var team = i < 5 ? 2 : 3;
        var teamName = team - 2 === 0 ? "#RadiantPlayers" : "#DirePlayers";
        var panel = $.CreatePanel("Panel", $(teamName), "player_" + i.toString());
        panel.BLoadLayoutSnippet("PlayerHeroTab");
        panel.FindChildTraverse("PlayerHeroName").SetAttributeString("text", "Hero #" + i);
    }
}
function FillHeroes() {
    var team = Players.GetTeam(Players.GetLocalPlayer()) - 2;
    $("#HeroesList").RemoveAndDeleteChildren();
    [heroes_1.Radiant, heroes_1.Dire][team].forEach(function (item, index) {
        var panel = $.CreatePanel("Panel", $("#HeroesList"), item.hero_original_name);
        panel.BLoadLayoutSnippet("Quest");
        panel.SetPanelEvent("onactivate" /* ON_LEFT_CLICK */, function () {
            OnHeroSelected(item);
        });
        panel.FindChildTraverse("HeroImage").SetImage("file://{images}/custom_game/selection/" + item.hero_name + ".jpg");
        if (index % 2 === 1) {
            panel.AddClass("Even");
        }
        panel.FindChildTraverse("HeroName").SetAttributeString("text", item.hero_title);
    });
}
function UpdateTimer() {
    var gameTime = Game.GetGameTime();
    var transitionTime = Game.GetStateTransitionTime();
    var timerValue = Math.max(0, Math.floor(transitionTime - gameTime));
    if (Game.GameStateIsAfter(DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION)) {
        timerValue = 0;
    }
    $("#TimerValue").SetAttributeString("text", timerValue.toString());
    $.Schedule(0.1, UpdateTimer);
}
(function () {
    FillHeroes();
    FillPlayers();
    UpdateTimer();
})();
