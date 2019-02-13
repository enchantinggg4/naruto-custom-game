"use strict";

var heroes = {
    radiant: [
        "npc_dota_hero_naruto"
    ],
    dire: [
        {
            hero_name: "npc_dota_hero_sasuke",
            hero_title: "Sasuke"
        }
    ]
};

function OnHeroSelected(id) {
    FillHeroes();
    $.Msg("id is " + id)
}


function FillHeroes() {

    $.Msg("Refilling heroes");


    $("#HeroesDire").RemoveAndDeleteChildren();

    heroes.dire.forEach(function(item){
        var panel = $.CreatePanel("Panel", $("#HeroesDire"), "");
        panel.onactivate = "OnHeroSelected(1)";
        panel.BLoadLayoutSnippet("Quest");
        panel.FindChildTraverse("HeroImage").SetImage("file://{images}/custom_game/selection/" + item.hero_name + ".jpg");
        panel.FindChildTraverse("HeroName").text = item.hero_title;
        $.Msg("file://{images}/custom_game/selection/" + item.hero_name + ".jpg")
    })

}

function UpdateTimer() {
    var gameTime = Game.GetGameTime();
    var transitionTime = Game.GetStateTransitionTime();

    var timerValue = Math.max(0, Math.floor(transitionTime - gameTime));

    if (Game.GameStateIsAfter(DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION)) {
        timerValue = 0;
    }

    // $.Msg();
    // FillHeroes();

    $.Schedule(0.1, UpdateTimer);
}

(function () {
    // var timerPanel = $.CreatePanel("Panel", $.GetContextPanel(), "TimerPanel");
    // timerPanel.BLoadLayout( "file://{resources}/layout/custom_game/hero_select_overlay_timer.xml", false, false );
    FillHeroes();
    UpdateTimer();
})();