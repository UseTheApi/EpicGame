define([
    'models/score', 
    'collections/scores', 
    'views/scoreboard', 
], function(
    Score, 
    Scoreboard, 
    ScoreboardView 
){
    function gameOverHandler(event) {
        event.preventDefault(); // no default action
        var data = $(this).serialize();
        $(".gameover__button-submit").prop("disabled",true);
        $("#status").html("Wait...");

        $.ajax({
            url : '/scores',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(msg) {
                var player = new Score({
                    name: msg["name"],
                    score: msg["score"]
                });         
            }
        })
        .done(function() {
            $(".gameover__button-submit").prop("disabled",false);
            $("#status").html("");
            window.location='/#scoreboard';
        })
        .fail(function(){
            $(".gameover__button-submit").prop("disabled",false);
            $("#status").text("Enter valid data");
        })
        .always(function(){
        })
    }
    return gameOverHandler;
});