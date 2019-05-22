let five = require("johnny-five"),
    board = new five.Board();
let servoDigit = [
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1], // a (based on the seven segment display)
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 1], // f
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1], // b
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1], // g
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0], // e
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1], // c
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0]  // d
];
let seconds = 0;
// this is a test code
// let servoDigit = [
//     [1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
//     [1, 0, 0, 0, 1, 1, 1, 0, 1, 1]
// ];
let getTime = () => {
    let date = new Date();
    return date.getSeconds();
}
// const interval = setInterval(() => {
//     seconds = getTime();
// }, 1000);

const servoMoving = (servo) => {
    // this is a test code
    // if (seconds % 3 === 0) {
    //     servo.to(90, 500, 10);
    //     servo.to(0, 500, 10);
    // }
    let digit = seconds % 10;
    for (let i = 0; i < servo.length; i++) {
        servo[i].to((servoDigit[i][digit] ? 90 : 0), 500, 10)
    }
}

board.on("ready", function () {
    // Create an Led on pin 13
    var led = new five.Led(13);
    led.on();
    var servo = [];
    for (var i = 5; i <= 11; i++) {
        servo.push(new five.Servo({
            pin: i,
            startAt: 0
        }));
    }
    // this is a test code
    // let servo = new five.Servo({
    //     pin: 6,
    //     startAt: 0
    // })
    servo.filter((element) => { // initial value
        element.to(90, 500, 10);
        element.to(0, 500, 10);
    });

    this.repl.inject({
        time: () => seconds,
        on: () => { led.on() },
        off: () => { led.off() },
        sr: () => {
            return setInterval(() => {
                seconds = getTime();
                console.log(seconds);
                servoMoving(servo);
            }, 1000);
        }
    });
});