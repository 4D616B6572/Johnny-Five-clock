var five = require("johnny-five"),
    board = new five.Board();

let getTime = () => {
    let date = new Date();
    return date.getSeconds();
}
const interval = setInterval(() => {
    seconds = getTime();
    // console.log(seconds);
}, 1000);

board.on("ready", function () {
    // Create an Led on pin 13
    var led = new five.Led(13);
    led.on();
    var servo = [];
    for (var i = 5; i <= 11; i++) {
        servo.push(new five.Servo({
            pin: i,
            range: [55, 145]
        }));
    }
    this.repl.inject({
        time: ()=>seconds,
        on: ()=>{led.on()},
        off: ()=>{led.off()}
    });
    servo.filter((element) => { element.sweep() });
});