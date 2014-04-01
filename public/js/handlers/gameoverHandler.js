define([
    'models/score', 
    'collections/scores', 
    'views/scoreboard'
], function(
    Score, 
    Scoreboard, 
    ScoreboardView 
){
    function gameOverHandler(event) {
        event.preventDefault(); // no default action
        var dataArr = $(this).serializeArray();
        var PlayerName = dataArr[0]["value"];
        var PlayerScore = dataArr[1]["value"];
        var scores = [];

        if(localStorage["scores"] != undefined) {
            scores =  JSON.parse(localStorage["scores"]);
        }
        if(PlayerName === "") {
            $("#status").html("Empty data");
        } else {

        Scoreboard.add(new Score({"name" : PlayerName, "score" : PlayerScore}));
        $(".gameover__button-submit").prop("disabled",true);
        $("#status").html("Wait...");

        $.ajax({
            url : '/scores',
            type: 'post',
            data: dataArr,
            dataType: 'json',
        })

        .done(function() {
            $(".gameover__button-submit").prop("disabled",false);
            $("#status").html("");
            ScoreboardView.show();
        })

        .fail(function(){
            scores.push({"name" : PlayerName, "score" : PlayerScore})
            localStorage["scores"] = JSON.stringify(scores); // save it 
            $(".gameover__button-submit").prop("disabled",false);
            $("#status").html("Your data was saved.");
            ScoreboardView.show();
        })
    }
    }
    return gameOverHandler;
});