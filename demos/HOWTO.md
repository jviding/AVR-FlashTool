# Demos
Here are some example programs written for Atmel AVR microcontrollers.

## Assembly
Install an assembler for the AVR microcontroller family:
>$ git clone https://github.com/Ro5bert/avra.git <br>
>$ cd avra <br>
>$ make <br>
>$ make install

Compile program code to hex:
>$ avra main.asm

Flash on microcontroller (here Attiny85):
>$ avrdude -p attiny85 -c linuxspi -P /dev/spidev0.0 -U flash:w:main.hex:i -b 10000

Bring the reset pin up to take the microcontroller out of programming mode:
> $ sudo gpio -g write 22 1

The code should now be running.
