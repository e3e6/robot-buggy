const { Led, Board, Motor } = require('johnny-five')
const {EtherPortClient} = require('etherport-client');
const keypress = require("keypress");

const LED_PIN = 2;
keypress(process.stdin);

const board = new Board({
    port: new EtherPortClient({
        host: '192.168.68.52',
        port: 3030
    }),
    repl: false
});

board.on('ready', () => {


    const led = new Led(LED_PIN).blink(500);
    const motosRight = new Motor({
        pins: {
            pwm:14, //ENA D5 GPIO14
            dir:15, //IN1 D8 GPIO15
            cdir: 13 //IN2 D7 GPIO13
        }
    });

    const motosLeft = new Motor({
        pins: {
            pwm:12, //ENB D6 GPIO12
            dir:0, //IN1 D4 GPIO2
            cdir:2 //IN2 D3 GPIO0
        }
    });

    const fwd = () => {
        led.blink(200);
        motosRight.forward(75);
        motosLeft.forward(75);
    }

    const rev = () => {
        led.blink(100);
        motosRight.forward(75);
        motosLeft.forward(75);
    }

    const stop = () => {
        led.stop();
        motosRight.stop();
        motosLeft.stop();
    }

    console.log("Use Up and Down arrows for On and Off. Space to stop.")
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (ch, key) => {
        if (!key) {
            return
        }

        if (key.name === "q") {
            console.log("Quitting")
            process.exit()
        } else if (key.name === "up") {
            console.log("Forward")
            fwd();
        } else if (key.name === "down") {
            console.log("Rev")
            rev();
        }
        else if (key.name === "space") {
            console.log("stop")
            stop();
        } else {
            console.log("halt")
            stop();
        }
    });
});
