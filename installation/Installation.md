## Installation
You should have a Raspberry Pi set up with Raspbian.
Here Raspberry Pi model 3B+ is used with Raspbian Buster 2021-05-07.

# 1. Install avrdude
Install prerequisites:
$ sudo apt update && sudo apt upgrade -y
$ sudo apt install bison automake autoconf flex gcc-avr binutils-avr avr-libc -y

Clone Kevin Cuzner's version of avrdude, which allows on-board SPI hardware as programmer.
$ git clone https://github.com/kcuzner/avrdude

Then navigate to the directory with the installation scripts and run them:
$ cd avrdude/avrdude
$ ./bootstrap
$ ./configure
$ sudo make install

# 2. Wire up the microcontroller
Here Atmel Attiny85-20PU is used.

Attiny85            ->                  ->  Raspberry Pi
---------------------------------------------------------
Pin 1: PB5 (RESET) -> add 1kΩ resistor ->  Pin 15: GPIO22 (GPIO_GEN3)
Pin 2: PB3
Pin 3: PB4
Pin 4: GND         ->                  ->  Pin 39: Ground
Pin 5: PB0 (MOSI)  -> add 1kΩ resistor ->  Pin 19: GPIO10 (SPI_MOSI)
Pin 6: PB1 (MISO)  -> add 1kΩ resistor ->  Pin 21: GPIO09 (SPI_MISO)
Pin 7: PB2 (SCK)   -> add 1kΩ resistor ->  Pin 23: GPIO11 (SPI_CLK)
Pin 8: VCC         ->                  ->  Pin 01: 3.3v (DC Power)

# 3. Test the connection
Pull the Attiny85 reset pin low:
$ sudo gpio -g mode 22 out
$ sudo gpio -g write 22 0

Test the connection:
$ sudo avrdude -p attiny85 -c linuxspi -P /dev/spidev0.0 -b 10000

# (Optional) 4. Blink a led
Add a LED and a resistor to the circuit.

Attiny85
---------
Pin 2: PB3 -> 470Ω resistor -> LED -> GND

Make the hello.c example code:
$ cd hello
$ make

Bring the reset pin up to take the microcontroller out of programming mode:
$ sudo gpio -g write 22 1

The LED should now be blinking.
