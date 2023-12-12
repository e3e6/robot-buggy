const { Board, Led, Motor } = require('johnny-five')
const board = new Board()
const configs = Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

board.on('ready', () => {
    const led = new Led(13);

    const motors = [
        new Motor(configs.M1),
        new Motor(configs.M4),
        new Motor(configs.M2),
        new Motor(configs.M3)
    ];

    board.repl.inject({
        fwd: function(speed = 255) {
            motors.forEach(motor => motor.forward(speed));
            led.blink(100);
        },
        rev: function(speed = 255) {
            motors.forEach(motor => motor.reverse(speed));
            led.blink(50);
        },
        start: function() {
            motors.forEach(motor => motor.start());
        },
        stop: function() {
            motors.forEach(motor => motor.stop());
            led.stop().off();
        },
        left: function(speed = 255) {
            motors.slice(0, 2).forEach(motor => motor.reverse(speed));
            motors.slice(2).forEach(motor => motor.forward(speed));
        }
    });
});
