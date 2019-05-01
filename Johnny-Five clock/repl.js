var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function()
{
    console.log("ready event. repl instance auto-initializesd!");
    this===board?console.log(true):console.log(false);
    var led = new five.Led(13);

    this.repl.inject({
        on: function(){led.on();},
        off: function(){led.off();}
    })
})